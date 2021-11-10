import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import MAINAPP from "./MainApp";
import { Store, persistor } from "./src/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from 'react-native-splash-screen'

export default class App extends React.Component {

  componentDidMount() {
    setTimeout(() => SplashScreen.hide() , 2000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <MAINAPP />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}