
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cloudinary configuration - Replace these with your actual values
  const CLOUDINARY_CLOUD_NAME = "dzdra4xct";
  const CLOUDINARY_UPLOAD_PRESET = "upload_my_images";

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      if (!listingId) return;
      
      try {
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setFormData(data);
      } catch (error) {
        console.log('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [params.listingId]);

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setImageUploadError('Please select images to upload');
      return;
    }

    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError('You can only upload 6 images per listing');
      return;
    }

    setUploading(true);
    setImageUploadError(false);
    setUploadProgress(0);

    try {
      const totalFiles = files.length;
      const uploadedUrls = [];

      for (let i = 0; i < totalFiles; i++) {
        const url = await uploadToCloudinary(files[i], i + 1, totalFiles);
        uploadedUrls.push(url);
      }

      setFormData(prevData => ({
        ...prevData,
        imageUrls: [...prevData.imageUrls, ...uploadedUrls],
      }));

      // Clear selected files
      setFiles([]);
      const fileInput = document.getElementById('images');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      setImageUploadError('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadToCloudinary = async (file, currentIndex, totalFiles) => {
    return new Promise((resolve, reject) => {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error('File size exceeds 10MB limit'));
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'listings');

      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const fileProgress = (event.loaded / event.total) * 100;
          const overallProgress = ((currentIndex - 1) / totalFiles) * 100 + (fileProgress / totalFiles);
          setUploadProgress(Math.round(overallProgress));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.error) {
              reject(new Error(response.error.message));
            } else {
              resolve(response.secure_url);
            }
          } catch (error) {
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`HTTP error! status: ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
      xhr.send(formData);
    });
  };

  const handleRemoveImage = (index) => {
    setFormData(prevData => ({
      ...prevData,
      imageUrls: prevData.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    if (id === 'sale' || id === 'rent') {
      setFormData(prevData => ({
        ...prevData,
        type: id,
      }));
    } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setFormData(prevData => ({
        ...prevData,
        [id]: checked,
      }));
    } else if (type === 'number' || type === 'text' || type === 'textarea') {
      setFormData(prevData => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formData.imageUrls.length < 1) {
        return setError('You must upload at least one image');
      }
      
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError('Discount price must be lower than regular price');
      }

      setLoading(true);
      setError(false);

      const url = params.listingId 
        ? `/api/listing/update/${params.listingId}` 
        : '/api/listing/create';

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-white text-center my-7'>
        {params.listingId ? 'Update Listing' : 'Create a Listing'}
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap text-gray-300'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6 text-gray-300'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg text-slate-800'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg text-slate-800'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg text-slate-800'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg text-slate-800'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>
                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold text-green-500'>
            Images:
            <span className='font-normal text-gray-300 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full text-gray-400'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? `${uploadProgress}%` : 'Upload'}
            </button>
          </div>
          
          {/* Progress Bar */}
          {uploading && (
            <div className='w-full bg-gray-200 rounded-full h-2.5'>
              <div 
                className='bg-green-600 h-2.5 rounded-full transition-all duration-300' 
                style={{width: `${uploadProgress}%`}}
              ></div>
            </div>
          )}
          
          {/* Progress Text */}
          {uploading && (
            <p className='text-center text-sm text-gray-600'>
              Uploading... {uploadProgress}%
            </p>
          )}
          
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? (params.listingId ? 'Updating...' : 'Creating...') : (params.listingId ? 'Update listing' : 'Create listing')}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}