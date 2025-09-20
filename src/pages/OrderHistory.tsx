
import React from 'react';
import Layout from '../components/Layout';
import OrderHistory from '../components/OrderHistory';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const { user, isLoading } = useAuth();
  
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <p className="text-center">Loading...</p>
        </div>
      </Layout>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center text-farm-green-dark mb-8">
          Your Order History
        </h1>
        <div className="max-w-4xl mx-auto">
          <OrderHistory />
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistoryPage;
