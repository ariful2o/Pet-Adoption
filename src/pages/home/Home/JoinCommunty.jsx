
import image1 from '../../../../src/assets/cat & dog/Image (1).png'
import image2 from '../../../../src/assets/cat & dog/Image (2).png'
import CustomBtn from '../../../componts/CustomBtn'

export default function JoinCommunty() {
    return (
        <section className='bg-[url("https://themebeyond.com/pre/petco-prev/petco-live/img/bg/counter_bg.jpg")]'>
            <div className="flex flex-col lg:flex-row gap-10 py-2 lg:py-20">
                <div className="p-4 lg:p-10">
                    <h4 className="text-2xl leading-10 mb-20">At Petopia, we&apos;re dedicated to rescuing and rehoming pets in need, ensuring they find the love they deserve. With compassion and community at our core, we aim to match each pet with their perfect forever family, fostering lifelong bonds of love.</h4>
                    <CustomBtn text="Join Our Community"></CustomBtn>
                </div>
                <div className="grid grid-cols-2 gap-1 lg:gap-4 min-w-80 lg:min-w-[430px] p-2 lg:p-10">
                    <div className="bg-white rounded-lg flex flex-col justify-center items-center gap-4 px-10 py-6 shadow-xl">
                        <h1 className="text-5xl hover:text-red-600 font-black font-nunito">200+</h1>
                        <p className="capitalize font-semibold text-[#676666]">Shelters</p>
                    </div>
                    <div className="bg-white rounded-lg flex flex-col justify-center items-center gap-4 px-10 py-6 shadow-lg">
                        <h1 className="text-5xl hover:text-red-600 font-black font-nunito">25K</h1>
                        <p className="capitalize font-semibold text-[#676666]">Volunteers</p>
                    </div>
                    <div className="bg-white rounded-lg flex flex-col justify-center items-center gap-4 px-10 py-6 shadow-lg">
                        <h1 className="text-5xl hover:text-red-600 font-black font-nunito">5.8K</h1>
                        <p className="capitalize font-semibold text-[#676666]">Pet Adopted</p>
                    </div>
                    <div className="bg-white rounded-lg flex flex-col justify-center items-center gap-4 px-10 py-6 shadow-xl">
                        <h1 className="text-5xl hover:text-red-600 font-black font-nunito">25K</h1>
                        <p className="capitalize font-semibold text-[#676666]">Volunteers Hours</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-1 lg:gap-4 p-2 lg:p-8 overflow-hidden">
                <img className='w-1/2' src={image1} alt="" />
                <img className='w-1/2' src={image2} alt="" />
            </div>
        </section>
    )
}
