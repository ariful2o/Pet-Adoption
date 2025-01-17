import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2';
import Dropzone from '../../componts/DropZone';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';
import { uploadToImgbb } from '../../hooks/imageUpload/useImageUpload';
import useMyPets from '../../hooks/mypets/useMyPets';
import useUser from '../../hooks/userInfo/useUser';


const petCategories = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'bird', label: 'Bird' },
  // Add more categories as needed
];

const petGender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  // Add more categories as needed
];
export default function UpdatePet() {
  const axiosSecure = useAxiosSecure();
  const id = useParams()
  const { displayName, email, photoURL } = useUser();
  const [file, setFile] = useState(null);
  const [mypets, isLoading] = useMyPets()
  const navigate = useNavigate()



  const updateItem = mypets.find(p => p._id === id.id)

  const handleFileChange = (file) => {
    setFile(file);
  };
  const { age, petCategory, petLocation, description, longDescription, breed, gender, adoptionFee, weight, name, _id } = updateItem

  if (isLoading) return <div className='w-full min-h-96 flex justify-center items-center'><span className="loading  text-accent loading-ring loading-lg"></span></div>
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Your Pet</h2>
      <Formik
        initialValues={{
          name: `${name}`,
          age: `${age}`,
          petCategory: '',
          gender: '',
          petLocation: `${petLocation}`,
          description: `${description}`,
          longDescription: `${longDescription}`,
          breed: `${breed}`,
          adoptionFee: `${adoptionFee}`,
          weight: `${weight}`,
        }}
        validate={values => {
          const errors = {};
          if (!values.name) errors.name = 'Required';
          if (!values.age) errors.age = 'Required';
          if (!values.petCategory) errors.petCategory = 'Required';
          if (!values.petLocation) errors.petLocation = 'Required';
          if (!values.breed) errors.breed = 'Required';
          if (!values.gender) errors.gender = 'Required';
          if (!values.weight) errors.weight = 'Required';
          if (!values.adoptionFee) errors.adoptionFee = 'Required';
          if (!values.description) errors.description = 'Required';
          if (!values.longDescription) errors.longDescription = 'Required';
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
          try {
            const imageUrl = await uploadToImgbb(file);
            const petData = {
              ...values,
              image: imageUrl,
              dateAdded: new Date().toISOString(),
              status: 'Available',
              author: { displayName, email, photoURL }
            };

            const result = await axiosSecure.put(`/updatepet/:${petCategory.value}/${_id}`, petData)
            if (result.data.acknowledged) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Pet has been updated",
                showConfirmButton: false,
                timer: 1500
              });

              // Reset the form after successful submission
              resetForm();
              navigate("/dashboard/mypet")
              // setFile(null)

            }
          } catch (error) {
            console.error('Error adding pet:', error);
            setFieldError('submit', 'Error adding pet. Please try again.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="mb-4 ">
              <label htmlFor="petImage" className="block text-sm font-medium text-gray-700">Pet Image:</label>
              <Dropzone onFileChange={handleFileChange} />
              <ErrorMessage name="petImage" component="div" className="text-red-600 text-sm" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="mb-4 w-full">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Pet Name:</label>
                <Field type="text" name="name" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
                <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Pet Age:</label>
                <Field type="number" name="age" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
                <ErrorMessage name="age" component="div" className="text-red-600 text-sm" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="mb-4 w-full">
                <label htmlFor="petCategory" className="block text-sm font-medium text-gray-700">Pet Category: <span className='text-gray-100'>{petCategory.label}</span></label>
                <Select
                  name="petCategory"
                  options={petCategories}
                  className="mt-1"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: 'white',
                      borderColor: 'gray',
                    }),
                  }}
                  onChange={(option) => setFieldValue('petCategory', option)}
                />
                <ErrorMessage name="petCategory" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:<span className='text-gray-100'>  {gender.label}</span></label>
                <Select
                  name="gender"
                  // defaultInputValue={}
                  options={petGender}
                  className="mt-1"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: 'white',
                      borderColor: 'gray',
                    }),
                  }}
                  onChange={(option) => setFieldValue('gender', option)}
                />
                <ErrorMessage name="gender" component="div" className="text-red-600 text-sm" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="mb-4 w-full">
                <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Breed:</label>
                <Field type="text" name="breed" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
                <ErrorMessage name="breed" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="petLocation" className="block text-sm font-medium text-gray-700">Pet Location:</label>
                <Field type="text" name="petLocation" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
                <ErrorMessage name="petLocation" component="div" className="text-red-600 text-sm" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="mb-4 w-full">
                <label htmlFor="adoptionFee" className="block text-sm font-medium text-gray-700">Adoption Fee:</label>
                <Field type="number" name="adoptionFee" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
                <ErrorMessage name="adoptionFee" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight:</label>
                <Field type="number" name="weight" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
                <ErrorMessage name="weight" component="div" className="text-red-600 text-sm" />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description:</label>
              <Field type="text" name="description" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
              <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">Long Description:</label>
              <Field as="textarea" name="longDescription" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" rows="4" />
              <ErrorMessage name="longDescription" component="div" className="text-red-600 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
            <ErrorMessage name="submit" component="div" className="text-red-600 text-sm mt-2" />
          </Form>
        )}
      </Formik>
    </div>
  )
}
