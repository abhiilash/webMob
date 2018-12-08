import { connect } from 'react-redux';

// Actions
import * as UserActions from '@redux/user/actions';

// The component we're mapping to
import Registration from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  registerData: state.user.registerData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  register: UserActions.register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
