import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import ProductDetail from './pages/ProductDetail';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();
  if (loading) return <div>{t('loading')}</div>;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-vh-100">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-right" />
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
