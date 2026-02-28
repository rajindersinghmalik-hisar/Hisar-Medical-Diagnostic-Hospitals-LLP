"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function UploadBox({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  // Upload image to Next.js API
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", file.name);
      formData.append("description", description);

      // Call Next.js API route
      const res = await fetch("/api/admin/image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      // Success toast
      toast.success("Image uploaded successfully! 🎉", {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset form
      setFile(null);
      setPreview(null);
      setFileName("");
      setDescription("");
      setUploadProgress(0);

      // Pass uploaded image to parent if needed
      onUploadSuccess?.(data.image);

    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(`Upload failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const removePreview = () => {
    setFile(null);
    setPreview(null);
    setFileName("");
    setUploadProgress(0);
  };

  return (
    <>
      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Upload New Image</h3>
            <p className="mt-1 text-sm text-gray-600">Add images to your gallery</p>
          </div>
        </div>

        {/* Drag & Drop Area */}
        <div
          className={`mb-6 cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-blue-50/50"
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
              <i className="fas fa-cloud-upload-alt text-2xl text-blue-600"></i>
            </div>
            <h4 className="mb-1 font-medium text-gray-800">Drag & Drop your images here</h4>
            <p className="mb-4 text-sm text-gray-600">or click to browse files</p>
            <p className="text-xs text-gray-500">Supports JPG, PNG, GIF • Max 10MB</p>
          </div>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* Preview & Info */} 
        {fileName && (
          <div className="mb-4 rounded-lg bg-blue-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <i className="fas fa-image text-blue-600"></i>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-800 truncate max-w-[180px]">{fileName}</p>
                  <p className="text-xs text-gray-500">Ready to upload</p>
                </div>
              </div>
              <button onClick={removePreview} className="rounded-full p-2 text-gray-500 hover:bg-white hover:text-gray-700 transition">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {preview && (
          <div className="mb-6 rounded-xl border border-gray-200">
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              <button onClick={removePreview} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 backdrop-blur-sm hover:scale-110 transition">
                <i className="fas fa-times text-gray-700"></i>
              </button>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">Image Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description about this image..."
            rows={3}
            className="w-full rounded-xl border border-gray-300 p-3 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!preview || loading}
          className={`w-full cursor-pointer rounded-xl py-3.5 font-medium transition-all duration-300 ${
            preview && !loading
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
              : "cursor-not-allowed bg-gray-100 text-gray-400"
          }`}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </>
  );
}
