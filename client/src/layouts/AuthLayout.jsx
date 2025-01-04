import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "@/components/Header";

export default function AuthLayout({ AUTH }) {

  return AUTH ? (
    <div className="bg-[#F9FBFC] h-screen">
      <Header AUTH={AUTH} />
      <main className="xl:px-[150px] pt-20 pb-6">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/signin" replace={true} />
  );
}

AuthLayout.propTypes = {
  AUTH: PropTypes.bool.isRequired,
};
