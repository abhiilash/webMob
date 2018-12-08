import { connect } from 'react-redux';

// Actions
import * as UserActions from '@redux/user/actions';

// The component we're mapping to
import Wellcome from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Wellcome);
