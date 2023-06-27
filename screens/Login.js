import * as React from "react"
import {
    View, 
    Text, 
    StyleSheet, 
    Platform, 
    StatusBar, 
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
    Dimensions
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import { Feather } from '@expo/vector-icons';

export default class Login extends React.Component{

    constructor(){
        super()
        this.state = {
            email : "",
            password : "",
            secureTextEntry : true
        }
    }

    signIn = () => {
        if (this.state.email != "" && this.state.password != ""){
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                this.props.navigation.navigate("BottomTab")
  })
            .catch((error) => {
                var errorMessage = error.message;
                Alert.alert(errorMessage)
  });
        } else {
            Alert.alert("Please fill the above details")
        }
    }

    changeSecureText = () => {
        this.setState({secureTextEntry : ! this.state.secureTextEntry})
    }
 
    render(){
        return(
            <View style = {styles.container}>

                <SafeAreaView style = {styles.droidSafeArea} />

                <View style = {styles.loginView}>
                    <Text style = {styles.loginText}>   Log In</Text>
                    <Text style = {styles.loginToYourAccount}>          Login to your account</Text>
                </View>

                <View style = {styles.textInputView}>
                    <TextInput style = {styles.textInput} 
                    placeholder="Email"
                    onChangeText={(val)=>{this.setState({email : val})}}/>

                    <TextInput style = {styles.textInput1} 
                    secureTextEntry={this.state.secureTextEntry}
                    placeholder="Password" 
                    onChangeText={(val)=>{this.setState({password : val})}}/>

                    <TouchableOpacity style = {styles.feather} onPress={this.changeSecureText}>
                        {this.state.secureTextEntry ? 
                        <Feather name="eye-off" size={24} color="black" /> :
                        <Feather name="eye" size={24} color="black" />}
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.forgetText}
                    onPress={()=> this.props.navigation.navigate("ForgotPassword")}>
                        <Text style = {{color : "green"}}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.loginButtonView}>
                    <TouchableOpacity onPress={() => {this.signIn()}}>
                        <Text style = {styles.loginButton}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.alreadyView}>
                    <Text style = {styles.alreadyText}>Don't have an account ?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("Registered")}>
                        <Text style = {[styles.alreadyText, {color : "green"}, {marginTop : -2}]}>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : RFValue(1)
    },

    droidSafeArea : {
        marginTop : Platform.OS == "android" ? StatusBar.setHidden(true) : RFValue(0)
    },

    loginView : {
        flex : 0.70,
        justifyContent : "center",
        backgroundColor : "#234152"
    },

    loginText : {
        color : "white",
        fontWeight : "bold",
        fontSize : RFValue(40)
    },

    loginToYourAccount : {
        color : "white",
        marginTop : RFValue(10)
    },

    textInput : {
        borderWidth : RFValue(1),
        padding : RFValue(10),
        borderRadius : RFValue(10),
        margin : RFValue(15),
        marginTop : RFValue(40)
    },

    textInput1 : {
        borderWidth : RFValue(1),
        padding : RFValue(10),
        borderRadius : RFValue(10),
        margin : RFValue(15),
        marginTop : RFValue(0)
    },

    textInputView : {
        flex : RFValue(0.20)
    },

    loginButton : {
        alignSelf : "center",
        fontWeight : "bold",
        marginTop : RFValue(30),
        fontSize : RFValue(20),
        backgroundColor : "#c1ff72",
        borderRadius : RFValue(10),
        paddingHorizontal : RFValue(90),
        padding : RFValue(10)
    },

    loginButtonView : {
        flex : RFValue(0.25)
    },

    alreadyView : {
        flex : RFValue(0.10),
        marginTop:10,
    },

    alreadyText : {
        alignSelf : "center",
        marginTop : RFValue(5)
    },

    feather : {
        alignSelf : 'flex-end',
        marginTop : RFValue(-50),
        marginRight : RFValue(30)
    },

    forgetText : {
        alignSelf : 'flex-end',
        marginTop : RFValue(30),
        marginRight : RFValue(25)
    }
})