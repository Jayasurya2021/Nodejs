import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, clearProduct } from '../../redux/slices/productSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiSave, FiUploadCloud, FiPlus, FiTrash2, FiCpu } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isLoading, isError, message } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '', slug: '', shortDescription: '', description: '',
    price: 0, offerPrice: 0, discount: 0, stock: 0,
    brand: '', category: '', subCategory: '', status: 'active',
    isNewArrival: false, isTrending: false
  });
  
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState(['']);
  const [tags, setTags] = useState(['']);
  const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);
  const [variants, setVariants] = useState([]);
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

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
        price: product.price || 0,
        offerPrice: product.offerPrice || 0,
        discount: product.discount || 0,
        stock: product.stock || 0,
        brand: product.brand || '',
        category: product.category || '',
        subCategory: product.subCategory || '',
        status: product.status || 'active',
        isNewArrival: product.isNewArrival || false,
        isTrending: product.isTrending || false
      });
      setImages(product.images || []);
      setFeatures(product.features?.length ? product.features : ['']);
      setTags(product.tags?.length ? product.tags : ['']);
      setSpecifications(product.specifications?.length ? product.specifications : [{ key: '', value: '' }]);
      setVariants(product.variants || []);
    }
  }, [product, dispatch, id, isError, message]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const uploadFileHandler = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    setUploading(true);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` }, withCredentials: true };
      const { data } = await axios.post('/api/upload', formData, config);
      setImages((prev) => [...prev, ...data.images]);
      toast.success('Images Uploaded');
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` }, withCredentials: true };
      await axios.put(`/api/products/${id}`, {
        ...formData,
        images,
        thumbnail: images[0] || null, // set first image as thumbnail
        features: features.filter(f => f.trim() !== ''),
        tags: tags.filter(t => t.trim() !== ''),
        specifications: specifications.filter(s => s.key.trim() !== '' && s.value.trim() !== ''),
        variants
      }, config);
      toast.success('Product Updated Successfully');
      toast.success('AI Keywords Generated Automatically! 🤖', { icon: '✨' });
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  // Dynamic Array Handlers
  const handleArrayChange = (setter, index, value, field = null) => {
    setter((prev) => {
      const newArr = [...prev];
      if (field) {
        newArr[index][field] = value;
      } else {
        newArr[index] = value;
      }
      return newArr;
    });
  };

  const addArrayItem = (setter, defaultVal) => setter((prev) => [...prev, defaultVal]);
  const removeArrayItem = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));

  if (isLoading && !product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-gray-500 mb-8 transition-colors">
        <FiArrowLeft /> Back to Dashboard
      </button>

      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
            Edit Product
          </h1>
          <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
            <FiCpu className="text-purple-500" /> AI will automatically generate SEO keywords on save.
          </p>
        </div>
        <button
          onClick={submitHandler}
          disabled={saving}
          className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? 'Saving...' : <><FiSave /> Save Product</>}
        </button>
      </div>

      <form onSubmit={submitHandler} className="space-y-12 pb-20">
        
        {/* ─── BASIC INFO ─────────────────────────────────────────── */}
        <section className="bg-gray-50 p-8 border border-gray-100">
          <h2 className="text-lg font-black uppercase tracking-widest mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Product Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Slug (URL) *</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Brand *</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Short Description *</label>
              <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} required className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Full Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows={6} className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none resize-none" />
            </div>
          </div>
        </section>

        {/* ─── PRICING & INVENTORY ─────────────────────────────────────────── */}
        <section className="bg-gray-50 p-8 border border-gray-100">
          <h2 className="text-lg font-black uppercase tracking-widest mb-6">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Regular Price ($) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Discount (%)</label>
              <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Base Stock *</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none" />
            </div>
          </div>
        </section>

        {/* ─── ORGANIZATION ─────────────────────────────────────────── */}
        <section className="bg-gray-50 p-8 border border-gray-100">
          <h2 className="text-lg font-black uppercase tracking-widest mb-6">Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Category *</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Sub Category</label>
              <input type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm focus:border-black outline-none uppercase tracking-widest">
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest cursor-pointer">
                <input type="checkbox" name="isNewArrival" checked={formData.isNewArrival} onChange={handleChange} className="w-4 h-4 accent-black" />
                New Arrival
              </label>
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest cursor-pointer">
                <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="w-4 h-4 accent-black" />
                Trending
              </label>
            </div>
          </div>
        </section>

        {/* ─── IMAGES ─────────────────────────────────────────── */}
        <section className="bg-gray-50 p-8 border border-gray-100">
          <h2 className="text-lg font-black uppercase tracking-widest mb-6">Product Gallery</h2>
          
          <div className="mb-6 flex gap-4 overflow-x-auto pb-4">
            {images.map((img, i) => (
              <div key={i} className="relative group flex-shrink-0 w-32 h-40 border border-gray-200">
                <img src={img.url} alt={`img-${i}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                  className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <FiTrash2 size={12} />
                </button>
                {i === 0 && <span className="absolute bottom-2 left-2 bg-black text-white text-[9px] uppercase tracking-widest px-2 py-1 font-bold">Thumbnail</span>}
              </div>
            ))}
          </div>

          <div className="relative border-2 border-dashed border-gray-300 bg-white p-10 text-center hover:border-black transition-colors cursor-pointer">
            <input type="file" multiple onChange={uploadFileHandler} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="flex flex-col items-center">
              {uploading ? (
                <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FiUploadCloud size={40} className="text-gray-400 mb-3" />
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Click or drag images to upload</p>
                  <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, WEBP (Max 10 files)</p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ─── VARIANTS ─────────────────────────────────────────── */}
        <section className="bg-gray-50 p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black uppercase tracking-widest">Variants (Sizes/Colors)</h2>
            <button type="button" onClick={() => addArrayItem(setVariants, { size: '', color: '', colorCode: '', stock: 0, additionalPrice: 0 })} className="text-xs uppercase tracking-widest font-bold flex items-center gap-1 hover:text-gray-500">
              <FiPlus /> Add Variant
            </button>
          </div>
          
          <div className="space-y-4">
            {variants.map((v, i) => (
              <div key={i} className="flex flex-wrap items-center gap-4 bg-white p-4 border border-gray-200 relative group">
                <input type="text" placeholder="Size (e.g. M, L)" value={v.size} onChange={(e) => handleArrayChange(setVariants, i, e.target.value, 'size')} className="border p-2 text-sm focus:border-black outline-none flex-1 min-w-[100px]" />
                <input type="text" placeholder="Color Name" value={v.color} onChange={(e) => handleArrayChange(setVariants, i, e.target.value, 'color')} className="border p-2 text-sm focus:border-black outline-none flex-1 min-w-[120px]" />
                <input type="color" title="Color Hex" value={v.colorCode || '#000000'} onChange={(e) => handleArrayChange(setVariants, i, e.target.value, 'colorCode')} className="w-10 h-10 border-0 p-0 cursor-pointer" />
                <input type="number" placeholder="Stock" value={v.stock} onChange={(e) => handleArrayChange(setVariants, i, e.target.value, 'stock')} className="border p-2 text-sm focus:border-black outline-none w-24" />
                <input type="number" placeholder="+ Price" value={v.additionalPrice} onChange={(e) => handleArrayChange(setVariants, i, e.target.value, 'additionalPrice')} className="border p-2 text-sm focus:border-black outline-none w-24" />
                <button type="button" onClick={() => removeArrayItem(setVariants, i)} className="text-red-500 p-2 hover:bg-red-50"><FiTrash2 /></button>
              </div>
            ))}
            {variants.length === 0 && <p className="text-sm text-gray-500 italic">No variants added. Product will use base price and stock.</p>}
          </div>
        </section>

        {/* ─── TAGS & FEATURES ─────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black uppercase tracking-widest">Tags</h2>
              <button type="button" onClick={() => addArrayItem(setTags, '')} className="text-xs uppercase tracking-widest font-bold flex items-center gap-1 hover:text-gray-500">
                <FiPlus /> Add Tag
              </button>
            </div>
            <div className="space-y-3">
              {tags.map((tag, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={tag} onChange={(e) => handleArrayChange(setTags, i, e.target.value)} className="w-full border p-2 text-sm focus:border-black outline-none" placeholder="e.g. summer-collection" />
                  <button type="button" onClick={() => removeArrayItem(setTags, i)} className="text-gray-400 hover:text-red-500 px-2"><FiX /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black uppercase tracking-widest">Features</h2>
              <button type="button" onClick={() => addArrayItem(setFeatures, '')} className="text-xs uppercase tracking-widest font-bold flex items-center gap-1 hover:text-gray-500">
                <FiPlus /> Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={feat} onChange={(e) => handleArrayChange(setFeatures, i, e.target.value)} className="w-full border p-2 text-sm focus:border-black outline-none" placeholder="e.g. 100% Organic Cotton" />
                  <button type="button" onClick={() => removeArrayItem(setFeatures, i)} className="text-gray-400 hover:text-red-500 px-2"><FiX /></button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SPECIFICATIONS ─────────────────────────────────────────── */}
        <section className="bg-gray-50 p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black uppercase tracking-widest">Specifications</h2>
            <button type="button" onClick={() => addArrayItem(setSpecifications, { key: '', value: '' })} className="text-xs uppercase tracking-widest font-bold flex items-center gap-1 hover:text-gray-500">
              <FiPlus /> Add Spec
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specifications.map((spec, i) => (
              <div key={i} className="flex gap-2 bg-white p-2 border border-gray-200">
                <input type="text" placeholder="Key (e.g. Material)" value={spec.key} onChange={(e) => handleArrayChange(setSpecifications, i, e.target.value, 'key')} className="w-1/3 border-r p-2 text-sm focus:outline-none" />
                <input type="text" placeholder="Value (e.g. Leather)" value={spec.value} onChange={(e) => handleArrayChange(setSpecifications, i, e.target.value, 'value')} className="w-2/3 p-2 text-sm focus:outline-none" />
                <button type="button" onClick={() => removeArrayItem(setSpecifications, i)} className="text-gray-400 hover:text-red-500 px-2"><FiX /></button>
              </div>
            ))}
          </div>
        </section>

      </form>
    </div>
  );
};

export default ProductEdit;
