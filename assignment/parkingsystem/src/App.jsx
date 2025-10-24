
import React, { useState } from "react";
import { Car, Bike } from "lucide-react";

export default function App() {
  const [vehicles, setVehicles] = useState([]);
  const [registration, setRegistration] = useState("");
  const [type, setType] = useState("Car");
  const [search, setSearch] = useState("");
  const [totalEarnings, setTotalEarnings] = useState(0);

  
  const handleParkIn = () => {
    const reg = registration.trim().toUpperCase();
    if (!reg) {
      alert("Please enter registration number!");
      return;
    }

    const alreadyParked = vehicles.filter(
      (v) => v.registration === reg 
    );

    if (alreadyParked.length > 0) {
      alert("This vehicle is already parked in! Duplicate not allowed.");
      setRegistration("");
      return; 
    }

    const newVehicle = { registration: reg, type };
    setVehicles([...vehicles, newVehicle]);
    setRegistration(""); 
  };

  
  const handleParkOut = (reg) => {
    const vehicle = vehicles.find((v) => v.registration === reg);
    if (vehicle) {
      const earnings = vehicle.type === "Car" ? 100 : 50;
      setTotalEarnings(totalEarnings + earnings);
    }
    setVehicles(vehicles.filter((v) => v.registration !== reg));
  };

  
  const filteredVehicles = vehicles.filter((v) =>
    v.registration.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-8">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
         BIIT Parking System
        </h1>

        
        <div className="border-2 border-green-600 text-center py-2 mb-6 rounded-lg">
          <p className="text-lg font-semibold text-green-800">
            Total Earnings: Rs {totalEarnings}
          </p>
        </div>

        
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Registration Number
          </label>
          <input
            type="text"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter Registration Number"
          />
        </div>

      
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="vehicleType"
              value="Car"
              checked={type === "Car"}
              onChange={() => setType("Car")}
              className="mr-1"
            />
            Car
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="vehicleType"
              value="Bike"
              checked={type === "Bike"}
              onChange={() => setType("Bike")}
              className="mr-1"
            />
            Bike
          </label>
        </div>

        
        <button
          onClick={handleParkIn}
          className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition"
        >
          Park In
        </button>

        
        <div className="flex items-center mt-6 border rounded-md px-3 py-2 bg-gray-50">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Registration Number"
            className="w-full outline-none bg-transparent"
          />
        </div>

  
        <div className="mt-4">
          {filteredVehicles.length === 0 ? (
            <p className="text-center text-gray-500">No vehicles parked</p>
          ) : (
            filteredVehicles.map((v, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b py-2"
              >
                <div className="flex items-center gap-2">
                  {v.type === "Car" ? (
                    <span className="text-green-600">
                      <Car/>
                    </span>
                  ) : (
                    <span className="text-green-600">
                      <Bike/>
                    </span>
                  )}
                  <span className="font-medium">{v.registration}</span>
                </div>
                <button
                  onClick={() => handleParkOut(v.registration)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                >
                  Park Out
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
