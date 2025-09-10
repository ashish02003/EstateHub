
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const dispatch = useDispatch();

  // Replace with your actual Cloudinary credentials
 
  const CLOUDINARY_CLOUD_NAME = "dzdra4xct";
  const CLOUDINARY_UPLOAD_PRESET = "upload_my_images";

  const handleFileUpload = (file) => {
    try {
      setFileUploadError(false);
      setUploading(true);
      setFilePerc(0);

      // Validate file size (10MB limit for Cloudinary free tier)
      if (file.size > 10 * 1024 * 1024) {
        setFileUploadError(true);
        setUploading(false);
        console.error("File size exceeds 10MB limit");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setFileUploadError(true);
        setUploading(false);
        console.error("File is not an image");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      // Use XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          setFilePerc(percentComplete);
          console.log(`Upload progress: ${percentComplete}%`);
        }
      });

      // Handle successful upload
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
            setUploading(false);
            console.log("Upload successful:", data.secure_url);
            toast.success("Image uploaded successfully! 📸");
          } catch (error) {
            console.error("Error parsing response:", error);
            setFileUploadError(true);
            setUploading(false);
            setFilePerc(0);
          }
        } else {
          console.error("Upload failed with status:", xhr.status);
          setFileUploadError(true);
          setUploading(false);
          setFilePerc(0);
        }
      });

      // Handle upload errors
      xhr.addEventListener("error", () => {
        console.error("Upload failed");
        setFileUploadError(true);
        setUploading(false);
        setFilePerc(0);
      });

      // Start the upload
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
      );
      xhr.send(formData);
    } catch (error) {
      console.error("Error in handleFileUpload:", error);
      setFileUploadError(true);
      setUploading(false);
      setFilePerc(0);
    }
  };

  const handleImageDelete = async () => {
    try {
      setDeletingImage(true);
      
      // Extract public_id from Cloudinary URL for deletion
      const currentImageUrl = formData.avatar || currentUser.avatar;
      
      if (currentImageUrl && currentImageUrl.includes('cloudinary.com')) {
        // Extract public_id from Cloudinary URL
        const urlParts = currentImageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const publicId = fileName.split('.')[0];
        
        // Delete from Cloudinary
        const deleteFormData = new FormData();
        deleteFormData.append('public_id', publicId);
        deleteFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        const deleteResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
          {
            method: 'POST',
            body: deleteFormData
          }
        );
        
        const deleteResult = await deleteResponse.json();
        console.log('Cloudinary delete result:', deleteResult);
      }
      
      // Remove avatar from form data (set to default)
      setFormData((prev) => ({ ...prev, avatar: '' }));
      setFile(undefined);
      setFilePerc(0);
      setDeletingImage(false);
      
      toast.success("Image deleted successfully! 🗑️");
      
    } catch (error) {
      console.error('Error deleting image:', error);
      setDeletingImage(false);
      toast.error("Failed to delete image");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleFileUpload(selectedFile);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      if (updateSuccess) {
        toast.success("User is updated successfully! ✅");
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success("Account successfully deleted!!😔")
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success("user successfullly  signout 😎")
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Check if there's a custom uploaded image (not the default avatar)
  const hasCustomImage = () => {
    const currentImageUrl = formData.avatar || currentUser.avatar;
    const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    return currentImageUrl && currentImageUrl !== defaultImage;
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-white">
        My Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleFileChange}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        
        <div className="relative self-center">
          <img
            onClick={() => fileRef.current.click()}
            src={
              formData.avatar ||
              currentUser.avatar ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2 border-2 border-gray-300 hover:border-gray-400 transition-colors"
          />
          
          {/* Delete button - only show if there's a custom uploaded image */}
          {hasCustomImage() && !uploading && (
            <button
              type="button"
              onClick={handleImageDelete}
              disabled={deletingImage}
              className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shadow-md disabled:opacity-50"
              title="Delete image"
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </button>
          )}
        </div>
        
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error uploading image (image must be less than 10MB)
            </span>
          ) : uploading && filePerc < 100 ? (
            <span className="text-blue-700">Uploading {filePerc}%</span>
          ) : deletingImage ? (
            <span className="text-orange-700">Deleting image...</span>
          ) : filePerc === 100 && !uploading ? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ) : (
            <span className="text-gray-100">Click on image to upload</span>
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg focus:outline-none focus:border-blue-500"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg focus:outline-none focus:border-blue-500"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          disabled={loading || uploading || deletingImage}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 transition-opacity"
        >
          {loading ? "Loading..." : uploading ? "Uploading..." : deletingImage ? "Processing..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 transition-opacity"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 font-bold cursor-pointer hover:underline"
        >
          Delete account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700  font-bold cursor-pointer hover:underline"
        >
          Sign out
        </span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ""}</p>

      <button onClick={handleShowListings} className="text-green-700 w-full ">
        <Button variant="outlined"> Show Listings</Button>
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold text-white">
            My Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between  items-center gap-4 hover:shadow-md transition-shadow"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={
                    listing.imageUrls?.[0] || "https://via.placeholder.com/64"
                  }
                  alt="listing cover"
                  className="h-16 w-16 object-contain rounded"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p className="text-white">{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center gap-1">
                <Button
                  onClick={() => handleListingDelete(listing._id)}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  sx={{
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    boxShadow: "0px 4px 10px rgb(15, 23, 42)",
                    "&:hover": {
                      backgroundColor: "#1e40af",
                      boxShadow: "0px 6px 10px rgb(15, 23, 42)",
                    },
                  }}
                >
                  Delete
                </Button>

                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase text-sm hover:underline">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}