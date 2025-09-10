import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Tutorials() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTutorials, setFilteredTutorials] = useState([]);

  const categories = [
    { id: 'all', name: 'All Tutorials', icon: '📚', count: 0 },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀', count: 0 },
    { id: 'searching', name: 'Property Search', icon: '🔍', count: 0 },
    { id: 'listing', name: 'Creating Listings', icon: '📋', count: 0 },
    { id: 'agents', name: 'Working with Agents', icon: '👥', count: 0 },
    { id: 'mobile', name: 'Mobile App', icon: '📱', count: 0 },
    { id: 'advanced', name: 'Advanced Features', icon: '⚡', count: 0 }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Welcome to EstateHub - Platform Overview',
      description: 'Get a complete overview of EstateHub features and learn how to navigate the platform effectively.',
      category: 'getting-started',
      duration: '5:24',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
      tags: ['overview', 'navigation', 'basics'],
      transcript: 'Welcome to EstateHub! In this tutorial, we\'ll explore the main features of our platform...',
      resources: [
        { name: 'Platform Overview PDF', url: '/resources/platform-overview.pdf' },
        { name: 'Quick Start Checklist', url: '/resources/quick-start.pdf' }
      ]
    },
    {
      id: 2,
      title: 'Creating Your First Account',
      description: 'Step-by-step guide to creating an account, setting up your profile, and configuring preferences.',
      category: 'getting-started',
      duration: '3:45',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['account', 'profile', 'setup'],
      transcript: 'Let\'s create your EstateHub account. Start by clicking the Sign Up button...',
      resources: [
        { name: 'Account Setup Guide', url: '/resources/account-setup.pdf' }
      ]
    },
    {
      id: 3,
      title: 'Mastering Property Search',
      description: 'Learn how to use search filters, save searches, and find properties that match your criteria.',
      category: 'searching',
      duration: '8:12',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['search', 'filters', 'properties'],
      transcript: 'Effective property searching starts with understanding our filter system...',
      resources: [
        { name: 'Search Tips PDF', url: '/resources/search-tips.pdf' },
        { name: 'Filter Guide', url: '/resources/filters.pdf' }
      ]
    },
    {
      id: 4,
      title: 'Advanced Search Techniques',
      description: 'Master advanced search features, location-based search, and custom alerts for new properties.',
      category: 'searching',
      duration: '6:33',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['advanced search', 'alerts', 'location'],
      transcript: 'Advanced search techniques can help you find hidden gems in the market...',
      resources: [
        { name: 'Advanced Search Manual', url: '/resources/advanced-search.pdf' }
      ]
    },
    {
      id: 5,
      title: 'Creating Your First Property Listing',
      description: 'Complete walkthrough of creating a compelling property listing with photos and descriptions.',
      category: 'listing',
      duration: '12:18',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['listing', 'photos', 'description'],
      transcript: 'Creating an effective listing requires attention to detail and great photos...',
      resources: [
        { name: 'Listing Creation Guide', url: '/resources/listing-guide.pdf' },
        { name: 'Photo Tips Checklist', url: '/resources/photo-tips.pdf' }
      ]
    },
    {
      id: 6,
      title: 'Professional Photography for Listings',
      description: 'Learn how to take stunning photos that make your property listings stand out from the competition.',
      category: 'listing',
      duration: '9:47',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['photography', 'listing photos', 'marketing'],
      transcript: 'Great photography can make or break a property listing. Here\'s how to get it right...',
      resources: [
        { name: 'Photography Guide', url: '/resources/photography-guide.pdf' },
        { name: 'Lighting Tips', url: '/resources/lighting-tips.pdf' }
      ]
    },
    {
      id: 7,
      title: 'Finding and Contacting Real Estate Agents',
      description: 'How to browse our agent directory, read reviews, and initiate contact with the right professionals.',
      category: 'agents',
      duration: '7:29',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['agents', 'contact', 'professionals'],
      transcript: 'Finding the right agent is crucial for your success. Here\'s how to choose wisely...',
      resources: [
        { name: 'Agent Selection Guide', url: '/resources/agent-guide.pdf' }
      ]
    },
    {
      id: 8,
      title: 'Working Effectively with Your Agent',
      description: 'Best practices for communicating with agents, setting expectations, and achieving your goals.',
      category: 'agents',
      duration: '10:15',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['agent collaboration', 'communication', 'expectations'],
      transcript: 'Building a strong relationship with your agent leads to better outcomes...',
      resources: [
        { name: 'Agent Communication Tips', url: '/resources/agent-communication.pdf' }
      ]
    },
    {
      id: 9,
      title: 'EstateHub Mobile App Tour',
      description: 'Complete tour of our mobile app features, including GPS search, offline access, and notifications.',
      category: 'mobile',
      duration: '6:52',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['mobile app', 'GPS', 'offline'],
      transcript: 'Our mobile app brings EstateHub\'s power to your smartphone...',
      resources: [
        { name: 'Mobile App Guide', url: '/resources/mobile-guide.pdf' }
      ]
    },
    {
      id: 10,
      title: 'Using Mobile for Property Tours',
      description: 'How to use your mobile device during property visits to take notes, photos, and compare options.',
      category: 'mobile',
      duration: '5:38',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['mobile tours', 'notes', 'comparison'],
      transcript: 'Make the most of property visits with our mobile tour features...',
      resources: [
        { name: 'Mobile Tour Checklist', url: '/resources/tour-checklist.pdf' }
      ]
    },
    {
      id: 11,
      title: 'Setting Up Property Alerts and Notifications',
      description: 'Configure smart alerts to get notified about new properties, price changes, and market updates.',
      category: 'advanced',
      duration: '8:44',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['alerts', 'notifications', 'automation'],
      transcript: 'Smart alerts ensure you never miss the perfect property...',
      resources: [
        { name: 'Alerts Setup Guide', url: '/resources/alerts-guide.pdf' }
      ]
    },
    {
      id: 12,
      title: 'Market Analysis and Pricing Tools',
      description: 'Use our advanced tools to analyze market trends, compare prices, and make informed decisions.',
      category: 'advanced',
      duration: '11:27',
      difficulty: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['market analysis', 'pricing', 'trends'],
      transcript: 'Understanding market data gives you a competitive advantage...',
      resources: [
        { name: 'Market Analysis Guide', url: '/resources/market-analysis.pdf' },
        { name: 'Pricing Strategy Tips', url: '/resources/pricing-tips.pdf' }
      ]
    }
  ];

  // Update category counts and filter tutorials
  useEffect(() => {
    const updatedCategories = categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? tutorials.length : tutorials.filter(t => t.category === cat.id).length
    }));

    let filtered = tutorials;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTutorials(filtered);
  }, [selectedCategory, searchTerm]);

  const markAsWatched = (tutorialId) => {
    setWatchedVideos(prev => new Set([...prev, tutorialId]));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = () => {
    return Math.round((watchedVideos.size / tutorials.length) * 100);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-slate-900 text-white py-16'>
        <div className='max-w-6xl mx-auto px-3'>
          <h1 className='text-4xl lg:text-5xl font-bold mb-4'>
            🎥 Video Tutorials
          </h1>
          <p className='text-gray-300 text-lg max-w-2xl mb-6'>
            Master EstateHub with our comprehensive video tutorials. From beginner basics to advanced features, learn at your own pace.
          </p>
          
          {/* Progress Bar */}
          <div className='bg-slate-700 rounded-full h-3 max-w-md'>
            <div 
              className='bg-blue-500 h-3 rounded-full transition-all duration-300'
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <p className='text-sm text-gray-300 mt-2'>
            Progress: {watchedVideos.size} of {tutorials.length} tutorials completed ({calculateProgress()}%)
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-3 py-12'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar */}
          <div className='lg:w-1/4'>
            <div className='bg-slate-900 rounded-lg shadow-md p-6 sticky top-8'>
              {/* Search */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-white mb-2'>Search Tutorials</label>
                <input
                  type='text'
                  placeholder='Search by title, description, or tags...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              {/* Categories */}
              <h3 className='text-lg font-semibold text-white mb-4'>Categories</h3>
              <nav className='space-y-2'>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-600'
                        : 'hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>
                      <span className='mr-3'>{category.icon}</span>
                      {category.name}
                    </span>
                    <span className='text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full'>
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Learning Path */}
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <h4 className='text-sm font-semibold text-white mb-3'>🎯 Recommended Learning Path</h4>
                <div className='space-y-2 text-sm'>
                  <div className='text-green-600'>✓ Getting Started</div>
                  <div className='text-blue-600'>→ Property Search</div>
                  <div className='text-gray-400'>• Creating Listings</div>
                  <div className='text-gray-400'>• Working with Agents</div>
                  <div className='text-gray-400'>• Advanced Features</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:w-3/4'>
            {/* Results Header */}
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h2 className='text-2xl font-semibold text-slate-800'>
                  {selectedCategory === 'all' ? 'All Tutorials' : 
                   categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className='text-gray-600'>
                  {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              {/* View Toggle */}
              <div className='flex bg-gray-200 rounded-lg p-1'>
                <button className='px-3 py-1 text-sm bg-white text-gray-700 rounded-md shadow-sm'>
                  Grid View
                </button>
                <button className='px-3 py-1 text-sm text-gray-500 hover:text-gray-700'>
                  List View
                </button>
              </div>
            </div>

            {/* Tutorial Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {filteredTutorials.map((tutorial) => (
                <div key={tutorial.id} className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden'>
                  {/* Thumbnail */}
                  <div className='relative'>
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className='w-full h-48 object-cover'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                      <button
                        onClick={() => {
                          setSelectedVideo(tutorial);
                          markAsWatched(tutorial.id);
                        }}
                        className='bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center'
                      >
                        ▶️ Watch Now
                      </button>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm'>
                      {tutorial.duration}
                    </div>
                    
                    {/* Watched Badge */}
                    {watchedVideos.has(tutorial.id) && (
                      <div className='absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center'>
                        ✓ Watched
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className='p-6'>
                    <div className='flex items-center gap-2 mb-3'>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty}
                      </span>
                      <span className='text-gray-500 text-sm'>•</span>
                      <span className='text-gray-500 text-sm capitalize'>
                        {categories.find(c => c.id === tutorial.category)?.name}
                      </span>
                    </div>

                    <h3 className='text-lg font-semibold text-slate-800 mb-2 line-clamp-2'>
                      {tutorial.title}
                    </h3>
                    
                    <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                      {tutorial.description}
                    </p>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {tutorial.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs'
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className='flex gap-2'>
                      <button
                        onClick={() => {
                          setSelectedVideo(tutorial);
                          markAsWatched(tutorial.id);
                        }}
                        className='flex-1 bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium'
                      >
                        {watchedVideos.has(tutorial.id) ? 'Watch Again' : 'Watch Now'}
                      </button>
                      <button className='bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors'>
                        📚
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredTutorials.length === 0 && (
              <div className='text-center py-12'>
                <div className='text-6xl mb-4'>🎬</div>
                <h3 className='text-xl font-semibold text-slate-700 mb-2'>No tutorials found</h3>
                <p className='text-gray-600 mb-4'>Try adjusting your search or category filter.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Show All Tutorials
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='flex justify-between items-center p-6 border-b'>
              <div>
                <h3 className='text-xl font-semibold text-slate-800'>{selectedVideo.title}</h3>
                <div className='flex items-center gap-4 mt-2'>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedVideo.difficulty)}`}>
                    {selectedVideo.difficulty}
                  </span>
                  <span className='text-gray-500 text-sm'>{selectedVideo.duration}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className='text-gray-400 hover:text-gray-600 text-2xl'
              >
                ×
              </button>
            </div>

            {/* Video Player */}
            <div className='aspect-video'>
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className='w-full h-full'
                allowFullScreen
              />
            </div>

            {/* Video Details */}
            <div className='p-6'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Description */}
                <div className='lg:col-span-2'>
                  <h4 className='font-semibold text-slate-800 mb-3'>Description</h4>
                  <p className='text-gray-600 mb-4'>{selectedVideo.description}</p>
                  
                  <h4 className='font-semibold text-slate-800 mb-3'>Transcript Preview</h4>
                  <p className='text-gray-600 text-sm bg-gray-50 p-4 rounded-lg'>
                    {selectedVideo.transcript}
                  </p>
                </div>

                {/* Resources */}
                <div>
                  <h4 className='font-semibold text-slate-800 mb-3'>Resources</h4>
                  <div className='space-y-2'>
                    {selectedVideo.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        className='block bg-blue-50 text-blue-700 p-3 rounded-lg hover:bg-blue-100 transition-colors text-sm'
                      >
                        📄 {resource.name}
                      </a>
                    ))}
                  </div>

                  <h4 className='font-semibold text-slate-800 mb-3 mt-6'>Tags</h4>
                  <div className='flex flex-wrap gap-2'>
                    {selectedVideo.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs'
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className='bg-white border-t border-gray-200 py-12'>
        <div className='max-w-6xl mx-auto px-3 text-center'>
          <h3 className='text-2xl font-semibold text-slate-800 mb-4'>
            Need More Help?
          </h3>
          <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
            Can't find the tutorial you're looking for? Check out our other learning resources or contact support.
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
            <Link
              to='/user-guide'
              className='bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium'
            >
              📚 User Guide
            </Link>
            <Link
              to='/help'
              className='bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium'
            >
              🆘 Get Support
            </Link>
            <Link
              to='/community'
              className='bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium'
            >
              💬 Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}