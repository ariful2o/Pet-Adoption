import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Dropzone from '../../componts/DropZone';
import useAuth from '../../hooks/auth/useAuth';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';
import { uploadToImgbb } from '../../hooks/imageUpload/useImageUpload';
import useUser from '../../hooks/userInfo/useUser';




export default function AddBlog() {

    const { displayName, email, photoURL } = useUser()
    const { user } = useAuth()
    const [file, setFile] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const handleFileChange = (file) => {
        setFile(file);
    };
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add a new Blog</h2>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    longDescription: '',

                }}
                validate={values => {
                    const errors = {};
                    if (!values.title) errors.title = 'Required';
                    if (!values.description) errors.description = 'Required';
                    if (!values.longDescription) errors.longDescription = 'Required';
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
                    try {
                        if (!user) {
                            navigate("/login")
                            return
                        }

                        const imageUrl = await uploadToImgbb(file);
                        const blogdata = {
                            ...values,
                            image: imageUrl,
                            dateAdded: new Date().toISOString(),
                            author: { displayName, email, photoURL }
                        };

                        const result = await axiosSecure.post("/addblog", blogdata)
                        if (result.data.acknowledged) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your Pet has been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });

                            // Reset the form after successful submission
                            resetForm();
                            setFile(null)
                            navigate("/blog")
                        }
                    } catch (error) {
                        console.error('Error adding pet:', error);
                        setFieldError('submit', 'Error adding pet. Please try again.');
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4 ">
                            <label htmlFor="petImage" className="block text-sm font-medium text-gray-700"> Image:</label>
                            <Dropzone onFileChange={handleFileChange} />
                            <ErrorMessage name="petImage" component="div" className="text-red-600 text-sm" />
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="mb-4 w-full">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                                <Field type="text" name="title" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
                                <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
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
