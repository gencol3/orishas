// ProtectedRoute.js
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (e.g., by verifying JWT token)
    const isAuthenticated = localStorage.getItem('token'); // Example: Check if token exists in local storage

    if (!isAuthenticated) {
      // If not authenticated, redirect to login page
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
