import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="contact_img"
        />
          {/* <p className="font-semibold text-xl text-gray-600">Contact Information</p> */}
          <div className="text-gray-500 flex flex-col gap-2 max-w-lg">
            <p><span className="font-semibold">Merchant Legal entity name:</span> OLPIS TECHNOLOGIES LLP</p>
            <p><span className="font-semibold">Registered Address:</span> E-237 BM, AMAR COLONY Amar Colony South Delhi New Delhi Delhi 110024 Lajpat Nagar South Delhi SO DELHI 110024</p>
            <p><span className="font-semibold">Operational Address:</span> E-237 BM, AMAR COLONY Amar Colony South Delhi New Delhi Delhi 110024 Lajpat Nagar South Delhi SO DELHI 110024</p>
            <p><span className="font-semibold">Telephone No:</span> 8959600600</p>
            <p><span className="font-semibold">E-Mail ID:</span> care@careveli.com</p>
            <p className="text-sm mt-4 italic">Last updated on Dec 24 2025</p>
          </div>
        </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10">
        <form className="flex flex-col gap-4 w-full md:max-w-[480px]">
            <p className="font-semibold text-xl text-gray-600">Get in Touch</p>
            <input type="text" placeholder="Name" className="border border-gray-300 px-4 py-2 w-full" />
            <input type="email" placeholder="Email" className="border border-gray-300 px-4 py-2 w-full" />
            <textarea placeholder="Message" className="border border-gray-300 px-4 py-2 w-full h-32"></textarea>
            <button className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-all duration-500">Submit</button>
        </form>
      </div>
      
      <div className="w-full bg-black text-white text-center py-10 px-4 my-10">
        <h3 className="text-2xl font-medium mb-3">Subscribe now & get 20% off</h3>
        <p className="text-gray-300 mb-6 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="w-full sm:flex-1 h-10 px-3 text-black outline-none border border-white" />
            <button className="bg-white text-black px-6 h-10 text-xs sm:text-sm uppercase shadow-md hover:bg-gray-100 transition-colors">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
