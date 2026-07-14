import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Plus, Edit2, Trash2, Box } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const fetchProducts = async () => {
    try {
      const config = { withCredentials: true };
      const { data } = await axios.get('/api/seller/products', config);
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  const deleteProductHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { withCredentials: true };
        await axios.delete(`/api/products/${id}`, config);
        toast.success('Product deleted');
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
            <Box /> Manage Products
          </h1>
          <p className="text-gray-500 mt-2">View, edit, and track the approval status of your products.</p>
        </div>
        <Link 
          to="/seller/product/new"
          className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-16 bg-gray-100 rounded-lg w-full" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 border border-gray-100 rounded-lg">
          <Box size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">No Products Yet</h2>
          <p className="text-gray-500 mb-6">Start selling by adding your first product.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 uppercase tracking-widest text-xs font-bold text-gray-500">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.thumbnail?.url || product.images?.[0]?.url || 'https://via.placeholder.com/40'} alt={product.title} className="w-10 h-10 object-cover bg-gray-100 rounded" />
                      <span className="font-bold truncate max-w-[200px] block">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">₹{(product.variants?.[0]?.price || 0).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${(product.variants?.[0]?.stock || 0) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {(product.variants?.[0]?.stock || 0) > 0 ? product.variants[0].stock : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${
                      product.status === 'approved' ? 'bg-green-100 text-green-700' : 
                      product.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link to={`/seller/product/${product._id}/edit`} className="text-gray-500 hover:text-black transition-colors" title="Edit">
                        <Edit2 size={18} />
                      </Link>
                      <button onClick={() => deleteProductHandler(product._id)} className="text-gray-500 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
