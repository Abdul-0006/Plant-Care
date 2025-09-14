import React from 'react';
import { Link } from 'react-router-dom';
import './Guide.css';

const Guide = () => {
  return (
    <div className="container">
      <div className="guide-container card">
        <h1>Plant Care Manager Guide</h1>
        
        <section className="guide-section">
          <h2>How to Add a Plant</h2>
          <ol>
            <li>Click on the "Add Plant" button in the header</li>
            <li>Fill in the plant details:
              <ul>
                <li><strong>Name</strong>: Give your plant a friendly name</li>
                <li><strong>Species</strong>: Enter the plant's common name</li>
                <li><strong>Scientific Name</strong>: Enter the scientific name for automatic care instructions (optional but recommended)</li>
                <li><strong>Water Frequency</strong>: Set how often (in days) the plant needs water</li>
                <li><strong>Last Watered Date</strong>: Select when you last watered the plant</li>
                <li><strong>Notes</strong>: Add any special care instructions (optional)</li>
                <li><strong>Photo</strong>: Upload a photo of your plant (optional)</li>
              </ul>
            </li>
            <li>Click "Add Plant" to save your plant</li>
          </ol>
        </section>
        
        <section className="guide-section">
          <h2>Features Overview</h2>
          
          <div className="feature">
            <h3>🌱 Plant Identification & Care Database</h3>
            <p>Enter scientific names to automatically get detailed care instructions including temperature, sunlight, humidity, and watering requirements.</p>
          </div>
          
          <div className="feature">
            <h3>📸 Plant Photo Upload</h3>
            <p>Add photos of your plants to track their growth and health over time. Photos are optional but help visualize your plant collection.</p>
          </div>
          
          <div className="feature">
            <h3>💧 Smart Watering Reminders</h3>
            <p>Get notifications when your plants need watering. The app calculates the next watering date based on your specified frequency.</p>
          </div>
          
          <div className="feature">
            <h3>📝 Care Notes & Observations</h3>
            <p>Add special instructions and observations for each plant to remember their specific needs and track changes over time.</p>
          </div>
          
          <div className="feature">
            <h3>🌿 Species-Specific Care Guides</h3>
            <p>Get detailed care information for common houseplants by entering their scientific names.</p>
          </div>
          
          <div className="feature">
            <h3>📊 Watering History & Scheduling</h3>
            <p>Track when you've watered each plant and see upcoming watering schedules at a glance.</p>
          </div>
          
          <div className="feature">
            <h3>🔔 Smart Notifications</h3>
            <p>The bell icon in the header shows how many plants need water today. Click it to see which plants need attention.</p>
          </div>
        </section>
        
        <section className="guide-section">
          <h2>Tips for Success</h2>
          <ul>
            <li>Use scientific names for the most accurate care instructions</li>
            <li>Check your notifications regularly to stay on top of watering schedules</li>
            <li>Update the "last watered" date whenever you water a plant</li>
            <li>Take photos periodically to track your plant's growth and health</li>
            <li>Use the notes field to record observations about your plant's health</li>
            <li>Adjust water frequency based on seasonal changes</li>
          </ul>
        </section>
        
        <section className="guide-section">
          <h2>Supported Plants</h2>
          <p>Our database includes care information for these popular houseplants:</p>
          <div className="plant-grid">
            <div className="plant-item">Monstera Deliciosa</div>
            <div className="plant-item">Snake Plant</div>
            <div className="plant-item">Pothos / Devil's Ivy</div>
            <div className="plant-item">Spider Plant</div>
            <div className="plant-item">ZZ Plant</div>
            <div className="plant-item">Peace Lily</div>
            <div className="plant-item">Fiddle Leaf Fig</div>
            <div className="plant-item">Jade Plant</div>
            <div className="plant-item">Aloe Vera</div>
            <div className="plant-item">Rubber Plant</div>
            <div className="plant-item">Chinese Money Plant</div>
            <div className="plant-item">Areca Palm</div>
            <div className="plant-item">Philodendron</div>
            <div className="plant-item">Orchid</div>
            <div className="plant-item">Prayer Plant</div>
            <div className="plant-item">Boston Fern</div>
            <div className="plant-item">Cast Iron Plant</div>
            <div className="plant-item">English Ivy</div>
            <div className="plant-item">Dracaena</div>
            <div className="plant-item">Air Plant</div>
          </div>
          <p>More plants are being added regularly!</p>
        </section>
        
        <div className="guide-actions">
          <Link to="/add" className="btn">Add Your First Plant</Link>
          <Link to="/" className="btn btn-secondary">View Your Plants</Link>
        </div>
      </div>
    </div>
  );
};

export default Guide;