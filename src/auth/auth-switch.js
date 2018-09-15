import { func } from 'prop-types';
import { connect } from 'react-redux';

const AuthSwitch = ({ token, isKnown, isNotKnown }) => {
  return token ? isKnown() : isNotKnown();
};

AuthSwitch.propTypes = {
  isKnown: func.isRequired,
  isNotKnown: func.isRequired
};

export default connect(state => state)(AuthSwitch);
