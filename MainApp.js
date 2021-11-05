import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { NavStack } from "./src/RootNavigator/StackNavigation";

export default function App() {
    return (
        <NavigationContainer>
            <NavStack />
        </NavigationContainer>
    );
}