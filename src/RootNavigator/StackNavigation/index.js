import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Screen/Login'
import Signup from '../../Screen/Signup'
import ForgetPassword from '../../Screen/ForgetPassword'
import UpdatePassword from '../../Screen/ForgetPassword/UpdatePassword'

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
                name="ForgetPassword"
                component={ForgetPassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UpdatePassword"
                component={UpdatePassword}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

