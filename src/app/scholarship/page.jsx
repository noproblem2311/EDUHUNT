"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../../components/core/layouts/MainLayout";
import { Image } from "antd";
import FPTU from "../../../public/images/FPTU.png";
import { useScholarship } from "../../hooks/useScholarship";
import { useProfile } from "../../hooks/useProfile";
import { Select } from "antd";
import { useLocation } from "../../hooks/useLocation";

const Scholarship = () => {
  const [scholarshipData, setScholarshipData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isVip, setIsVip] = useState(false);
  const role = localStorage.getItem("role");
  const { getScholarship } = useScholarship();
  const { getProfile } = useProfile();
  const { Option } = Select;
  const { getCountries, getCities, countries, cities } = useLocation();
  const filterOption = (input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  const [searchParams, setSearchParams] = useState({
    schoolname: "",
    budget: "",
    location: "",
  });

  const handleCountryChange = (value) => {
    getCities(value);
    setSearchParams({
      ...searchParams,
      location: `${value}, ${searchParams.location.split(", ")[1] || ""}`,
    });
  };

  const handleCityChange = (value) => {
    setSearchParams({
      ...searchParams,
      location: `${searchParams.location.split(", ")[0] || ""}, ${value}`,
    });
  };

  const handleInputChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getScholarship();
        const scholarships = data.filter(
          (scholarship) => scholarship.isApproved
        );
        setScholarshipData(scholarships);
        setOriginalData(scholarships);
      } catch (error) {
        console.error(error);
      }
    };

    // Get the user's VIP status
    const fetchVipStatus = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await getProfile(userId);
        setIsVip(response.isVIP);
      } catch (error) {
        console.error(error);
      }
    };

    getCountries();
    fetchData();
    fetchVipStatus();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!isVip&&role=='User') {
      alert("Only VIP users can search.");
      return;
    }

    const locationSearch = searchParams.location
      .trim()
      .toLowerCase()
      .replace(/,+$/, "");

    const filteredData = originalData.filter((scholarship) => {
      let matchSchoolName = true;
      let matchBudget = true;
      let matchLocation = true;

      if (searchParams.schoolname && scholarship.schoolName) {
        matchSchoolName = scholarship.schoolName
          .toLowerCase()
          .includes(searchParams.schoolname.toLowerCase());
      }

      if (searchParams.budget && scholarship.budget) {
        const budget = Number(scholarship.budget.replace(/[^0-9.-]+/g, ""));
        matchBudget = budget <= Number(searchParams.budget);
      }

      if (locationSearch && scholarship.location) {
        matchLocation = scholarship.location
          .toLowerCase()
          .includes(locationSearch);
      }

      return matchSchoolName && matchBudget && matchLocation;
    });

    console.log(searchParams);
    setScholarshipData(filteredData);
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Search for Scholarships</h2>
        </div>

        <div className="mt-4">
          <form action="#" onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <Select
                  id="country"
                  name="country"
                  className="w-full h-[41px] border border-[black] rounded-lg "
                  defaultValue="Select a country"
                  onChange={handleCountryChange}
                  showSearch
                  filterOption={filterOption}
                >
                  {countries.map((country, index) => (
                    <Option key={index} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <Select
                  id="city"
                  name="city"
                  className="w-full h-[41px] border border-[black] rounded-lg "
                  defaultValue="Select a city"
                  onChange={handleCityChange}
                  showSearch
                  filterOption={filterOption}
                >
                  <Select.Option value="">Select a city</Select.Option>
                  {cities.map((city, index) => (
                    <Option key={index} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <label
                  htmlFor="schoolname"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  School Name
                </label>
                <input
                  type="text"
                  id="schoolname"
                  name="schoolname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter school name"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Budget
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter budget"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[100%] p-4">
          <div className="flex flex-wrap items-center justify-center">
            {scholarshipData.map((scholarship, index) => (
              <div key={index} className="p-4">
                <div className="bg-white rounded-lg shadow-lg">
                  <div className="flex flex-col items-center justify-center p-8 w-[400px]">
                    <Image
                      src={scholarship.imageUrl || FPTU.src}
                      alt={`${scholarship.schoolName} logo`}
                      className="mb-4 rounded-md object-cover"
                      width={300}
                      height={300}
                    />
                    <h1 className="text-2xl font-bold text-gray-800">
                      {scholarship.schoolName}
                    </h1>
                    <p className="text-md text-gray-600">{scholarship.title}</p>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-lg font-bold text-gray-800">
                          {scholarship.budget}$
                        </p>
                        <p className="text-sm text-gray-600">Tuition</p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4 gap-4">
                      {/* <a
                        href={scholarship.url}
                        target="_blank"
                        className="btn btn-primary font-bold"
                      >
                        SAVE SCHOOL
                      </a> */}
                      <a
                        href={scholarship.url}
                        target="_blank"
                        className="btn btn-secondary font-bold"
                      >
                        <button
                          style={{
                            backgroundColor: "White",
                            borderRadius: "10px",
                            padding: "10px",
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          }}
                          id="visitScholarshipWebsite"
                          className="btn btn-secondary font-bold"
                        >
                          Visit Scholarship Website
                        </button>
                      </a>
                      {scholarship.isInSite && (
                        <a
                          href={`/scholarship/${scholarship.id}`}
                          target="_blank"
                          className="btn btn-primary font-bold"
                        >
                          <button
                            style={{
                              backgroundColor: "White",
                              borderRadius: "10px",
                              padding: "10px",
                              boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            }}
                            id="visitScholarshipWebsite"
                            className="btn btn-secondary font-bold"
                          >
                            Detail
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Scholarship;
