import React from 'react'
import dogs from "../../../assets/cat & dog/Image (4).png"
import mail from "../../../assets/icons/Vector.svg"

export default function Subscribe() {
    return (
        <section>
            <div className="flex flex-col lg:flex-row pt-20 bg-base-200">
                <div className="">
                    <img className='h-full' src={dogs} alt="" />
                </div>
                <div className="bg-[#1C4A2A] p-16">
                    <h2 className='text-white text-5xl leading-[72px]'>Subscribe to Our Newsletter for<br />
                        Pet Updates and News!</h2>
                    <p className='text-[#FFFFFFB2] py-4'>Stay in the loop with the latest updates! Join our newsletter to receive news, event announcements, and heartwarming stories directly to your inbox. </p>
                    <form className='mt-10 flex gap-4'>
                        <label className="input input-bordered flex items-center gap-2 border-1 border-white bg-[#1C4A2A] w-4/5">
                            <img src={mail} alt="" />
                            <input className='p-3 px-10 rounded-md text-white' type="text" placeholder="Type your email here..." />
                        </label>
                        <button className='btn px-4 py-2' type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
