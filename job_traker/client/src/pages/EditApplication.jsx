import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const res = await applicationAPI.getApplicationById(id);
        if (res.success) {
          setInitialData(res.data);
        }
      } catch (err) {
        console.error('Error fetching application for edit:', err);
        setToastType('error');
        setToastMessage('Failed to load application data.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const res = await applicationAPI.updateApplication(id, formData);

      if (res.success) {
        setToastType('success');
        setToastMessage('Application updated successfully.');
        setTimeout(() => {
          navigate(`/applications/${id}`);
        }, 1000);
      }
    } catch (err) {
      console.error('Error updating application:', err);
      setToastType('error');
      setToastMessage(err.message || 'Failed to update application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#1f3144] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white border border-[#d8cebd] rounded-3xl p-6 sm:p-8 shadow-xs animate-in fade-in duration-300">
      <ApplicationForm
        title="Edit Job Application"
        initialValues={initialData}
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

export default EditApplication;


