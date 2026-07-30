import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ExternalLink, Search, Filter, Download, ArrowRight, XCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { withCredentials: true };
        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        toast.error('Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDownloadInvoice = (order) => {
    const invoiceHtml = `
      <html>
        <head>
          <title>Invoice - ${order._id}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 40px; }
            .logo { font-size: 24px; font-weight: 900; letter-spacing: 2px; }
            .invoice-title { font-size: 24px; color: #666; }
            .details { display: flex; justify-content: space-between; margin-top: 40px; }
            .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #999; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 40px; }
            th { text-align: left; padding: 12px; border-bottom: 1px solid #ddd; font-size: 12px; text-transform: uppercase; color: #666; }
            td { padding: 12px; border-bottom: 1px solid #eee; font-size: 14px; }
            .totals { margin-top: 40px; text-align: right; }
            .totals p { margin: 5px 0; font-size: 14px; }
            .totals .grand-total { font-size: 18px; font-weight: bold; margin-top: 10px; border-top: 2px solid #000; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">LUXE.</div>
            <div class="invoice-title">INVOICE</div>
          </div>
          
          <div class="details">
            <div>
              <div class="section-title">Bill To:</div>
              <p style="margin:0">${order.shippingAddress?.fullName || 'Customer'}</p>
              <p style="margin:0">${order.shippingAddress?.street || ''}</p>
              <p style="margin:0">${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} ${order.shippingAddress?.postalCode || ''}</p>
              <p style="margin:0">${order.shippingAddress?.country || ''}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin:0"><span class="section-title">Order ID:</span> ${order._id}</p>
              <p style="margin:0"><span class="section-title">Date:</span> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p style="margin:0"><span class="section-title">Status:</span> ${order.isPaid ? 'Paid' : 'Pending'}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th style="text-align: right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.orderItems.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.qty}</td>
                  <td>₹${item.price.toFixed(2)}</td>
                  <td style="text-align: right">₹${(item.qty * item.price).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals">
            <p><span class="section-title">Subtotal:</span> ₹${order.itemsPrice.toFixed(2)}</p>
            <p><span class="section-title">Shipping:</span> ₹${order.shippingPrice.toFixed(2)}</p>
            <p><span class="section-title">Tax:</span> ₹${order.taxPrice.toFixed(2)}</p>
            <p class="grand-total"><span class="section-title" style="color:#000">Total:</span> ₹${order.totalPrice.toFixed(2)}</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(invoiceHtml);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        // Optional: printWindow.close(); after printing
      }, 250);
    } else {
      toast.error('Please allow popups for this site to print invoices.');
    }
  };

  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse h-40 bg-gray-100 rounded-xl w-full" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-24 bg-white border border-gray-100 rounded-xl shadow-sm">
        <Package size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold mb-2 tracking-wide">No Orders Yet</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't made your first purchase.</p>
        <Link 
          to="/shop" 
          className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors inline-flex items-center gap-2 rounded-md"
        >
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search by Order ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:border-black transition-colors bg-gray-50 flex-1 sm:flex-none justify-center">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={order._id}
            className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6 pb-6 border-b border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Order Number</p>
                  <p className="font-mono text-sm font-semibold text-black truncate">{order._id.substring(0, 10)}...</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Date Placed</p>
                  <p className="text-sm font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total Amount</p>
                  <p className="text-sm font-semibold">₹{order.totalPrice.toFixed(2)}</p>
                </div>
                <div>
                  <span className={`inline-flex items-center justify-center px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                    order.orderStatus === 'Delivered' ? 'bg-green-50 text-green-700 border border-green-100' :
                    order.orderStatus === 'Cancelled' ? 'bg-red-50 text-red-700 border border-red-100' :
                    'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    {order.orderStatus || (order.isDelivered ? 'Delivered' : 'Processing')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-[-10px] overflow-hidden w-full md:w-auto">
                {order.orderItems.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="w-14 h-14 rounded-full border-2 border-white overflow-hidden bg-gray-50 shadow-sm -ml-3 first:ml-0 relative z-10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                {order.orderItems.length > 4 && (
                  <div className="w-14 h-14 rounded-full border-2 border-white bg-gray-100 shadow-sm flex items-center justify-center text-xs font-bold text-gray-500 -ml-3 z-0">
                    +{order.orderItems.length - 4}
                  </div>
                )}
                <span className="ml-4 text-sm font-medium text-gray-500">
                  {order.orderItems.length} item{order.orderItems.length !== 1 && 's'}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
                {order.orderStatus !== 'Cancelled' && (
                  <button 
                    onClick={() => handleDownloadInvoice(order)}
                    className="px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Download size={14} /> Invoice
                  </button>
                )}
                {(!order.isDelivered && order.orderStatus !== 'Cancelled') && (
                  <button className="px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors">
                    <XCircle size={14} /> Cancel
                  </button>
                )}
                <Link 
                  to={`/order/${order._id}`} 
                  className="px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  View Details <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredOrders.length === 0 && searchTerm && (
          <div className="text-center py-12 text-gray-500">
            No orders found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTab;
