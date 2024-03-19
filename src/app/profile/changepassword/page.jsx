"use client";
import MainLayout from "../../../components/core/layouts/MainLayout";
import ChangePassword from "../../../components/Profile/ChangePassword";
import ProfileLayout from "../../../components/core/layouts/ProfileLayout";
import React, { useState, useEffect } from 'react';


const ChangePasswordPage = () => {
    const [role, setRole] = useState(null); // Initialize state to null or an appropriate default value

    useEffect(() => {
        // Access localStorage only on the client-side
        const storedRole = localStorage.getItem("role");
        setRole(storedRole); // Update state with the stored role
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <MainLayout>
            <ProfileLayout role={role}>
        <ChangePassword />
      </ProfileLayout>
    </MainLayout>
  );
};

export default ChangePasswordPage;
