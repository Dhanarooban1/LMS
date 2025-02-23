import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Books from './components/Books'
import Members from './components/Members'
import Issuance from './components/Issuance'
import Login from './components/Login'
import Layout from './components/Layout'
import axios from 'axios'

function App() {

  const [pendingReturns, setPendingReturns] = useState([]);

  const fetchData = async (date) => {
    try {
      const response = await axios.get(`http://localhost:8998/api/dashboard/pending-returns?date=${date}`, {
        headers: {
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJpYXQiOjE3NDAzMTY5NTcsImV4cCI6MTc0MjkwODk1N30.Q4fZ8oqzdTj5jdVSa94L1krYaX2qYT0xLf3d_SMnYLQ'
        }
      });
      setPendingReturns(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Router>
      <Layout>
        <Routes>
        <Route path="/dashboard" element={<Dashboard pendingReturns={pendingReturns} fetchData={fetchData} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/members" element={<Members />} />
          <Route path="/issuance" element={<Issuance />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App