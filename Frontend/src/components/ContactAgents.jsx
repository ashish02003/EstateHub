import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ContactAgents() {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    specialty: '',
    experience: '',
    rating: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyType: '',
    budget: ''
  });

  // Mock agents data - in real app, this would come from API
  useEffect(() => {
    const mockAgents = [
      {
        id: 1,
        name: 'Sarah Johnson',
        title: 'Senior Real Estate Agent',
        company: 'Premium Properties',
        location: 'New York, NY',
        phone: '+1 (555) 123-4567',
        email: 'sarah.johnson@premiumproperties.com',
        rating: 4.9,
        reviews: 127,
        experience: '8 years',
        specialty: ['Luxury Homes', 'Commercial'],
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
        bio: 'Specializing in luxury residential and commercial properties in Manhattan. Known for exceptional client service and market expertise.',
        languages: ['English', 'Spanish'],
        certifications: ['Licensed Realtor', 'Certified Luxury Agent'],
        recentSales: 45,
        totalSales: 312
      },
      {
        id: 2,
        name: 'Michael Chen',
        title: 'Property Investment Specialist',
        company: 'Urban Realty Group',
        location: 'Los Angeles, CA',
        phone: '+1 (555) 234-5678',
        email: 'michael.chen@urbanrealty.com',
        rating: 4.8,
        reviews: 89,
        experience: '6 years',
        specialty: ['Investment Properties', 'Condos'],
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'Expert in investment properties and high-rise condominiums. Helping clients build wealth through smart real estate investments.',
        languages: ['English', 'Mandarin'],
        certifications: ['Licensed Realtor', 'Investment Property Specialist'],
        recentSales: 32,
        totalSales: 198
      },
      {
        id: 3,
        name: 'Emma Rodriguez',
        title: 'First-Time Buyer Specialist',
        company: 'HomeFinder Realty',
        location: 'Austin, TX',
        phone: '+1 (555) 345-6789',
        email: 'emma.rodriguez@homefinder.com',
        rating: 4.7,
        reviews: 156,
        experience: '5 years',
        specialty: ['First-Time Buyers', 'Family Homes'],
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        bio: 'Passionate about helping first-time buyers navigate the home buying process. Known for patience and thorough market knowledge.',
        languages: ['English', 'Spanish'],
        certifications: ['Licensed Realtor', 'First-Time Buyer Specialist'],
        recentSales: 28,
        totalSales: 142
      },
      {
        id: 4,
        name: 'David Thompson',
        title: 'Commercial Real Estate Expert',
        company: 'Metro Commercial',
        location: 'Chicago, IL',
        phone: '+1 (555) 456-7890',
        email: 'david.thompson@metrocommercial.com',
        rating: 4.9,
        reviews: 73,
        experience: '12 years',
        specialty: ['Commercial', 'Industrial'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        bio: 'Veteran commercial real estate agent with expertise in office buildings, retail spaces, and industrial properties.',
        languages: ['English'],
        certifications: ['Licensed Realtor', 'Commercial Specialist', 'CCIM'],
        recentSales: 18,
        totalSales: 287
      },
      {
        id: 5,
        name: 'Lisa Park',
        title: 'Luxury Home Consultant',
        company: 'Elite Properties',
        location: 'Miami, FL',
        phone: '+1 (555) 567-8901',
        email: 'lisa.park@eliteproperties.com',
        rating: 4.8,
        reviews: 94,
        experience: '7 years',
        specialty: ['Luxury Homes', 'Waterfront'],
        image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
        bio: 'Specializing in luxury waterfront properties and high-end residential real estate in South Florida.',
        languages: ['English', 'Korean'],
        certifications: ['Licensed Realtor', 'Luxury Property Specialist'],
        recentSales: 21,
        totalSales: 156
      },
      {
        id: 6,
        name: 'James Wilson',
        title: 'Rental Property Manager',
        company: 'Rental Solutions',
        location: 'Seattle, WA',
        phone: '+1 (555) 678-9012',
        email: 'james.wilson@rentalsolutions.com',
        rating: 4.6,
        reviews: 112,
        experience: '4 years',
        specialty: ['Rentals', 'Property Management'],
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
        bio: 'Focused on rental properties and comprehensive property management services. Expert in tenant relations and property maintenance.',
        languages: ['English'],
        certifications: ['Licensed Realtor', 'Property Management License'],
        recentSales: 67,
        totalSales: 234
      }
    ];
    setAgents(mockAgents);
    setFilteredAgents(mockAgents);
  }, []);

  // Filter agents based on search and filters
  useEffect(() => {
    let filtered = agents;

    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.specialty.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filters.location) {
      filtered = filtered.filter(agent =>
        agent.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.specialty) {
      filtered = filtered.filter(agent =>
        agent.specialty.includes(filters.specialty)
      );
    }

    if (filters.experience) {
      const minYears = parseInt(filters.experience);
      filtered = filtered.filter(agent =>
        parseInt(agent.experience) >= minYears
      );
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(agent => agent.rating >= minRating);
    }

    setFilteredAgents(filtered);
  }, [searchTerm, filters, agents]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', { agent: selectedAgent, form: contactForm });
    alert(`Message sent to ${selectedAgent.name}! They will contact you within 24 hours.`);
    setSelectedAgent(null);
    setContactForm({ name: '', email: '', phone: '', message: '', propertyType: '', budget: '' });
  };

  const handleInputChange = (e) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-slate-900 text-white py-16'>
        <div className='max-w-6xl mx-auto px-3'>
          <h1 className='text-4xl lg:text-5xl font-bold mb-4'>
            👥 Contact Real Estate Agents
          </h1>
          <p className='text-gray-300 text-lg max-w-2xl'>
            Connect with verified real estate professionals in your area. Find the perfect agent to help you buy, sell, or rent your next property.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-3 py-12'>
        {/* Search and Filters */}
        <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
            <div className='lg:col-span-2'>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Search Agents</label>
              <input
                type='text'
                placeholder='Search by name, location, or specialty...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>All Locations</option>
                <option value='New York'>New York</option>
                <option value='Los Angeles'>Los Angeles</option>
                <option value='Austin'>Austin</option>
                <option value='Chicago'>Chicago</option>
                <option value='Miami'>Miami</option>
                <option value='Seattle'>Seattle</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Specialty</label>
              <select
                value={filters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>All Specialties</option>
                <option value='Luxury Homes'>Luxury Homes</option>
                <option value='Commercial'>Commercial</option>
                <option value='First-Time Buyers'>First-Time Buyers</option>
                <option value='Investment Properties'>Investment Properties</option>
                <option value='Rentals'>Rentals</option>
                <option value='Waterfront'>Waterfront</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Min Experience</label>
              <select
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>Any Experience</option>
                <option value='3'>3+ Years</option>
                <option value='5'>5+ Years</option>
                <option value='10'>10+ Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className='mb-6'>
          <p className='text-slate-600'>
            Showing {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} 
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Agents Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {filteredAgents.map((agent) => (
            <div key={agent.id} className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <div className='p-6'>
                {/* Agent Header */}
                <div className='flex items-center mb-4'>
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className='w-16 h-16 rounded-full object-cover mr-4'
                  />
                  <div className='flex-1'>
                    <h3 className='text-xl font-semibold text-slate-800'>{agent.name}</h3>
                    <p className='text-blue-600 text-sm font-medium'>{agent.title}</p>
                    <p className='text-gray-500 text-sm'>{agent.company}</p>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className='flex items-center mb-3'>
                  <div className='flex mr-2'>{renderStars(agent.rating)}</div>
                  <span className='text-sm text-gray-600'>
                    {agent.rating} ({agent.reviews} reviews)
                  </span>
                </div>

                {/* Location and Experience */}
                <div className='mb-4 space-y-1'>
                  <p className='text-sm text-gray-600'>📍 {agent.location}</p>
                  <p className='text-sm text-gray-600'>🎯 {agent.experience} experience</p>
                  <p className='text-sm text-gray-600'>💼 {agent.recentSales} recent sales</p>
                </div>

                {/* Specialties */}
                <div className='mb-4'>
                  <div className='flex flex-wrap gap-2'>
                    {agent.specialty.map((spec, index) => (
                      <span
                        key={index}
                        className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium'
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className='text-gray-600 text-sm mb-4 line-clamp-3'>{agent.bio}</p>

                {/* Contact Buttons */}
                <div className='space-y-2'>
                  <button
                    onClick={() => setSelectedAgent(agent)}
                    className='w-full bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors font-medium'
                  >
                    Contact Agent
                  </button>
                  <div className='flex space-x-2'>
                    <a
                      href={`tel:${agent.phone}`}
                      className='flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors text-center text-sm font-medium'
                    >
                      📞 Call
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className='flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm font-medium'
                    >
                      📧 Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAgents.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-6xl mb-4'>🔍</div>
            <h3 className='text-xl font-semibold text-slate-700 mb-2'>No agents found</h3>
            <p className='text-gray-600 mb-4'>Try adjusting your search criteria or filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({ location: '', specialty: '', experience: '', rating: '' });
              }}
              className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors'
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {selectedAgent && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              {/* Modal Header */}
              <div className='flex justify-between items-start mb-6'>
                <div className='flex items-center'>
                  <img
                    src={selectedAgent.image}
                    alt={selectedAgent.name}
                    className='w-12 h-12 rounded-full object-cover mr-3'
                  />
                  <div>
                    <h3 className='text-xl font-semibold text-slate-800'>{selectedAgent.name}</h3>
                    <p className='text-blue-600 text-sm'>{selectedAgent.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className='text-gray-400 hover:text-gray-600 text-2xl'
                >
                  ×
                </button>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Your Name</label>
                    <input
                      type='text'
                      name='name'
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter your full name'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter your email'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Phone</label>
                    <input
                      type='tel'
                      name='phone'
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Your phone number'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Property Type</label>
                    <select
                      name='propertyType'
                      value={contactForm.propertyType}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value=''>Select property type</option>
                      <option value='house'>House</option>
                      <option value='apartment'>Apartment</option>
                      <option value='condo'>Condo</option>
                      <option value='commercial'>Commercial</option>
                      <option value='land'>Land</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Budget Range</label>
                  <select
                    name='budget'
                    value={contactForm.budget}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option value=''>Select budget range</option>
                    <option value='under-200k'>Under $200,000</option>
                    <option value='200k-500k'>$200,000 - $500,000</option>
                    <option value='500k-1m'>$500,000 - $1,000,000</option>
                    <option value='1m-2m'>$1,000,000 - $2,000,000</option>
                    <option value='over-2m'>Over $2,000,000</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Message</label>
                  <textarea
                    name='message'
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Tell the agent about your requirements, timeline, or any specific questions...'
                  />
                </div>

                <div className='flex space-x-4 pt-4'>
                  <button
                    type='submit'
                    className='flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium'
                  >
                    Send Message
                  </button>
                  <button
                    type='button'
                    onClick={() => setSelectedAgent(null)}
                    className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}