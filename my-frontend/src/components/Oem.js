//importing react library
import React,{useState,useEffect} from 'react';

//OemSpecs Component
const OemSpecs =()=>{
  const [oemSpecs, setOemSpecs] = useState([]);
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fetch all available OEM specs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://busy-pink-chinchilla-shoe.cyclic.app/oem/get');
        if (response.ok) {
          const data = await response.json();
          setOemSpecs(data.data);
        } else {
          console.error('Failed to fetch OEM specs');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  // Handle search for a specific model and year
  const handleSearch = async () => {
    try {
      const response = await fetch(`https://busy-pink-chinchilla-shoe.cyclic.app/oem/search?model=${model}&year=${year}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Search failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>OEM Specs Dashboard</h2>
      <div>
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <h3>All Available OEM Specs</h3>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Year</th>
            <th>List Price</th>
            <th>Available Colors</th>
            <th>Mileage</th>
            <th>Power (BHP)</th>
            <th>Max Speed</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.length > 0
            ? searchResults.map((spec) => (
                <tr key={spec._id}>
                  <td>{spec.model_name}</td>
                  <td>{spec.year}</td>
                  <td>{spec.listPrice}</td>
                  <td>{spec.available_colors}</td>
                  <td>{spec.mileage}</td>
                  <td>{spec.bhp}</td>
                  <td>{spec.max_speed}</td>
                </tr>
              ))
            : oemSpecs.map((spec) => (
                <tr key={spec._id}>
                  <td>{spec.model_name}</td>
                  <td>{spec.year}</td>
                  <td>{spec.listPrice}</td>
                  <td>{spec.available_colors}</td>
                  <td>{spec.mileage}</td>
                  <td>{spec.bhp}</td>
                  <td>{spec.max_speed}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};


export default OemSpecs;