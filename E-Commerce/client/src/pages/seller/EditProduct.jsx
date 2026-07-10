import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Edit, Upload, ArrowLeft, Save, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
        }
        if (data.variants && data.variants.length > 0) {
          // Initialize variants
          const loadedVariants = data.variants.map(v => ({
            ...v,
            images: [], // We don't load File objects for existing images
            imagePreviews: v.images ? v.images.map(img => img.url) : [],
            existingImages: v.images || [] // Keep track of existing images from DB
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const addVariant = () => {
    setVariants([...variants, { color: '', colorCode: '#000000', size: '', stock: 0, images: [], imagePreviews: [], existingImages: [] }]);
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
    // If they select new images, clear the existingImages so they get overwritten completely
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

      // Upload variant images sequentially
      const processedVariants = [];
      for (const variant of variants) {
        let variantUploadedImages = variant.existingImages || [];
        
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
