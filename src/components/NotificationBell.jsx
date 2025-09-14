import React, { useState } from 'react';
import './NotificationBell.css';

const NotificationBell = ({ plants }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Check which plants need watering today
  const plantsNeedingWater = plants.filter(plant => {
    const today = new Date();
    const nextWatering = new Date(plant.nextWatering);
    return nextWatering.toDateString() === today.toDateString();
  });

  const hasNotifications = plantsNeedingWater.length > 0;

  return (
    <div className="notification-bell">
      <div 
        className={`bell-icon ${hasNotifications ? 'has-notifications' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {hasNotifications && <span className="notification-count">{plantsNeedingWater.length}</span>}
      </div>
      
      {isOpen && (
        <div className="notification-dropdown">
          <h3>Watering Reminders</h3>
          {hasNotifications ? (
            <>
              <p>These plants need water today:</p>
              <ul>
                {plantsNeedingWater.map(plant => (
                  <li key={plant.id}>
                    <strong>{plant.name}</strong> ({plant.species})
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No plants need watering today!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;