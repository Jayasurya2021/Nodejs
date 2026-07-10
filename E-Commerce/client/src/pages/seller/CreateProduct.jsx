import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Upload, ArrowLeft, Save, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
    brand: '',
    stock: 0,
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [variants, setVariants] = useState([]);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));

    if (files.length > 0) {
      setIsAnalyzing(true);
      const toastId = toast.loading('AI is analyzing product colors...');
      try {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        const { data } = await axios.post('/api/vision/detect-colors', formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (data.variants && data.variants.length > 0) {
          let lowConfidenceCount = 0;
          
          setVariants(prevVariants => {
            let updatedVariants = [...prevVariants];
            
            data.variants.forEach(aiVariant => {
              if (aiVariant.confidence < 80) {
                lowConfidenceCount++;
                return;
              }

              const variantFiles = files.filter(f => aiVariant.images.includes(f.name));
              const variantPreviews = variantFiles.map(f => URL.createObjectURL(f));

              const existingIndex = updatedVariants.findIndex(
                v => v.color.toLowerCase() === aiVariant.colorName.toLowerCase()
              );

              if (existingIndex >= 0) {
                updatedVariants[existingIndex].images = [...(updatedVariants[existingIndex].images || []), ...variantFiles];
                updatedVariants[existingIndex].imagePreviews = [...(updatedVariants[existingIndex].imagePreviews || []), ...variantPreviews];
              } else {
                updatedVariants.push({
                  color: aiVariant.colorName,
                  colorCode: aiVariant.colorHex,
                  size: '',
                  stock: 0,
                  images: variantFiles,
                  imagePreviews: variantPreviews
                });
              }
            });
            return updatedVariants;
          });

          toast.success('Variants automatically generated!', { id: toastId });
          if (lowConfidenceCount > 0) {
            toast.error('Unable to detect the product color confidently. Please select the color manually.', { duration: 5000 });
          }
        } else {
          toast.dismiss(toastId);
        }
      } catch (error) {
        toast.error('Failed to analyze images automatically.', { id: toastId });
        console.error(error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const addVariant = () => {
    setVariants([...variants, { color: '', colorCode: '#000000', size: '', stock: 0, images: [], imagePreviews: [] }]);
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

  const handleVariantImageChange = (index, e) => {
    const files = Array.from(e.target.files);
    const newVariants = [...variants];
    newVariants[index].images = files;
    newVariants[index].imagePreviews = files.map(file => URL.createObjectURL(file));
    setVariants(newVariants);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Upload main product images
      let uploadedImages = [];
      if (images.length > 0) {
        const uploadData = new FormData();
        images.forEach(img => uploadData.append('images', img));
        const { data } = await axios.post('/api/upload', uploadData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
        uploadedImages = data.images;
      }

      // 2. Upload variant images sequentially
      const processedVariants = [];
      for (const variant of variants) {
        let variantUploadedImages = [];
        if (variant.images && variant.images.length > 0) {
          const vData = new FormData();
          variant.images.forEach(img => vData.append('images', img));
          const { data } = await axios.post('/api/upload', vData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
          variantUploadedImages = data.images;
        }
        processedVariants.push({
          color: variant.color,
          colorCode: variant.colorCode,
          size: variant.size,
          stock: Number(variant.stock),
          images: variantUploadedImages
        });
      }

      const productPayload = { ...formData, images: uploadedImages, variants: processedVariants };
      
      const config = { withCredentials: true };
      await axios.post('/api/products', productPayload, config);
      toast.success('Product created successfully! Pending admin approval.');
      navigate('/seller/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-8">
        <Link to="/seller/products" className="text-gray-500 hover:text-black flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Products
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
          <Box /> Create New Product
        </h1>
        <p className="text-gray-500 mt-2">Add a new product to your store. It will be reviewed by an admin.</p>
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
                placeholder="e.g. Premium Cotton T-Shirt"
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
                  placeholder="e.g. Clothing"
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
                  placeholder="e.g. Nike"
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
                placeholder="Product description..."
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Main Product Images (Default)</label>
              <div 
                onClick={() => !isAnalyzing && fileInputRef.current.click()}
                className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}
              >
                {isAnalyzing ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                ) : (
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                )}
                <p className="text-sm font-bold text-gray-600">
                  {isAnalyzing ? 'Analyzing colors...' : 'Click to upload main images'}
                </p>
              </div>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
              />
              {imagePreviews.length > 0 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {imagePreviews.map((preview, index) => (
                    <img key={index} src={preview} alt={`Preview ${index}`} className="w-16 h-16 object-cover rounded border border-gray-200" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Variations Section */}
        <div className="border-t border-gray-100 pt-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest">Product Variations</h3>
              <p className="text-xs text-gray-500 mt-1">Add specific colors, sizes, and images for those variants.</p>
            </div>
            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded"
            >
              <Plus size={14} /> Add Variant
            </button>
          </div>

          <div className="space-y-6">
            {variants.map((variant, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 relative">
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
                <h4 className="text-sm font-bold mb-4">Variant #{index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Color Name</label>
                    <input 
                      type="text" 
                      value={variant.color}
                      onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                      placeholder="e.g. Black"
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
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Size</label>
                    <input 
                      type="text" 
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                      placeholder="e.g. M"
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Variant Stock</label>
                    <input 
                      type="number"
                      min="0"
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-black outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Variant-specific Images</label>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={(e) => handleVariantImageChange(index, e)} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-black hover:file:bg-gray-200 transition-colors"
                  />
                  {variant.imagePreviews && variant.imagePreviews.length > 0 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {variant.imagePreviews.map((preview, pIndex) => (
                        <img key={pIndex} src={preview} alt="preview" className="w-12 h-12 object-cover rounded border border-gray-200" />
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
            disabled={isLoading}
            className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={18} />}
            {isLoading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
