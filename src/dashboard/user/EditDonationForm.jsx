import { useEffect, useState } from "react";

// Mock existing donation data for editing
const existingDonation = {
  petPicture: null, // You can load an existing image URL here
  maxDonationAmount: 1000,
  lastDate: "2024-10-30",
  shortDescription: "Help my dog with surgery",
  longDescription: "My dog needs urgent surgery, and we need your support.",
};

const EditDonationForm = () => {
  const [formData, setFormData] = useState({
    petPicture: null,
    maxDonationAmount: "",
    lastDate: "",
    shortDescription: "",
    longDescription: "",
  });

  // Populate form with existing data on component mount
  useEffect(() => {
    setFormData({
      ...formData,
      maxDonationAmount: existingDonation.maxDonationAmount,
      lastDate: existingDonation.lastDate,
      shortDescription: existingDonation.shortDescription,
      longDescription: existingDonation.longDescription,
    });
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      petPicture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Donation Data:", formData);
    // Call API to update the donation in the database
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Donation Campaign
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Pet Picture Upload */}
            <div className="flex items-center">
              <label className="block text-gray-700 font-semibold w-1/3">
                Pet Picture
              </label>
              <input
                type="file"
                name="petPicture"
                accept="image/*"
                onChange={handleFileChange}
                className="block text-sm text-gray-500 border rounded-full cursor-pointer bg-gray-50 px-4 py-2"
              />
            </div>

            {/* Maximum Donation Amount */}
            <div className="flex items-center">
              <label className="block text-gray-700 font-semibold w-1/3">
                Maximum Donation Amount
              </label>
              <input
                type="number"
                name="maxDonationAmount"
                value={formData.maxDonationAmount}
                onChange={handleInputChange}
                className="w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 shadow-inner"
              />
            </div>

            {/* Last Date of Donation */}
            <div className="flex items-center">
              <label className="block text-gray-700 font-semibold w-1/3">
                Last Date of Donation
              </label>
              <input
                type="date"
                name="lastDate"
                value={formData.lastDate}
                onChange={handleInputChange}
                className="w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 shadow-inner"
              />
            </div>

            {/* Short Description */}
            <div className="flex items-center">
              <label className="block text-gray-700 font-semibold w-1/3">
                Short Description
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                className="w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 shadow-inner"
              />
            </div>

            {/* Long Description */}
            <div className="flex items-center">
              <label className="block text-gray-700 font-semibold w-1/3">
                Long Description
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleInputChange}
                rows="3"
                className="w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 shadow-inner"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition duration-200 shadow-md"
              >
                Update Donation
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonationForm;
