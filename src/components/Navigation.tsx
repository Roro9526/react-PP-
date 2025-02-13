import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className={`flex items-center px-4 ${
                location.pathname === '/'
                  ? 'border-b-2 border-indigo-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Film className="h-5 w-5 mr-2" />
              Mes Films
            </Link>
            <Link
              to="/nouveautes"
              className={`flex items-center px-4 ${
                location.pathname === '/nouveautes'
                  ? 'border-b-2 border-indigo-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Heart className="h-5 w-5 mr-2" />
              Nouveautés
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};