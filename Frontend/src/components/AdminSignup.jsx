import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import BASE_URL from '../../Config';

const AdminSignup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminName || !adminEmail || !adminPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (!isValidEmail(adminEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
   
    try {
    
      const response = await axios.post(`${BASE_URL}/api/admin/signup`, {
        admin_name: adminName,
        admin_email: adminEmail,
        password: adminPassword,
      });

      if (response.status === 201) {
        const token = response.data.token;
        Cookies.set("authToken", token, { expires: 30, secure: true, sameSite: "Strict" });
        setSuccessMessage("Signup successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        setErrorMessage(response.data.message || "Signup failed. Try again.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handleSignupClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="relative bg-black min-h-screen text-white">
      <div className="absolute h-screen w-[40%] flex flex-col items-center justify-center">
        <img
          className="w-[140px] h-[140px] rounded-full border-[3px] border-red-600 object-cover"
          src="../src/assets/Neil-Gaiman.png"
          alt="Neil Gaiman"
        />
        <p className="text-center mt-6 text-red-600 font-mono text-[22px] tracking-wide">
          "A book is a dream that you hold in your hand."
        </p>
        <p className="self-end pr-8 mt-2 italic font-medium">- Neil Gaiman</p>
      </div>

      <div className="ml-[40%] w-[60%] min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <h1 className="text-[40px] font-bold text-red-600 mb-8">Library Management System</h1>
        <button
          onClick={handleSignupClick}
          className="bg-red-600 hover:bg-red-800 text-white text-lg font-semibold py-3 px-8 rounded-full transition-colors duration-200"
        >
          Sign Up
        </button>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] transition-all duration-300 relative text-black">
              <button
                className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-600"
                onClick={handleClosePopup}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Admin Signup</h2>

              {errorMessage && <p className="text-red-600 text-sm text-center mb-4">{errorMessage}</p>}
              {successMessage && <p className="text-green-600 text-sm text-center mb-4">{successMessage}</p>}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name:</label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email:</label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password:</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Enter a strong password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-800 text-white py-2.5 rounded-lg transition-colors duration-200 font-semibold mt-6"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSignup;
