// src/components/UploadHero.jsx

import React, { useState, useRef } from "react";

const UploadHero = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Please select a valid image file (JPEG, PNG, DICOM)",
      });
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setMessage({ type: "error", text: "File size must be less than 50MB" });
      return;
    }

    setFile(selectedFile);
    setMessage(null);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: "error", text: "Please select a file first" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Mock upload - replace with your backend URL
      const formData = new FormData();
      formData.append("file", file);

      // Example: const response = await fetch('http://your-backend.com/api/upload', { method: 'POST', body: formData });

      // For now, show success message
      setMessage({
        type: "success",
        text: `✅ File "${file.name}" uploaded successfully! File size: ${(
          file.size / 1024
        ).toFixed(2)} KB`,
      });

      // Reset after 3 seconds
      setTimeout(() => {
        setFile(null);
        setPreview(null);
        setMessage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 3000);
    } catch (error) {
      setMessage({ type: "error", text: `Upload failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("border-cyan-400", "bg-cyan-50");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-cyan-400", "bg-cyan-50");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-cyan-400", "bg-cyan-50");

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      fileInputRef.current.files = droppedFiles;
      handleFileSelect({ target: { files: droppedFiles } });
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Headline and Description Section */}
      <div className="text-center mb-16">
        <span className="inline-block bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-cyan-200">
          ✨ POWERED BY DEEP LEARNING
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
          AI-Powered Spine MRI
          <br />
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Analysis Platform
          </span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Upload your spine MRI scans for instant AI-powered analysis. Our
          advanced deep learning model provides accurate assessments to support
          medical diagnosis and treatment planning.
        </p>
      </div>

      {/* Upload Area Section */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-100">
        {/* Drag and Drop Zone */}
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-cyan-400 transition-colors bg-gradient-to-b from-slate-50 to-white cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {/* Upload Icon */}
          <div className="text-cyan-500 mb-6 p-4 bg-cyan-50 rounded-full">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              ></path>
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {preview ? "File Selected ✓" : "Upload MRI Scan"}
          </h2>
          <p className="mt-2 text-slate-500 text-lg">
            {preview
              ? `Ready to upload: ${file?.name}`
              : "Drag and drop your spine MRI image here, or click to browse"}
          </p>

          {/* Supported Formats */}
          <p className="mt-4 text-sm text-slate-400 font-medium">
            📁 Supports JPEG, PNG, and DICOM formats
          </p>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Preview Section */}
        {preview && (
          <div className="mt-8">
            <div className="rounded-lg overflow-hidden border-2 border-cyan-200 bg-slate-50 p-4">
              <img
                src={preview}
                alt="preview"
                className="w-full h-auto object-contain max-h-64"
              />
            </div>
            <div className="mt-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
              📄 File: <strong>{file?.name}</strong> —{" "}
              {(file?.size / 1024).toFixed(2)} KB
            </div>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-sm font-medium ${
              message.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Action Buttons */}
        {preview && (
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-bold py-3 px-8 rounded-lg transition duration-200 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? "⏳ Uploading..." : "📤 Upload & Analyze"}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
                setMessage(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-3 px-8 rounded-lg transition duration-200 ease-in-out shadow-md"
            >
              ✕ Clear
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadHero;
