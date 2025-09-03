import React from "react";
import { Link, useLoaderData } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
const DynamicUser = () => {
  const data = useLoaderData();
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
      {/* User Details Header */}
      <div className="flex justify-between mb-6">
        <Link to="/">
          {" "}
          <button className="text-sm btn btn-soft">← Back to Users</button>
        </Link>

        <h2 className="text-2xl font-semibold text-gray-800">User Details</h2>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 justify-between xl:space-x-8">
        {/* Left Column: Personal Information */}
        <div
          className="col-span-1 bg-gray-100 p-4 rounded-xl xl:mb-0 mb-8"
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-anchor=".example-selector"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Information
          </h3>
          <div className="space-y-2">
            <p className="text-gray-500">Name</p>
            <p className="font-semibold text-gray-800">{data.name}</p>
            <p className="text-gray-500">Username</p>
            <p className="font-semibold text-gray-800">@{data.username}</p>

            <p className="text-gray-500">Email</p>
            <p className="font-semibold text-gray-800">{data.email}</p>

            <p className="text-gray-500">Phone</p>
            <p className="font-semibold text-gray-800">{data.phone}</p>

            <p className="text-gray-500">Website</p>
            <a
              className="font-semibold text-blue-800"
              href={`https://${data.website}`}
            >
              {data.website}
            </a>
          </div>
        </div>

        {/* Right Column: Address */}
        <div
          className="col-span-1 bg-gray-100 p-4 rounded-xl"
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-anchor=".example-selector"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Address</h3>
          <div className="space-y-2">
            <p className="text-gray-500">Street</p>
            <p className="font-semibold text-gray-800">{data.address.street}</p>

            <p className="text-gray-500">Suite</p>
            <p className="font-semibold text-gray-800">{data.address.suite}</p>

            <p className="text-gray-500">City</p>
            <p className="font-semibold text-gray-800">{data.address.city}</p>

            <p className="text-gray-500">Zipcode</p>
            <p className="font-semibold text-gray-800">
              9{data.address.zipcode}874
            </p>

            <p className="text-gray-500">Geo Location</p>
            <p className="font-semibold text-gray-800">
              {data.address.geo.lat} , {data.address.geo.lng}
            </p>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="mt-8 bg-gray-100 p-4  rounded-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Company</h3>
        <div
          className="grid grid-cols-1 xl:grid-cols-3 "
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-anchor=".example-selector"
        >
          <div>
            <p className="text-gray-500">Company Name</p>
            <p className="font-semibold text-gray-800">{data.company.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Catch Phrase</p>
            <p className="font-semibold text-gray-800">
              {data.company.catchPhrase}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Business</p>
            <p className="font-semibold text-gray-800">{data.company.bs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicUser;
