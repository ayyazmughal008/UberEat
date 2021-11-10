import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Screen/Login'
import Signup from '../../Screen/Signup'
import Dashboard from '../../Screen/Dashboard'

const Stack = createStackNavigator();

export const NavStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

