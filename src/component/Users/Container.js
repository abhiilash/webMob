import { connect } from 'react-redux';

// Actions
import * as UserActions from '@redux/user/actions';

// The component we're mapping to
import Users from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  userData: state.user.userData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getUser: UserActions.getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
