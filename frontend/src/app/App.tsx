import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./layout/Layout";
import { useRestoreSession } from "../features/auth/hooks/useRestoreSession";

import ProtectedRoute from "./layout/ProtectedRoutes";
import RequireRole from "./layout/RequireRole";

import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ProductPage from "../pages/ProductPage";
import CreateProductPage from "../pages/CreateProductPage";
import MyOrdersPage from "../pages/MyOrdersPage";

const App = () => {
  const { isRestoring } = useRestoreSession();

  if (isRestoring) {
    return null;
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          {/* Core Auth Pages */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/products" element={<ProductPage />} />

          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/orders/mine" element={<MyOrdersPage />} />
          </Route>

          {/* Required Role Route */}
          <Route element={<RequireRole role="admin" />}>
            <Route path="/products/new" element={<CreateProductPage />} />
          </Route>

          {/* 404 Catch-All Route */}
          <Route
            path="*"
            element={
              <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-64px)] gap-2">
                <h1 className="text-4xl font-extrabold text-white">404</h1>
                <p className="text-gray-400">Page not found.</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
