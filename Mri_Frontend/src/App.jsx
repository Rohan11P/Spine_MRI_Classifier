// src/App.jsx

import React from "react";
import UploadHero from "./components/UploadHero";
import FeatureCard from "./components/FeatureCard";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 font-sans pb-16">
      {/* --- 1. Header/Navigation Bar --- */}
      <header className="bg-white shadow-md sticky top-0 z-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Title Section */}
            <div className="flex-shrink-0 flex items-center gap-3">
              {/* Simple pulse icon placeholder for SpineCare AI */}
              <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  SpineCare AI
                </span>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Advanced MRI Analysis Platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- 2. Main Content Area --- */}
      <main className="pt-12">
        {/* Upload Hero Section (Title + Upload Box) */}
        <UploadHero />

        {/* --- 3. Feature Cards Section --- */}
        <section className="mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Why Choose SpineCare AI?
            </h2>
            <p className="text-slate-600">
              Industry-leading accuracy and reliability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="⚡ Fast Analysis"
              description="Get instant results from our trained deep learning model"
            />
            <FeatureCard
              title="🎯 High Accuracy"
              description="State-of-the-art neural networks trained on extensive datasets"
            />
            <FeatureCard
              title="🔒 Secure & Private"
              description="Your medical data is processed securely and confidentially"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
