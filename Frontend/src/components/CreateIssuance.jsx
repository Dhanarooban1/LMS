import React, { useState } from 'react';
import axios from 'axios';

const CreateIssuanceForm = () => {
  const [formData, setFormData] = useState({
    memberName: '',
    bookName: '',
    issueDate: '',
    dueDate: '',
    issuedBy: ''
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.post('/api/create-issuance', formData);
      setSuccessMessage('Issuance created successfully');
      setFormData({
        memberName: '',
        bookName: '',
        issueDate: '',
        dueDate: '',
        issuedBy: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create issuance');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div>
        <label>Member Name</label>
        <input
          type="text"
          name="memberName"
          value={formData.memberName}
          onChange={handleInputChange}
          required
          className="w-full p-2 mt-2 border border-gray-300"
        />
      </div>
      <div>
        <label>Book Name</label>
        <input
          type="text"
          name="bookName"
          value={formData.bookName}
          onChange={handleInputChange}
          required
          className="w-full p-2 mt-2 border border-gray-300"
        />
      </div>
      <div>
        <label>Issue Date</label>
        <input
          type="date"
          name="issueDate"
          value={formData.issueDate}
          onChange={handleInputChange}
          required
          className="w-full p-2 mt-2 border border-gray-300"
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          required
          className="w-full p-2 mt-2 border border-gray-300"
        />
      </div>
      <div>
        <label>Issued By</label>
        <input
          type="text"
          name="issuedBy"
          value={formData.issuedBy}
          onChange={handleInputChange}
          required
          className="w-full p-2 mt-2 border border-gray-300"
        />
      </div>
      <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white">Create Issuance</button>
      
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {successMessage && <p className="mt-2 text-green-500">{successMessage}</p>}
    </form>
  );
};

export default CreateIssuanceForm;
