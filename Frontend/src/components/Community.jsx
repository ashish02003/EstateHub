import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Community() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostModal, setNewPostModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  const categories = [
    { id: 'all', name: 'All Discussions', icon: '💬', count: 0, color: 'bg-gray-100 text-gray-800' },
    { id: 'buying', name: 'Home Buying', icon: '🏠', count: 0, color: 'bg-blue-100 text-blue-800' },
    { id: 'selling', name: 'Home Selling', icon: '🏡', count: 0, color: 'bg-green-100 text-green-800' },
    { id: 'renting', name: 'Rentals', icon: '🔑', count: 0, color: 'bg-purple-100 text-purple-800' },
    { id: 'investment', name: 'Real Estate Investment', icon: '💰', count: 0, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'market', name: 'Market Trends', icon: '📈', count: 0, color: 'bg-red-100 text-red-800' },
    { id: 'legal', name: 'Legal & Finance', icon: '⚖️', count: 0, color: 'bg-indigo-100 text-indigo-800' },
    { id: 'tips', name: 'Tips & Advice', icon: '💡', count: 0, color: 'bg-orange-100 text-orange-800' },
    { id: 'success', name: 'Success Stories', icon: '🎉', count: 0, color: 'bg-pink-100 text-pink-800' }
  ];

  const posts = [
    {
      id: 1,
      title: 'First-time buyer - What should I know about inspections?',
      content: 'I\'m about to make my first home purchase and wondering what to expect during the home inspection process. What are the most important things to look for?',
      author: 'Sarah M.',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=50&h=50&fit=crop&crop=face',
      category: 'buying',
      tags: ['first-time-buyer', 'home-inspection', 'advice'],
      timestamp: '2 hours ago',
      replies: 8,
      likes: 15,
      views: 142,
      isHelpful: true,
      isFeatured: false,
      replies_data: [
        {
          id: 1,
          author: 'Mike R.',
          authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
          content: 'Great question! Focus on structural issues, electrical, plumbing, and HVAC systems. Don\'t worry about cosmetic issues you can fix later.',
          timestamp: '1 hour ago',
          likes: 5
        },
        {
          id: 2,
          author: 'Jennifer L.',
          authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
          content: 'Make sure to attend the inspection if possible. Ask questions and take notes. The inspector should explain any issues they find.',
          timestamp: '30 minutes ago',
          likes: 3
        }
      ]
    },
    {
      id: 2,
      title: 'Successfully sold my house in 3 days! Here\'s how',
      content: 'Just closed on my house sale and wanted to share what worked for us. Professional photography and staging made all the difference!',
      author: 'David Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      category: 'success',
      tags: ['success-story', 'selling-tips', 'staging'],
      timestamp: '5 hours ago',
      replies: 12,
      likes: 28,
      views: 234,
      isHelpful: true,
      isFeatured: true,
      replies_data: []
    },
    {
      id: 3,
      title: 'Rental market trends in Austin - What are you seeing?',
      content: 'Looking to invest in rental properties in Austin. What are the current trends for rental rates and demand in different neighborhoods?',
      author: 'Lisa Park',
      authorAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop&crop=face',
      category: 'investment',
      tags: ['austin', 'rental-market', 'investment'],
      timestamp: '1 day ago',
      replies: 6,
      likes: 11,
      views: 189,
      isHelpful: false,
      isFeatured: false,
      replies_data: []
    },
    {
      id: 4,
      title: 'Question about closing costs - Help!',
      content: 'Can someone explain what closing costs typically include? I\'m getting different estimates from different lenders and feeling confused.',
      author: 'Tom Wilson',
      authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=face',
      category: 'legal',
      tags: ['closing-costs', 'financing', 'help'],
      timestamp: '2 days ago',
      replies: 9,
      likes: 7,
      views: 156,
      isHelpful: false,
      isFeatured: false,
      replies_data: []
    },
    {
      id: 5,
      title: 'Best neighborhoods for families in Seattle?',
      content: 'Moving to Seattle with two young kids. Looking for recommendations on family-friendly neighborhoods with good schools and parks.',
      author: 'Amanda R.',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      category: 'buying',
      tags: ['seattle', 'family-friendly', 'neighborhoods'],
      timestamp: '3 days ago',
      replies: 15,
      likes: 22,
      views: 298,
      isHelpful: true,
      isFeatured: false,
      replies_data: []
    },
    {
      id: 6,
      title: 'How to deal with bidding wars?',
      content: 'Lost out on 3 houses due to bidding wars. Any strategies for competing in this market without overpaying?',
      author: 'Carlos M.',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      category: 'buying',
      tags: ['bidding-war', 'competitive-market', 'strategy'],
      timestamp: '4 days ago',
      replies: 11,
      likes: 18,
      views: 267,
      isHelpful: true,
      isFeatured: false,
      replies_data: []
    },
    {
      id: 7,
      title: 'Landlord responsibilities vs tenant rights?',
      content: 'New landlord here. What are my legal obligations and what can I expect from tenants? Any resources you\'d recommend?',
      author: 'Emma Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=50&h=50&fit=crop&crop=face',
      category: 'renting',
      tags: ['landlord', 'tenant-rights', 'legal'],
      timestamp: '5 days ago',
      replies: 7,
      likes: 9,
      views: 134,
      isHelpful: false,
      isFeatured: false,
      replies_data: []
    },
    {
      id: 8,
      title: '2024 Market Predictions - What do you think?',
      content: 'With interest rates changing and inventory levels fluctuating, what are your predictions for the real estate market in 2024?',
      author: 'Robert Lee',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      category: 'market',
      tags: ['market-predictions', '2024', 'trends'],
      timestamp: '1 week ago',
      replies: 23,
      likes: 35,
      views: 456,
      isHelpful: true,
      isFeatured: true,
      replies_data: []
    }
  ];

  const communityStats = {
    totalMembers: 12845,
    totalPosts: 3267,
    totalReplies: 8934,
    activeToday: 234
  };

  // Filter posts based on category and search term
  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    console.log('New post submitted:', newPost);
    alert('Post created successfully! It will be reviewed and published shortly.');
    setNewPostModal(false);
    setNewPost({ title: '', content: '', category: '', tags: '' });
  };

  const handleInputChange = (e) => {
    setNewPost(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-slate-900 text-white py-16'>
        <div className='max-w-6xl mx-auto px-3'>
          <h1 className='text-4xl lg:text-5xl font-bold mb-4'>
            💬 EstateHub Community
          </h1>
          <p className='text-gray-300 text-lg max-w-2xl mb-6'>
            Connect with fellow real estate enthusiasts. Share experiences, ask questions, and learn from others in our supportive community.
          </p>
          
          {/* Community Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-700 rounded-lg p-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-400'>{formatNumber(communityStats.totalMembers)}</div>
              <div className='text-sm text-gray-300'>Members</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-400'>{formatNumber(communityStats.totalPosts)}</div>
              <div className='text-sm text-gray-300'>Discussions</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-yellow-400'>{formatNumber(communityStats.totalReplies)}</div>
              <div className='text-sm text-gray-300'>Replies</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-400'>{communityStats.activeToday}</div>
              <div className='text-sm text-gray-300'>Active Today</div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-3 py-12'>
        {/* Tab Navigation */}
        <div className='bg-white rounded-lg shadow-md mb-8'>
          <div className='flex border-b border-gray-200'>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'discussions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              💬 Discussions
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'featured'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ⭐ Featured
            </button>
            <button
              onClick={() => setActiveTab('helpful')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'helpful'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🆘 Most Helpful
            </button>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar */}
          <div className='lg:w-1/4'>
            <div className='bg-slate-900 rounded-lg shadow-md shadow-slate-600 p-6 mb-6'>
              <button
                onClick={() => setNewPostModal(true)}
                className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-6'
              >
                ✏️ Start New Discussion
              </button>

              {/* Search */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-white mb-2'>Search Discussions</label>
                <input
                  type='text'
                  placeholder='Search posts, tags, or content...'
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
                    <span className='text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full'>
                      {posts.filter(p => category.id === 'all' || p.category === category.id).length}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Community Guidelines */}
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
              <h4 className='font-semibold text-blue-800 mb-3'>📋 Community Guidelines</h4>
              <ul className='space-y-2 text-blue-700 text-sm'>
                <li>• Be respectful and professional</li>
                <li>• No spam or self-promotion</li>
                <li>• Share accurate information</li>
                <li>• Help others when you can</li>
                <li>• Report inappropriate content</li>
              </ul>
              <Link to='/community-rules' className='text-blue-600 text-sm hover:underline mt-3 inline-block'>
                Read Full Guidelines →
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:w-3/4'>
            {/* Results Header */}
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h2 className='text-2xl font-semibold text-slate-800'>
                  {activeTab === 'discussions' && selectedCategory === 'all' && 'All Discussions'}
                  {activeTab === 'discussions' && selectedCategory !== 'all' && 
                   categories.find(c => c.id === selectedCategory)?.name}
                  {activeTab === 'featured' && 'Featured Discussions'}
                  {activeTab === 'helpful' && 'Most Helpful Discussions'}
                </h2>
                <p className='text-gray-600'>
                  {filteredPosts.length} discussion{filteredPosts.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              {/* Sort Options */}
              <select className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
                <option>Latest</option>
                <option>Most Replies</option>
                <option>Most Liked</option>
                <option>Most Viewed</option>
              </select>
            </div>

            {/* Posts List */}
            <div className='space-y-4'>
              {filteredPosts
                .filter(post => {
                  if (activeTab === 'featured') return post.isFeatured;
                  if (activeTab === 'helpful') return post.isHelpful;
                  return true;
                })
                .map((post) => (
                <div key={post.id} className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6'>
                  {/* Post Header */}
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center'>
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className='w-10 h-10 rounded-full object-cover mr-3'
                      />
                      <div>
                        <h3 
                          className='text-lg font-semibold text-slate-800 hover:text-blue-600 cursor-pointer'
                          onClick={() => setSelectedPost(post)}
                        >
                          {post.title}
                        </h3>
                        <div className='flex items-center text-sm text-gray-500'>
                          <span>{post.author}</span>
                          <span className='mx-2'>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className='flex gap-2'>
                      {post.isFeatured && (
                        <span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium'>
                          ⭐ Featured
                        </span>
                      )}
                      {post.isHelpful && (
                        <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>
                          🆘 Helpful
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Post Content Preview */}
                  <p className='text-gray-700 mb-4 line-clamp-3'>{post.content}</p>

                  {/* Tags */}
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs hover:bg-gray-200 cursor-pointer'
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Stats */}
                  <div className='flex items-center justify-between text-sm text-gray-500'>
                    <div className='flex items-center gap-4'>
                      <span className='flex items-center'>
                        <span className='mr-1'>💬</span>
                        {post.replies} replies
                      </span>
                      <span className='flex items-center'>
                        <span className='mr-1'>👍</span>
                        {post.likes} likes
                      </span>
                      <span className='flex items-center'>
                        <span className='mr-1'>👁️</span>
                        {post.views} views
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedPost(post)}
                      className='text-blue-600 hover:text-blue-800 font-medium'
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className='text-center py-12'>
                <div className='text-6xl mb-4'>🤔</div>
                <h3 className='text-xl font-semibold text-slate-700 mb-2'>No discussions found</h3>
                <p className='text-gray-600 mb-4'>Try adjusting your search or category filter.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Show All Discussions
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {newPostModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              {/* Modal Header */}
              <div className='flex justify-between items-center mb-6'>
                <h3 className='text-2xl font-semibold text-slate-800'>✏️ Start New Discussion</h3>
                <button
                  onClick={() => setNewPostModal(false)}
                  className='text-gray-400 hover:text-gray-600 text-2xl'
                >
                  ×
                </button>
              </div>

              {/* New Post Form */}
              <form onSubmit={handleNewPostSubmit} className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Discussion Title</label>
                  <input
                    type='text'
                    name='title'
                    value={newPost.title}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='What would you like to discuss?'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Category</label>
                  <select
                    name='category'
                    value={newPost.category}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option value=''>Select a category</option>
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Content</label>
                  <textarea
                    name='content'
                    value={newPost.content}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Share your thoughts, ask questions, or provide advice to the community...'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Tags</label>
                  <input
                    type='text'
                    name='tags'
                    value={newPost.tags}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Add tags separated by commas (e.g., first-time-buyer, advice, help)'
                  />
                  <p className='text-xs text-gray-500 mt-1'>Tags help others find your discussion</p>
                </div>

                <div className='flex gap-4 pt-4'>
                  <button
                    type='submit'
                    className='flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium'
                  >
                    Post Discussion
                  </button>
                  <button
                    type='button'
                    onClick={() => setNewPostModal(false)}
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

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              {/* Modal Header */}
              <div className='flex justify-between items-start mb-6'>
                <div className='flex items-center'>
                  <img
                    src={selectedPost.authorAvatar}
                    alt={selectedPost.author}
                    className='w-12 h-12 rounded-full object-cover mr-4'
                  />
                  <div>
                    <h3 className='text-2xl font-semibold text-slate-800'>{selectedPost.title}</h3>
                    <div className='flex items-center text-sm text-gray-500 mt-1'>
                      <span>{selectedPost.author}</span>
                      <span className='mx-2'>•</span>
                      <span>{selectedPost.timestamp}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className='text-gray-400 hover:text-gray-600 text-2xl'
                >
                  ×
                </button>
              </div>

              {/* Post Content */}
              <div className='mb-6'>
                <p className='text-gray-700 leading-relaxed mb-4'>{selectedPost.content}</p>
                
                {/* Tags */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Post Actions */}
                <div className='flex items-center gap-4 text-sm text-gray-500 border-b border-gray-200 pb-4'>
                  <button className='flex items-center hover:text-blue-600 transition-colors'>
                    <span className='mr-1'>👍</span>
                    {selectedPost.likes} likes
                  </button>
                  <span className='flex items-center'>
                    <span className='mr-1'>💬</span>
                    {selectedPost.replies} replies
                  </span>
                  <span className='flex items-center'>
                    <span className='mr-1'>👁️</span>
                    {selectedPost.views} views
                  </span>
                </div>
              </div>

              {/* Replies Section */}
              <div className='space-y-4'>
                <h4 className='text-lg font-semibold text-slate-800'>Replies ({selectedPost.replies})</h4>
                
                {selectedPost.replies_data.map((reply) => (
                  <div key={reply.id} className='bg-gray-50 rounded-lg p-4'>
                    <div className='flex items-center mb-3'>
                      <img
                        src={reply.authorAvatar}
                        alt={reply.author}
                        className='w-8 h-8 rounded-full object-cover mr-3'
                      />
                      <div>
                        <span className='font-medium text-slate-800'>{reply.author}</span>
                        <span className='text-sm text-gray-500 ml-2'>{reply.timestamp}</span>
                      </div>
                    </div>
                    <p className='text-gray-700 mb-2'>{reply.content}</p>
                    <button className='flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors'>
                      <span className='mr-1'>👍</span>
                      {reply.likes} likes
                    </button>
                  </div>
                ))}

                {/* Reply Form */}
                <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
                  <h5 className='font-medium text-slate-800 mb-3'>Add Your Reply</h5>
                  <textarea
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3'
                    placeholder='Share your thoughts or provide helpful advice...'
                  />
                  <div className='flex justify-between items-center'>
                    <p className='text-xs text-gray-500'>Be respectful and constructive in your replies</p>
                    <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'>
                      Post Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Resources */}
      <div className='bg-white border-t border-gray-200 py-12'>
        <div className='max-w-6xl mx-auto px-3'>
          <div className='text-center mb-8'>
            <h3 className='text-2xl font-semibold text-slate-800 mb-4'>
              🤝 More Ways to Connect
            </h3>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Expand your real estate knowledge and network with these additional community resources.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center'>
              <div className='text-4xl mb-4'>📚</div>
              <h4 className='text-xl font-semibold text-blue-800 mb-2'>Knowledge Base</h4>
              <p className='text-blue-700 text-sm mb-4'>
                Browse comprehensive articles and guides written by real estate experts.
              </p>
              <Link
                to='/user-guide'
                className='inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
              >
                Browse Guides
              </Link>
            </div>

            <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center'>
              <div className='text-4xl mb-4'>🎥</div>
              <h4 className='text-xl font-semibold text-green-800 mb-2'>Video Tutorials</h4>
              <p className='text-green-700 text-sm mb-4'>
                Watch step-by-step tutorials covering all aspects of real estate.
              </p>
              <Link
                to='/tutorials'
                className='inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium'
              >
                Watch Videos
              </Link>
            </div>

            <div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center'>
              <div className='text-4xl mb-4'>🆘</div>
              <h4 className='text-xl font-semibold text-purple-800 mb-2'>Expert Support</h4>
              <p className='text-purple-700 text-sm mb-4'>
                Get personalized help from our support team and real estate professionals.
              </p>
              <Link
                to='/help'
                className='inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium'
              >
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}