import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import TitleBanner from "../../componts/TitleBanner";
import useAxiosPublic from "../../hooks/axios/useAxiosPublic";

const DonationCampaigns = () => {
  // const { mycampaigns, refetch, isLoading, isError } = useMyCampaigns()
  const axiosPublic=useAxiosPublic()

  const { data: mycampaigns = [], refetch, isLoading, isError } = useQuery({
    queryKey: ['donationCampaigns'],
    queryFn: async () => {
      const response = await axiosPublic.get('/allcampaigns')
      return await response.data
    },
    refetchInterval: 10000, // refetch every 10 seconds
    staleTime: 1000 * 60 * 5, // 5 minutes stale
  })
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading campaigns</div>;

  return (
    <>
    <Helmet>
        <title>Pet Adoption | Campaigns</title>
      </Helmet>
    <TitleBanner section={`Campaign`} image="https://www.sddac.com/content/sdc/das/donate-volunteer/donate-items/_jcr_content/par/image_3.img.jpg/1709754900461.jpg"></TitleBanner><div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold text-center">Donation Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {mycampaigns.map((campaign) => {
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
          );
        })}
      </div>
      {isLoading && <div>Loading more campaigns...</div>}
    </div>
    </>
  );
};

export default DonationCampaigns;
