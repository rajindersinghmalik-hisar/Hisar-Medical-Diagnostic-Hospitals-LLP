"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Search, Upload, Image as ImageIcon, Eye, Download, X } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  
  // Image preview modal states
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  
  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });

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
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", file.name);

    try {
      const res = await fetch("/api/admin/image", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        fetchImages();
        showNotification("Image uploaded successfully!", "success");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      showNotification("Upload failed. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Handle view image - shows modal with title and description
  const handleViewImage = (img) => {
    setSelectedImage(img);
    setShowImagePreview(true);
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
      
      showNotification("Download started!", "success");
    } catch (error) {
      console.error("Download failed:", error);
      showNotification("Download failed. Please try again.", "error");
    }
  };

  // Handle more options
  const handleMoreOptions = (img) => {
    console.log('More options for:', img);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.replace("/Login");
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
      <main className="mx-auto mb-10 max-w-7xl">
        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 rounded-xl px-5 py-3 shadow-xl backdrop-blur-sm animate-slideIn ${
            notification.type === "success" 
              ? "bg-green-50/95 border border-green-200 text-green-800" 
              : "bg-red-50/95 border border-red-200 text-red-800"
          }`}>
            <div className="rounded-full bg-white p-1.5 shadow-sm">
              {notification.type === "success" ? (
                <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <span className="font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification({ show: false })}
              className="ml-2 rounded-full p-1 hover:bg-white/50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Mobile Header with Logout on Top Right */}
        <div className="md:hidden mb-6 flex items-center justify-between">
          
        </div>

        {/* Section 1: Header with Image Management title and Logout button (Desktop) */}


  

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
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:min-w-[280px] rounded-lg text-blue-950 font-sans border border-gray-300 bg-white py-2.5 pl-10 pr-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
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
                <h3 className="mb-2 text-xl font-semibold text-gray-800">gallery is empty</h3>
               
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
                            src={img.imageUrl || `https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Image+${index + 1}`}
                            alt={img.title || img.filename || "Gallery image"}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://via.placeholder.com/400x400/6B7280/FFFFFF?text=Image+Error`;
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

                {searchQuery && (
                  <div className="mt-6 flex items-center justify-center rounded-lg bg-blue-50 px-4 py-3">
                    <Search className="mr-2 h-4 w-4 font-sans font-semibold text-blue-950" />
                    <span className="text-wrap font-sans font-semibold text-blue-950">
                      Found {images.filter(img => 
                        img.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        img.filename?.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl animate-scaleIn rounded-2xl bg-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 md:px-6 py-4">
              <div>
                <h3 className="text-lg md:text-xl font-sans font-semibold text-blue-950">Image Details</h3>
                <p className="text-xs md:text-sm text-blue-950">View and manage image information</p>
              </div>
          
            </div>
            
            {/* Modal Content */}
            <div className="max-h-[70vh] overflow-y-auto p-4 md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Image Display */}
                <div className="flex flex-col">
                  <div className="mb-4 flex-1 rounded-lg border border-gray-200 bg-gray-100 p-4">
                    <img
                      src={selectedImage.imageUrl}
                      alt={selectedImage.title || selectedImage.filename}
                      className="h-[200px] md:h-[250px] w-full rounded-lg object-contain"
                    />
                  </div>
               
                </div>
                
                {/* Image Details */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h4 className="mb-2 text-lg font-sans font-semibold text-blue-950">Image Information</h4>
                    <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <div>
                        <p className="text-sm font-sans font-medium text-blue-950">Title</p>
                        <p className="text-gray-900"> {selectedImage.title 
                            ? selectedImage.title.split('/').pop().split('.').slice(0, -1).join('.')
                            : (selectedImage.filename 
                                ? selectedImage.filename.split('/').pop().split('.').slice(0, -1).join('.')
                                : "Untitled")
                          }</p>
                      </div>
                      {selectedImage.description && (
                        <div>
                          <p className="text-sm font-sans font-medium text-blue-950">Description</p>
                          <p className="text-gray-900">{selectedImage.description}</p>
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
                  className="rounded-lg border border-gray-300 px-4 py-2 font-sans font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
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
                className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}