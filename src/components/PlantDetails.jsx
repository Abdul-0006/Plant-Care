import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPlantCareInfo } from "../utils/plantDatabase";
import "./PlantDetails.css";

const PlantDetails = ({
  plants,
  onUpdatePlant,
  onWaterPlant,
  onDeletePlant,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCareTips, setShowCareTips] = useState(false);
  const [careTips, setCareTips] = useState([]);
  const [loadingTips, setLoadingTips] = useState(false);

  const plant = plants.find((p) => p.id === id);
  const careInfo = plant?.scientificName
    ? getPlantCareInfo(plant.scientificName)
    : null;

  if (!plant) {
    return (
      <div className="container">
        <div className="card">
          <h2>Plant Not Found</h2>
          <p>The plant you're looking for doesn't exist.</p>
          <Link to="/" className="btn">
            Back to Plants
          </Link>
        </div>
      </div>
    );
  }

  const handleWater = () => {
    onWaterPlant(plant.id);
  };

  const handleDelete = () => {
    onDeletePlant(plant.id);
    navigate("/");
  };

  const fetchCareTips = async () => {
    setLoadingTips(true);
    setShowCareTips(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const tips = [
        "Water when the top inch of soil feels dry.",
        "Provide bright, indirect sunlight.",
        "Fertilize monthly during growing season.",
        "Mist leaves occasionally to increase humidity.",
        "Rotate plant periodically for even growth.",
      ];

      // Shuffle and take 3 random tips
      const randomTips = tips.sort(() => 0.5 - Math.random()).slice(0, 3);
      setCareTips(randomTips);
      setLoadingTips(false);
    }, 1500);
  };

  const needsWater = new Date(plant.nextWatering) < new Date();

  return (
    <div className="container">
      <div className="plant-details card fade-in">
        <div className="plant-details-header">
          <h2>{plant.name}</h2>
          <div className="plant-actions">
            <Link to={`/edit/${plant.id}`} className="btn">
              Edit
            </Link>
            <button onClick={handleWater} className="btn">
              Water Now
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>

        <div className="plant-details-content">
          <div className="plant-info">
            {plant.imageUrl && (
              <div className="plant-image">
                <img src={plant.imageUrl} alt={plant.name} />
              </div>
            )}

            <div className="detail-row">
              <span className="detail-label">Species:</span>
              <span className="detail-value">{plant.species}</span>
            </div>

            {plant.scientificName && (
              <div className="detail-row">
                <span className="detail-label">Scientific Name:</span>
                <span className="detail-value">{plant.scientificName}</span>
              </div>
            )}

            <div className="detail-row">
              <span className="detail-label">Water Frequency:</span>
              <span className="detail-value">
                Every {plant.waterFrequency} days
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Last Watered:</span>
              <span className="detail-value">
                {new Date(plant.lastWatered).toLocaleDateString()}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Next Watering:</span>
              <span
                className={`detail-value ${needsWater ? "water-needed" : ""}`}
              >
                {new Date(plant.nextWatering).toLocaleDateString()}
                {needsWater && " (Needs Watering!)"}
              </span>
            </div>
            {plant.notes && (
              <div className="detail-row">
                <span className="detail-label">Notes:</span>
                <span className="detail-value">{plant.notes}</span>
              </div>
            )}
          </div>

          <div className="care-section">
            {careInfo ? (
              <div className="care-info">
                <h3>Optimal Care Conditions</h3>
                <div className="care-detail">
                  <span className="care-label">Temperature:</span>
                  <span className="care-value">
                    {careInfo.care.temperature}
                  </span>
                </div>
                <div className="care-detail">
                  <span className="care-label">Sunlight:</span>
                  <span className="care-value">{careInfo.care.sunlight}</span>
                </div>
                <div className="care-detail">
                  <span className="care-label">Humidity:</span>
                  <span className="care-value">{careInfo.care.humidity}</span>
                </div>
                <div className="care-detail">
                  <span className="care-label">Watering:</span>
                  <span className="care-value">{careInfo.care.watering}</span>
                </div>
                <div className="care-detail">
                  <span className="care-label">Soil:</span>
                  <span className="care-value">{careInfo.care.soil}</span>
                </div>
                <div className="care-detail">
                  <span className="care-label">Fertilizer:</span>
                  <span className="care-value">{careInfo.care.fertilizer}</span>
                </div>
              </div>
            ) : (
              <div className="care-tips-section">
                <button onClick={fetchCareTips} className="btn btn-secondary">
                  {showCareTips ? "Refresh Care Tips" : "Get Care Tips"}
                </button>

                {showCareTips && (
                  <div className="care-tips">
                    <h3>General Care Tips</h3>
                    {loadingTips ? (
                      <p>Loading tips...</p>
                    ) : (
                      <ul>
                        {careTips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="plant-details-footer">
          <Link to="/" className="btn">
            Back to All Plants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
