import React from 'react';
import { Settings as SettingsIcon, Sun, Database, Shield, Monitor, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          <SettingsIcon className="w-4 h-4 text-indigo-600" /> Preferences
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Manage your theme, local preferences, and API configuration
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-indigo-600" />
            Appearance & Theme
          </h2>

          <div className="flex items-center justify-between py-3 border-t border-slate-100">
            <div>
              <p className="text-sm font-extrabold text-slate-800">
                Interface Theme Mode
              </p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Application is optimized strictly for <span className="font-bold text-indigo-600 capitalize">Light Mode</span>
              </p>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Light Theme Active
            </div>
          </div>
        </div>

        {/* System & API info */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-emerald-600" />
            Backend API Configuration
          </h2>

          <div className="space-y-4 text-xs text-slate-600 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Backend Endpoint</span>
              <span className="font-mono bg-slate-100 px-2.5 py-1 rounded-lg text-indigo-700 border border-slate-200 font-semibold">
                http://localhost:5000/api
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Database Engine</span>
              <span className="font-semibold text-slate-800">MongoDB via Mongoose ODM</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Version</span>
              <span className="font-semibold text-slate-800">v1.0.0 (Light Edition)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

