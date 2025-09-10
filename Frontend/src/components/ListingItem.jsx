// import { Link } from 'react-router-dom';
// import { MdLocationOn } from 'react-icons/md';

// export default function ListingItem({ listing }) {
//   return (
//     <div className='bg-white  hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
//       <Link to={`/listing/${listing._id}`}>
//         <img
//           src={
//             listing.imageUrls[0] ||
//             'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
//           }
//           alt='listing cover'
//           className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
//         />
//         <div className='p-3 flex flex-col gap-2 w-full'>
//           <p className='truncate text-lg font-semibold text-slate-700'>
//             {listing.name}
//           </p>
//           <div className='flex items-center gap-1'>
//             <MdLocationOn className='h-4 w-4 text-green-700' />
//             <p className='text-sm text-gray-600 truncate w-full'>
//               {listing.address}
//             </p>
//           </div>
//           <p className='text-sm text-gray-600 line-clamp-2'>
//             {listing.description}
//           </p>
//           <p className='text-slate-500 mt-2 font-semibold '>
//             $
//             {listing.offer
//               ? listing.discountPrice.toLocaleString('en-US')
//               : listing.regularPrice.toLocaleString('en-US')}
//             {listing.type === 'rent' && ' / month'}
//           </p>
//           <div className='text-slate-700 flex gap-4'>
//             <div className='font-bold text-xs'>
//               {listing.bedrooms > 1
//                 ? `${listing.bedrooms} beds `
//                 : `${listing.bedrooms} bed `}
//             </div>
//             <div className='font-bold text-xs'>
//               {listing.bathrooms > 1
//                 ? `${listing.bathrooms} baths `
//                 : `${listing.bathrooms} bath `}
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fallback image if no images available
  const fallbackImage = 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg';
  
  // Get images array, use fallback if empty
  const images = listing.imageUrls && listing.imageUrls.length > 0 
    ? listing.imageUrls 
    : [fallbackImage];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToImage = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <div className=' text-white shadow-md border shadow-slate-500 hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        {/* Image Slider Container */}
        <div className='relative h-[320px] sm:h-[220px] overflow-hidden group'>
          {/* Main Image */}
          <img
            src={images[currentImageIndex]}
            alt='listing cover'
            className='h-full w-full object-cover hover:scale-105 transition-scale duration-300'
          />
          
          {/* Navigation Arrows - Only show if more than 1 image */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md z-10'
              >
                <FaChevronLeft className='w-3 h-3' />
              </button>
              
              {/* Next Button */}
              <button
                onClick={nextImage}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md z-10'
              >
                <FaChevronRight className='w-3 h-3' />
              </button>
            </>
          )}

          {/* Image Indicators - Only show if more than 1 image */}
          {images.length > 1 && (
            <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10'>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToImage(index, e)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-white scale-110' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className='absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs z-10'>
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Your existing listing details - unchanged */}
        <div className='p-3 flex flex-col gap-2 w-full  '>
          <p className='truncate text-lg font-semibold text-white'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-red-600' />
            <p className='text-sm text-gray-300 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-400 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-green-500 mt-2 font-semibold '>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-white flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}