import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample static data
  const samplePendingReturns = [
    {
      id: 1,
      member: {
        name: "John Doe",
        email: "john@example.com"
      },
      book: {
        name: "The Great Gatsby"
      },
      issuanceDate: "2024-02-01",
      targetReturnDate: "2024-02-20",
      status: "issued"
    },
    {
      id: 2,
      member: {
        name: "Jane Smith",
        email: "jane@example.com"
      },
      book: {
        name: "To Kill a Mockingbird"
      },
      issuanceDate: "2024-02-10",
      targetReturnDate: "2024-02-24",
      status: "issued"
    },
    {
      id: 3,
      member: {
        name: "Bob Wilson",
        email: "bob@example.com"
      },
      book: {
        name: "1984"
      },
      issuanceDate: "2024-01-25",
      targetReturnDate: "2024-02-15",
      status: "issued"
    },
    {
      id: 4,
      member: {
        name: "Alice Brown",
        email: "alice@example.com"
      },
      book: {
        name: "Pride and Prejudice"
      },
      issuanceDate: "2024-02-05",
      targetReturnDate: "2024-02-22",
      status: "issued"
    },
    {
      id: 5,
      member: {
        name: "Charlie Davis",
        email: "charlie@example.com"
      },
      book: {
        name: "The Catcher in the Rye"
      },
      issuanceDate: "2024-02-08",
      targetReturnDate: "2024-02-23",
      status: "issued"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Library Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Calendar className="h-5 w-5 text-gray-500" />
          <input
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Member Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Book Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Issue Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {samplePendingReturns.map((item) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {item.member.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.member.email}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {item.book.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {format(new Date(item.issuanceDate), 'MMM dd, yyyy')}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {format(new Date(item.targetReturnDate), 'MMM dd, yyyy')}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      new Date(item.targetReturnDate) < new Date()
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {new Date(item.targetReturnDate) < new Date()
                      ? 'Overdue'
                      : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;