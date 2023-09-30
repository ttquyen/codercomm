import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import HomePage from "../pages/homePage/HomePage";
import AccountPage from "../pages/accountPage/AccountPage";
import UserProfilePage from "../pages/userProfilePage/UserProfilePage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import BlankLayout from "../layouts/BlankLayout";
import AuthRequire from "./AuthRequire";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="user/:userId" element={<UserProfilePage />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
