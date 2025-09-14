import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlantCareInfo, getCommonPlants } from "../utils/plantDatabase";
import "./PlantForm.css";

const PlantForm = ({ plants, onSubmit, title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const existingPlant = isEditing ? plants.find((p) => p.id === id) : null;

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    scientificName: "",
    waterFrequency: "7",
    lastWatered: new Date().toISOString().split("T")[0],
    notes: "",
    image: null,
  });

  const [careInfo, setCareInfo] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEditing && existingPlant) {
      setFormData({
        name: existingPlant.name,
        species: existingPlant.species,
        scientificName: existingPlant.scientificName || "",
        waterFrequency: existingPlant.waterFrequency,
        lastWatered: existingPlant.lastWatered.split("T")[0],
        notes: existingPlant.notes || "",
        image: null,
      });

      if (existingPlant.imageUrl) {
        setImagePreview(existingPlant.imageUrl);
      }

      if (existingPlant.scientificName) {
        const info = getPlantCareInfo(existingPlant.scientificName);
        setCareInfo(info);
      }
    }
  }, [isEditing, existingPlant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // If scientific name changes, look up care info
    if (name === "scientificName" && value.trim()) {
      const info = getPlantCareInfo(value);
      setCareInfo(info);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match("image.*")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select an image file",
        }));
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image must be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, image: "" }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Plant name is required";
    }

    if (!formData.species.trim()) {
      newErrors.species = "Species is required";
    }

    if (!formData.waterFrequency || parseInt(formData.waterFrequency) <= 0) {
      newErrors.waterFrequency = "Water frequency must be a positive number";
    }

    if (!formData.lastWatered) {
      newErrors.lastWatered = "Last watered date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // For demo purposes, we'll simulate image upload
    // In a real app, you would upload to a server here
    setTimeout(() => {
      const plantData = {
        ...formData,
        // In a real app, you would have an imageUrl from your server
        imageUrl:
          imagePreview || (existingPlant && existingPlant.imageUrl) || null,
      };

      if (isEditing) {
        onSubmit(id, plantData);
      } else {
        onSubmit(plantData);
      }

      setIsSubmitting(false);
      navigate(isEditing ? `/plant/${id}` : "/");
    }, 500);
  };

  const handleCancel = () => {
    navigate(isEditing ? `/plant/${id}` : "/");
  };

  const commonPlants = getCommonPlants();

  if (isEditing && !existingPlant) {
    return (
      <div className="container">
        <div className="card">
          <h2>Plant Not Found</h2>
          <p>The plant you're trying to edit doesn't exist.</p>
          <button onClick={() => navigate("/")} className="btn">
            Back to Plants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="plant-form-container card">
        <h2 className="text-center">{title}</h2>

        <form onSubmit={handleSubmit} className="plant-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Plant Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="e.g., Monstera, Snake Plant"
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="species" className="form-label">
              Common Species Name *
            </label>
            <input
              type="text"
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className={`form-input ${errors.species ? "error" : ""}`}
              placeholder="e.g., Monstera, Snake Plant"
            />
            {errors.species && <div className="error">{errors.species}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="scientificName" className="form-label">
              Scientific Name (for care info)
            </label>
            <input
              type="text"
              id="scientificName"
              name="scientificName"
              value={formData.scientificName}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Monstera deliciosa"
              list="commonPlants"
            />
            <datalist id="commonPlants">
              {commonPlants.map((plant) => (
                <option key={plant.scientificName} value={plant.scientificName}>
                  {plant.name}
                </option>
              ))}
            </datalist>
            <div className="form-hint">
              Enter the scientific name for automatic care instructions
            </div>
          </div>

          {careInfo && (
            <div className="care-info-preview">
              <h4>Care Information Found:</h4>
              <div className="care-details">
                <p>
                  <strong>Ideal Temperature:</strong>{" "}
                  {careInfo.care.temperature}
                </p>
                <p>
                  <strong>Sunlight Requirements:</strong>{" "}
                  {careInfo.care.sunlight}
                </p>
                <p>
                  <strong>Humidity Conditions:</strong> {careInfo.care.humidity}
                </p>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="waterFrequency" className="form-label">
              Water Frequency (days) *
            </label>
            <input
              type="number"
              id="waterFrequency"
              name="waterFrequency"
              min="1"
              value={formData.waterFrequency}
              onChange={handleChange}
              className={`form-input ${errors.waterFrequency ? "error" : ""}`}
            />
            {errors.waterFrequency && (
              <div className="error">{errors.waterFrequency}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastWatered" className="form-label">
              Last Watered Date *
            </label>
            <input
              type="date"
              id="lastWatered"
              name="lastWatered"
              value={formData.lastWatered}
              onChange={handleChange}
              className={`form-input ${errors.lastWatered ? "error" : ""}`}
            />
            {errors.lastWatered && (
              <div className="error">{errors.lastWatered}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Any special care instructions or observations..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Plant Photo (Optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
            />
            {errors.image && <div className="error">{errors.image}</div>}

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="btn btn-small btn-danger"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Plant"
                : "Add Plant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlantForm;
