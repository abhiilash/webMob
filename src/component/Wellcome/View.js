import React from 'react';
import { Alert, StyleSheet, Text, View, ActivityIndicator, AsyncStorage, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Wellcome extends React.Component {

  componentDidMount(){
    let self = this
    setTimeout(function(){ 
      AsyncStorage.getItem('@Token', (err, res) => { 
        var token = res;
        if (token !== null && token !== '') {
          self.props.navigation.reset([NavigationActions.navigate({ routeName: 'Users' })]);
        }else{
          self.props.navigation.reset([NavigationActions.navigate({ routeName: 'Registration' })]);
        }
      });
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});