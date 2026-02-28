"use client";

import { useEffect, useState } from "react";
import UploadBox from "./UploadBox";
import {
  Trash2,
  Check,
  X,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Loader2,
  Eye,
  Shield,
  MoreVertical,
  Grid,
  List,
  Filter,
  Download,
  Share2,
} from "lucide-react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [previewImage, setPreviewImage] = useState(null);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  /* ================= NOTIFICATION ================= */
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "success" }),
      4000
    );
  };

  /* ================= FETCH IMAGES ================= */
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/image");
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch images");
      setImages(data.images || []);
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /* ================= SELECT ================= */
  const toggleSelect = (id) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(images.map((img) => img._id));
    }
  };

  /* ================= DELETE ================= */
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

      showNotification(
        `Deleted ${ids.length} image${ids.length > 1 ? "s" : ""} successfully`
      );
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  /* ================= PREVIEW ================= */
  const openPreview = (img) => {
    setPreviewImage(img);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      {/* NOTIFICATION */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 md:top-6 md:right-6 px-5 py-3 rounded-xl shadow-xl backdrop-blur-sm flex items-center gap-3 z-50 border animate-slideIn
          ${
            notification.type === "success"
              ? "bg-green-50/95 border-green-200 text-green-800"
              : "bg-red-50/95 border-red-200 text-red-800"
          }`}
        >
          <div className="p-1.5 rounded-full bg-white shadow-sm">
            {notification.type === "success" ? (
              <CheckCircle size={18} className="text-green-500" />
            ) : (
              <AlertCircle size={18} className="text-red-500" />
            )}
          </div>
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification({ show: false })}
            className="ml-2 p-1 hover:bg-white/50 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                <ImageIcon size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Image Gallery
              </h1>
            </div>
            <p className="text-gray-500">
              Manage and organize your visual assets
              {images.length > 0 && ` • ${images.length} images`}
            </p>
          </div>

          {/* VIEW CONTROLS */}
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* UPLOAD SECTION */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Upload New Images
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield size={14} />
              <span>Supports JPG, PNG, WebP up to 10MB</span>
            </div>
          </div>
          <UploadBox
            onUploadSuccess={(img) => setImages((prev) => [img, ...prev])}
            onUploadComplete={fetchImages}
          />
        </div>

        {/* SELECTION BAR */}
        {selectedImages.length > 0 && (
          <div className="sticky top-4 mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg z-30 animate-slideIn">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Check size={20} />
                </div>
                <div>
                  <p className="font-semibold">{selectedImages.length} selected</p>
                  <p className="text-blue-100 text-sm opacity-90">
                    Click images to select/deselect
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={selectAll}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors backdrop-blur-sm"
                >
                  {selectedImages.length === images.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-md"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-600 font-medium">Loading your gallery...</p>
            <p className="text-gray-400 text-sm mt-2">
              Please wait while we fetch your images
            </p>
          </div>
        ) : images.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <ImageIcon size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Gallery is Empty
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Upload your first image to get started. Supported formats include
              JPG, PNG, and WebP.
            </p>
            <div className="inline-block">
              <UploadBox
                onUploadSuccess={(img) => setImages((prev) => [img, ...prev])}
                compact
              />
            </div>
          </div>
        ) : (
          <>
            {/* GRID VIEW */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {images.map((img) => (
                  <div
                    key={img._id}
                    className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border ${
                      selectedImages.includes(img._id)
                        ? "border-blue-500 ring-2 ring-blue-300 ring-offset-2"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {/* SELECT CHECKBOX */}
                    <button
                      onClick={() => toggleSelect(img._id)}
                      className={`absolute top-3 left-3 z-10 w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        selectedImages.includes(img._id)
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white/90 border-gray-300 group-hover:bg-white"
                      }`}
                    >
                      {selectedImages.includes(img._id) && (
                        <Check size={16} className="text-white" />
                      )}
                    </button>

                    {/* IMAGE */}
                    <div
                      className="relative h-48 cursor-pointer"
                      onClick={() => openPreview(img)}
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.description || "Gallery image"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/400x300?text=Image+Error`;
                        }}
                      />
                      {/* HOVER OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openPreview(img);
                          }}
                          className="text-white flex items-center gap-2 text-sm font-medium"
                        >
                          <Eye size={16} />
                          Preview
                        </button>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => openPreview(img)}
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setImageToDelete(img._id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="bg-white rounded-xl shadow-sm border">
                {images.map((img) => (
                  <div
                    key={img._id}
                    className={`flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${
                      selectedImages.includes(img._id) ? "bg-blue-50" : ""
                    }`}
                  >
                    {/* SELECT CHECKBOX */}
                    <button
                      onClick={() => toggleSelect(img._id)}
                      className={`mr-4 w-6 h-6 rounded border flex items-center justify-center ${
                        selectedImages.includes(img._id)
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedImages.includes(img._id) && (
                        <Check size={14} className="text-white" />
                      )}
                    </button>

                    {/* THUMBNAIL */}
                    <div
                      className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer mr-4"
                      onClick={() => openPreview(img)}
                    >
                      <img
                        src={img.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">
                          {img.filename || "image.jpg"}
                        </p>
                        {img.description && (
                          <span className="text-sm text-gray-500">
                            • {img.description}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>• {img.size || "Unknown size"}</span>
                        <span>• {img.format || "Image"}</span>
                        <span>
                          • Uploaded{" "}
                          {img.uploadDate
                            ? new Date(img.uploadDate).toLocaleDateString()
                            : "recently"}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openPreview(img)}
                        className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                      >
                        <Eye size={14} />
                        Preview
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageToDelete(img._id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FOOTER STATS */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>
                      {selectedImages.length} of {images.length} selected
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={selectAll}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {selectedImages.length === images.length
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                  <button
                    onClick={fetchImages}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    <RefreshCw size={14} />
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* DELETE MODAL */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
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
                  <p className="text-red-700 font-medium mb-2">
                    Warning: This cannot be undone!
                  </p>
                  <p className="text-red-600 text-sm">
                    You're about to delete{" "}
                    {imageToDelete ? "1 image" : `${selectedImages.length} images`}
                    . All associated data will be permanently removed.
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
                    onClick={() =>
                      deleteImages(
                        imageToDelete ? [imageToDelete] : selectedImages
                      )
                    }
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={18} />
                        Delete{" "}
                        {imageToDelete ? "Image" : `${selectedImages.length} Images`}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* IMAGE PREVIEW MODAL */}
        {previewImage && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={closePreview}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <button
                onClick={closePreview}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2"
              >
                <X size={24} />
              </button>
              <img
                src={previewImage.imageUrl}
                alt={previewImage.description || "Preview"}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              {previewImage.description && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-lg font-medium">{previewImage.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Add missing icon
function RefreshCw({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

// Add CSS animations
const styles = `
  @keyframes slideIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
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
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.2s ease-out;
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}