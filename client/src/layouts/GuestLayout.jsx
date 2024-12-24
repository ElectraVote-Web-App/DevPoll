import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "@/components/Header";

export default function GuestLayout({ AUTH }) {
  return AUTH ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div className="bg-[#F9FBFC] h-screen">
      <Header AUTH={AUTH} />
      <main className="xl:px-[333px] pt-24 px-3">
        <Outlet />
      </main>
    </div>
  );
}

GuestLayout.propTypes = {
  AUTH: PropTypes.bool.isRequired,
};
