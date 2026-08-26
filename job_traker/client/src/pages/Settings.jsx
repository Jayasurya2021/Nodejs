import React from 'react';
import { Settings as SettingsIcon, Sun, Moon, Database, Shield, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
          <SettingsIcon className="w-4 h-4" /> Preferences
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your theme, local preferences, and API configuration
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-indigo-500" />
            Appearance & Theme
          </h2>

          <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Interface Mode
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Currently using <span className="font-bold capitalize">{theme} Mode</span>
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" /> Switch to Light
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" /> Switch to Dark
                </>
              )}
            </button>
          </div>
        </div>

        {/* System & API info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-emerald-500" />
            Backend API Configuration
          </h2>

          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Backend Endpoint</span>
              <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-indigo-600 dark:text-indigo-400">
                http://localhost:5000/api
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold">Database Engine</span>
              <span>MongoDB via Mongoose ODM</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold">Version</span>
              <span>v1.0.0 (Full-Stack SaaS)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
