import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ListFault from './ListFault';
import ListAccount from './ListAccount';
import AccountInfo from'./AccountInfo';

const Tab = createBottomTabNavigator();

export default function Admin() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Faults') {
                            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                        } else if (route.name === 'Accounts') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        }else if(route.name==='Info'){
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
                <Tab.Screen name="Faults" component={ListFault} />
                <Tab.Screen name="Accounts" component={ListAccount} />
                <Tab.Screen name="Info" component={AccountInfo} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}
