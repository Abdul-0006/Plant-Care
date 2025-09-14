import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PlantList from "./components/PlantList";
import PlantDetails from "./components/PlantDetails";
import PlantForm from "./components/PlantForm";
import Guide from "./components/Guide";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load plants from localStorage on component mount
  useEffect(() => {
    const savedPlants = JSON.parse(localStorage.getItem("plants")) || [];
    setPlants(savedPlants);
    setLoading(false);
  }, []);

  // Save plants to localStorage whenever plants change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("plants", JSON.stringify(plants));
    }
  }, [plants, loading]);

  const addPlant = (plant) => {
    const newPlant = {
      ...plant,
      id: Date.now().toString(),
      lastWatered: plant.lastWatered || new Date().toISOString(),
      nextWatering: calculateNextWatering(
        plant.waterFrequency,
        plant.lastWatered
      ),
      // Don't store the File object in state
      image: undefined,
    };
    setPlants([...plants, newPlant]);
  };
  const updatePlant = (id, updatedPlant) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === id
        ? {
            ...updatedPlant,
            nextWatering: calculateNextWatering(
              updatedPlant.waterFrequency,
              updatedPlant.lastWatered
            ),
            // Don't store the File object in state
            image: undefined,
          }
        : plant
    );
    setPlants(updatedPlants);
  };

  const deletePlant = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
  };

  const waterPlant = (id) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === id) {
        const lastWatered = new Date().toISOString();
        return {
          ...plant,
          lastWatered,
          nextWatering: calculateNextWatering(
            plant.waterFrequency,
            lastWatered
          ),
        };
      }
      return plant;
    });
    setPlants(updatedPlants);
  };

  const calculateNextWatering = (frequency, lastWatered) => {
    const nextDate = new Date(lastWatered);
    nextDate.setDate(nextDate.getDate() + parseInt(frequency));
    return nextDate.toISOString();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="App">
        <Header plants={plants} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <PlantList
                  plants={plants}
                  onWaterPlant={waterPlant}
                  onDeletePlant={deletePlant}
                />
              }
            />
            <Route
              path="/add"
              element={<PlantForm onSubmit={addPlant} title="Add New Plant" />}
            />
            <Route
              path="/plant/:id"
              element={
                <PlantDetails
                  plants={plants}
                  onUpdatePlant={updatePlant}
                  onWaterPlant={waterPlant}
                  onDeletePlant={deletePlant}
                />
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PlantForm
                  plants={plants}
                  onSubmit={updatePlant}
                  title="Edit Plant"
                />
              }
            />
            <Route path="/guide" element={<Guide />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
