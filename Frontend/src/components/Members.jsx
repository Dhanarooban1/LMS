import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Mail, Phone, X } from 'lucide-react';
import axios from 'axios';
import BASE_URL from '../../Config';
import Cookies from 'js-cookie';

const EditModal = ({ editingMember, setEditingMember, handleUpdate, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Edit Member</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              value={editingMember.mem_name}
              onChange={(e) =>
                setEditingMember({ ...editingMember, mem_name: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={editingMember.mem_email}
              onChange={(e) =>
                setEditingMember({ ...editingMember, mem_email: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <input
              type="tel"
              value={editingMember.mem_phone}
              onChange={(e) =>
                setEditingMember({ ...editingMember, mem_phone: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Member = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken');

    axios.get(`${BASE_URL}/api/members`, {
      headers: { authorization: token }
    })
      .then(response => {
        setMembers(response.data.data || []);
      })
      .catch(error => {
        console.error('Error fetching members:', error);
        setError('Failed to load members');
      })
      .finally(() => setLoading(false));
  }, []);


  // Filter members based on the search term.
  const filteredMembers = members.filter(member =>
    member.mem_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.mem_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.mem_phone.includes(searchTerm)
  );

  // When editing, create a shallow copy of the member so you don’t modify the original directly.
  const handleEdit = (member) => {
    setEditingMember({ ...member });
    setIsEditModalOpen(true);
  };

  // Now include the updated member data in the PUT request.
  const handleUpdate = (e) => {
    e.preventDefault();
    const token = Cookies.get('authToken');
    axios
      .put(
        `${BASE_URL}/api/members/${editingMember.mem_id}`,
        editingMember, // Send the updated member data here.
        {
          headers: { authorization: token }
        }
      )
      .then(response => {
        // Optionally update the local members state
        setMembers(members.map(member =>
          member.mem_id === editingMember.mem_id ? editingMember : member
        ));
        alert('Member updated successfully!');
      })
      .catch(error => {
        alert(`Error updating member: ${error.message}`);
      })
      .finally(() => {
        setIsEditModalOpen(false);
        setEditingMember(null);
      });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-4 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold text-gray-800">Library Members</h2>
          <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-10 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-6">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="rounded-tl-lg px-6 py-3 font-medium">Member ID</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="rounded-tr-lg px-6 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr
                  key={member.mem_id}
                  className="group transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">#{member.mem_id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{member.mem_name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-gray-600">
                        <Mail className="mr-2 h-4 w-4" />
                        {member.mem_email}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="mr-2 h-4 w-4" />
                        {member.mem_phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && editingMember && (
        <EditModal
          editingMember={editingMember}
          setEditingMember={setEditingMember}
          handleUpdate={handleUpdate}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
};

export default Member;
