import React from 'react';
import { Nouveautes as NouveautesComponent } from '../components/Nouveautes';

export const Nouveautes: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8">Dernières sorties</h2>
      <NouveautesComponent />
    </div>
  );
};