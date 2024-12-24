import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function AuthLayout({ AUTH }) {

  return AUTH ? (
    <div>
      <header>
        <h1>Auth Header</h1>
      </header>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/signin" replace={true} />
  );
}

AuthLayout.propTypes = {
  AUTH: PropTypes.bool.isRequired,
};
