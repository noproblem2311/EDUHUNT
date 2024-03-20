"use client";
import React from "react";
import { Breadcrumb, theme } from "antd";
import MainLayout from "../components/core/layouts/MainLayout";
import Slider from "../components/core/common/Slider.jsx";
import GridSlide from "../components/core/common/GridSlide";
import GridItem from "../components/core/common/GridItem";
import Toasify from "../components/core/common/Toasify";
import queryString from "query-string";
import { useEffect, useState } from "react";

const Home = () => {
  const [toasify, setToasify] = useState({ message: "", type: "" });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const parsedQuery = queryString.parse(window.location.search);
      const message = parsedQuery.message;
      if (message) {
        setToasify({ message: message, type: "error" });
      }
    }
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <MainLayout>
      {toasify.message && (
        <Toasify message={toasify.message} type={toasify.type} />
      )}
      <Slider />
      {/* <Breadcrumb className="my-4">
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        </Breadcrumb> */}
      {/* <div
          className={`bg-${colorBgContainer} min-h-280 p-6 rounded-${borderRadiusLG}`}
        >
          Trang chủ
        </div> */}
      <GridSlide />
      <GridItem></GridItem>
    </MainLayout>
  );
};

export default Home;
