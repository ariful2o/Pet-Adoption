import React from 'react'
import image2 from "../../../assets/cat & dog/Mask group (1).png"
import image3 from "../../../assets/cat & dog/Mask group (2).png"
import image4 from "../../../assets/cat & dog/Mask group (3).png"
import image1 from "../../../assets/cat & dog/Mask group.png"

import CustomBtn from '../../../componts/CustomBtn'

export default function FindFriends() {
    return (
        <div className="hero bg-base-200 min-h-screen py-2 lg:py-20">
            <div className="hero-content flex-col lg:flex-row gap-12">
                <div className="w-full grid grid-cols-2 gap-1 lg:gap-3">
                    <img
                        src={image1}
                        className="w-full h-auto lg:w-80 lg:h-[300px] rounded-lg shadow-2xl" />
                    <img
                        src={image2}
                        className="w-full h-auto lg:w-80 lg:h-[300px] rounded-lg shadow-2xl" />
                    <img
                        src={image3}
                        className="w-full h-auto lg:w-80 lg:h-[300px] rounded-lg shadow-2xl" />
                    <img
                        src={image4}
                        className="w-full h-auto lg:w-80 lg:h-[300px] rounded-lg shadow-2xl" />
                </div>
                <div className='w-full'>
                    <h1 className="text-2xl lg:text-5xl font-medium text-[#0E2515] leading-10 lg:leading-[60px]">Find Out Which Furry Friends Fits You Best!</h1>
                    <p className="py-6 text-lg font-normal text-[#8C8C8C]">
                        Take a stroll through our furry family and uncover the ideal companion that perfectly matches your lifestyle and personality. Whether you're seeking a playful pal for outdoor adventures or a cuddly companion for cozy nights in, our diverse selectio
                    </p>
                    <CustomBtn text="Explore More"></CustomBtn>
                </div>
            </div>
        </div>
    )
}
