"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, 
  Search, 
  Image as ImageIcon, 
  Eye, 
  Download, 
  X,
  Upload,
  Trash2,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// UploadBox Component
function UploadBox({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
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
      // Remove extension from title
      const titleWithoutExtension = file.name.split('.').slice(0, -1).join('.');
      formData.append("title", titleWithoutExtension);
      formData.append("description", description);

      const res = await fetch("/api/admin/image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      toast.success("Image uploaded successfully! 🎉", {
        position: "top-right",
        autoClose: 3000,
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      });

      // Reset form
      setFile(null);
      setPreview(null);
      setFileName("");
      setDescription("");
      
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      onUploadSuccess?.(data.image);

    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(`Upload failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        icon: <AlertCircle className="h-5 w-5 text-red-500" />
      });
    } finally {
      setLoading(false);
    }
  };

  const removePreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setFileName("");
    setDescription("");
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Drag & Drop Area */}
      <div
        className={`mb-6 cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? "border-blue-950 bg-blue-50/50"
            : "border-gray-300 hover:border-blue-950 hover:bg-gray-50/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="mb-1 font-sans text-blue-950">Drag & Drop your images here</h4>
          <p className="mb-4 text-sm text-blue-950">or click to browse files</p>
          <p className="text-xs text-blue-950">Supports JPG, PNG, WebP • Max 10MB</p>
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
                <ImageIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="overflow-hidden">
                <p className="max-w-[180px] truncate text-sm font-medium text-gray-800">{fileName}</p>
                <p className="text-xs text-gray-500">Ready to upload</p>
              </div>
            </div>
            <button 
              onClick={removePreview} 
              className="rounded-full p-2 text-gray-500 transition hover:bg-white hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {preview && (
        <div className="mb-6 rounded-xl border border-gray-200">
          <div className="relative aspect-video overflow-hidden bg-gray-100">
            <img src={preview} alt="Preview" className="h-full w-full object-contain" />
            <button 
              onClick={removePreview} 
              className="absolute right-3 top-3 rounded-full bg-white/90 p-2 backdrop-blur-sm transition hover:scale-110"
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mb-6">
        <label className="mb-2 block text-wrap font-sans font-medium text-blue-950">Image Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description about this image..."
          rows={3}
          className="w-full rounded-xl border border-gray-300 p-3 text-sm text-gray-800 placeholder:font-sans focus:border-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!preview || loading}
        className={`w-full cursor-pointer rounded-xl py-3.5 font-medium transition-all duration-300 ${
          preview && !loading
            ? "bg-blue-950 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
            : "cursor-not-allowed bg-blue-950 text-white opacity-50"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading...
          </span>
        ) : (
          "Upload Image"
        )}
      </button>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  
  // Image preview modal states
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  
  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  // Page ready
  useEffect(() => {
    setLoading(false);
    fetchImages();
  }, []);

  // Fetch images function
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin/image");
      const data = await res.json();
      if (res.ok) {
        setImages(data.images || []);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      toast.error("Failed to fetch images", {
        position: "top-right",
        autoClose: 3000,
        icon: <AlertCircle className="h-5 w-5 text-red-500" />
      });
    }
  };

  // Handle view image - shows modal with title and description
  const handleViewImage = (img) => {
    setSelectedImage(img);
    setShowImagePreview(true);
  };

  // Handle delete image
  const handleDeleteClick = (img) => {
    setImageToDelete(img._id);
    setIsDeleteModalOpen(true);
  };

  // Delete images API call
  const deleteImages = async (ids) => {
    try {
      setIsProcessing(true);
      const res = await fetch("/api/admin/image", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      setImages((prev) => prev.filter((img) => !ids.includes(img._id)));
      setSelectedImages([]);
      setIsDeleteModalOpen(false);
      setImageToDelete(null);

      toast.success(`Deleted image${ids.length > 1 ? "s" : ""} successfully`, {
        position: "top-right",
        autoClose: 3000,
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      });
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(error.message || "Delete failed", {
        position: "top-right",
        autoClose: 3000,
        icon: <AlertCircle className="h-5 w-5 text-red-500" />
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle download image
  const handleDownloadImage = async (img) => {
    try {
      const response = await fetch(img.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = img.filename || `image_${img._id || Date.now()}.${img.format || 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Download started!", {
        position: "top-right",
        autoClose: 3000,
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        icon: <AlertCircle className="h-5 w-5 text-red-500" />
      });
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      toast.success("Logged out successfully", {
        position: "top-right",
        autoClose: 2000,
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      });
    } finally {
      setTimeout(() => {
        router.replace("/Login");
      }, 500);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative mx-auto mb-6">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
            <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-100"></div>
          </div>
          <p className="text-lg font-semibold text-gray-700">Loading Dashboard</p>
          <p className="mt-2 text-sm text-gray-500">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <main className="mx-auto mb-10 max-w-7xl">
        {/* Mobile Header with Logout on Top Right */}
        <div className="md:hidden mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-950 to-blue-950 flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-sans font-semibold text-blue-950">Image Management</h1>
              <p className="text-xs text-blue-950">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 p-2.5 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>

        {/* Section 1: Header with Image Management title and Logout button (Desktop) */}
        <div className="hidden md:flex mb-8 items-center justify-between rounded-2xl p-6">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-sans font-semibold text-blue-950">Image Management</h1>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-5 py-3 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Section 2: UploadBox Component */}
        <div className="mb-8">
          <UploadBox onUploadSuccess={fetchImages} />
        </div>

        {/* Section 3: Images Gallery */}
        <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
          {/* Header with Stats and Search */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-sans font-bold text-gray-800">Image Gallery</h2>
                <div className="mt-1 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-700">
                      {images.length} {images.length === 1 ? 'Image' : 'Images'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-950" />
                  <input
                    type="text"
                    placeholder="Search images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:min-w-[280px] rounded-lg text-blue-950 font-sans border border-gray-300 bg-white py-2.5 pl-10 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 md:p-6">
            {/* Images Grid or Empty State */}
            {images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="mb-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100"></div>
                    <ImageIcon className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-blue-400" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">Your gallery is empty</h3>
                <p className="mb-6 max-w-md text-gray-500">
                  Upload your first image to start building your collection.
                </p>
              </div>
            ) : (
              <>
                {/* Grid Layout */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {images
                    .filter(img => 
                      img.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      img.filename?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      img.description?.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((img, index) => (
                      <div
                        key={img._id || index}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                          <img
                            src={img.imageUrl}
                            alt={img.title || img.filename || "Gallery image"}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://via.placeholder.com/400x400/6B7280/FFFFFF?text=Error`;
                            }}
                          />
                          
                          {/* Action Buttons - Top Right */}
                          <div className="absolute right-2 top-2 flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-all duration-300">
                            {/* View Button */}
                            <button
                              onClick={() => handleViewImage(img)}
                              className="rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                              title="View Details"
                            >
                              <Eye className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-700" />
                            </button>
                            
                            {/* Download Button */}
                            <button
                              onClick={() => handleDownloadImage(img)}
                              className="rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                              title="Download Image"
                            >
                              <Download className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-700" />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteClick(img)}
                              className="rounded-full p-2 shadow-md backdrop-blur-sm transition-all hover:scale-110 bg-red-500 hover:bg-red-600 text-white"
                              title="Delete Image"
                            >
                              <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Image Info */}
                        <div className="p-3 md:p-4">
                          <div className="mb-2">
                            <h4 className="truncate text-sm font-semibold text-gray-900">
                              {img.title 
                                ? img.title.split('/').pop().split('.').slice(0, -1).join('.')
                                : (img.filename 
                                    ? img.filename.split('/').pop().split('.').slice(0, -1).join('.')
                                    : `Image ${index + 1}`)
                              }
                            </h4>
                            {img.description && (
                              <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                                {img.description}
                              </p>
                            )}
                          </div>
                          
                          {/* Meta Info */}
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <div className="flex items-center gap-2 md:gap-3">
                              {img.size && (
                                <span className="hidden sm:inline">{img.size}</span>
                              )}
                              {img.format && (
                                <>
                                  <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                                  <span className="uppercase">{img.format}</span>
                                </>
                              )}
                            </div>
                            {img.uploadDate && (
                              <span className="text-xs">
                                {new Date(img.uploadDate).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Search Results Info */}
                {searchQuery && (
                  <div className="mt-6 flex items-center justify-center rounded-lg bg-blue-50 px-4 py-3">
                    <Search className="mr-2 h-4 w-4 font-sans font-semibold text-blue-950" />
                    <span className="text-wrap font-sans font-semibold text-blue-950">
                      Found {images.filter(img => 
                        img.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        img.filename?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        img.description?.toLowerCase().includes(searchQuery.toLowerCase())
                      ).length} images
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Image Preview Modal */}
      {showImagePreview && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-4xl animate-scaleIn rounded-2xl bg-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 md:px-6 py-4">
              <div>
                <h3 className="text-lg md:text-xl font-sans font-semibold text-blue-950">Image Details</h3>
                <p className="text-xs md:text-sm text-blue-950">View and manage image information</p>
              </div>
              <button
                onClick={() => setShowImagePreview(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="max-h-[70vh] overflow-y-auto p-4 md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Image Display */}
                <div className="flex flex-col">
                  <div className="mb-4 flex-1 rounded-lg border border-gray-200 bg-gray-100 p-4 flex items-center justify-center">
                    <img
                      src={selectedImage.imageUrl}
                      alt={selectedImage.title || selectedImage.filename}
                      className="max-h-[300px] w-auto max-w-full rounded-lg object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x400/6B7280/FFFFFF?text=Error`;
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleDownloadImage(selectedImage)}
                    className="flex items-center justify-center gap-2 rounded-lg font-sans bg-blue-950 px-4 py-3 font-medium text-white hover:text-blue-950 hover:bg-white hover:border-gray-300 border transition-all group"
                  >
                    <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                    Download Image
                  </button>
                </div>
                
                {/* Image Details */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h4 className="mb-2 text-lg font-sans font-semibold text-blue-950">Image Information</h4>
                    <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <div>
                        <p className="text-sm font-sans font-medium text-blue-950">Title</p>
                        <p className="text-gray-900 break-words">
                          {selectedImage.title 
                            ? selectedImage.title.split('/').pop().split('.').slice(0, -1).join('.')
                            : (selectedImage.filename 
                                ? selectedImage.filename.split('/').pop().split('.').slice(0, -1).join('.')
                                : "Untitled")
                          }
                        </p>
                      </div>
                      {selectedImage.description && (
                        <div>
                          <p className="text-sm font-sans font-medium text-blue-950">Description</p>
                          <p className="text-gray-900 break-words">{selectedImage.description}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        {selectedImage.format && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Format</p>
                            <p className="text-gray-900 uppercase">{selectedImage.format}</p>
                          </div>
                        )}
                        {selectedImage.size && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Size</p>
                            <p className="text-gray-900">{selectedImage.size}</p>
                          </div>
                        )}
                      </div>
                      {selectedImage.uploadDate && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Upload Date</p>
                          <p className="text-gray-900 text-sm">
                            {new Date(selectedImage.uploadDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="border-t border-gray-200 bg-gray-50 px-4 md:px-6 py-4">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setShowImagePreview(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 font-sans font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scaleIn">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Trash2 size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Confirm Delete
                  </h3>
                  <p className="text-gray-500 text-sm">
                    This action is permanent
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                <p className="text-red-700 font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Warning: This cannot be undone!
                </p>
                <p className="text-red-600 text-sm">
                  You're about to delete this image. All associated data will be permanently removed.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setImageToDelete(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  disabled={isProcessing}
                  onClick={() => deleteImages([imageToDelete])}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Delete Image
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md animate-scaleIn rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <LogOut className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Confirm Logout
              </h3>
              <p className="text-gray-600">
                Are you sure you want to logout?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}