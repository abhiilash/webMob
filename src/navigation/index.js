import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { TouchableOpacity, Text } from 'react-native';
import { View } from 'react-native';
import Registration from '../component/Registration/Container';
import Users from '../component/Users/Container';

const AppNavigator = createStackNavigator({
  	Registration: { 
	  	screen: Registration,
	  	navigationOptions: {
			title: 'Registration',
		}
  	},
  	Users: { 
	  	screen: Users,
	  	navigationOptions: {
			title: 'Users',
		}
  	}
},	
{
    initialRouteName: 'Registration',
    navigationOptions: {
    	headerTintColor: '#fff',
		headerStyle: {
      		backgroundColor: '#f4511e',
		},
		headerTitleStyle: {
      		fontWeight: 'bold',
      		fontSize: 20
    	},
    }
    
  });



export default AppNavigator;