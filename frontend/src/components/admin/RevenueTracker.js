import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueTracker = () => {
  const [orderData, setOrderData] = useState([]);
  const [revenueByYear, setRevenueByYear] = useState({});

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
        calculateRevenueByYear(response.data); // Calculate revenue by year
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Prepare the data for the chart (only total money made per day)
  const chartData = orderData.map(order => ({
    date: new Date(order.createdAt).toLocaleDateString(),
    total: order.total, // Total money made per order
  }));

  // Calculate total revenue by year
  const calculateRevenueByYear = (data) => {
    const revenue = data.reduce((acc, order) => {
      const year = new Date(order.createdAt).getFullYear();
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += order.total; // Accumulate total revenue for each year
      return acc;
    }, {});

    setRevenueByYear(revenue);
  };

  // Format total revenue by year into a displayable format
  const revenueByYearDisplay = Object.keys(revenueByYear).map(year => ({
    year,
    totalRevenue: revenueByYear[year].toLocaleString(),
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Money Made Over Time</h3>

      {/* Display Total Revenue by Year */}
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2">Total Revenue by Year</h4>
        {revenueByYearDisplay.length ? (
          <ul className="list-none">
            {revenueByYearDisplay.map((data, idx) => (
              <li key={idx} className="mb-2">
                <span className="font-medium">{data.year}:</span> ${data.totalRevenue}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available.</p>
        )}
      </div>

      {/* Revenue Chart */}
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

export default RevenueTracker;
