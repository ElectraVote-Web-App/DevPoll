import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "@/components/Header";

export default function SharedLayout({ AUTH }) {

  return (
    <div className="bg-[#F9FBFC] h-screen">
      <Header AUTH={AUTH} />
      <main className="xl:px-[333px] pt-24 px-3">
        <Outlet />
      </main>
    </div>
  );
}

SharedLayout.propTypes = {
  AUTH: PropTypes.bool.isRequired,
};