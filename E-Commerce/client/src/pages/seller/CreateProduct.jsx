import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Upload, ArrowLeft, Save } from 'lucide-react';
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
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let uploadedImages = [];
      if (images.length > 0) {
        const uploadData = new FormData();
        images.forEach(img => uploadData.append('images', img));
        const { data } = await axios.post('/api/upload', uploadData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
        uploadedImages = data.images;
      }

      const productPayload = { ...formData, images: uploadedImages };
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Stock</label>
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
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Product Images</label>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm font-bold text-gray-600">Click to upload images</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
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
                    <img key={index} src={preview} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded border border-gray-200" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
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
