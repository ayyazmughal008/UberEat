import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { NavStack } from "./src/RootNavigator/StackNavigation";
import { NavStack2 } from "./src/RootNavigator/MainNavigator";
import { useDispatch, useSelector } from 'react-redux';
import { navigate, setTopLevelNavigator } from './src/RootNavigator/MainNavigator/NavigationService'

export default function App(props) {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);

    useEffect(() => {
        // if (login) {
        //     props.navigation.navigate('Dashboard')
        // }
        console.log('===>',login)
    }, [])
    return (
        <NavigationContainer>
            {!login ?
                <NavStack />
                : <NavStack2 />
            }
        </NavigationContainer>
    );
}