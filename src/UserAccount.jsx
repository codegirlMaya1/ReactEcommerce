import React, { useState, useEffect } from 'react';

const UserAccount = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '', address: '', profilePicture: '' });
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || { username: 'Guest' };
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setUser(storedUser);
    setOrders(storedOrders.filter(order => order.user === storedUser.username));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, profilePicture: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    alert('Profile updated successfully!');
    window.dispatchEvent(new Event('storage')); // Trigger storage event to update navbar
  };

  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

  return (
    <div>
      <h2>User Account</h2>
      <div className="card">
        <h3>Update Information</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
          <input type="tel" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" required />
          <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Shipping Address" required />
          <input type="file" onChange={handleProfilePictureChange} />
          <button type="submit">Update Profile</button>
        </form>
      </div>
      <div className="card">
        <h3>Profile Information</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address}</p>
      </div>
      <div className="card">
        <h3>Profile Picture</h3>
        {user.profilePicture ? (
          <img src={user.profilePicture} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        ) : (
          <p>No profile picture uploaded</p>
        )}
      </div>
      <button onClick={toggleOrders}>{showOrders ? 'Hide' : 'Show'} Past Orders</button>
      {showOrders && (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Order #{order.id}
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAccount;
