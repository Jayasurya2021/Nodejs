import React, { useState } from "react";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Invalid amount";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  return (
    <div className="bg-[#7AB2B2] rounded-4xl p-10 max-w-md w-full shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
      
      <h2 className="text-3xl font-black text-white mb-8 tracking-tight">Add Expense</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#EBF4F6]/80 flex justify-between">
            Amount
            {errors.amount && <span className="text-white bg-red-400 px-2 rounded-full normal-case tracking-normal">{errors.amount}</span>}
          </label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7AB2B2] font-bold">$</span>
             <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-4 bg-[#F8FCFD] text-[#09637E] font-bold rounded-2xl outline-none focus:ring-4 focus:ring-white/20 transition-all placeholder:text-[#C5E1E1]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#EBF4F6]/80 flex justify-between">
            Description
            {errors.description && <span className="text-white bg-red-400 px-2 rounded-full normal-case tracking-normal">{errors.description}</span>}
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What was this for?"
            rows="3"
            className="w-full px-4 py-4 bg-[#F8FCFD] text-[#09637E] font-medium rounded-2xl outline-none focus:ring-4 focus:ring-white/20 transition-all resize-none placeholder:text-[#C5E1E1]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#EBF4F6]/80">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-4 bg-[#F8FCFD] text-[#09637E] font-bold rounded-2xl outline-none focus:ring-4 focus:ring-white/20 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#09637E] text-white font-black py-5 rounded-2xl shadow-lg shadow-[#09637E]/20 hover:bg-[#074F65] active:scale-[0.98] transition-all text-lg tracking-tight mt-4"
        >
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
