import React from 'react';
import { Link } from 'react-router-dom';
import './PlantCard.css';

const PlantCard = ({ plant, onWaterPlant, onDeletePlant }) => {
  const needsWater = new Date(plant.nextWatering) < new Date();
  const waterToday = new Date(plant.nextWatering).toDateString() === new Date().toDateString();
  
  const handleWater = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onWaterPlant(plant.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${plant.name}?`)) {
      onDeletePlant(plant.id);
    }
  };

  return (
    <div className={`plant-card ${needsWater ? 'needs-water' : ''} ${waterToday ? 'water-today' : ''} fade-in`}>
      <Link to={`/plant/${plant.id}`} className="plant-card-link">
        <div className="plant-card-header">
          <h3>{plant.name}</h3>
          <span className="plant-species">{plant.species}</span>
        </div>
        
        <div className="plant-card-details">
          <div className="water-info">
            <span className="water-label">Last watered:</span>
            <span className="water-date">{new Date(plant.lastWatered).toLocaleDateString()}</span>
          </div>
          
          <div className="water-info">
            <span className="water-label">Next watering:</span>
            <span className={`water-date ${needsWater ? 'water-needed' : ''}`}>
              {new Date(plant.nextWatering).toLocaleDateString()}
            </span>
          </div>
          
          {waterToday && (
            <div className="water-alert water-today-alert">
              <span>Needs Watering Today!</span>
            </div>
          )}
          
          {needsWater && !waterToday && (
            <div className="water-alert">
              <span>Needs Watering!</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="plant-card-actions">
        <button onClick={handleWater} className="btn btn-small">Water Now</button>
        <button onClick={handleDelete} className="btn btn-small btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default PlantCard;