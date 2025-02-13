import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigation } from './components/Navigation';
import { MesFilms } from './pages/MesFilms';
import { Nouveautes } from './pages/Nouveautes';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <main className="py-8">
            <Routes>
              <Route path="/" element={<MesFilms />} />
              <Route path="/nouveautes" element={<Nouveautes />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;