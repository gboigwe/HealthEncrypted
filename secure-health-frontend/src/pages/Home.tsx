import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { isAuthenticated, connectWallet } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      connectWallet();
    }
  };

  return (
    <div className="relative isolate">
      {/* Background with gradient */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      {/* Main content */}
      <div className="container-wrapper">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              HealthEncrypted
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your health records, secure and private on the blockchain
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={handleGetStarted}
                className="btn-primary text-base px-6 py-3"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              </button>
              <a href="#learn-more" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div id="learn-more" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">
                Secure Health Records
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to manage your health data
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Access your medical records securely, grant access to healthcare providers,
                and maintain complete control over your health information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
