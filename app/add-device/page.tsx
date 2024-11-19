"use client";

import { useState } from "react";
import axios from "axios";

export default function AddDevice() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [at_risk, setatRisk] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/add-device", {
        name,
        type,
        operating_system: operatingSystem,
        at_risk,
      });
      setMessage(response.data.message);
      setName("");
      setType("");
      setOperatingSystem("");
      setatRisk("");
    } catch (error) {
      console.error("Error adding device:", error);
      setMessage("Failed to add device.");
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-6">Add Device</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Device Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Device Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Operating System</label>
            <input
              type="text"
              value={operatingSystem}
              onChange={(e) => setOperatingSystem(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Level of Risk</label>
            <input
              type="text"
              value={at_risk}
              onChange={(e) => setatRisk(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg">
            Add Device
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </section>
  );
}
