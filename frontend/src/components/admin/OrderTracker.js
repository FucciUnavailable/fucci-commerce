import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OrderTracker = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Fetch orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });    
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Prepare the data for Recharts
  const chartData = orderData.map(order => ({
    date: new Date(order.createdAt).toLocaleDateString(),
    total: order.total,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Order Tracker</h3>
      {orderData.length ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#4bc0c0" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading order data...</p>
      )}
    </div>
  );
};

export default OrderTracker;
