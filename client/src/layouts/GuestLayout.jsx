import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function GuestLayout({ AUTH }) {

  return AUTH ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div>
      <header>
        <h1>Guest Header</h1>
      </header>
      <Outlet />
    </div>
  );
}

GuestLayout.propTypes = {
  AUTH: PropTypes.bool.isRequired,
};
