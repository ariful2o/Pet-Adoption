import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Details() {
    const details = useLoaderData()
    const { age, adoptionFee, image, breed, description, gender, status, weight, name, _id } = details

    const handleAdopt = (e) => {
        e.preventDefault();
    const form = e.target;
    const name=form.name.value;
    const email=form.email.value;
    const phone=form.phone.value;
    const address = form.address.value;

    const information={name,email,phone,address}
    console.log(information)
    }

    return (
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
                    <h4 className=""><span className=" font-bold">status:</span> {status}</h4>
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
                                <input name='name' type="text" placeholder="Name" className="input input-bordered" required />
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" required />
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
    )
}
