import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Screen/Login'
import Signup from '../../Screen/Signup'
import Dashboard from '../../Screen/Dashboard'
import HotelDetail from '../../Screen/HotelDetail'
import HotelList from '../../Screen/HotelList'
import Profile from '../../Screen/MyProfile'
import PersonalInfo from '../../Screen/PersonalInfo'
import MyBooking from '../../Screen/MyBooking'
import Language from '../../Screen/Language'
import Settings from '../../Screen/Settings'
import ChangePassword from '../../Screen/ChangePassword'
import Table from '../../Screen/Table'
import OverView from '../../Screen/OverView'
import Congratulation from '../../Screen/Congratulation'

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
            <Stack.Screen
                name="HotelDetail"
                component={HotelDetail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HotelList"
                component={HotelList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PersonalInfo"
                component={PersonalInfo}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MyBooking"
                component={MyBooking}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Language"
                component={Language}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Table"
                component={Table}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OverView"
                component={OverView}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Congratulation"
                component={Congratulation}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

