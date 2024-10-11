import { async } from "@firebase/util";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Dropzone from "../../componts/DropZone";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import { uploadToImgbb } from "../../hooks/imageUpload/useImageUpload";
import useUser from "../../hooks/userInfo/useUser";

const DonationForm = () => {
    const [file, setFile] = useState(null);
    const { displayName, email, photoURL }=useUser()
  const [formData, setFormData] = useState({
    petName: "",
    maxDonationAmount: "",
    lastDate: "",
    shortDescription: "",
    longDescription: "",
  });
  const axiosSecure=useAxiosSecure()
  const navigate=useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      email,
    });
  };

  const handleFileChange = (file) => {
    setFile(file)
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    const uplodeImageIMGBB= await uploadToImgbb(file)
    const createCampainData={...formData,petPicture:uplodeImageIMGBB}

    const createCampain= await axiosSecure.post("/createcampain",createCampainData)
    if (createCampain.data.acknowledged) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You Campaigns has been created",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/dashboard/mycampaigns")
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Donation Campaign
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Pet Picture Upload */}
            <div className="flex items-center">
              <label className="block text-gray-700 font-semibold w-1/3">
                Pet Picture
              </label>
              <Dropzone onFileChange={handleFileChange} />
            </div>

            {/* Maximum Donation Amount */}
            <div className="flex items-center">
              <label className="block text-gray-700 font-semibold w-1/3">
                   Pet Name
              </label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange}
                className="w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 shadow-inner"
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
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
