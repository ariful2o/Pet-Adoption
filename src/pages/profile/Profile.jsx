import { updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Dropzone from '../../componts/DropZone';
import auth from '../../firebase/firebase.conf';
import useAuth from '../../hooks/auth/useAuth';
import { uploadToImgbb } from '../../hooks/imageUpload/useImageUpload';
import useUser from '../../hooks/userInfo/useUser';

export default function Profile() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { displayName, email, photoURL }=useUser()
    const [file, setFile] = useState(null);
    const {logOutUser}=useAuth()

    const handleFileChange = (file) => {
        setFile(file); // Update the file state in the parent
        // console.log("File received in parent:", file);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;

        // file uploade imgbb
        const imgUpliadIMGBB = await uploadToImgbb(file)
        // console.log('Image uploaded successfully:', imgUpliadIMGBB);

        // update user profile firebase
        const updateUserProfile = await updateProfile(auth.currentUser, {
            displayName: name, photoURL: imgUpliadIMGBB
        }).then(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile updated sucessfull",
                showConfirmButton: false,
                timer: 1500
            });
            // Close the modal
            document.getElementById('my_modal_2').close()
        })

    }

    return (
        <div className="w-full max-w-md mx-auto my-10 bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex justify-end px-4 pt-4">
                <button
                    onClick={toggleDropdown}
                    className=" fixed text-gray-500 dark:text-gray-400 hover:bg-gray-100  focus:ring-1 focus:outline-none rounded-lg text-sm p-1.5"
                    type="button"
                >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                    >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                    <div className="z-10 fixed text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mr-9">
                        <ul className="py-2">
                            <li>
                                <a onClick={() => document.getElementById('my_modal_2').showModal()} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Edit</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Export Data</a>
                            </li>
                            <li>
                                <p onClick={logOutUser} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Log Out</p>
                            </li>
                           
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={photoURL} alt="Bonnie image" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">{displayName}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Email : {email}</span>
                <div className="flex mt-4 lg:mt-6">
                    <a onClick={() => document.getElementById('my_modal_2').showModal()} href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Update</a>
                    <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Message</a>
                </div>
            </div>


            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <div className="flex justify-center items-center gap-4">


                    </div>
                    {/* <p className="py-4">Press ESC key or click outside to close</p> */}
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleUpdate}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input name='name' defaultValue={displayName} type="text" placeholder="Name" className="input input-bordered" required />
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' defaultValue={email} type="email" placeholder="email" className="input input-bordered" required disabled />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <Dropzone onFileChange={handleFileChange} />

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>



        </div>
    );
};
