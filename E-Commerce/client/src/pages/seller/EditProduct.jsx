import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Edit, Upload, ArrowLeft, Save } from 'lucide-react';
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

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` }, withCredentials: true };
      await axios.put(`/api/products/${id}`, formData, config);
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
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Product Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm font-bold text-gray-600">Click to update images</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
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
