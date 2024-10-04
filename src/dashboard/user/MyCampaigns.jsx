import React, { useState } from "react";

// Sample Data for campaigns
const campaigns = [
  {
    id: 1,
    petName: "Buddy",
    maxDonation: 1000,
    currentDonation: 600,
    isPaused: false,
    donators: [
      { name: "John", amount: 200 },
      { name: "Sarah", amount: 150 },
      { name: "Mike", amount: 250 },
    ],
  },
  {
    id: 2,
    petName: "Max",
    maxDonation: 2000,
    currentDonation: 500,
    isPaused: true,
    donators: [
      { name: "Alice", amount: 300 },
      { name: "David", amount: 200 },
    ],
  },
];

const MyCampaigns = () => {
  const [donators, setDonators] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (donatorsList) => {
    setDonators(donatorsList);
    setShowModal(!showModal);
  };

  const handlePauseToggle = (id) => {
    // Logic for pausing/unpausing a campaign can go here
    console.log(`Toggled pause for campaign ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          My Donation Campaigns
        </h2>

        {/* Table */}
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-4 text-left">Pet Name</th>
              <th className="border border-gray-300 p-4 text-left">Max Donation Amount</th>
              <th className="border border-gray-300 p-4 text-left">Progress</th>
              <th className="border border-gray-300 p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="text-gray-700">
                <td className="border border-gray-300 p-4">{campaign.petName}</td>
                <td className="border border-gray-300 p-4">${campaign.maxDonation}</td>
                <td className="border border-gray-300 p-4">
                  <div className="relative w-full bg-gray-300 rounded-full h-4">
                    <div
                      className="absolute top-0 left-0 h-4 bg-blue-500 rounded-full"
                      style={{
                        width: `${(campaign.currentDonation / campaign.maxDonation) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm ml-2">
                    ${campaign.currentDonation} / ${campaign.maxDonation}
                  </span>
                </td>
                <td className="border border-gray-300 p-4 flex justify-center space-x-4">
                  <button
                    onClick={() => handlePauseToggle(campaign.id)}
                    className={`px-4 py-1 rounded-full text-white font-semibold ${
                      campaign.isPaused ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {campaign.isPaused ? "Unpause" : "Pause"}
                  </button>
                  <button
                    onClick={() => console.log("Redirecting to edit page")}
                    className="px-4 py-1 rounded-full bg-yellow-500 text-white font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleModal(campaign.donators)}
                    className="px-4 py-1 rounded-full bg-blue-500 text-white font-semibold"
                  >
                    View Donators
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Donators Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Donators List</h3>
              <ul className="space-y-2">
                {donators.map((donator, index) => (
                  <li
                    key={index}
                    className="flex justify-between bg-gray-100 p-2 rounded-md shadow-sm"
                  >
                    <span>{donator.name}</span>
                    <span>${donator.amount}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCampaigns;
