import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [orderIdFilter, setOrderIdFilter] = useState(''); // For filtering by order ID

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, userFilter, minPrice, maxPrice, orderIdFilter]); // Added orderIdFilter dependency

  useEffect(() => {
    fetchUsers();
  }, []); // Only fetch users once on component mount

  // Fetch orders based on filters
  const fetchOrders = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (userFilter) params.userId = userFilter;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (orderIdFilter) params._id = orderIdFilter; // Add filter for order ID

      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params, // Pass params here
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch users for the user filter
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setOrders(orders.map(order => (order._id === orderId ? response.data : order)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        {/* Status Filter */}
        <select
          className="border p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>

        {/* User Filter */}
        <select
          className="border p-2"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        >
          <option value="">All Users</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        {/* Price Filters */}
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        {/* Order ID Filter */}
        <input
          type="text"
          placeholder="Filter by Order ID"
          className="border p-2"
          value={orderIdFilter}
          onChange={(e) => setOrderIdFilter(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.userId?.name || 'Unknown'}</td>
              <td className="border px-4 py-2">{order.userId?.email || 'Unknown'}</td>
              <td className="border px-4 py-2">
                ${order.total ? order.total.toFixed(2) : '0.00'}
              </td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
                <select
                  className="border p-2"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderManager;
