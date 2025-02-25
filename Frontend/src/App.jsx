import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Books from './components/Books';
import Members from './components/Members';
import Issuance from './components/Issuance';
import AdminSignup from './components/AdminSignup';
import Layout from './components/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../Config';

function App() {
  const [pendingReturns, setPendingReturns] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const fetchData = async (date) => {
    try {
      const token = Cookies.get('authToken');
      
      const response = await axios.get(`${BASE_URL}/api/dashboard/pending-returns?date=${date}`, {
        headers: { authorization: token },
      });
      setPendingReturns(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard pendingReturns={pendingReturns} fetchData={fetchData} />
                </Layout>
              }
            />
            <Route
              path="/books"
              element={
                <Layout>
                  <Books />
                </Layout>
              }
            />
            <Route
              path="/members"
              element={
                <Layout>
                  <Members />
                </Layout>
              }
            />
            <Route
              path="/issuance"
              element={
                <Layout>
                  <Issuance />
                </Layout>
              }
            />
          </>
        ) : (
          <>
            <Route path="/" element={<AdminSignup />} />
            {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
