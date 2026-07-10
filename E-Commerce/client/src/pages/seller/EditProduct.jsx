import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Edit, Upload, ArrowLeft, Save, Plus, X, Palette, Droplet } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const rgbToHex = (r, g, b) => {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
};

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '', price: 0, description: '', category: '', brand: '', stock: 0,
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [variants, setVariants] = useState([]);
  
  const [activePickerImage, setActivePickerImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [pickerPosition, setPickerPosition] = useState(null);

  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setFormData({
          title: data.title || '',
          price: data.price || 0,
          description: data.description || '',
          category: data.category || '',
          brand: data.brand || '',
          stock: data.stock || 0,
        });
        if (data.images) {
          setImagePreviews(data.images.map(img => img.url));
          if (data.images.length > 0) setActivePickerImage(data.images[0].url);
        }
        if (data.variants && data.variants.length > 0) {
          const loadedVariants = data.variants.map(v => ({
            ...v,
            sizes: v.sizes || [],
            fabricQuality: v.fabricQuality || { material: '', gsm: '', fit: '', fabricType: '', pattern: '', sleeveType: '' },
            images: [], 
            imagePreviews: v.images ? v.images.map(img => img.url) : [],
            existingImages: v.images || []
          }));
          setVariants(loadedVariants);
        }
      } catch (error) {
        toast.error('Failed to load product details');
        navigate('/seller/products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    if (previews.length > 0) {
      setActivePickerImage(previews[0]);
      setSelectedColor(null);
      setPickerPosition(null);
    }
  };

  const handleImageClick = (e, preview) => {
    const img = e.target;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    try {
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const rect = img.getBoundingClientRect();
      const scaleX = img.width / rect.width;
      const scaleY = img.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
      setSelectedColor({ hex, image: preview });
      setPickerPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    } catch (err) {
      toast.error("Could not read pixel data. This may happen due to CORS if images aren't local.");
    }
  };

  const addVariant = () => {
    const newVariant = { 
      color: '', 
      colorCode: selectedColor ? selectedColor.hex : '#000000', 
      sizes: [],
      fabricQuality: { material: '', gsm: '', fit: '', fabricType: '', pattern: '', sleeveType: '' },
      images: [], 
      imagePreviews: [],
      existingImages: []
    };
    
    // Attempt mapping new uploads to the variant
    if (selectedColor && selectedColor.image) {
      const imgIndex = imagePreviews.findIndex(p => p === selectedColor.image);
      if (imgIndex !== -1 && images[imgIndex]) { // Newly uploaded image
        newVariant.images = [images[imgIndex]];
        newVariant.imagePreviews = [selectedColor.image];
      } else if (imgIndex !== -1) { // Pre-existing image from server
        // Difficult to auto-map existing to variant images cleanly without server re-fetching, skip auto-map
        newVariant.imagePreviews = [selectedColor.image];
      }
    }
    
    setVariants([...variants, newVariant]);
    setSelectedColor(null);
    setPickerPosition(null);
  };

  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleFabricChange = (vIndex, field, value) => {
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

  const handleSizeChange = (vIndex, sIndex, field, value) => {
    const newVariants = [...variants];
    newVariants[vIndex].sizes[sIndex][field] = value;
    setVariants(newVariants);
  };

  const handleVariantImageChange = (index, e) => {
    const files = Array.from(e.target.files);
    const newVariants = [...variants];
    newVariants[index].images = files;
    newVariants[index].imagePreviews = files.map(file => URL.createObjectURL(file));
    newVariants[index].existingImages = []; 
    setVariants(newVariants);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let uploadedImages = null;
      if (images.length > 0) {
        const uploadData = new FormData();
        images.forEach(img => uploadData.append('images', img));
        const { data } = await axios.post('/api/upload', uploadData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
        uploadedImages = data.images;
      }

      const processedVariants = [];
      for (const variant of variants) {
        let variantUploadedImages = variant.existingImages || [];
        if (variant.images && variant.images.length > 0) {
          const vData = new FormData();
          variant.images.forEach(img => vData.append('images', img));
          const { data } = await axios.post('/api/upload', vData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
          variantUploadedImages = data.images;
        }
        
        const cleanSizes = variant.sizes.map(s => ({ name: s.name, stock: Number(s.stock) }));
        
        processedVariants.push({
          color: variant.color,
          colorCode: variant.colorCode,
          sizes: cleanSizes,
          fabricQuality: variant.fabricQuality,
          images: variantUploadedImages
        });
      }

      const productPayload = { ...formData, variants: processedVariants };
      if (uploadedImages) {
        productPayload.images = uploadedImages;
      }

      const config = { withCredentials: true };
      await axios.put(`/api/products/${id}`, productPayload, config);
      toast.success('Product updated successfully!');
      navigate('/seller/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-8">
        <Link to="/seller/products" className="text-gray-500 hover:text-black flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Products
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
          <Edit /> Edit Product
        </h1>
        <p className="text-gray-500 mt-2">Update product details. Note: Major changes may require re-approval.</p>
      </div>

      <form onSubmit={submitHandler} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Product Title</label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Price ($)</label>
                <input 
                  type="number" 
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Total Base Stock</label>
                <input 
                  type="number" 
                  name="stock"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                <input 
                  type="text" 
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Brand</label>
                <input 
                  type="text" 
                  name="brand"
                  required
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
              <textarea 
                name="description"
                required
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Main Product Images</label>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm font-bold text-gray-600">Click to update main images</p>
              </div>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
              />
            </div>
          </div>
        </div>

        {/* Color Picker Section */}
        {imagePreviews.length > 0 && (
          <div className="border-t border-gray-100 pt-8 mb-8">
            <h3 className="text-lg font-black uppercase tracking-widest mb-1">Extract Variant Color</h3>
            <p className="text-xs text-gray-500 mb-4">Click anywhere on an image below to extract its color via HTML5 Canvas, then create a variant.</p>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-96">
                {imagePreviews.map((preview, index) => (
                  <img 
                    key={index} 
                    src={preview} 
                    alt={`Preview ${index}`} 
                    crossOrigin="anonymous"
                    onClick={() => { setActivePickerImage(preview); setSelectedColor(null); setPickerPosition(null); }}
                    className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${activePickerImage === preview ? 'border-4 border-black ring-2 ring-offset-2 ring-gray-200' : 'border border-gray-200 opacity-60 hover:opacity-100'}`} 
                  />
                ))}
              </div>
              
              {/* Active Image Canvas Picker */}
              {activePickerImage && (
                <div className="relative flex-1 bg-gray-50 border border-gray-200 rounded flex justify-center items-center overflow-hidden min-h-[300px]">
                  <img 
                    src={activePickerImage}
                    alt="Active Picker"
                    crossOrigin="anonymous"
                    onClick={(e) => handleImageClick(e, activePickerImage)}
                    className="max-w-full max-h-[500px] object-contain cursor-crosshair"
                  />
                  {pickerPosition && (
                    <div 
                      className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                      style={{ top: pickerPosition.y, left: pickerPosition.x, backgroundColor: selectedColor?.hex }}
                    />
                  )}
                </div>
              )}

              {/* Color Preview & Action */}
              <div className="w-full md:w-48 flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded p-6">
                {selectedColor ? (
                  <>
                    <div 
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-4"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <div className="text-center mb-6">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Extracted Hex</p>
                      <p className="font-mono text-lg font-black">{selectedColor.hex}</p>
                    </div>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="w-full bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded shadow flex justify-center items-center gap-2"
                    >
                      <Palette size={14} /> Create Variant
                    </button>
                  </>
                ) : (
                  <div className="text-center text-gray-400">
                    <Droplet size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs uppercase font-bold tracking-widest">Select a pixel</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Variations Editor */}
        <div className="border-t border-gray-100 pt-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest">Product Variations</h3>
              <p className="text-xs text-gray-500 mt-1">Manage colors, fabrics, sizes, and stock manually.</p>
            </div>
            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded"
            >
              <Plus size={14} /> Blank Variant
            </button>
          </div>

          <div className="space-y-12">
            {variants.map((variant, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 relative">
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1 shadow-sm"
                >
                  <X size={16} />
                </button>
                <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
                  <div className="w-8 h-8 rounded-full border border-gray-300 shadow-inner" style={{ backgroundColor: variant.colorCode }} />
                  <h4 className="text-lg font-black uppercase tracking-wider">Variant #{index + 1}</h4>
                </div>

                {/* Color Info */}
                <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Color Configuration</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Color Name</label>
                    <input 
                      type="text" 
                      value={variant.color}
                      onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                      placeholder="e.g. Midnight Blue"
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Color HEX</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={variant.colorCode}
                        onChange={(e) => handleVariantChange(index, 'colorCode', e.target.value)}
                        className="w-10 h-10 border-0 rounded p-0 cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={variant.colorCode}
                        onChange={(e) => handleVariantChange(index, 'colorCode', e.target.value)}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Fabric Quality */}
                <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Fabric Quality</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div>
                    <input type="text" placeholder="Material (e.g. 100% Cotton)" value={variant.fabricQuality.material} onChange={(e) => handleFabricChange(index, 'material', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none" />
                  </div>
                  <div>
                    <input type="text" placeholder="GSM (e.g. 220)" value={variant.fabricQuality.gsm} onChange={(e) => handleFabricChange(index, 'gsm', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none" />
                  </div>
                  <div>
                    <input type="text" placeholder="Fit (e.g. Oversized)" value={variant.fabricQuality.fit} onChange={(e) => handleFabricChange(index, 'fit', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none" />
                  </div>
                  <div>
                    <input type="text" placeholder="Fabric Type (e.g. French Terry)" value={variant.fabricQuality.fabricType} onChange={(e) => handleFabricChange(index, 'fabricType', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none" />
                  </div>
                  <div>
                    <input type="text" placeholder="Pattern (e.g. Solid)" value={variant.fabricQuality.pattern} onChange={(e) => handleFabricChange(index, 'pattern', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none" />
                  </div>
                  <div>
                    <input type="text" placeholder="Sleeve (e.g. Half Sleeve)" value={variant.fabricQuality.sleeveType} onChange={(e) => handleFabricChange(index, 'sleeveType', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none" />
                  </div>
                </div>

                {/* Dynamic Sizes & Stock */}
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500">Sizes & Stock</h5>
                  <button type="button" onClick={() => addSize(index)} className="text-xs font-bold text-black uppercase tracking-widest hover:underline flex items-center gap-1">
                    <Plus size={12}/> Add Size
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded p-4 mb-8 space-y-3">
                  {variant.sizes.length === 0 && <p className="text-xs text-gray-400 text-center py-2">No sizes added. Click "Add Size" to begin.</p>}
                  {variant.sizes.map((sizeObj, sIndex) => (
                    <div key={sIndex} className="flex items-center gap-4">
                      <input 
                        type="text" 
                        placeholder="Size (S, M, L, 32, etc.)" 
                        value={sizeObj.name} 
                        onChange={(e) => handleSizeChange(index, sIndex, 'name', e.target.value)} 
                        className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none" 
                      />
                      <input 
                        type="number" 
                        min="0"
                        placeholder="Stock Quantity" 
                        value={sizeObj.stock} 
                        onChange={(e) => handleSizeChange(index, sIndex, 'stock', e.target.value)} 
                        className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none" 
                      />
                      <button type="button" onClick={() => removeSize(index, sIndex)} className="text-red-500 hover:text-red-700">
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Variant Images */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Variant-specific Images</h5>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={(e) => handleVariantImageChange(index, e)} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-black hover:file:bg-gray-200 transition-colors"
                  />
                  {variant.imagePreviews && variant.imagePreviews.length > 0 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto bg-white p-2 border border-gray-100 rounded">
                      {variant.imagePreviews.map((preview, pIndex) => (
                        <img key={pIndex} src={preview} alt="preview" className="w-16 h-16 object-cover rounded border border-gray-200" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button 
            type="submit"
            disabled={isSaving}
            className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={18} />}
            {isSaving ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
