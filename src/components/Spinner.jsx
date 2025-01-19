import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from "prop-types";

const override = {
  display: "block",
  margin: "0 auto",
};

function Spinner({ loading }) {
  return <ClipLoader color="#4338ca" loading={loading} cssOverride={override} size={100} />;
}

Spinner.propTypes = {
  loading: PropTypes.bool,
};

export default Spinner;
