// Simple plant database - in a real app you'd use an API
export const plantDatabase = {
  "monstera deliciosa": {
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    care: {
      temperature: "18-27°C (65-80°F)",
      sunlight: "Bright, indirect light. Avoid direct sun.",
      humidity: "Moderate to high humidity (60-80%)",
      watering: "Water when top 2-3 inches of soil are dry",
      soil: "Well-draining potting mix",
      fertilizer: "Balanced fertilizer monthly during growing season"
    }
  },
  "sansevieria trifasciata": {
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    care: {
      temperature: "15-24°C (60-75°F)",
      sunlight: "Low to bright indirect light. Tolerates low light.",
      humidity: "Average household humidity (30-50%)",
      watering: "Allow soil to dry completely between waterings",
      soil: "Well-draining cactus/succulent mix",
      fertilizer: "Light feeding during growing season"
    }
  },
  "epipremnum aureum": {
    name: "Pothos",
    scientificName: "Epipremnum aureum",
    care: {
      temperature: "18-24°C (65-75°F)",
      sunlight: "Low to bright indirect light",
      humidity: "Average household humidity",
      watering: "Water when top inch of soil is dry",
      soil: "Well-draining potting mix",
      fertilizer: "Balanced fertilizer every 2-3 months"
    }
  },
  "ficus lyrata": {
    name: "Fiddle Leaf Fig",
    scientificName: "Ficus lyrata",
    care: {
      temperature: "18-27°C (65-80°F)",
      sunlight: "Bright, indirect light",
      humidity: "High humidity (50-80%)",
      watering: "Keep soil consistently moist but not soggy",
      soil: "Well-draining, rich potting mix",
      fertilizer: "Monthly during growing season"
    }
  },
  "chlorophytum comosum": {
    name: "Spider Plant",
    scientificName: "Chlorophytum comosum",
    care: {
      temperature: "18-24°C (65-75°F)",
      sunlight: "Bright, indirect light",
      humidity: "Average to high humidity",
      watering: "Keep soil slightly moist",
      soil: "Well-draining potting mix",
      fertilizer: "Monthly during growing season"
    }
  }
};

export const getPlantCareInfo = (scientificName) => {
  const normalizedName = scientificName.toLowerCase().trim();
  return plantDatabase[normalizedName] || null;
};

export const getCommonPlants = () => {
  return Object.values(plantDatabase).map(plant => ({
    name: plant.name,
    scientificName: plant.scientificName
  }));
};