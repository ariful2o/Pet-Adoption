


// {
//   id: 1,
//   petName: "Buddy",
//   maxDonation: 1000,
//   currentDonation: 600,
//   isPaused: false,
//   donators: [
//     { name: "John", amount: 200 },
//     { name: "Sarah", amount: 150 },
//     { name: "Mike", amount: 250 },
//   ],
// },











import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';
import CheckoutForm from './CheckoutForm';

// Load Stripe
const stripePromise = loadStripe('pk_test_51PX28rFFGpSui8W5vxzSn0UerDjE7P8R0VEFhFqXzlz3CD9fYid2OSALILb7Gmegp2SZrfCGZBmJJBfCju8WFuGT00zWJHsvTZ');

const DonationDetails = () => {
  const { id } = useParams();

  const axiosSecure= useAxiosSecure()
  const {data:campaign=[]}=useQuery({
      queryKey:['donationDetails',id],
      queryFn: async () => {
          const response = await axiosSecure.post(`/donation-campaigns`,{id});

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Campaign Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">Help Build a School</h1>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
        </div>
        <p className="text-gray-700 mb-4">
          We are raising funds to build a school for underprivileged children. Help us reach our goal!
        </p>
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
          {['Campaign 1', 'Campaign 2', 'Campaign 3'].map((campaign, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">{campaign}</h3>
              <p className="text-gray-600">Help us reach our goal for {campaign}.</p>
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
              <CheckoutForm amount={donationAmount} closeModal={closeModal} />
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
