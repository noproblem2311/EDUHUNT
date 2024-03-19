import { useProfile } from "../../hooks/useProfile";
import { useCertificate } from "../../hooks/useCertificate";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CloudinaryUpload from "../cloud/CloudinaryUpload";
import { Button } from "antd";
import { Avatar } from "@nextui-org/avatar";

function EditProfile() {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const { getProfile, updateProfile } = useProfile();
  const { postCertificate } = useCertificate();
  const [profile, setProfile] = useState({
    id: "",
    urlAvatar: "",
    firstName: "",
    lastName: "",
    userName: "",
    contactNumber: "",
    address: "",
    description: "",
    isVIP: false,
    isAllow: false,
  });
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [showCertificateUpload, setShowCertificateUpload] = useState(false);

  useEffect(() => {
    getProfile(userId)
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", data);
        setProfile({
          id: data.id,
          urlAvatar: data.urlAvatar || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          userName: data.userName || "",
          contactNumber: data.contactNumber || "",
          address: data.address || "",
          description: data.description || "",
          isVIP: data.isVIP || false,
          isAllow: data.isAllow || false,
        });
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdateProfile = (isupdateVIP) => {
    const updatedProfile = { ...profile };
    if (isupdateVIP) {
      updatedProfile.isVIP = true;
    }
    console.log(updatedProfile.isVIP);
    updateProfile(profile.id, updatedProfile)
      .then(() => {
        if (!isupdateVIP) {
          alert("Profile updated successfully");
          if (role === "Admin") {
            window.location.href = "https://eduhunt.vercel.app/admin";
          }
        } else {
          if (window.confirm("Are you sure to pay VIP ?")) {
            window.location.href = "https://eduhunt.vercel.app/payment";
          }
        }
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleImageUpload = (imageUrl) => {
    setProfile((prevProfile) => ({ ...prevProfile, urlAvatar: imageUrl }));
  };

  const handleShowAvatarUpload = () => {
    setShowAvatarUpload(true);
  };

  const handleCloseAvatarUpload = () => {
    setShowAvatarUpload(false);
  };

  const handleShowCertificateUpload = () => {
    setShowCertificateUpload(true);
  };

  const handleCloseCertificateUpload = () => {
    setShowCertificateUpload(false);
  };

  const handleCertificateUpload = (imageUrl) => {
    postCertificate(userId, imageUrl)
      .then(() => {
        alert("Certificate uploaded successfully");
      })
      .catch((error) => console.error("Error uploading certificate:", error));
  };

  return (
    <div className="flex">
      <div className="w-1/4  p-10 rounded-lg h-screen"></div>

      <div className="flex-1 px-10 pt-2 pb-10 border border-solid border-[#ccc] rounded mx-3 h-full">
        <h1 className="font-extrabold text-4xl mb-5 ">My Profile</h1>
        <div className="mb-20">
          <div className="w-32 h-32 rounded-full my-4 mb-2 relative">
            {profile.isVIP && role === "User" ? (
              <Avatar
                isBordered
                color="warning"
                src={profile.urlAvatar}
                alt="Avatar"
                width={128}
                height={128}
                className="object-cover w-32 h-32 rounded-full mx-auto my-4"
              />
            ) : (
              <Image
                src={profile.urlAvatar}
                alt="Avatar"
                width={128}
                height={128}
                className="object-cover w-32 h-32 rounded-full mx-auto my-4"
              />
            )}
            <div className=" flex gap-4">
              <Button
                className="rounded bg-[#C6C6C6] font-bold"
                onClick={handleShowAvatarUpload}
              >
                Change Avatar
              </Button>
              {showAvatarUpload && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-50 z-10">
                  <div className="relative z-[11] bg-[#fff] w-[32rem] h-[32rem] bg-white p-8 rounded-lg">
                    <button
                      onClick={handleCloseAvatarUpload}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded"
                    >
                      Close
                    </button>
                    <CloudinaryUpload onUpload={handleImageUpload} />
                  </div>
                </div>
              )}
              {(role === "Mentor" || role === "Scholarship Provider") && (
                <>
                  {profile.isAllow ? (
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="green"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-[green]">Verified</span>
                    </div>
                  ) : (
                    <Button
                      className="rounded bg-[#C6C6C6] font-bold"
                      onClick={handleShowCertificateUpload}
                    >
                      Upload Certificate
                    </Button>
                  )}
                  {showCertificateUpload && (
                    <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-50 z-10">
                      <div className="relative z-[11] bg-[#fff] w-[32rem] h-[32rem] bg-white p-8 rounded-lg">
                        <button
                          onClick={handleCloseCertificateUpload}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded"
                        >
                          Close
                        </button>
                        <CloudinaryUpload onUpload={handleCertificateUpload} />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="my-2">
          {role === "User" && (
            <>
              {profile.isVIP ? (
                <p className="bg-[#FFD700] text-center p-1 rounded">VIP</p>
              ) : (
                <>
                  <p className="bg-[#FFD700] text-center p-1 rounded">
                    Not VIP
                  </p>
                  <Button
                    onClick={() => {
                      handleUpdateProfile(true);
                    }}
                    className="rounded bg-[#C6C6C6] padding-2 mt-5 font-bold"
                  >
                    Payment
                  </Button>
                </>
              )}
            </>
          )}
        </div>

        <div className="my-2">
          <label htmlFor="firstName" className="font-bold block mb-5px">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
            className="w-[calc(100%-16px)] p-1 border border-solid border-[#ccc] rounded"
          />
        </div>
        <div className="my-2">
          <label htmlFor="lastName" className="font-bold block mb-5px">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
            className="w-[calc(100%-16px)] p-1 border border-solid border-[#ccc] rounded"
          />
        </div>
        <div className="my-2">
          <label htmlFor="userName" className="font-bold block mb-5px">
            Username:
          </label>
          <input
            type="text"
            name="userName"
            value={profile.userName}
            onChange={handleInputChange}
            className="w-[calc(100%-16px)] p-1 border border-solid border-[#ccc] rounded"
          />
        </div>
        <div className="my-2">
          <label htmlFor="contactNumber" className="font-bold block mb-5px">
            Contact Number:
          </label>
          <input
            type="text"
            name="contactNumber"
            value={profile.contactNumber}
            onChange={handleInputChange}
            className="w-[calc(100%-16px)] p-1 border border-solid border-[#ccc] rounded"
          />
        </div>
        <div className="my-2">
          <label htmlFor="address" className="font-bold block mb-5px">
            Address:
          </label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange}
            className="w-[calc(100%-16px)] p-1 border border-solid border-[#ccc] rounded"
          />
        </div>
        <div className="my-2">
          <label htmlFor="description" className="font-bold block mb-5px">
            Description:
          </label>
          <textarea
            name="description"
            value={profile.description}
            onChange={handleInputChange}
            className="w-[calc(100%-16px)] h-40 p-1 border border-solid border-[#ccc] rounded"
          />
        </div>
        <button
          className="py-2 px-5 bg-[#00277f] text-[#fff] rounded-lg border-none cursor-pointer"
          onClick={() => {
            handleUpdateProfile(false);
          }}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
