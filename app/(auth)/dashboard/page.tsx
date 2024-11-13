"use client"; 

import { useState, useEffect } from 'react';


export default function Dashboard() {
  const [totalDevices, setTotalDevices] = useState(0);
  const [iotDevices, setIotDevices] = useState(0);
  const [activeAlerts, setActiveAlerts] = useState(0);
  const [vulnerabilities, setVulnerabilities] = useState(0);
  const [deviceData, setDeviceData] = useState([]);
  const [osData, setOsData] = useState([]);



  

  // Placeholder data fetching (Replace with actual data fetching logic)
  useEffect(() => {
    // Fetch totals, devices, and OS data
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-left">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Dashboard
            </h1>
          </div>

          {/* All Devices Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">All Devices</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 bg-indigo-200 rounded-lg shadow">
                <h3 className="text-gray-700">Total Devices</h3>
                <p className="text-2xl font-bold">{totalDevices}</p>
              </div>
              <div className="p-4 bg-indigo-200 rounded-lg shadow">
                <h3 className="text-gray-700">IoT Devices</h3>
                <p className="text-2xl font-bold">{iotDevices}</p>
              </div>
              <div className="p-4 bg-indigo-200 rounded-lg shadow">
                <h3 className="text-gray-700">Active Alerts</h3>
                <p className="text-2xl font-bold">{activeAlerts}</p>
              </div>
              <div className="p-4 bg-indigo-200 rounded-lg shadow">
                <h3 className="text-gray-700">Vulnerabilities</h3>
                <p className="text-2xl font-bold">{vulnerabilities}</p>
              </div>
            </div>
          </div>

          {/* Devices Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Devices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-indigo-100 rounded-lg shadow">
                <h3 className="text-gray-700 mb-2">Device Types</h3>
                {/* Pie chart placeholder */}
                <div className="h-40 bg-white rounded-lg shadow-inner">[Pie Chart Here]</div>
              </div>
              <div className="p-4 bg-indigo-100 rounded-lg shadow">
                <h3 className="text-gray-700 mb-2">Device Statistics</h3>
                <ul>
                  <li>Total Device Types: {deviceData.length}</li>
                  <li>Profiles: {/* Add profiles count */}</li>
                  <li>Devices at Risk: {/* Add count */}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Operating Systems Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Operating Systems</h2>
            <div className="p-4 bg-indigo-100 rounded-lg shadow">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Operating System</th>
                    <th className="py-2">Devices</th>
                    <th className="py-2">% of Total</th>
                  </tr>
                </thead>
                 
              </table>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


