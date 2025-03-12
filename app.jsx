import React, { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: 1
  });
  const [bookings, setBookings] = useState([]);

  // Mock destinations data
  const destinations = [
    {
      id: 1,
      name: 'Lunar Resort',
      description: 'Experience low gravity and breathtaking Earth views at our premium Lunar facility.',
      price: 1500000,
      image: '/api/placeholder/400/200',
      duration: '7-14 days'
    },
    {
      id: 2,
      name: 'Mars Colony Tour',
      description: 'Visit the first human settlement on the Red Planet. Experience the frontier of space colonization.',
      price: 2500000,
      image: '/api/placeholder/400/200',
      duration: '30-60 days'
    },
    {
      id: 3,
      name: 'Orbital Space Station',
      description: 'Enjoy the ultimate view of Earth from our luxury orbital hotel with zero-gravity recreation areas.',
      price: 750000,
      image: '/api/placeholder/400/200',
      duration: '3-10 days'
    }
  ];

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock authentication (in a real app, this would be server-side)
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      setActiveTab('destinations');
    } else {
      alert('Invalid credentials. Try user/password');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  // Handle booking form submission
  const handleBooking = (e) => {
    e.preventDefault();
    const newBooking = {
      ...bookingDetails,
      id: Date.now(),
      status: 'Confirmed',
      destinationName: destinations.find(d => d.id.toString() === bookingDetails.destination).name
    };
    setBookings([...bookings, newBooking]);
    setActiveTab('myBookings');
    setBookingDetails({
      destination: '',
      departureDate: '',
      returnDate: '',
      travelers: 1
    });
  };

  // Select a destination for detailed view
  const viewDestination = (destination) => {
    setSelectedDestination(destination);
    setActiveTab('destinationDetail');
  };

  // Handle booking details change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  // Render login form
  const renderLoginForm = () => (
    <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Login to Cosmic Voyages</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Use username: "user" and password: "password" to login
      </p>
    </div>
  );

  // Render home page
  const renderHome = () => (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Cosmic Voyages</h1>
        <p className="text-xl">Your Gateway to the Stars</p>
      </div>
      
      <div className="bg-gray-800 text-white p-8 rounded-lg mb-12 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Begin Your Space Adventure</h2>
          <p className="mb-6">Experience the wonder of space travel with our premium vacation packages.</p>
          <button 
            onClick={() => setActiveTab('login')} 
            className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Luxury Accommodations</h3>
          <p>Experience zero-gravity suites and panoramic Earth views.</p>
        </div>
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Expert Guides</h3>
          <p>Former astronauts and space scientists lead all expeditions.</p>
        </div>
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Safety First</h3>
          <p>Our fleet features the latest in space travel safety technology.</p>
        </div>
      </div>
    </div>
  );

  // Render destinations page
  const renderDestinations = () => (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Space Destinations</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {destinations.map((destination) => (
          <div key={destination.id} className="border rounded-lg overflow-hidden">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
              <p className="mb-4 text-gray-700">{destination.description}</p>
              <div className="flex justify-between items-center">
                <p className="font-bold">${(destination.price).toLocaleString()}</p>
                <button 
                  onClick={() => viewDestination(destination)} 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render destination detail page
  const renderDestinationDetail = () => {
    if (!selectedDestination) return null;
    
    return (
      <div className="max-w-4xl mx-auto my-8 px-4">
        <button 
          onClick={() => setActiveTab('destinations')} 
          className="mb-4 text-blue-600 hover:underline flex items-center"
        >
          ← Back to Destinations
        </button>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <img 
            src={selectedDestination.image} 
            alt={selectedDestination.name} 
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">{selectedDestination.name}</h2>
            <p className="text-lg mb-4">{selectedDestination.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Trip Details</h3>
                <p><strong>Duration:</strong> {selectedDestination.duration}</p>
                <p><strong>Price:</strong> ${selectedDestination.price.toLocaleString()} per person</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Includes</h3>
                <ul className="list-disc pl-5">
                  <li>Return space transportation</li>
                  <li>Accommodation</li>
                  <li>Space-certified meals</li>
                  <li>Guided excursions</li>
                  <li>Emergency evacuation insurance</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Book This Trip</h3>
            <form onSubmit={handleBooking} className="space-y-4">
              <input 
                type="hidden" 
                name="destination" 
                value={selectedDestination.id} 
                onChange={handleInputChange}
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Departure Date</label>
                  <input 
                    type="date" 
                    name="departureDate"
                    value={bookingDetails.departureDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Return Date</label>
                  <input 
                    type="date" 
                    name="returnDate"
                    value={bookingDetails.returnDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Number of Travelers</label>
                <input 
                  type="number" 
                  name="travelers"
                  value={bookingDetails.travelers}
                  onChange={handleInputChange}
                  min="1" 
                  max="10"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Render my bookings page
  const renderMyBookings = () => (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-lg mb-4">You don't have any bookings yet.</p>
          <button 
            onClick={() => setActiveTab('destinations')} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Explore Destinations
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{booking.destinationName}</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {booking.status}
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">Departure</p>
                  <p>{booking.departureDate}</p>
                </div>
                <div>
                  <p className="font-medium">Return</p>
                  <p>{booking.returnDate}</p>
                </div>
                <div>
                  <p className="font-medium">Travelers</p>
                  <p>{booking.travelers}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render navigation
  const renderNavigation = () => (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl">Cosmic Voyages</div>
          
          <div className="hidden md:flex space-x-4">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded ${activeTab === 'home' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              Home
            </button>
            
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => setActiveTab('destinations')}
                  className={`px-3 py-2 rounded ${activeTab === 'destinations' || activeTab === 'destinationDetail' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  Destinations
                </button>
                <button 
                  onClick={() => setActiveTab('myBookings')}
                  className={`px-3 py-2 rounded ${activeTab === 'myBookings' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  My Bookings
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => setActiveTab('login')}
                className={`px-3 py-2 rounded ${activeTab === 'login' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {renderNavigation()}
      
      <main className="flex-grow">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'login' && renderLoginForm()}
        {isLoggedIn && activeTab === 'destinations' && renderDestinations()}
        {isLoggedIn && activeTab === 'destinationDetail' && renderDestinationDetail()}
        {isLoggedIn && activeTab === 'myBookings' && renderMyBookings()}
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2025 Cosmic Voyages. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
