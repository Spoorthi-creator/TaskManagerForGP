import * as React from "react"
import {
     View,
     Text, 
     StyleSheet, 
     Platform, 
     StatusBar, 
     SafeAreaView, 
     Alert, 
     TextInput, 
     TouchableOpacity,
     Dimensions
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import db from "../config";
import { Feather } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;

export default class Registered extends React.Component{

    constructor(){
        super()
        this.state = {
            email : "",
            password : "",
            name : "",
            secureTextEntry : true
        }
    }

    createUser = () => {
        if (this.state.email != "" && this.state.password != "" && this.state.name != ""){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((userCredential) => {
                    const user = firebase.auth().currentUser.uid
                    db.collection("users").add({
                        password : this.state.password,
                        email : this.state.email,
                        name : this.state.name
                    })
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

                <View style = {styles.registerView}>
                <Text style = {styles.registerText}>  Register</Text>
                <Text style = {styles.createAccountText}>       Create Your Account</Text>
                </View>

                <View style = {styles.textInputView}>
                <TextInput style = {styles.textInput} 
                placeholder="Name" 
                onChangeText={(val) => {this.setState({name : val})}}/>

                <TextInput style = {styles.textInput1} 
                placeholder = "Email"
                onChangeText={(val) => {this.setState({email : val})}}/>

                <TextInput style = {styles.textInput1}
                secureTextEntry={this.state.secureTextEntry}
                placeholder="Password" 
                onChangeText={(val) => {this.setState({password : val})}}/>

                <TouchableOpacity style = {styles.feather} onPress={this.changeSecureText}>
                    {this.state.secureTextEntry ? 
                    <Feather name="eye-off" size={24} color="black" /> :
                    <Feather name="eye" size={24} color="black" />}
                </TouchableOpacity>
                </View>

                <View style = {styles.registerButtonView}>
                <TouchableOpacity onPress={() => {this.createUser()}}>
                    <Text style = {styles.registerButton}>Register</Text>
                </TouchableOpacity>
                </View>

                <View style = {styles.alreadyView}>
                    <Text style = {styles.alreadyText}>Already have an account ?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style = {[styles.alreadyText, {color : "green"}, {marginTop : -2}]}>Log In</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : RFValue(1),
        backgroundColor : "white"
    },

    droidSafeArea : {
        marginTop : Platform.OS == "android" ? StatusBar.setHidden(true) : RFValue(0)
    },

    registerText : {
        color : "white",
        fontWeight : "bold",
        fontSize : RFValue(40)
    },

    createAccountText : {
        color : "white",
        marginTop : screenHeight/50
    },

    registerView : {
        flex : 0.70,
        justifyContent : "center",
        backgroundColor : "#234152"
    },
    textInput : {
        borderWidth : RFValue(1),
        padding : RFValue(10),
        borderRadius : RFValue(10),
        margin : RFValue(15),
        marginTop : screenHeight/30
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

    registerButton : {
        alignSelf : "center",
        fontWeight : "bold",
        marginTop : screenHeight/15,
        fontSize : RFValue(20),
        backgroundColor : "#c1ff72",
        borderRadius : RFValue(10),
        padding : RFValue(10),
        paddingHorizontal : RFValue(90)
    },

    registerButtonView : {
        flex : RFValue(0.25)
    },

    alreadyView : {
        flex : RFValue(0.10)
    },

    alreadyText : {
        alignSelf : "center",
        marginTop : RFValue(10)
    },

    feather : {
        alignSelf : 'flex-end',
        marginRight : RFValue(30),
        marginTop : RFValue(-50)
    }
})