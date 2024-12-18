import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ConnectWalletProps {
  onSuccess?: () => void;
  redirectTo?: string;
  className?: string;
}

export default function ConnectWallet({ 
  onSuccess, 
  redirectTo = '/dashboard',
  className = ''
}: ConnectWalletProps) {
  const { connectWallet, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError(null);
      await connectWallet();
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (redirectTo) {
        navigate(redirectTo);
      }
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        onClick={handleConnect}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
      <p className="mt-4 text-sm text-gray-600">
        Don't have a wallet?{' '}
        <a 
          href="https://wallet.hiro.so/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Get Hiro Wallet
        </a>
      </p>
    </div>
  );
}
