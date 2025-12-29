
import React, { useContext, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";

const Profile = () => {
  const { navigate } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock Data for demonstration
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically make an API call to update user details
  };

  return (
    <div className="border-t pt-14 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 flex flex-col gap-4">
        <h2 className="text-xl font-medium mb-4">My Account</h2>
        <button
          onClick={() => setActiveTab("profile")}
          className={`text-left px-4 py-2 border rounded ${
            activeTab === "profile" ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
        >
          Profile Details
        </button>
        <button
          onClick={() => setActiveTab("address")}
          className={`text-left px-4 py-2 border rounded ${
            activeTab === "address" ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
        >
          Address Book
        </button>
        <button
          onClick={() => navigate('/orders')}
          className="text-left px-4 py-2 border rounded hover:bg-gray-100"
        >
          Orders
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full md:w-3/4">
        <div className="text-2xl mb-6">
          <Title text1={activeTab === "profile" ? "MY" : "ADDRESS"} text2={activeTab === "profile" ? "PROFILE" : "BOOK"} />
        </div>

        {activeTab === "profile" && (
          <div className="max-w-lg">
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-600">Name</label>
                <input
                  type="text"
                  value={user.name}
                  disabled={!isEditing}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="border px-3 py-2 rounded focus:outline-none focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-600">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-600">Phone</label>
                <input
                  type="text"
                  value={user.phone}
                  disabled={!isEditing}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="border px-3 py-2 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div className="mt-4">
                {isEditing ? (
                  <div className="flex gap-4">
                    <button type="submit" className="bg-black text-white px-6 py-2 rounded">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-black text-white px-6 py-2 rounded"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {activeTab === "address" && (
          <div className="flex flex-col gap-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="border p-4 rounded relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{addr.type}</h3>
                    <p className="text-gray-600">{addr.street}</p>
                    <p className="text-gray-600">
                      {addr.city}, {addr.state} {addr.zip}
                    </p>
                    <p className="text-gray-600">{addr.country}</p>
                  </div>
                  <div className="flex gap-2 text-sm text-blue-600">
                    <button className="hover:underline">Edit</button>
                    <button className="hover:underline text-red-500">Delete</button>
                  </div>
                </div>
              </div>
            ))}
            <button className="mt-4 border-2 border-dashed border-gray-300 w-full py-4 text-gray-500 hover:border-black hover:text-black transition-colors rounded">
              + Add New Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
