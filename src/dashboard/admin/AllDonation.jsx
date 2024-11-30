import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';

export default function AllDonation() {
  const [donators, setDonators] = useState([]);
  const axiosSecure = useAxiosSecure()
  const [totalAmounts, setTotalAmounts] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { data: alldonations = [],  isLoading, } = useQuery({
    queryKey: ['alldonations'],
    queryFn: async () => {
      const response = await axiosSecure.get('/alldonations')
      return response.data
    },
    refetchInterval: 60000, // refetch every minute
  })

  // Fetch total amounts for each campaign when mycampaigns changes
  useEffect(() => {
    const fetchTotalAmounts = async () => {
      const amounts = {};
      for (const campaign of alldonations) {
        try {
          const response = await axiosSecure.get(`/mycampaigns-donators?id=${campaign._id}`);
          const totalAmount = response.data.reduce((acc, campaign) => {
            const campaignTotal = campaign.donators.reduce((sum, donator) => {
              return sum + parseFloat(donator.amount); // Convert amount to float
            }, 0);
            return acc + campaignTotal;
          }, 0);
          amounts[campaign._id] = totalAmount; // Store the total amount by campaign ID
        } catch (error) {
          console.error("Error fetching donators for campaign:", campaign._id, error);
        }
      }
      setTotalAmounts(amounts); // Set the total amounts state
    };

    if (alldonations.length) {
      fetchTotalAmounts();
    }
  }, [alldonations, axiosSecure]);

  if (isLoading) return <div className='w-full min-h-96 flex justify-center items-center'><span className="loading  text-accent loading-ring loading-lg"></span></div>

  const toggleModal = async (id) => {
    try {
      const response = await axiosSecure.get(`/mycampaigns-donators?id=${id}`);
      const donatorsList = response.data.length > 0 ? response.data[0].donators : [];
      setDonators(donatorsList);
      setShowModal(!showModal);
    } catch (error) {
      console.error("Error fetching donators:", error);
    }
  };

  const handlePauseToggle = (id) => {
    console.log(`Toggled pause for campaign ID: ${id}`);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          All Donation Campaigns
        </h2>

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-4 text-left">Image</th>
              <th className="border border-gray-300 p-4 text-left">Pet Name</th>
              <th className="border border-gray-300 p-4 text-left">Max Donation</th>
              <th className="border border-gray-300 p-4 text-left">Progress</th>
              <th className="border border-gray-300 p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alldonations.map((campaign) => {
              const totalAmount = totalAmounts[campaign._id] || 0; // Get the total amount for the current campaign
              return (
                <tr key={campaign._id} className="text-gray-700">
                  <td><img className="w-28 h-20" src={campaign.petPicture} alt="" /></td>
                  <td className="border border-gray-300 p-4">{campaign.petName}</td>
                  <td className="border border-gray-300 p-4">${campaign.maxDonationAmount}</td>
                  <td className="border border-gray-300 p-4">
                    <div className="relative w-full bg-gray-300 rounded-full h-4">
                      <div
                        className="absolute top-0 left-0 h-4 bg-blue-500 rounded-full"
                        style={{
                          width: `${(totalAmount / campaign.maxDonationAmount) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm ml-2">
                      ${totalAmount} / ${campaign.maxDonationAmount}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-4 flex justify-center space-x-4">
                    <button
                      onClick={() => handlePauseToggle(campaign.id)}
                      className={`px-4 py-1 rounded-full text-white font-semibold ${campaign.isPaused ? "bg-red-500" : "bg-green-500"}`}
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
                      onClick={() => toggleModal(campaign._id)}
                      className="px-4 py-1 rounded-full bg-blue-500 text-white font-semibold"
                    >
                      View Donators
                    </button>
                  </td>
                </tr>
              );
            })}
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
                    <span>{donator.displayName}</span>
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
  )
}
