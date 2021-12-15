import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { NavStack } from "./src/RootNavigator/StackNavigation";
import { NavStack2 } from "./src/RootNavigator/MainNavigator";
import { useDispatch, useSelector } from 'react-redux';
import { navigate, setTopLevelNavigator } from './src/RootNavigator/MainNavigator/NavigationService'
import { dispatchFunc } from './src/Redux/action'
import PopUpBox from './src/Component/PopUp'

export default function App(props) {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);

    useEffect(() => {
        console.log('===>', login)
    }, [])
    return (
        <NavigationContainer>
            <PopUpBox
                okClick={() => dispatch(dispatchFunc())}
            />
            {!login ?
                <NavStack />
                : <NavStack2 />
            }
        </NavigationContainer>
    );
}