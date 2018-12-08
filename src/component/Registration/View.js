import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if('registerData' in nextProps && 'meta' in nextProps.registerData){
      if('status' in nextProps.registerData.meta && nextProps.registerData.meta.status ==  "ok"){
        this.setState({isLoading: false})
        if('data' in nextProps.registerData && 'token' in nextProps.registerData.data){
          AsyncStorage.setItem('@Token', nextProps.registerData.data.token.token);
          this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Users' })]);
        }
      }else{
        this.setState({isLoading: false, error: {message: nextProps.registerData.meta.message}})
      }
    }
  }

  onSubmit(){
    const validateEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    const {username, email, password} = this.state
    const error = {}
    if(username == ''){
      error.username = 'Invalid username'
    }if(email == '' || !validateEmail.test(email)){
      error.email = 'Invalid email'
    }if(password == ''){
      error.password = 'Invalid password'
    }
    this.setState({error})
    if(!Object.keys(error).length){
      this.setState({isLoading: true, error: {}})
      const formData ={
        username,
        email,
        password
      }
      this.props.register(formData)
    }
  }

  render() {
    const {username, email, password, error, isLoading} = this.state
    return (
      <View style={styles.container}>
        { 'message' in error &&
          <View style={{width: '100%', margin: 5}}>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        }
        <TextInput
          ref={(input) => { this.usernameInput = input; }}
          placeholder={"User name"}
          style={'username' in error ? styles.errorInput : styles.input}
          onChangeText={(username) => this.setState({username})}
          value={username}
          onSubmitEditing={() => { this.emailInput.focus(); }}
        />
        {'username' in error &&
          <View style={{width: '100%'}}>
            <Text style={styles.errorText}>{error.username}</Text>
          </View>
        }
        <TextInput
          ref={(input) => { this.emailInput = input; }}
          placeholder={"Email"}
          style={'email' in error ? styles.errorInput : styles.input}
          onChangeText={(email) => this.setState({email})}
          value={email}
          keyboardType="email-address"
          autoCapitalize = 'none'
          onSubmitEditing={() => { this.passwordInput.focus(); }}
        />
        {'email' in error &&
          <View style={{width: '100%'}}>
            <Text style={styles.errorText}>{error.email}</Text>
          </View>
        }
        <TextInput
          ref={(input) => { this.passwordInput = input; }}
          placeholder={"Password"}
          style={'password' in error ? styles.errorInput : styles.input}
          onChangeText={(password) => this.setState({password})}
          value={password}
          secureTextEntry={true}
          onSubmitEditing={() => { this.onSubmit }}
        />
        {'password' in error &&
          <View style={{width: '100%'}}>
            <Text style={styles.errorText}>{error.password}</Text>
          </View>
        }
        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
          {isLoading ?
              <ActivityIndicator size="large" color="#fff" />
            :
              <Text style={styles.buttonText}>Submit</Text>
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 50, 
    width: '100%', 
    borderColor: 'gray', 
    borderBottomWidth: 1,
    fontSize: 20,
    color: 'gray',
    margin: 5
  },
  errorInput: {
    height: 50, 
    width: '100%', 
    borderColor: 'red', 
    borderBottomWidth: 1,
    color: 'gray',
    fontSize: 20,
    margin: 5
  },
  button:{
    backgroundColor: '#f4511e', 
    height: 50, 
    width: '100%', 
    margin: 20, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  buttonText:{
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold'
  },
  errorText:{
    color: 'red', 
    fontSize: 15, 
    fontWeight: 'bold'
  }
});