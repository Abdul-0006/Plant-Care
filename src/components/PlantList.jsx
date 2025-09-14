import React from 'react';
import { Link } from 'react-router-dom';
import PlantCard from './PlantCard';
import './PlantList.css';

const PlantList = ({ plants, onWaterPlant, onDeletePlant }) => {
  if (plants.length === 0) {
    return (
      <div className="container">
        <div className="empty-state card text-center">
          <div className="empty-icon">🌱</div>
          <h2>No Plants Yet</h2>
          <p>Get started by adding your first plant to track!</p>
          <Link to="/add" className="btn mt-20">Add Your First Plant</Link>
        </div>
      </div>
    );
  }

  // Sort plants: those needing water first, then by name
  const sortedPlants = [...plants].sort((a, b) => {
    const aNeedsWater = new Date(a.nextWatering) < new Date();
    const bNeedsWater = new Date(b.nextWatering) < new Date();
    
    if (aNeedsWater && !bNeedsWater) return -1;
    if (!aNeedsWater && bNeedsWater) return 1;
    
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="container">
      <div className="plant-list-header">
        <h2>My Plants</h2>
        <Link to="/add" className="btn">Add New Plant</Link>
      </div>
      
      <div className="plants-grid">
        {sortedPlants.map(plant => (
          <PlantCard 
            key={plant.id} 
            plant={plant} 
            onWaterPlant={onWaterPlant}
            onDeletePlant={onDeletePlant}
          />
        ))}
      </div>
    </div>
  );
};

export default PlantList;