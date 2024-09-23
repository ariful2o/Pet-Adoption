import React from 'react'

export default function Banner() {
    return (
        <section className='bg-[url("https://themebeyond.com/pre/petco-prev/petco-live/img/bg/counter_bg.jpg")] py-20'>
            <div className="text-center p-4">
                <h4 className="text-red-500 text-2xl mt-10">Why Choose Us?
                </h4>
                <h1 className="text-4xl font-black my-10">Best Service to Breeds Your<br /> Loved Dog Explore</h1>
            </div>
            <div className="p-4 flex justify-evenly items-center">
                <div className="bg-white rounded-lg flex flex-col justify-center items-center gap-4 px-10 py-6 shadow-lg">
                    <h1 className="text-5xl hover:text-red-600 font-black font-nunito">73%</h1>
                    <p className="uppercase font-semibold text-[#676666]">dogs are first bred</p>
                </div>
                <div className="bg-white rounded-lg flex flex-col justify-center items-center gap-4 px-10 py-6 shadow-lg">
                    <h1 className="text-5xl hover:text-red-600 font-black font-nunito">259+</h1>
                    <p className="uppercase font-semibold text-[#676666]">Most dogs are first</p>
                </div>
                <div className="bg-white rounded-lg flex flex-col justify-center items-center gap-4 px-10 py-6 shadow-lg">
                    <h1 className="text-5xl hover:text-red-600 font-black font-nunito">39K</h1>
                    <p className="uppercase font-semibold text-[#676666]">Dog Breeding</p>
                </div>
                <div className="bg-white rounded-lg flex flex-col justify-center items-center gap-4 px-10 py-6 shadow-lg">
                    <h1 className="text-5xl hover:text-red-600 font-black font-nunito">45+</h1>
                    <p className="uppercase font-semibold text-[#676666]">Years Of History</p>
                </div>
               
            </div>
        </section>
    )
}