
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Summary from './components/sections/Summary';
import ResearchAnalysis from './components/sections/ResearchAnalysis';
import Team from './components/sections/Team';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { MessageProvider } from './contexts/MessageContext';
import { useSiteConfig } from './hooks/useSiteConfig';

// Ana sayfa bileşeni
const HomePage = () => {
  const siteConfig = useSiteConfig();
  
  return (
    <div className="min-h-screen bg-dark-navy text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero siteConfig={siteConfig} />
        
        {/* Summary Section */}
        <Summary siteConfig={siteConfig} />
        
        {/* Research & Analysis Section */}
        <ResearchAnalysis siteConfig={siteConfig} />
        
        {/* Team Section */}
        <Team siteConfig={siteConfig} />
        
        {/* Contact Section */}
        <Contact siteConfig={siteConfig} />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-neutron-cyan rounded-full opacity-20"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-safety-yellow rounded-full opacity-30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-steel-blue rounded-full opacity-25"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'loop',
            delay: 2,
          }}
        />
      </div>
    </div>
  );
};

// Admin authentication context
const AdminAuthContext = React.createContext<{
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

// Admin authentication provider
const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = (username: string, password: string): boolean => {
    // Basit authentication - gerçek uygulamada API çağrısı yapılır
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Admin login wrapper bileşeni
const AdminLoginWrapper: React.FC = () => {
  const { login } = React.useContext(AdminAuthContext);
  
  return (
    <AdminLogin 
      onLogin={(username, password) => {
        return login(username, password);
      }}
    />
  );
};

// Protected route bileşeni
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = React.useContext(AdminAuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <MessageProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            {/* Ana sayfa */}
            <Route path="/" element={<HomePage />} />
            
            {/* Admin login sayfası */}
            <Route 
              path="/admin" 
              element={<AdminLoginWrapper />} 
            />
            
            {/* Admin dashboard - korumalı route */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Diğer admin route'ları */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AdminAuthProvider>
    </MessageProvider>
  );
}

export default App;