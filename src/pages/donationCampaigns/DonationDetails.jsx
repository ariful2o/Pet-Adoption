
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { NavLink, useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';
import useMyCampaigns from '../../hooks/myCampaigns/useMyCamapaigns';
import CheckoutForm from './CheckoutForm';

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_SRTIPE_PAI_KEY);

const DonationDetails = () => {
  const { id } = useParams();
  const { mycampaigns, refetch, isLoading, isError } = useMyCampaigns()

  const axiosSecure = useAxiosSecure()
  const { data: campaign = [] } = useQuery({
    queryKey: ['donationDetails', id],
    queryFn: async () => {
      const response = await axiosSecure.post(`/donation-campaigns`, { id });

      return await response.data
    },
    refetchInterval: 10000, // refetch every 10 seconds
    staleTime: 1000 * 60 * 5, // 5 minutes stale
  })

  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');

  // Open Modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { lastDate, longDescription, maxDonationAmount, petName, petPicture, shortDescription, _id } = campaign

  if (isLoading) return <div className='w-full min-h-96 flex justify-center items-center'><span className="loading  text-accent loading-ring loading-lg"></span></div>
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Campaign Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2"><span className='text-gray-400'>Pet Name :</span> {petName}</h1>
        <img className='w-full ' src={petPicture} alt="" />
        <p className="text-gray-600 mb-4">Last Date: {lastDate}</p>
        <p className="text-gray-600 mb-4">Max Donation Amount: ${maxDonationAmount}</p>
        <p className="text-gray-700 mb-4">
          {shortDescription}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}>
          </div>
        </div>
        <p className="text-gray-600 mb-4">Description: {longDescription}</p>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={openModal}
        >
          Donate Now
        </button>
      </div>

      {/* Recommended Donations Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recommended Campaigns</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Example Campaign Cards */}
          {mycampaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="border p-4 rounded-lg shadow-lg"
            >
              <img src={campaign.petPicture} alt={campaign.petName} className="w-full h-32 object-cover rounded-lg" />
              <h2 className="text-xl font-semibold">{campaign.petName}</h2>
              <p>Last Date: {campaign.lastDate}</p>
              <p>Max Donation: ${campaign.maxDonationAmount}</p>
              <NavLink to={`/DonationCampaigns/donationDetails/${campaign._id}`}>
                <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded ">View Details</button>
              </NavLink>

            </div>
          ))}
        </div>
      </div>

      {/* Modal for Donation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Donate to the Cause</h2>
            <input
              type="number"
              placeholder="Enter donation amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            {/* Stripe Elements */}
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={donationAmount} closeModal={closeModal} petName={petName} maxDonationAmount={maxDonationAmount} campaignId={_id} petPicture={petPicture} />
            </Elements>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-4"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default DonationDetails
