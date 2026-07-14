import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/slices/productSlice';
import axios from 'axios';
import { Box, ArrowLeft, Save, Plus, X, Check, Trash2, Tag, Layers, Cpu, Droplet } from 'lucide-react';
import toast from 'react-hot-toast';
import { getColorSync } from 'colorthief';

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

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { product, isLoading: isProductLoading, isError, message } = useSelector((state) => state.products);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', brand: '', status: 'active', isNewArrival: false, isTrending: false, shortDescription: '', slug: ''
  });
  
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (isError) toast.error(message);
    if (!product || product._id !== id) {
      dispatch(getProductById(id));
    } else {
      setFormData({
        title: product.title || '',
        slug: product.slug || '',
        shortDescription: product.shortDescription || '',
        description: product.description || '',
        brand: product.brand || '',
        category: product.category || '',
        status: product.status || 'active',
        isNewArrival: product.isNewArrival || false,
        isTrending: product.isTrending || false
      });
      
      const mappedVariants = (product.variants || []).map(v => ({
        colorName: v.colorName || '',
        colorHex: v.colorHex || '#EEEEEE',
        price: v.price || 0,
        stock: v.stock || 0,
        sku: v.sku || '',
        sizes: v.sizes || [],
        fabricQuality: v.fabricQuality || { material: '', gsm: '', fit: '', fabricType: '', pattern: '', sleeveType: '' },
        existingImages: v.images || [],
        newImages: [],
        imagePreviews: [],
        selectedImageIndex: 0
      }));

      if (mappedVariants.length === 0) {
        mappedVariants.push({
          colorName: '', colorHex: '#EEEEEE', price: 0, stock: 0, sku: '', sizes: [],
          fabricQuality: { material: '', gsm: '', fit: '', fabricType: '', pattern: '', sleeveType: '' },
          existingImages: [], newImages: [], imagePreviews: [], selectedImageIndex: 0
        });
      }
      setVariants(mappedVariants);
    }
  }, [product, dispatch, id, isError, message]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Helper for globally indexing images
  const getImageUrl = (variant, globalIndex) => {
    if (globalIndex < variant.existingImages.length) {
      return variant.existingImages[globalIndex].url;
    }
    return variant.imagePreviews[globalIndex - variant.existingImages.length];
  };

  const extractColorFromImage = (imgUrl, vIndex) => {
    if (!imgUrl) return;
    // Cloudinary images might have CORS issues when drawing to canvas unless crossOrigin is anonymous
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgUrl;
    img.onload = () => {
      try {
        const color = getColorSync(img);
        const hex = color.hex();
        const name = getClosestColorName(hex);
        updateVariant(vIndex, 'colorHex', hex);
        updateVariant(vIndex, 'colorName', name);
      } catch (err) {
        console.error("ColorThief failed", err);
      }
    };
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
      existingImages: [],
      newImages: [],
      imagePreviews: [],
      selectedImageIndex: 0
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

  const selectVariantImage = (vIndex, globalIndex) => {
    const newVariants = [...variants];
    newVariants[vIndex].selectedImageIndex = globalIndex;
    setVariants(newVariants);
    extractColorFromImage(getImageUrl(newVariants[vIndex], globalIndex), vIndex);
  };

  const handleVariantImageChange = (vIndex, e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newVariants = [...variants];
    newVariants[vIndex].newImages = [...newVariants[vIndex].newImages, ...files];
    
    const previews = files.map(file => URL.createObjectURL(file));
    newVariants[vIndex].imagePreviews = [...newVariants[vIndex].imagePreviews, ...previews];
    
    const newlyAddedIndex = newVariants[vIndex].existingImages.length + newVariants[vIndex].imagePreviews.length - previews.length;
    
    if (newVariants[vIndex].colorHex === '#EEEEEE' || newVariants[vIndex].colorName === '') {
      newVariants[vIndex].selectedImageIndex = newlyAddedIndex;
      setVariants(newVariants);
      extractColorFromImage(previews[0], vIndex);
    } else {
      setVariants(newVariants);
    }
  };

  const removeVariantImage = (vIndex, globalIndex) => {
    const newVariants = [...variants];
    const isExisting = globalIndex < newVariants[vIndex].existingImages.length;
    
    if (isExisting) {
      newVariants[vIndex].existingImages.splice(globalIndex, 1);
    } else {
      const localIndex = globalIndex - newVariants[vIndex].existingImages.length;
      newVariants[vIndex].newImages.splice(localIndex, 1);
      newVariants[vIndex].imagePreviews.splice(localIndex, 1);
    }
    
    // Adjust selected index
    if (newVariants[vIndex].selectedImageIndex === globalIndex) {
      newVariants[vIndex].selectedImageIndex = 0;
      const firstImg = getImageUrl(newVariants[vIndex], 0);
      if (!firstImg) {
        newVariants[vIndex].colorHex = '#EEEEEE';
        newVariants[vIndex].colorName = '';
      } else {
        extractColorFromImage(firstImg, vIndex);
      }
    } else if (newVariants[vIndex].selectedImageIndex > globalIndex) {
      newVariants[vIndex].selectedImageIndex -= 1;
    }
    
    setVariants(newVariants);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (variants.length === 0) {
      return toast.error("Please add at least one product variant.");
    }
    
    setIsLoading(true);
    try {
      const processedVariants = [];
      for (const variant of variants) {
        let variantUploadedImages = [...variant.existingImages];
        if (variant.newImages.length > 0) {
          const vData = new FormData();
          variant.newImages.forEach(img => vData.append('images', img));
          const { data } = await axios.post('/api/upload', vData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
          variantUploadedImages = [...variantUploadedImages, ...data.images];
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

      // Root images map to first variant's images
      const rootImages = processedVariants[0]?.images || [];

      const productPayload = { 
        ...formData, 
        images: rootImages,
        thumbnail: rootImages[0] || null,
        variants: processedVariants 
      };
      
      await axios.put(`/api/products/${id}`, productPayload, { withCredentials: true });
      toast.success('Product updated successfully!');
      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  if (isProductLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-black flex items-center gap-2 text-sm font-semibold mb-2 transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 flex items-center gap-3">
              <Box size={28} className="text-black" /> Edit Product
            </h1>
            <p className="text-gray-500 mt-1 text-sm flex items-center gap-2">
              <Cpu size={14} className="text-purple-500" /> AI automatically updates tags and keywords
            </p>
          </div>
          <button 
            onClick={submitHandler}
            disabled={isLoading}
            className="bg-black text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
            {isLoading ? 'Saving...' : 'Update Product'}
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
                  type="text" name="title" required value={formData.title} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Slug</label>
                <input 
                  type="text" name="slug" required value={formData.slug} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Brand</label>
                <input 
                  type="text" name="brand" required value={formData.brand} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category</label>
                <input 
                  type="text" name="category" required value={formData.category} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Short Description</label>
              <input 
                type="text" name="shortDescription" required value={formData.shortDescription} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Description</label>
              <textarea 
                name="description" required rows="4" value={formData.description} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black uppercase tracking-widest text-xs font-bold">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex items-center gap-6 col-span-2 pt-6">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest cursor-pointer">
                  <input type="checkbox" name="isNewArrival" checked={formData.isNewArrival} onChange={handleChange} className="w-5 h-5 accent-black" />
                  New Arrival
                </label>
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest cursor-pointer">
                  <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="w-5 h-5 accent-black" />
                  Trending
                </label>
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
                type="button" onClick={addVariant}
                className="bg-white border border-gray-200 text-black px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:border-black transition-all flex items-center gap-2"
              >
                <Plus size={16} /> Add Variant
              </button>
            </div>

            <div className="space-y-6">
              {variants.map((variant, vIndex) => (
                <div key={vIndex} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
                  
                  {/* Variant Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getImageUrl(variant, variant.selectedImageIndex) ? (
                        <img src={getImageUrl(variant, variant.selectedImageIndex)} alt="Color Preview" className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-inner" />
                      ) : (
                        <div className="w-8 h-8 rounded-full shadow-inner border border-gray-200" style={{ backgroundColor: variant.colorHex }} />
                      )}
                      <span className="font-bold text-gray-900">{variant.colorName || (vIndex === 0 ? 'Default Variant' : 'New Variant')}</span>
                    </div>
                    {vIndex > 0 && (
                      <button type="button" onClick={() => removeVariant(vIndex)} className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-white rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      
                      {/* Left Column: Images & Color AI */}
                      <div className="lg:col-span-4 border-r border-gray-100 pr-0 lg:pr-8">
                        
                        <div className="mb-8">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center justify-between">
                            Variant Images
                            <span className="text-gray-400 font-normal">{variant.existingImages.length + variant.imagePreviews.length}</span>
                          </h4>
                          
                          <div className="flex gap-2 flex-wrap mb-2">
                            {/* Existing Images */}
                            {variant.existingImages.map((img, localIndex) => {
                              const globalIndex = localIndex;
                              return (
                                <div 
                                  key={`ex-${localIndex}`} 
                                  onClick={() => selectVariantImage(vIndex, globalIndex)}
                                  className={`relative group w-20 h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                                    variant.selectedImageIndex === globalIndex 
                                      ? 'ring-2 ring-blue-500 scale-105 shadow-md z-10' 
                                      : 'border border-gray-200 opacity-80 hover:opacity-100 hover:border-gray-400'
                                  }`}
                                >
                                  <img src={img.url} alt="variant" className="w-full h-full object-cover" />
                                  {variant.selectedImageIndex === globalIndex && (
                                    <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow">
                                      <Check size={12} strokeWidth={3} />
                                    </div>
                                  )}
                                  <button 
                                    type="button" 
                                    onClick={(e) => { e.stopPropagation(); removeVariantImage(vIndex, globalIndex); }} 
                                    className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              );
                            })}

                            {/* New Previews */}
                            {variant.imagePreviews.map((preview, localIndex) => {
                              const globalIndex = variant.existingImages.length + localIndex;
                              return (
                                <div 
                                  key={`new-${localIndex}`} 
                                  onClick={() => selectVariantImage(vIndex, globalIndex)}
                                  className={`relative group w-20 h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                                    variant.selectedImageIndex === globalIndex 
                                      ? 'ring-2 ring-blue-500 scale-105 shadow-md z-10' 
                                      : 'border border-gray-200 opacity-80 hover:opacity-100 hover:border-gray-400'
                                  }`}
                                >
                                  <img src={preview} alt="variant" className="w-full h-full object-cover" />
                                  {variant.selectedImageIndex === globalIndex && (
                                    <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow">
                                      <Check size={12} strokeWidth={3} />
                                    </div>
                                  )}
                                  <button 
                                    type="button" 
                                    onClick={(e) => { e.stopPropagation(); removeVariantImage(vIndex, globalIndex); }} 
                                    className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              );
                            })}
                            
                            <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                              <Plus size={24} />
                              <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleVariantImageChange(vIndex, e)} />
                            </label>
                          </div>
                          {(variant.existingImages.length > 0 || variant.imagePreviews.length > 0) && (
                            <p className="text-[11px] text-gray-400">Click any image to set it as the primary color for this variant.</p>
                          )}
                        </div>

                        {/* Selected Color Circular Preview */}
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Selected Color</label>
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-full shadow-inner border border-gray-200 overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                              {getImageUrl(variant, variant.selectedImageIndex) ? (
                                <img src={getImageUrl(variant, variant.selectedImageIndex)} alt="Color Preview" className="w-full h-full object-cover" />
                              ) : (
                                <Droplet size={24} className="text-gray-300" />
                              )}
                            </div>
                            <div className="flex-1">
                              <input 
                                type="text" 
                                value={variant.colorName} 
                                onChange={(e) => updateVariant(vIndex, 'colorName', e.target.value)} 
                                placeholder="Color Name"
                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:border-black mb-2"
                              />
                              <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                                <div className="w-3 h-3 rounded-full border border-gray-300 shadow-sm" style={{ backgroundColor: variant.colorHex }}></div>
                                {variant.colorHex}
                              </div>
                            </div>
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
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
