import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../../Stylesheet'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { lightBlue, lightGrey } from '../../Colors'

const Login = (props) => {
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.bottomLoginView}>
                    <View style={styles.inputView}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={lightGrey}
                            style={styles.inputTxt}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={lightGrey}
                            style={styles.inputTxt}
                        />
                    </View>
                    <Text style={[styles.forgetPassTxt, { textAlign: "right" }]}>
                        {"Forgot Password?"}
                    </Text>

                    <TouchableOpacity
                        style={styles.btn}
                    >
                        <Text style={[styles.btnTxt, { fontWeight: "bold" }]}>
                            {"LOGIN"}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.smallTxt}>
                        {"Don't have an account? "}
                        <Text style = {[styles.smallTxt,{color: lightBlue, marginTop:0}]}>
                            {"Sign Up"}
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Login;