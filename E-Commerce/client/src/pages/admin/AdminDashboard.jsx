import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getProducts } from '../../redux/slices/productSlice';
import { FiEdit, FiTrash2, FiPlus, FiBox } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { products, isLoading, isError, message, pages, page } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
      return;
    }
    dispatch(getProducts({ limit: 20 }));
  }, [dispatch, user, navigate]);

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` }, withCredentials: true };
        const { data } = await axios.post('/api/products', {}, config);
        toast.success('Product Created');
        navigate(`/admin/product/${data._id}/edit`);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to create product');
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` }, withCredentials: true };
        await axios.delete(`/api/products/${id}`, config);
        toast.success('Product Deleted');
        dispatch(getProducts({ limit: 20, page: page }));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
            <FiBox /> Product Management
          </h1>
          <p className="text-gray-500 text-sm mt-2">Manage your catalog, stock, and SEO settings</p>
        </div>
        <button
          onClick={createProductHandler}
          className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center gap-2"
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-gray-100 w-full" />)}
        </div>
      ) : isError ? (
        <div className="text-red-500 bg-red-50 p-4 border border-red-200">{message}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 uppercase tracking-widest text-xs font-bold text-gray-500">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{product._id.substring(0, 8)}...</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.thumbnail?.url || product.images?.[0]?.url || 'https://via.placeholder.com/40'} alt={product.title} className="w-10 h-10 object-cover bg-gray-100" />
                      <span className="font-bold truncate max-w-[200px] block">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">${product.price}</td>
                  <td className="px-6 py-4 uppercase tracking-wider text-[10px] font-bold text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 uppercase tracking-wider text-[10px] font-bold text-gray-500">{product.brand}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock > 0 ? product.stock : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${
                      product.status === 'active' ? 'bg-blue-100 text-blue-700' : 
                      product.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {product.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link to={`/admin/product/${product._id}/edit`} className="text-gray-500 hover:text-black transition-colors">
                        <FiEdit size={18} />
                      </Link>
                      <button onClick={() => deleteHandler(product._id)} className="text-gray-500 hover:text-red-600 transition-colors">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {[...Array(pages).keys()].map((x) => (
            <button
              key={x + 1}
              onClick={() => dispatch(getProducts({ limit: 20, page: x + 1 }))}
              className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                x + 1 === page
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'
              }`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
