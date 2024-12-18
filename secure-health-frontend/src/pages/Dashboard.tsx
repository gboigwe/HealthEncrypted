import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Record {
  id: string;
  type: string;
  date: string;
  provider: string;
  description: string;
}

export default function Dashboard() {
  const { userData, isAuthenticated } = useAuth();
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Fetch patient records here
    // This is a placeholder - you'll implement actual contract calls
    const fetchRecords = async () => {
      try {
        setLoading(true);
        // TODO: Implement contract call to fetch records
        // For now, using mock data
        setRecords([
          {
            id: '1',
            type: 'General Checkup',
            date: new Date().toLocaleDateString(),
            provider: 'Dr. Smith',
            description: 'Annual physical examination'
          }
        ]);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome, {userData?.profile?.name || 'Patient'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your health records securely
        </p>
      </div>

      {/* Records List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Medical Records
          </h3>
          <div className="mt-4">
            {records.length === 0 ? (
              <p className="text-gray-500">No records found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {records.map((record) => (
                  <li key={record.id} className="py-4">
                    <div className="flex space-x-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {record.type}
                        </p>
                        <p className="text-sm text-gray-500">
                          {record.provider} - {record.date}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {record.description}
                        </p>
                      </div>
                      <button
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                      >
                        View Details
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
