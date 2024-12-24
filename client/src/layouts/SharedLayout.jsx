import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function SharedLayout({ AUTH }) {

  return (
    <div>
      {AUTH ? <h1>Auth Header</h1> : <h1>Guest Header</h1>}
      <Outlet />
    </div>
  );
}

SharedLayout.propTypes = {
  AUTH: PropTypes.bool.isRequired,
};