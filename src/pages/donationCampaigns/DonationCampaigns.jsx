import { NavLink } from "react-router-dom";
import useMyCampaigns from "../../hooks/myCampaigns/useMyCamapaigns";

const DonationCampaigns = () => {
  const { mycampaigns, refetch, isLoading, isError } = useMyCampaigns()

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading campaigns</div>;

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold text-center">Donation Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {
          mycampaigns.map((campaign, index) => {
            // console.log(campaign)
            return (
              <div
                key={campaign._id}
                className="border p-4 rounded-lg shadow-lg"
              >
                <img src={campaign.petPicture} alt={campaign.petName} className="w-full h-32 object-cover rounded-lg" />
                <h2 className="text-xl font-semibold">{campaign.petName}</h2>
                <p>Last Date: {campaign.lastDate}</p>
                <p>Max Donation: ${campaign.maxDonationAmount}</p>
                <NavLink to={`donationDetails/${campaign._id}`}>
                <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded ">View Details</button>
                </NavLink>
                  
              </div>
            )
          })
        }
      </div>
      {isLoading && <div>Loading more campaigns...</div>}
    </div>
  );
};

export default DonationCampaigns;
