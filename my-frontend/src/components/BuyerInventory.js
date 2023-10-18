import React, { useState, useEffect } from "react"; //importing react library
import {Link} from 'react-router-dom'; //importing package
import "../css/buyer.css";//importing styles

//Buyer Inventory Component
const BuyerInventory = () => {
  //state variables
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [priceOrder, setPriceOrder] = useState(""); // HTL or LTH
  const [selectedColor, setSelectedColor] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [selectedInventory, setSelectedInventory] = useState(null);

  useEffect(() => {
    //fetching inventory data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://busy-pink-chinchilla-shoe.cyclic.app/inventory/get"
        );
        if (response.ok) {
          const data = await response.json();
          setInventory(data.data);
          setFilteredInventory(data.data);
        } else {
          console.log("Failed to fetch inventory data");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);

  // Handle filtering by price order (HTL or LTH)
  useEffect(() => {
    if (priceOrder === "HTL") {
      const sortedInventory = [...inventory].sort((a, b) => b.price - a.price);
      setFilteredInventory(sortedInventory);
    } else if (priceOrder === "LTH") {
      const sortedInventory = [...inventory].sort((a, b) => a.price - b.price);
      setFilteredInventory(sortedInventory);
    } else {
      setFilteredInventory(inventory);
    }
  }, [priceOrder, inventory]);

  // Handle filtering by color
  useEffect(() => {
    if (selectedColor) {
      const filtered = inventory.filter((item) => item.color === selectedColor);
      setFilteredInventory(filtered);
    } else {
      setFilteredInventory(inventory);
    }
  }, [selectedColor, inventory]);

  // Handle filtering by mileage range
  useEffect(() => {
    if (minMileage && maxMileage) {
      const filtered = inventory.filter(
        (item) => item.mileage >= minMileage && item.mileage <= maxMileage
      );
      setFilteredInventory(filtered);
    } else {
      setFilteredInventory(inventory);
    }
  }, [minMileage, maxMileage, inventory]);

  // Reset filters
  const resetFilters = () => {
    setPriceOrder("");
    setSelectedColor("");
    setMinMileage("");
    setMaxMileage("");
    setFilteredInventory(inventory);
  };

  const handleViewMore = (item) => {
    setSelectedInventory(item);
    console.log(selectedInventory)
  };

  // Function to close the "View More" 
  const handleCloseViewMore = () => {
    setSelectedInventory(null);
  };

  return (
    <div>
      <h2>Buyer Inventory</h2>
      <Link to="/oem">OEM Specs Dashboard</Link>
      <div className="filters">
        <select
          value={priceOrder}
          onChange={(e) => setPriceOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="HTL">High to Low</option>
          <option value="LTH">Low to High</option>
        </select>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">Select Color</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
          <option value="Silver">Silver</option>
          <option value="Black">Black</option>
          <option value="Gray">Gray</option>
          <option value="Red">Red</option>
          <option value="Yellow">Yellow</option>
        </select>
        <input
          type="number"
          placeholder="Min Mileage"
          value={minMileage}
          onChange={(e) => setMinMileage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Mileage"
          value={maxMileage}
          onChange={(e) => setMaxMileage(e.target.value)}
        />
        <button onClick={resetFilters}>Reset</button>
      </div>
      <div className="inventory-cards">
        {filteredInventory.map((item) => (
          <div key={item._id} className="inventory-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Color: {item.color}</p>
            <p>Mileage: {item.mileage} miles</p>
            <button onClick={()=>handleViewMore(item)}>View More</button>
            <button>Buy</button>
          </div>
        ))}
      </div>
      {selectedInventory && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedInventory.title} Specifications</h3>
            <p>Price: ${selectedInventory.price}</p>
            <p>Color: {selectedInventory.color}</p>
            <p>Mileage: {selectedInventory.mileage} miles</p>
            <p>Model Name: {selectedInventory.model_name}</p>
            <p>Description: {selectedInventory.description}</p>
            <p>Title: {selectedInventory.title}</p>
            <p>Scratches: {selectedInventory.major_scratches}</p>
            <p>Accidents: {selectedInventory.accidents}</p>
            <p>Previous Buyer: {selectedInventory.previous_buyer}</p>
            <p>Registration Place: {selectedInventory.registration_place}</p>
            
            <button onClick={handleCloseViewMore}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default BuyerInventory;
