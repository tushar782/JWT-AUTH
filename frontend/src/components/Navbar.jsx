import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" className="hover:text-gray-300">Admin</Link>}
              {['admin', 'manager'].includes(user.role) && 
                <Link to="/manager" className="hover:text-gray-300">Manager</Link>
              }
              <Link to="/user" className="hover:text-gray-300">User</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
        {user && (
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;