import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';
import useUser from '../../hooks/userInfo/useUser';

export default function Details() {
    const details = useLoaderData()
    const { displayName, email, photoURL } = useUser()
    const axiosSecure = useAxiosSecure()

    const { name, age, petCategory, petLocation, description, longDescription, breed, gender, adoptionFee, weight, image, dateAdded, status, author,
        _id } = details;

    const dateOnly = dateAdded?.split("T")[0];

    const handleAdopt = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;

        const information = { name, email, phone, address, petId: _id, date: new Date() ,status:"Pending" };
        
        // Send the information to the server for adoption
        axiosSecure.post('/pets/adoption', information)
            .then((res) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Request has been successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                document.getElementById('my_modal_2').close()
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                    <img
                        className='w-full'
                        src={image}
                        alt={name} />
                </figure>
                <div className="card-body min-w-80">
                    <h2 className="card-title">{name}</h2>
                    <p className=''>{description}</p>
                    <div className="">
                        <h4 className=""><span className=" font-bold">Breed:</span> {breed}</h4>
                        <h4 className=""><span className=" font-bold">Gender:</span> {gender}</h4>
                        <h4 className=""><span className=" font-bold">Age:</span> {age} years</h4>
                        <h4 className=""><span className=" font-bold">Weight:</span> {weight} pound</h4>
                        <h4 className=""><span className=" font-bold">Adoption Fee:</span> ${adoptionFee}</h4>
                        <h4 className=""><span className=" font-bold">Status:</span> {status}</h4>
                        <h4 className=""><span className=" font-bold">Date Added:</span> {dateOnly}</h4>
                        <h4 className=""><span className=" font-bold">Location:</span> {petLocation} pound</h4>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_2').showModal()}>Adopt</button>
                    </div>
                </div>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <div className="flex justify-center items-center gap-4">
                            <img className='w-52 h-40 rounded-full' src={image} alt={name} />
                            <div className="space-y-3">
                                <h4 className="">Name:<span className=" font-bold">{name}</span></h4>
                                <h4 className="text-xs">Pet ID:<span className=" font-bold"> {_id}</span></h4>
                            </div>

                        </div>
                        {/* <p className="py-4">Press ESC key or click outside to close</p> */}
                        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                            <form className="card-body" onSubmit={handleAdopt}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">User Name</span>
                                    </label>
                                    <input name='name' defaultValue={displayName} type="text" placeholder="Name" className="input input-bordered" required disabled />
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input name='email' defaultValue={email} type="email" placeholder="email" className="input input-bordered" required disabled />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input name='phone' type="number" placeholder="Phone" className="input input-bordered" required />
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input name='address' type="text" placeholder="Address" className="input input-bordered" required />

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <p className="p-10 leading-8"><span className='font-bold'>Description</span> : {longDescription}</p>
        </>
    )
}
