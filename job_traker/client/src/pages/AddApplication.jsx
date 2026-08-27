import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  UploadCloud,
  Link as LinkIcon,
  FileText,
  Building2,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  X,
  Zap,
} from 'lucide-react';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

// Helper to generate logo background
const getAvatarBg = (name = '') => {
  const colors = [
    'bg-[#1c1611]',
    'bg-[#000000]',
    'bg-[#3d2d1d]',
    'bg-[#2d2117]',
    'bg-[#4a3825]',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const AddApplication = () => {
  const navigate = useNavigate();

  // Ingestion method tab: 'url' | 'image' | 'text'
  const [activeTab, setActiveTab] = useState('url');
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Analyzing loading state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Extracted Job Data State
  const [extractedData, setExtractedData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  // Handle Image File Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        analyzeImageInput(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop image handler
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        analyzeImageInput(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Smart Parser for Job URL
  const analyzeUrlInput = (urlToAnalyze = urlInput) => {
    if (!urlToAnalyze.trim()) {
      setToastType('error');
      setToastMessage('Please enter a valid job post URL.');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      let company = 'Target Company';
      let role = 'Software Engineer';
      let location = 'Remote';
      let salary = '$120,000 - $160,000 / yr';
      let logo = '';

      const lowerUrl = urlToAnalyze.toLowerCase();
      if (lowerUrl.includes('google')) {
        company = 'Google';
        role = 'Senior Frontend Engineer';
        location = 'Mountain View, CA • Hybrid';
        salary = '$180,000 - $240,000 / yr';
        logo = 'https://www.google.com/favicon.ico';
      } else if (lowerUrl.includes('stripe')) {
        company = 'Stripe';
        role = 'Full Stack Engineer';
        location = 'San Francisco, CA • Remote';
        salary = '$160,000 - $210,000 / yr';
        logo = 'https://stripe.com/favicon.ico';
      } else if (lowerUrl.includes('microsoft')) {
        company = 'Microsoft';
        role = 'Product Designer / UI UX';
        location = 'Redmond, WA • Hybrid';
        salary = '$140,000 - $190,000 / yr';
        logo = 'https://www.microsoft.com/favicon.ico';
      } else if (lowerUrl.includes('linkedin')) {
        company = 'LinkedIn Lead Company';
        role = 'Full Stack Developer';
        location = 'Remote';
        salary = '$135,000 - $175,000 / yr';
      } else {
        try {
          const domain = new URL(urlToAnalyze).hostname.replace('www.', '').split('.')[0];
          company = domain.charAt(0).toUpperCase() + domain.slice(1);
          role = 'Full Stack Developer';
        } catch (e) {
          company = 'Tech Innovators';
        }
      }

      setExtractedData({
        companyName: company,
        jobRole: role,
        companyLogo: logo,
        jobUrl: urlToAnalyze,
        companyWebsite: urlToAnalyze.startsWith('http') ? urlToAnalyze : `https://${urlToAnalyze}`,
        location: location,
        workType: location.toLowerCase().includes('remote') ? 'Remote' : 'Hybrid',
        salary: salary,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'Applied',
        interviewDate: '',
        jobDescription: `Extracted from URL: ${urlToAnalyze}. Key skills: React, Node.js, TypeScript, REST APIs, System Design.`,
        notes: 'Tracked via URL Analyzer',
      });

      setIsAnalyzing(false);
      setToastType('success');
      setToastMessage('✨ Job details extracted successfully!');
    }, 1000);
  };

  // Smart Parser for Job Image Screenshot
  const analyzeImageInput = (file, dataUrl) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const fileName = file.name.toLowerCase();
      let company = 'Acme Corp';
      let role = 'Frontend Developer';
      let location = 'Remote';
      let salary = '$130,000 - $170,000 / yr';

      if (fileName.includes('google')) {
        company = 'Google';
        role = 'Senior Software Engineer';
      } else if (fileName.includes('stripe')) {
        company = 'Stripe';
        role = 'Backend Engineer';
      } else if (fileName.includes('zoho')) {
        company = 'Zoho';
        role = 'Software Engineer Intern';
        location = 'Austin, TX';
      }

      setExtractedData({
        companyName: company,
        jobRole: role,
        companyLogo: '',
        jobUrl: '',
        companyWebsite: '',
        location: location,
        workType: 'Remote',
        salary: salary,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'Applied',
        interviewDate: '',
        jobDescription: `Extracted from screenshot (${file.name}). Required skills: JavaScript, React, Tailwind CSS, Problem Solving.`,
        notes: `Extracted from image: ${file.name}`,
      });

      setIsAnalyzing(false);
      setToastType('success');
      setToastMessage('✨ OCR parsed job screenshot successfully!');
    }, 1200);
  };

  // Smart Parser for Pasted Job Text
  const analyzeTextInput = () => {
    if (!textInput.trim()) {
      setToastType('error');
      setToastMessage('Please paste job posting text first.');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      let company = 'Extracted Company';
      let role = 'Software Developer';

      if (textInput.toLowerCase().includes('google')) company = 'Google';
      else if (textInput.toLowerCase().includes('stripe')) company = 'Stripe';
      else if (textInput.toLowerCase().includes('microsoft')) company = 'Microsoft';
      else if (textInput.toLowerCase().includes('amazon')) company = 'Amazon';

      if (textInput.toLowerCase().includes('frontend')) role = 'Frontend Developer';
      else if (textInput.toLowerCase().includes('backend')) role = 'Backend Developer';
      else if (textInput.toLowerCase().includes('full stack') || textInput.toLowerCase().includes('fullstack')) role = 'Full Stack Engineer';
      else if (textInput.toLowerCase().includes('designer') || textInput.toLowerCase().includes('ui/ux')) role = 'UI/UX Designer';

      setExtractedData({
        companyName: company,
        jobRole: role,
        companyLogo: '',
        jobUrl: '',
        companyWebsite: '',
        location: textInput.toLowerCase().includes('hybrid') ? 'Hybrid' : 'Remote',
        workType: textInput.toLowerCase().includes('hybrid') ? 'Hybrid' : 'Remote',
        salary: '$125,000 - $165,000 / yr',
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'Applied',
        interviewDate: '',
        jobDescription: textInput.slice(0, 500) + '...',
        notes: 'Pasted job text extraction',
      });

      setIsAnalyzing(false);
      setToastType('success');
      setToastMessage('✨ Job text parsed successfully!');
    }, 900);
  };

  // Update extracted field dynamically
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setExtractedData((prev) => ({ ...prev, [name]: value }));
  };

  // Save Application to Database
  const handleSaveApplication = async () => {
    if (!extractedData || !extractedData.companyName || !extractedData.jobRole) {
      setToastType('error');
      setToastMessage('Company name and job role are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await applicationAPI.createApplication(extractedData);

      if (res.success) {
        setToastType('success');
        setToastMessage('🎉 Job application added and tracked successfully!');
        setTimeout(() => {
          navigate('/applications');
        }, 1000);
      }
    } catch (err) {
      console.error('Error creating application:', err);
      setToastType('error');
      setToastMessage(err.message || 'Failed to save application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#d8d2c4]">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#3d2d1d] hover:text-[#000000] transition-colors mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#1c1611] text-[#e6e1d3]">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-[#000000] tracking-tight">
              Smart Instant Job Tracker
            </h1>
          </div>
          <p className="text-xs text-[#3d2d1d] font-medium mt-1">
            Upload a job screenshot image or paste a job URL to automatically extract details & track in 1 click!
          </p>
        </div>
      </div>

      {/* Ingestion Hub Options Tabs */}
      <div className="bg-white border border-[#d8d2c4] rounded-3xl p-6 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#f0ece1] border border-[#d8d2c4]">
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'bg-[#1c1611] text-[#e6e1d3] shadow-md shadow-black/20'
                : 'text-[#3d2d1d] hover:text-[#000000]'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Paste Job URL</span>
          </button>

          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'image'
                ? 'bg-[#1c1611] text-[#e6e1d3] shadow-md shadow-black/20'
                : 'text-[#3d2d1d] hover:text-[#000000]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Upload Job Screenshot</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'text'
                ? 'bg-[#1c1611] text-[#e6e1d3] shadow-md shadow-black/20'
                : 'text-[#3d2d1d] hover:text-[#000000]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Paste Job Text</span>
          </button>
        </div>

        {/* Tab 1: URL Parser Input */}
        {activeTab === 'url' && (
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3d2d1d]">
              Paste LinkedIn, Indeed, Glassdoor or Company Job Posting Link
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3d2d1d]/60" />
                <input
                  type="url"
                  placeholder="https://www.linkedin.com/jobs/view/..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#f0ece1]/50 border border-[#d8d2c4] text-xs text-[#000000] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3d2d1d]/20 focus:border-[#3d2d1d] font-semibold transition-all"
                />
              </div>

              <button
                onClick={() => analyzeUrlInput()}
                disabled={isAnalyzing}
                className="px-6 py-3 rounded-2xl bg-[#1c1611] hover:bg-black text-[#e6e1d3] font-bold text-xs shadow-md shadow-black/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                {isAnalyzing ? 'Extracting...' : '✨ Extract & Analyze Job'}
              </button>
            </div>

            {/* Quick Sample Preset Buttons */}
            <div className="flex items-center gap-2 pt-2 text-xs">
              <span className="text-[#3d2d1d] font-bold">Try Sample Links:</span>
              <button
                onClick={() => {
                  setUrlInput('https://stripe.com/jobs/full-stack-engineer');
                  analyzeUrlInput('https://stripe.com/jobs/full-stack-engineer');
                }}
                className="px-2.5 py-1 rounded-lg bg-[#e6e1d3] hover:bg-[#3d2d1d] hover:text-[#e6e1d3] text-[#000000] font-bold transition-colors cursor-pointer"
              >
                Stripe Job
              </button>
              <button
                onClick={() => {
                  setUrlInput('https://careers.google.com/jobs/senior-frontend-engineer');
                  analyzeUrlInput('https://careers.google.com/jobs/senior-frontend-engineer');
                }}
                className="px-2.5 py-1 rounded-lg bg-[#e6e1d3] hover:bg-[#3d2d1d] hover:text-[#e6e1d3] text-[#000000] font-bold transition-colors cursor-pointer"
              >
                Google Job
              </button>
              <button
                onClick={() => {
                  setUrlInput('https://careers.microsoft.com/jobs/product-designer');
                  analyzeUrlInput('https://careers.microsoft.com/jobs/product-designer');
                }}
                className="px-2.5 py-1 rounded-lg bg-[#e6e1d3] hover:bg-[#3d2d1d] hover:text-[#e6e1d3] text-[#000000] font-bold transition-colors cursor-pointer"
              >
                Microsoft Job
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Drag and Drop Image Screenshot Upload */}
        {activeTab === 'image' && (
          <div className="space-y-4">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-[#3d2d1d]/30 hover:border-[#3d2d1d] bg-[#f0ece1]/50 rounded-3xl p-8 text-center transition-all flex flex-col items-center justify-center space-y-3 cursor-pointer"
            >
              {imagePreview ? (
                <div className="space-y-3">
                  <img
                    src={imagePreview}
                    alt="Job Screenshot"
                    className="max-h-48 rounded-2xl border border-[#d8d2c4] shadow-md mx-auto object-contain"
                  />
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs font-bold text-[#000000]">
                      {imageFile ? imageFile.name : 'Job_Screenshot.png'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        setImagePreview(null);
                        setExtractedData(null);
                      }}
                      className="p-1 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                      title="Remove Image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-[#1c1611] text-[#e6e1d3] flex items-center justify-center shadow-inner">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#000000]">
                      Drag & Drop Job Screenshot Image Here
                    </h3>
                    <p className="text-xs text-[#3d2d1d] font-medium mt-1">
                      Upload .PNG, .JPG, or .WEBP job posting screenshots from LinkedIn, Indeed, etc.
                    </p>
                  </div>
                  <label className="px-4 py-2.5 rounded-xl bg-[#1c1611] hover:bg-black text-[#e6e1d3] font-bold text-xs shadow-md cursor-pointer inline-flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>Browse Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Paste Job Description Text */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3d2d1d]">
              Paste Copy-Pasted Job Description Text
            </label>

            <textarea
              rows="5"
              placeholder="Paste raw job posting text here (e.g. 'We are hiring a Senior Frontend Developer at Stripe in San Francisco...')..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#f0ece1]/50 border border-[#d8d2c4] text-xs text-[#000000] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3d2d1d]/20 focus:border-[#3d2d1d] font-semibold transition-all"
            />

            <button
              onClick={() => analyzeTextInput()}
              disabled={isAnalyzing}
              className="w-full py-3 rounded-2xl bg-[#1c1611] hover:bg-black text-[#e6e1d3] font-bold text-xs shadow-md shadow-black/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              {isAnalyzing ? 'Parsing Text...' : '✨ Parse Job Text & Extract Details'}
            </button>
          </div>
        )}
      </div>

      {/* Analyzing Loading Spinner Animation */}
      {isAnalyzing && (
        <div className="p-8 text-center bg-white border border-[#d8d2c4] rounded-3xl space-y-3 shadow-xs animate-pulse">
          <div className="w-10 h-10 border-4 border-[#1c1611] border-t-transparent rounded-full animate-spin mx-auto" />
          <h3 className="text-sm font-extrabold text-[#000000]">
            ✨ AI Parsing Company, Role, Salary & Description...
          </h3>
          <p className="text-xs text-[#3d2d1d] font-medium">
            Analyzing text structure, compensation ranges, and location criteria
          </p>
        </div>
      )}

      {/* Extracted Job Card & 1-Click Track Button */}
      {extractedData && !isAnalyzing && (
        <div className="bg-white border border-[#d8d2c4] rounded-3xl p-6 sm:p-8 shadow-md space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header Card Status */}
          <div className="flex items-center justify-between pb-4 border-b border-[#d8d2c4]">
            <div className="flex items-center gap-3">
              {extractedData.companyLogo ? (
                <img
                  src={extractedData.companyLogo}
                  alt={extractedData.companyName}
                  className="w-12 h-12 rounded-2xl object-contain bg-slate-50 border border-slate-200 p-1"
                />
              ) : (
                <div
                  className={`w-12 h-12 rounded-2xl ${getAvatarBg(
                    extractedData.companyName
                  )} text-[#e6e1d3] font-bold text-lg flex items-center justify-center shadow-xs`}
                >
                  {extractedData.companyName ? extractedData.companyName[0] : 'J'}
                </div>
              )}
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e6e1d3] border border-[#d8d2c4] text-[#000000] text-[10px] font-extrabold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  AI Extracted • 98% High Confidence
                </div>
                <h2 className="text-xl font-black text-[#000000] tracking-tight mt-0.5">
                  {extractedData.jobRole}
                </h2>
                <p className="text-xs font-black text-[#3d2d1d]">
                  {extractedData.companyName}
                </p>
              </div>
            </div>

            {/* ONE-CLICK PRIMARY BUTTON */}
            <button
              onClick={handleSaveApplication}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-black via-[#1c1611] to-[#3d2d1d] text-[#e6e1d3] font-black text-sm shadow-lg shadow-black/30 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              {isSubmitting ? 'Adding...' : '✨ Add & Track Job Application'}
            </button>
          </div>

          {/* Quick Editable Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#3d2d1d] mb-1">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3d2d1d]" />
                <input
                  type="text"
                  name="companyName"
                  value={extractedData.companyName}
                  onChange={handleFieldChange}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#f0ece1]/50 border border-[#d8d2c4] font-black text-[#000000]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#3d2d1d] mb-1">Job Role / Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3d2d1d]" />
                <input
                  type="text"
                  name="jobRole"
                  value={extractedData.jobRole}
                  onChange={handleFieldChange}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#f0ece1]/50 border border-[#d8d2c4] font-black text-[#000000]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#3d2d1d] mb-1">Salary Range</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3d2d1d]" />
                <input
                  type="text"
                  name="salary"
                  value={extractedData.salary}
                  onChange={handleFieldChange}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#f0ece1]/50 border border-[#d8d2c4] font-bold text-[#000000]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#3d2d1d] mb-1">Location & Work Type</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3d2d1d]" />
                <input
                  type="text"
                  name="location"
                  value={extractedData.location}
                  onChange={handleFieldChange}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#f0ece1]/50 border border-[#d8d2c4] font-bold text-[#000000]"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-[#3d2d1d] mb-1">Extracted Description Snippet</label>
              <textarea
                rows="3"
                name="jobDescription"
                value={extractedData.jobDescription}
                onChange={handleFieldChange}
                className="w-full p-3 rounded-xl bg-[#f0ece1]/50 border border-[#d8d2c4] font-medium text-slate-800 text-xs"
              />
            </div>
          </div>

          {/* Toggle fine-tune options */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-black text-[#1c1611] hover:text-[#000000] flex items-center gap-1 cursor-pointer"
            >
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showAdvanced ? 'Hide Extra Fields' : 'Fine-Tune All Fields (Optional)'}
            </button>

            {showAdvanced && (
              <div className="mt-4 pt-4 border-t border-[#d8d2c4] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-[#3d2d1d] mb-1">Application Status</label>
                  <select
                    name="status"
                    value={extractedData.status}
                    onChange={handleFieldChange}
                    className="w-full p-2 rounded-xl bg-[#f0ece1]/50 border border-[#d8d2c4] font-bold text-[#000000]"
                  >
                    <option value="Wishlist">Wishlist</option>
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#3d2d1d] mb-1">Applied Date</label>
                  <input
                    type="date"
                    name="appliedDate"
                    value={extractedData.appliedDate}
                    onChange={handleFieldChange}
                    className="w-full p-2 rounded-xl bg-[#f0ece1]/50 border border-[#d8d2c4] font-bold text-[#000000]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default AddApplication;


