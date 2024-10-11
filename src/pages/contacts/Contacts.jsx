import React from 'react'
import TitleBanner from '../../componts/TitleBanner'

export default function Contacts() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  return (
    <section>
      <TitleBanner section={`Contacta Us`} image="https://rescueanimalsireland.ie/images/Adopt%20Articles/romain-dancre-doplSDELX7E-unsplash.jpg?ezimgfmt=rs:352x264/rscb1/ng:webp/ngcb1"></TitleBanner>

      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Contact Form */}
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Subject"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="w-full lg:w-1/2 h-96 mt-8 lg:mt-0">
          <iframe
            title="Google Map"
            className="w-full h-full rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345099063!2d144.95592831531892!3d-37.817209979751795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5777f42b2df4c1a!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614218128348!5m2!1sen!2sau"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
    </section>
  )
}
