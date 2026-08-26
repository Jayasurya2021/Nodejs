import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

const AddApplication = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await applicationAPI.createApplication(formData);

      if (response.success) {
        setToastType('success');
        setToastMessage('Application added successfully.');
        
        // Wait briefly so user sees the toast notification, then redirect
        setTimeout(() => {
          navigate('/applications');
        }, 1200);
      }
    } catch (err) {
      console.error('Error adding application:', err);
      setToastType('error');
      setToastMessage(err.message || 'Failed to create job application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors animate-in fade-in duration-300">
      <ApplicationForm
        title="Add Job Application"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default AddApplication;
