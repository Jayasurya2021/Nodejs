import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Upload, ArrowLeft, Save, Plus, X, Image as ImageIcon, Trash2, Tag, Layers, Droplet } from 'lucide-react';
import toast from 'react-hot-toast';
import ColorThief from 'colorthief';

// Basic color palette for AI color matching
const basicColors = [
  { name: 'Midnight Black', hex: '#000000' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Crimson Red', hex: '#DC143C' },
  { name: 'Forest Green', hex: '#228B22' },
  { name: 'Royal Blue', hex: '#4169E1' },
  { name: 'Mustard Yellow', hex: '#FFDB58' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Charcoal Gray', hex: '#36454F' },
  { name: 'Navy Blue', hex: '#000080' },
  { name: 'Burnt Orange', hex: '#CC5500' },
  { name: 'Soft Pink', hex: '#FFB6C1' },
  { name: 'Earthy Brown', hex: '#8B4513' },
  { name: 'Cream Beige', hex: '#F5F5DC' }
];

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}).join('').toUpperCase();

const getClosestColorName = (hex) => {
  const hexToRgb = (h) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
  };

  const [r1, g1, b1] = hexToRgb(hex) || [0,0,0];
  let minDistance = Infinity;
  let closest = 'Custom Color';

  for (let c of basicColors) {
    const [r2, g2, b2] = hexToRgb(c.hex);
    const dist = Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2));
    if (dist < minDistance) {
      minDistance = dist;
      closest = c.name;
    }
  }
  return closest;
};

const CreateProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', brand: ''
  });
  const [mainImages, setMainImages] = useState([]);
  const [mainImagePreviews, setMainImagePreviews] = useState([]);
  
  const [variants, setVariants] = useState([]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleMainImageChange = (e) => {
    const files = Array.from(e.target.files);
    setMainImages(prev => [...prev, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setMainImagePreviews(prev => [...prev, ...previews]);
  };

  const removeMainImage = (index) => {
    setMainImages(prev => prev.filter((_, i) => i !== index));
    setMainImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Variant Management
  const addVariant = () => {
    setVariants([...variants, {
      colorName: '',
      colorHex: '#EEEEEE',
      price: 0,
      stock: 0,
      sku: '',
      sizes: [],
      fabricQuality: { material: '', gsm: '', fit: '', fabricType: '', pattern: '', sleeveType: '' },
      images: [],
      imagePreviews: []
    }]);
  };

  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const updateVariant = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const updateFabric = (vIndex, field, value) => {
    const newVariants = [...variants];
    newVariants[vIndex].fabricQuality[field] = value;
    setVariants(newVariants);
  };

  const addSize = (vIndex) => {
    const newVariants = [...variants];
    newVariants[vIndex].sizes.push({ name: '', stock: 0 });
    setVariants(newVariants);
  };

  const removeSize = (vIndex, sIndex) => {
    const newVariants = [...variants];
    newVariants[vIndex].sizes.splice(sIndex, 1);
    setVariants(newVariants);
  };

  const updateSize = (vIndex, sIndex, field, value) => {
    const newVariants = [...variants];
    newVariants[vIndex].sizes[sIndex][field] = value;
    setVariants(newVariants);
  };

  const handleVariantImageChange = async (vIndex, e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newVariants = [...variants];
    newVariants[vIndex].images = [...newVariants[vIndex].images, ...files];
    
    const previews = files.map(file => URL.createObjectURL(file));
    newVariants[vIndex].imagePreviews = [...newVariants[vIndex].imagePreviews, ...previews];
    
    // Auto color detection using ColorThief on the first uploaded image of the variant
    if (newVariants[vIndex].colorHex === '#EEEEEE' || newVariants[vIndex].colorName === '') {
      const img = new Image();
      img.src = previews[0];
      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          const rgb = colorThief.getColor(img);
          const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
          const name = getClosestColorName(hex);
          
          updateVariant(vIndex, 'colorHex', hex);
          updateVariant(vIndex, 'colorName', name);
          toast.success(`Color detected: ${name}`);
        } catch (err) {
          console.error("ColorThief failed", err);
        }
      };
    }
    
    setVariants(newVariants);
  };

  const removeVariantImage = (vIndex, iIndex) => {
    const newVariants = [...variants];
    newVariants[vIndex].images.splice(iIndex, 1);
    newVariants[vIndex].imagePreviews.splice(iIndex, 1);
    setVariants(newVariants);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (variants.length === 0) {
      return toast.error("Please add at least one product variant.");
    }
    
    setIsLoading(true);
    try {
      // 1. Upload main product images
      let uploadedMainImages = [];
      if (mainImages.length > 0) {
        const uploadData = new FormData();
        mainImages.forEach(img => uploadData.append('images', img));
        const { data } = await axios.post('/api/upload', uploadData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
        uploadedMainImages = data.images;
      }

      // 2. Upload variant images & construct payload
      const processedVariants = [];
      for (const variant of variants) {
        let variantUploadedImages = [];
        if (variant.images.length > 0) {
          const vData = new FormData();
          variant.images.forEach(img => vData.append('images', img));
          const { data } = await axios.post('/api/upload', vData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
          variantUploadedImages = data.images;
        }
        
        processedVariants.push({
          colorName: variant.colorName,
          colorHex: variant.colorHex,
          price: Number(variant.price),
          stock: Number(variant.stock),
          sku: variant.sku,
          fabricQuality: variant.fabricQuality,
          sizes: variant.sizes.map(s => ({ name: s.name, stock: Number(s.stock) })),
          images: variantUploadedImages
        });
      }

      const productPayload = { 
        ...formData, 
        images: uploadedMainImages,
        thumbnail: uploadedMainImages[0] || null,
        variants: processedVariants 
      };
      
      await axios.post('/api/products', productPayload, { withCredentials: true });
      toast.success('Product created successfully! Pending admin approval.');
      navigate('/seller/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/seller/products" className="text-gray-500 hover:text-black flex items-center gap-2 text-sm font-semibold mb-2 transition-colors">
              <ArrowLeft size={16} /> Back to Products
            </Link>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 flex items-center gap-3">
              <Box size={28} className="text-black" /> Create Product
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Add a new item to your store catalog</p>
          </div>
          <button 
            onClick={submitHandler}
            disabled={isLoading}
            className="bg-black text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
            {isLoading ? 'Saving...' : 'Save Product'}
          </button>
        </div>

        <form onSubmit={submitHandler} className="space-y-8">
          
          {/* Section 1: Common Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <Tag size={18} className="text-gray-400" /> Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Product Title</label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="e.g. Premium Cotton T-Shirt"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Brand</label>
                  <input 
                    type="text" 
                    name="brand"
                    required
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    placeholder="e.g. Nike"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category</label>
                  <input 
                    type="text" 
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    placeholder="e.g. Clothing"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Description</label>
              <textarea 
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
                placeholder="Describe your product..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Main Product Images (Default display)</label>
              <div className="flex gap-4 flex-wrap">
                {mainImagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative group w-24 h-24 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removeMainImage(idx)}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <Plus size={24} />
                </div>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleMainImageChange} 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Variants */}
          <div className="bg-transparent">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black tracking-tight text-gray-900 flex items-center gap-2">
                <Layers size={22} /> Product Variants
              </h2>
              <button 
                type="button"
                onClick={addVariant}
                className="bg-white border border-gray-200 text-black px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:border-black transition-all flex items-center gap-2"
              >
                <Plus size={16} /> Add Variant
              </button>
            </div>

            {variants.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center">
                <Layers size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">No variants added</h3>
                <p className="text-gray-500 text-sm mb-6">You must add at least one variant (color, price, stock) for this product.</p>
                <button type="button" onClick={addVariant} className="bg-black text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all">Add First Variant</button>
              </div>
            ) : (
              <div className="space-y-6">
                {variants.map((variant, vIndex) => (
                  <div key={vIndex} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
                    
                    {/* Variant Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full shadow-inner border border-gray-200" style={{ backgroundColor: variant.colorHex }} />
                        <span className="font-bold text-gray-900">{variant.colorName || 'New Variant'}</span>
                      </div>
                      <button type="button" onClick={() => removeVariant(vIndex)} className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-white rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Left Column: Images & Color AI */}
                        <div className="lg:col-span-4 border-r border-gray-100 pr-0 lg:pr-8">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                            <ImageIcon size={14} /> Images & Color
                          </h4>
                          
                          <div className="mb-6">
                            <div className="flex gap-2 flex-wrap mb-3">
                              {variant.imagePreviews.map((preview, iIndex) => (
                                <div key={iIndex} className="relative group w-16 h-16 rounded-lg border border-gray-200 overflow-hidden">
                                  <img src={preview} alt="variant" className="w-full h-full object-cover" />
                                  <button type="button" onClick={() => removeVariantImage(vIndex, iIndex)} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X size={14} />
                                  </button>
                                </div>
                              ))}
                              <label className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black cursor-pointer transition-all">
                                <Plus size={20} />
                                <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleVariantImageChange(vIndex, e)} />
                              </label>
                            </div>
                            <p className="text-[11px] text-gray-400">Upload images to auto-detect color.</p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Detected Color</label>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="relative">
                                <input type="color" value={variant.colorHex} onChange={(e) => updateVariant(vIndex, 'colorHex', e.target.value)} className="w-10 h-10 rounded cursor-pointer opacity-0 absolute inset-0 z-10" />
                                <div className="w-10 h-10 rounded border border-gray-200 shadow-sm" style={{ backgroundColor: variant.colorHex }}></div>
                              </div>
                              <input 
                                type="text" 
                                value={variant.colorName} 
                                onChange={(e) => updateVariant(vIndex, 'colorName', e.target.value)} 
                                placeholder="Color Name"
                                className="flex-1 bg-white border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="lg:col-span-8">
                          
                          {/* Price & Stock */}
                          <div className="grid grid-cols-3 gap-4 mb-8">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Price ($)</label>
                              <input type="number" required value={variant.price} onChange={(e) => updateVariant(vIndex, 'price', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Base Stock</label>
                              <input type="number" required value={variant.stock} onChange={(e) => updateVariant(vIndex, 'stock', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">SKU (Opt)</label>
                              <input type="text" value={variant.sku} onChange={(e) => updateVariant(vIndex, 'sku', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all" />
                            </div>
                          </div>

                          {/* Sizes */}
                          <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Sizes & Inventory</h4>
                              <button type="button" onClick={() => addSize(vIndex)} className="text-[11px] font-bold uppercase text-black hover:underline flex items-center gap-1"><Plus size={12}/> Add Size</button>
                            </div>
                            <div className="space-y-2">
                              {variant.sizes.map((s, sIndex) => (
                                <div key={sIndex} className="flex items-center gap-2">
                                  <input type="text" placeholder="Size (e.g. S, M, L)" value={s.name} onChange={(e) => updateSize(vIndex, sIndex, 'name', e.target.value)} className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                  <input type="number" placeholder="Stock" value={s.stock} onChange={(e) => updateSize(vIndex, sIndex, 'stock', e.target.value)} className="w-24 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                  <button type="button" onClick={() => removeSize(vIndex, sIndex)} className="text-gray-400 hover:text-red-500 p-2"><X size={16} /></button>
                                </div>
                              ))}
                              {variant.sizes.length === 0 && <p className="text-sm text-gray-400 italic">No specific sizes added. Using base stock.</p>}
                            </div>
                          </div>

                          {/* Fabric Details */}
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Fabric Details</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              <input type="text" placeholder="Material (e.g. Cotton)" value={variant.fabricQuality.material} onChange={(e) => updateFabric(vIndex, 'material', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                              <input type="text" placeholder="GSM (e.g. 200)" value={variant.fabricQuality.gsm} onChange={(e) => updateFabric(vIndex, 'gsm', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                              <input type="text" placeholder="Fit (e.g. Regular)" value={variant.fabricQuality.fit} onChange={(e) => updateFabric(vIndex, 'fit', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                              <input type="text" placeholder="Pattern (e.g. Solid)" value={variant.fabricQuality.pattern} onChange={(e) => updateFabric(vIndex, 'pattern', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                              <input type="text" placeholder="Sleeve (e.g. Half)" value={variant.fabricQuality.sleeveType} onChange={(e) => updateFabric(vIndex, 'sleeveType', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
