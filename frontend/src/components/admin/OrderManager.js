import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [orderIdFilter, setOrderIdFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' }); // For sorting

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, userFilter, minPrice, maxPrice, orderIdFilter, sortConfig]); // Added sortConfig dependency

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch orders based on filters
  const fetchOrders = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (userFilter) params.userId = userFilter;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (orderIdFilter) params._id = orderIdFilter; // Include orderIdFilter for server-side filtering

      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params,
      });

      // Filter orders on the frontend by orderIdFilter (if it is set)
      let filteredOrders = response.data;
      if (orderIdFilter) {
        filteredOrders = filteredOrders.filter((order) =>
          order._id.toLowerCase().includes(orderIdFilter.toLowerCase())
        );
      }

      // Apply sorting
      const sortedOrders = sortOrders(filteredOrders, sortConfig.key, sortConfig.direction);
      setOrders(sortedOrders);
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

  // Sort orders based on the column and direction
  const sortOrders = (orders, key, direction) => {
    if (!key) return orders; // If no key is selected, return unsorted

    const sortedOrders = [...orders].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedOrders;
  };

  const handleSort = (columnKey) => {
    const newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({
      key: columnKey,
      direction: newDirection,
    });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Send PATCH request to update order status
      const response = await axios.patch(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      // Update the orders in state by mapping the updated order
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Sorting arrows
  const getArrow = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '';
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
          {users.map((user) => (
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
          onChange={(e) => setOrderIdFilter(e.target.value)} // Ensure the value of orderIdFilter is updated
        />
      </div>

      {/* Orders Table */}
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort('_id')}
            >
              Order ID {getArrow('_id')}
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort('userId.name')}
            >
              Customer {getArrow('userId.name')}
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort('userId.email')}
            >
              Email {getArrow('userId.email')}
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort('total')}
            >
              Total {getArrow('total')}
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status {getArrow('status')}
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort('createdAt')}
            >
              Created At {getArrow('createdAt')}
            </th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.userId?.name || 'Unknown'}</td>
              <td className="border px-4 py-2">{order.userId?.email || 'Unknown'}</td>
              <td className="border px-4 py-2">
                ${order.total ? order.total.toFixed(2) : '0.00'}
              </td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>
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
