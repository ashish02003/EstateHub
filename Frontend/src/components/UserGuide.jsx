import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserGuide() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedStep, setExpandedStep] = useState(null);

  const sections = [
    { id: 'getting-started', title: '🚀 Getting Started', icon: '🚀' },
    { id: 'searching', title: '🔍 Searching Properties', icon: '🔍' },
    { id: 'listing', title: '📋 Creating Listings', icon: '📋' },
    { id: 'account', title: '👤 Account Management', icon: '👤' },
    { id: 'agents', title: '👥 Working with Agents', icon: '👥' },
    { id: 'safety', title: '🛡️ Safety Tips', icon: '🛡️' },
    { id: 'mobile', title: '📱 Mobile App', icon: '📱' },
    { id: 'troubleshooting', title: '🔧 Troubleshooting', icon: '🔧' }
  ];

  const guideContent = {
    'getting-started': {
      title: 'Getting Started with EstateHub',
      description: 'Welcome to EstateHub! Learn the basics to start your property journey.',
      steps: [
        {
          title: 'Create Your Account',
          content: 'Sign up with your email address and create a secure password. Verify your email to activate your account.',
          tips: [
            'Use a strong password with letters, numbers, and symbols',
            'Verify your email immediately for full access',
            'Complete your profile for better agent connections'
          ],
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
        },
        {
          title: 'Complete Your Profile',
          content: 'Add your personal information, preferences, and requirements to help agents understand your needs.',
          tips: [
            'Upload a profile photo for trustworthiness',
            'Add your location and budget preferences',
            'Specify your property requirements clearly'
          ],
          image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop'
        },
        {
          title: 'Explore the Platform',
          content: 'Navigate through different sections: Home, Search, Listings, Agents, and your Profile dashboard.',
          tips: [
            'Bookmark properties you like using the heart icon',
            'Use filters to narrow down your search results',
            'Check out featured properties on the homepage'
          ],
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
        }
      ]
    },
    'searching': {
      title: 'Searching for Properties',
      description: 'Master our powerful search tools to find your perfect property.',
      steps: [
        {
          title: 'Basic Search',
          content: 'Use the search bar on the homepage or navigation to enter location, property type, or keywords.',
          tips: [
            'Try searching by neighborhood, city, or zip code',
            'Use specific keywords like "pool" or "parking"',
            'Browse recent offers, rentals, and sales on homepage'
          ],
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop'
        },
        {
          title: 'Advanced Filters',
          content: 'Refine your search using price range, property type, bedrooms, bathrooms, and special features.',
          tips: [
            'Set realistic price ranges based on your budget',
            'Use the "More Filters" option for specific amenities',
            'Save your search criteria for future use'
          ],
          image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=250&fit=crop'
        },
        {
          title: 'Viewing Property Details',
          content: 'Click on any property to see detailed information, photos, location map, and contact details.',
          tips: [
            'View all photos in the gallery',
            'Check the neighborhood map and nearby amenities',
            'Read the full property description carefully'
          ],
          image: 'https://images.unsplash.com/photo-1560448204-e1a3ecba47d2?w=400&h=250&fit=crop'
        },
        {
          title: 'Saving Favorites',
          content: 'Click the heart icon to save properties to your favorites list for easy access later.',
          tips: [
            'Organize favorites by creating custom lists',
            'Share favorite properties with family or friends',
            'Get notifications when saved properties change price'
          ],
          image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop'
        }
      ]
    },
    'listing': {
      title: 'Creating Property Listings',
      description: 'Learn how to create compelling listings that attract potential buyers or renters.',
      steps: [
        {
          title: 'Access Listing Creation',
          content: 'Go to your Profile page and click "Create Listing" to start adding your property.',
          tips: [
            'Ensure you have property ownership or authorization',
            'Gather all necessary documents beforehand',
            'Take high-quality photos before starting'
          ],
          image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=250&fit=crop'
        },
        {
          title: 'Property Information',
          content: 'Fill in basic details: address, property type, price, bedrooms, bathrooms, and square footage.',
          tips: [
            'Double-check all measurements and details',
            'Research comparable properties for competitive pricing',
            'Be honest about property condition'
          ],
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop'
        },
        {
          title: 'Upload Photos',
          content: 'Add high-quality photos showcasing your property\'s best features. First photo becomes the main image.',
          tips: [
            'Take photos during daytime with good natural light',
            'Clean and stage rooms before photographing',
            'Include exterior, interior, and special feature photos'
          ],
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop'
        },
        {
          title: 'Write Description',
          content: 'Create an engaging description highlighting unique features, location benefits, and nearby amenities.',
          tips: [
            'Mention nearby schools, shopping, and transportation',
            'Highlight unique features and recent upgrades',
            'Keep it informative but concise'
          ],
          image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop'
        },
        {
          title: 'Review and Publish',
          content: 'Preview your listing, make any necessary edits, then publish. Your listing will be live within 24 hours.',
          tips: [
            'Proofread all text for errors',
            'Verify contact information is correct',
            'Monitor and respond to inquiries promptly'
          ],
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop'
        }
      ]
    },
    'account': {
      title: 'Managing Your Account',
      description: 'Learn how to manage your profile, settings, and account preferences.',
      steps: [
        {
          title: 'Profile Settings',
          content: 'Update your personal information, contact details, and profile photo from the Settings page.',
          tips: [
            'Keep your contact information current',
            'Use a professional profile photo',
            'Update preferences as your needs change'
          ],
          image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop'
        },
        {
          title: 'Notification Preferences',
          content: 'Choose how you want to receive updates about new properties, price changes, and messages.',
          tips: [
            'Set up email alerts for new listings in your area',
            'Choose SMS notifications for urgent updates',
            'Customize frequency to avoid overwhelming notifications'
          ],
          image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop'
        },
        {
          title: 'Saved Searches',
          content: 'Manage your saved search criteria and receive automatic notifications for matching properties.',
          tips: [
            'Name your searches descriptively',
            'Update search criteria as your needs evolve',
            'Delete outdated searches to reduce clutter'
          ],
          image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=250&fit=crop'
        },
        {
          title: 'Privacy & Security',
          content: 'Manage your privacy settings, change passwords, and control who can contact you.',
          tips: [
            'Use two-factor authentication for added security',
            'Review privacy settings regularly',
            'Never share login credentials with others'
          ],
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop'
        }
      ]
    },
    'agents': {
      title: 'Working with Real Estate Agents',
      description: 'Learn how to find, contact, and work effectively with real estate professionals.',
      steps: [
        {
          title: 'Finding the Right Agent',
          content: 'Browse our agent directory, filter by location and specialty, and read reviews from past clients.',
          tips: [
            'Look for agents with experience in your area',
            'Check ratings and read client reviews',
            'Consider agents who specialize in your property type'
          ],
          image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop'
        },
        {
          title: 'Contacting Agents',
          content: 'Use our contact form, call directly, or email agents. Provide clear information about your needs.',
          tips: [
            'Be specific about your requirements and timeline',
            'Ask about their experience and recent sales',
            'Inquire about their communication style and availability'
          ],
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=250&fit=crop'
        },
        {
          title: 'Initial Consultation',
          content: 'Meet with potential agents to discuss your needs, their services, and commission structure.',
          tips: [
            'Come prepared with questions about the local market',
            'Discuss your budget and timeline openly',
            'Ask for references from recent clients'
          ],
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop'
        },
        {
          title: 'Working Together',
          content: 'Establish clear communication expectations, review properties together, and trust their expertise.',
          tips: [
            'Provide honest feedback about properties you view',
            'Stay in regular contact throughout the process',
            'Be responsive to their recommendations and advice'
          ],
          image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop'
        }
      ]
    },
    'safety': {
      title: 'Safety and Security Tips',
      description: 'Stay safe while buying, selling, or renting properties online.',
      steps: [
        {
          title: 'Verify Listings',
          content: 'Always verify property listings and agent credentials. Look for the "Verified" badge on listings.',
          tips: [
            'Cross-check property details with public records',
            'Verify agent licenses with local real estate boards',
            'Be suspicious of prices significantly below market value'
          ],
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop'
        },
        {
          title: 'Safe Meeting Practices',
          content: 'When meeting agents or viewing properties, prioritize your personal safety.',
          tips: [
            'Meet in public places for initial meetings',
            'Bring a friend or family member to property viewings',
            'Let someone know your schedule and locations'
          ],
          image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop'
        },
        {
          title: 'Financial Protection',
          content: 'Protect yourself from scams and fraudulent financial requests.',
          tips: [
            'Never wire money or pay fees upfront',
            'Use escrow services for large transactions',
            'Verify all payment requests independently'
          ],
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop'
        },
        {
          title: 'Red Flags to Watch',
          content: 'Learn to identify common scams and suspicious activities in real estate transactions.',
          tips: [
            'Be wary of properties priced well below market value',
            'Avoid agents who pressure you to make quick decisions',
            'Report suspicious listings or behavior to our team'
          ],
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop'
        }
      ]
    },
    'mobile': {
      title: 'Using the Mobile App',
      description: 'Get the most out of our mobile app for property searching on the go.',
      steps: [
        {
          title: 'Download and Setup',
          content: 'Download the EstateHub app from your app store and sign in with your existing account.',
          tips: [
            'Enable location services for nearby property searches',
            'Allow push notifications for instant updates',
            'Sync your favorites and saved searches'
          ],
          image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop'
        },
        {
          title: 'Mobile Search Features',
          content: 'Use GPS-based search, map view, and voice search to find properties while mobile.',
          tips: [
            'Use the map view to search specific neighborhoods',
            'Try voice search while driving',
            'Save properties you drive by using quick save'
          ],
          image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=250&fit=crop'
        },
        {
          title: 'Photo and Video Features',
          content: 'Take photos and videos during property visits, add notes, and share with others.',
          tips: [
            'Use the built-in camera for quick property photos',
            'Add voice notes during property tours',
            'Share properties instantly via social media or messaging'
          ],
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop'
        },
        {
          title: 'Offline Features',
          content: 'Access saved properties and agent contacts even without internet connection.',
          tips: [
            'Download property details for offline viewing',
            'Save agent contact information locally',
            'Use offline mode during property tours in remote areas'
          ],
          image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop'
        }
      ]
    },
    'troubleshooting': {
      title: 'Troubleshooting Common Issues',
      description: 'Solve common problems and get help when you need it.',
      steps: [
        {
          title: 'Login and Account Issues',
          content: 'Resolve problems with signing in, password resets, and account verification.',
          tips: [
            'Check spam folder for verification emails',
            'Try clearing browser cache and cookies',
            'Ensure you\'re using the correct email address'
          ],
          image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop'
        },
        {
          title: 'Search and Filter Problems',
          content: 'Fix issues with search results, filters not working, or missing properties.',
          tips: [
            'Try broadening your search criteria',
            'Clear filters and search again',
            'Check if you\'re searching in the correct area'
          ],
          image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=250&fit=crop'
        },
        {
          title: 'Photo and Upload Issues',
          content: 'Solve problems with uploading photos, slow loading times, and image quality.',
          tips: [
            'Ensure photos are under 10MB each',
            'Use JPEG or PNG formats only',
            'Try uploading photos one at a time'
          ],
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop'
        },
        {
          title: 'Getting Additional Help',
          content: 'When to contact support and how to get the fastest resolution to your problems.',
          tips: [
            'Check our FAQ section first for quick answers',
            'Include screenshots when reporting issues',
            'Provide detailed information about the problem'
          ],
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop'
        }
      ]
    }
  };

  const toggleStep = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  const currentContent = guideContent[activeSection];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-slate-900 text-white py-16'>
        <div className='max-w-6xl mx-auto px-3'>
          <h1 className='text-4xl lg:text-5xl font-bold mb-4'>
            📚 EstateHub User Guide
          </h1>
          <p className='text-gray-300 text-lg max-w-2xl'>
            Complete guide to using EstateHub. Learn everything from basic search to advanced features for buying, selling, and renting properties.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-3 py-12'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar Navigation */}
          <div className='lg:w-1/4'>
            <div className='bg-slate-900 sh rounded-lg shadow-lg shadow-slate-600 p-6 sticky top-8'>
              <h2 className='text-xl font-semibold text-white mb-4'>Guide Sections</h2>
              <nav className='space-y-2 '>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setExpandedStep(null);
                    }}
                    className={`w-full text-left text-white p-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-blue-800 border-l-4 border-blue-600'
                        : 'hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span className='mr-3'>{section.icon}</span>
                    {section.title.replace(/^🚀|🔍|📋|👤|👥|🛡️|📱|🔧\s/, '')}
                  </button>
                ))}
              </nav>

              {/* Quick Links */}
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <h3 className='text-sm font-semibold text-white mb-3'>Quick Links</h3>
                <div className='space-y-2 text-sm'>
                  <Link to='/help' className='block text-blue-400 hover:underline'>
                    📞 Contact Support
                  </Link>
                  <Link to='/tutorials' className='block text-blue-400 hover:underline'>
                    🎥 Video Tutorials
                  </Link>
                  <Link to='/community' className='block text-blue-400 hover:underline'>
                    💬 Community Forum
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:w-3/4'>
            <div className='bg-white rounded-lg shadow-md p-8'>
              {/* Section Header */}
              <div className='mb-8'>
                <h2 className='text-3xl font-bold text-slate-800 mb-4'>
                  {currentContent.title}
                </h2>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  {currentContent.description}
                </p>
              </div>

              {/* Steps */}
              <div className='space-y-6'>
                {currentContent.steps.map((step, index) => (
                  <div key={index} className='border border-gray-200 rounded-lg overflow-hidden'>
                    <button
                      onClick={() => toggleStep(index)}
                      className='w-full text-left p-6 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          <div className='w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4'>
                            {index + 1}
                          </div>
                          <h3 className='text-xl font-semibold text-slate-800'>
                            {step.title}
                          </h3>
                        </div>
                        <span className={`text-2xl text-blue-600 transition-transform ${
                          expandedStep === index ? 'rotate-45' : ''
                        }`}>
                          +
                        </span>
                      </div>
                    </button>
                    
                    {expandedStep === index && (
                      <div className='px-6 pb-6'>
                        <div className='ml-12'>
                          {/* Step Image */}
                          <img
                            src={step.image}
                            alt={step.title}
                            className='w-full max-w-md h-48 object-cover rounded-lg mb-4'
                          />
                          
                          {/* Step Description */}
                          <p className='text-gray-700 mb-4 leading-relaxed'>
                            {step.content}
                          </p>
                          
                          {/* Tips */}
                          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                            <h4 className='font-semibold text-blue-800 mb-2 flex items-center'>
                              💡 Pro Tips
                            </h4>
                            <ul className='space-y-2'>
                              {step.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className='text-blue-700 text-sm flex items-start'>
                                  <span className='text-blue-500 mr-2 mt-1'>•</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className='mt-12 pt-8 border-t border-gray-200 flex justify-between items-center'>
                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex > 0) {
                      setActiveSection(sections[currentIndex - 1].id);
                      setExpandedStep(null);
                    }
                  }}
                  disabled={sections.findIndex(s => s.id === activeSection) === 0}
                  className='flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  ← Previous Section
                </button>

                <span className='text-sm text-gray-500'>
                  {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
                </span>

                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex < sections.length - 1) {
                      setActiveSection(sections[currentIndex + 1].id);
                      setExpandedStep(null);
                    }
                  }}
                  disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
                  className='flex items-center px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Next Section →
                </button>
              </div>

              {/* Need More Help */}
              <div className='mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6'>
                <h3 className='text-lg font-semibold text-blue-800 mb-3'>
                  🤝 Need More Help?
                </h3>
                <p className='text-blue-700 mb-4'>
                  Can't find what you're looking for? Our support team is here to help you succeed with EstateHub.
                </p>
                <div className='flex flex-wrap gap-3'>
                  <Link
                    to='/help'
                    className='bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium'
                  >
                    Contact Support
                  </Link>
                  <Link
                    to='/tutorials'
                    className='bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium'
                  >
                    Watch Videos
                  </Link>
                  <Link
                    to='/community'
                    className='bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium'
                  >
                    Join Community
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}