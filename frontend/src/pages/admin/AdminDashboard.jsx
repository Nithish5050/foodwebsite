import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/stats');
      setStats(response.data.stats);
    } catch (err) {
      setError('Failed to load statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="section-title">👨‍💼 Admin Dashboard</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Statistics Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card p-8 text-center">
              <p className="text-4xl font-bold text-primary">{stats.totalRecipes}</p>
              <p className="text-gray-600 mt-2">Total Recipes</p>
            </div>
            <div className="card p-8 text-center">
              <p className="text-4xl font-bold text-secondary">{stats.totalUsers}</p>
              <p className="text-gray-600 mt-2">Total Users</p>
            </div>
            <div className="card p-8 text-center">
              <p className="text-4xl font-bold text-green-500">{stats.veggieRecipes}</p>
              <p className="text-gray-600 mt-2">Vegetarian Recipes</p>
            </div>
            <div className="card p-8 text-center">
              <p className="text-4xl font-bold text-red-500">{stats.nonVeggieRecipes}</p>
              <p className="text-gray-600 mt-2">Non-Veg Recipes</p>
            </div>
          </div>
        )}

        {/* Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/manage-recipes" className="card p-8 hover:shadow-xl transition">
            <p className="text-2xl mb-2">📚 Manage Recipes</p>
            <p className="text-gray-600">Edit, delete, and view all recipes</p>
          </Link>
          <Link to="/admin/manage-users" className="card p-8 hover:shadow-xl transition">
            <p className="text-2xl mb-2">👥 Manage Users</p>
            <p className="text-gray-600">View and manage user accounts and roles</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
