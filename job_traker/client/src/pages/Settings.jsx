import React from 'react';
import { Settings as SettingsIcon, Sun, Database, Shield, Monitor, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4a708b] mb-1">
          <SettingsIcon className="w-4 h-4 text-[#1f3144]" /> Preferences
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1f3144] tracking-tight">
          Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#4a708b] font-medium mt-1">
          Manage your theme, local preferences, and API configuration
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <div className="bg-white border border-[#d8cebd] rounded-3xl p-6 shadow-xs">
          <h2 className="text-base font-extrabold text-[#1f3144] flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-[#4a708b]" />
            Appearance & Theme
          </h2>

          <div className="flex items-center justify-between py-3 border-t border-[#d8cebd]/60">
            <div>
              <p className="text-sm font-extrabold text-[#1f3144]">
                Interface Theme Mode
              </p>
              <p className="text-xs font-medium text-[#4a708b] mt-0.5">
                Application is optimized strictly for <span className="font-bold text-[#1f3144] capitalize">Light Sand Slate Theme</span>
              </p>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#f4f0e6] border border-[#d8cebd] text-[#1f3144] font-bold text-xs flex items-center gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Light Theme Active
            </div>
          </div>
        </div>

        {/* System & API info */}
        <div className="bg-white border border-[#d8cebd] rounded-3xl p-6 shadow-xs">
          <h2 className="text-base font-extrabold text-[#1f3144] flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-emerald-600" />
            Backend API Configuration
          </h2>

          <div className="space-y-4 text-xs text-[#4a708b] border-t border-[#d8cebd]/60 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1f3144]">Backend Endpoint</span>
              <span className="font-mono bg-[#f4f0e6] px-2.5 py-1 rounded-lg text-[#1f3144] border border-[#d8cebd] font-semibold">
                http://localhost:5000/api
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1f3144]">Database Engine</span>
              <span className="font-semibold text-[#1f3144]">MongoDB via Mongoose ODM</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1f3144]">Version</span>
              <span className="font-semibold text-[#1f3144]">v1.0.0 (Slate Navy Edition)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;


