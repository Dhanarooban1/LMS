import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="h-[100vh] bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                Library Management
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/books" className="px-3 py-2 rounded-md text-sm font-medium">
                  Books
                </Link>
                <Link to="/members" className="px-3 py-2 rounded-md text-sm font-medium">
                  Members
                </Link>
                <Link to="/issuance" className="px-3 py-2 rounded-md text-sm font-medium">
                  Issuance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}