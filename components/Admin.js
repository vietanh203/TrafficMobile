import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ListFault from './ListFault';
import ListAccount from './ListAccount';
import AccountInfo from './AccountInfo';
import ListCar from './ListCar';


const Tab = createBottomTabNavigator();

export default function Admin(props) {
    const { state } = props.navigation;
    // console.log(state.params.username);
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Vi phạm') {
                            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                        } else if (route.name === 'Tài khoản') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        } else if (route.name === 'Phương tiện') {
                            iconName = focused ? 'ios-car' : 'ios-car';
                        } else if (route.name === state.params.username) {
                            iconName = focused ? 'ios-person' : 'ios-person';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>
                <Tab.Screen name="Vi phạm" component={ListFault} />
                <Tab.Screen name="Phương tiện" component={ListCar} />
                <Tab.Screen name="Tài khoản" component={ListAccount} />
                <Tab.Screen name={state.params.username} component={AccountInfo}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}
