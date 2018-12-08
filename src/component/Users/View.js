import React from 'react';
import { Alert, StyleSheet, Text, View, ActivityIndicator, AsyncStorage, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Home extends React.Component {
  //logout button

  static navigationOptions({ navigation  }){
    return({
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('logout')} style={{ paddingRight: 10 }}>
          <Text style={{color: '#FFFFFF', fontSize: 20}}>logout</Text>
        </TouchableOpacity>
      )
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      users: [],
      pagination: {},
      viewableItems: [],
      error: {}
    };
    this.renderUser = this.renderUser.bind(this)
    this.loadMoreUsers = this.loadMoreUsers.bind(this)
  }

  componentWillMount(){
    AsyncStorage.getItem('@Token', (err, res) => { 
      var token = res;
      if (token !== null && token !== '') {
        const data={
          page: 1,
          token,
        }
        this.setState({isLoading: true})
        this.props.getUser(data)
      }
    });

    //add logout function in state
    this.props.navigation.setParams({logout: this.logout.bind(this)});
  }

  logout(){
    Alert.alert(
      'Alert',
      'are you sure you want to log out ?',
      [
        {text: 'Logout', onPress: () => this.confirmLogout()},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    );
  }

  confirmLogout(){
    AsyncStorage.removeItem('@Token');
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Registration' })]);
  }

  componentWillReceiveProps(nextProps){
    if('userData' in nextProps && 'meta' in nextProps.userData){
      if('status' in nextProps.userData.meta && nextProps.userData.meta.status ==  "ok"){
        this.setState({isLoading: false})
        if('data' in nextProps.userData && 'users' in nextProps.userData.data){
          let users = this.state.users
          users = users.concat(nextProps.userData.data.users)
          this.setState({users})
        }
        if('data' in nextProps.userData && 'pagination' in nextProps.userData.data){
          this.setState({pagination: nextProps.userData.data.pagination})
        }
      }else{
        this.setState({isLoading: false, error: {message: nextProps.userData.meta.message}})
      }
    }
  }

  _renderItem = ({ item }) => (
    <View><Text>Text</Text></View>
  )

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 35;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  }

  loadMoreUsers(){
    const { pagination }= this.state
    const page = parseInt(pagination.page) + 1
    const lastPage = parseInt(pagination.lastPage)
    if(page <= lastPage){
      AsyncStorage.getItem('@Token', (err, res) => { 
        var token = res;
        if (token !== null && token !== '') {
          const data={
            page: page,
            token
          }
          this.setState({isLoading: true})
          this.props.getUser(data)
        }
      });
    }
  }

  renderUser = () => (
    this.state.users.map((item, index) => {
      return(
        <View key={index} style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={{width: '100%', height: "100%"}}
              resizeMode={"cover"}
              source={{uri: item.profile_pic ? item.profile_pic : 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            />
          </View>
          <View style={styles.userView}>
            <Text style={styles.text}>User name: {item.username ? item.username : ''}</Text>
            <Text style={styles.text}>Email: {item.email ? item.email : ''}</Text>
          </View>
        </View>
      )
    })
  )

  render() {
    const {users, pagination, isLoading} = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.loadMoreUsers();
            }
          }}
        >
          {this.renderUser()}
        </ScrollView>
        {isLoading &&
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#f4511e" />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    padding: 5, 
    backgroundColor: '#fff'
  },
  cardContainer:{
    height: 100, 
    width: '100%', 
    backgroundColor: '#fff', 
    flexDirection: 'row', 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 5
  },
  imageContainer:{
    height: 100, 
    width: '25%'
  },
  userView:{
    height: 100, 
    width: '75%', 
    backgroundColor: 'gray',
    justifyContent: 'center', 
    paddingLeft: 10
  },
  text:{
    color: '#fff', 
    fontSize: 15, 
    fontWeight: 'bold'
  }
});