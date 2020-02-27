import React from 'react'
import react from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Admin from './components/Admin';
import User from './components/User';
import Login from './components/Login';
import AppProvider from './components/Context';

const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  Admin: { screen: Admin },
  User: { screen: User }
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});
const App = createAppContainer(MainNavigator);

const WrapperContext = (props) => {
  return (<AppProvider>
    <App {...props}></App>
  </AppProvider>)
}
export default WrapperContext;