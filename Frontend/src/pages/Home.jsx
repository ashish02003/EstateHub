

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=15');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=15');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=15');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
       
        {/* <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        🏡 Find your dream home with confidence!!
        </h1> */}
        <h1 className='text-white font-bold text-3xl lg:text-6xl'>
        🏡 Find your dream home with confidence!!
        </h1>
        <div className='text-gray-300 text-xs sm:text-sm'>
          EstateHub makes property search simple. Browse trusted listings, connect with agents, and discover the perfect place to live or invest.
          <br/>
          Discover listings that match your lifestyle. Buy, sell, or rent with ease on EstateHub.
         
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-500 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 '>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-white'>Recent offers</h2>
              <Link className='text-sm text-blue-500 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-white'>🆕🏠Recent Places For Rent</h2>
              <Link className='text-sm text-blue-500 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id}  />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-white'>🆕🏠Recent Places For Sale</h2>
              <Link className='text-sm text-blue-500 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className='bg-slate-800 text-white mt-16'>
        <div className='max-w-6xl mx-auto px-3 py-12'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Company Info */}
            <div className='col-span-1 md:col-span-2'>
              <h3 className='text-2xl font-bold mb-4 flex items-center'>
                🏡 EstateHub
              </h3>
              <p className='text-gray-300 text-sm mb-4'>
                Your trusted partner in real estate. We make property search simple by connecting buyers, sellers, and renters with the perfect properties and trusted agents.
              </p>
              <p className='text-gray-400 text-xs'>
                Discover listings that match your lifestyle. Buy, sell, or rent with confidence on EstateHub.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className='text-lg font-semibold mb-4 text-gray-200'>Quick Links</h4>
              <ul className='space-y-2'>
                <li>
                  <Link to='/search' className='text-gray-300 text-sm hover:text-blue-400 hover:underline'>
                    Search Properties
                  </Link>
                </li>
                <li>
                  <Link to='/search?offer=true' className='text-gray-300 text-sm hover:text-blue-400 hover:underline'>
                    Special Offers
                  </Link>
                </li>
                <li>
                  <Link to='/search?type=rent' className='text-gray-300 text-sm hover:text-blue-400 hover:underline'>
                    For Rent
                  </Link>
                </li>
                <li>
                  <Link to='/search?type=sale' className='text-gray-300 text-sm hover:text-blue-400 hover:underline'>
                    For Sale
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className='text-lg font-semibold mb-4 text-gray-200'>Services</h4>
              <ul className='space-y-2'>

                <li>
                  <Link to='/user-guide' className='text-gray-300 text-sm hover:text-blue-400 hover:underline'>
                    User-Guide
                  </Link>
                </li>
                <li>
                  <Link to='/profile' className='text-gray-300 text-sm hover:text-blue-400 hover:underline'>
                    List Your Property
                  </Link>
                </li>
                               <li>
                  <Link to='/community' className='text-gray-300 text-sm hover:text-blue-400 hover:underline'>
                    Community
                  </Link>
                </li>
                <li>
                  <Link to='/contact-agents' className='text-gray-300 text-sm hover:text-blue-400 hover:underline'>
                    Contact Agents
                  </Link>
                </li>
                <li>
                  <Link to='/tutorials' className='text-gray-300 text-sm hover:text-blue-400 hover:underline'>
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to='/help' className='text-gray-300 text-sm hover:text-blue-400 hover:underline'>
                    Help & Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className='border-t border-gray-600 mt-8 pt-6'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
              <p className='text-gray-400 text-xs mb-4 md:mb-0'>
                © 2024 EstateHub. All rights reserved. Find your dream home with confidence.
              </p>
              <div className='flex space-x-4'>
                {/* Facebook */}
                <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' 
                   className='text-gray-400 hover:text-blue-500 transition-colors'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' 
                   className='text-gray-400 hover:text-blue-400 transition-colors'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' 
                   className='text-gray-400 hover:text-pink-500 transition-colors'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468 0-2.458 2.009-4.467 4.467-4.467 2.458 0 4.468 2.009 4.468 4.467 0 2.458-2.01 4.468-4.468 4.468zm7.233 0c-2.458 0-4.467-2.01-4.467-4.468 0-2.458 2.009-4.467 4.467-4.467 2.458 0 4.468 2.009 4.468 4.467 0 2.458-2.01 4.468-4.468 4.468z'/>
                    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' 
                   className='text-gray-400 hover:text-blue-600 transition-colors'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}