import * as React from "react";
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
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase"
import { AntDesign } from '@expo/vector-icons';
export default class ForgotPassword extends React.Component{

    constructor(){
        super()
        this.state = {
            email : ""
        }
    }

    passwordResetEmail = () => {
        if (this.state.email != ""){
            firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Email has been sent")
        })
            .catch((error) => {
                var errorMessage = error.message
                Alert.alert(errorMessage)
        })
        }
    }
    
    render(){
        return(
            <View style = {styles.container}>

                <SafeAreaView style = {styles.droidSafeArea} />
               
                <View style = {styles.forgotPass}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}style={{margin:10}} >
    <AntDesign name="leftcircleo" size={30} color="white" /> 
    </TouchableOpacity>
                    <Text style = {styles.forgotText}>    Forgot Password</Text>
                    <Text style = {styles.emailText}>Enter your registered email ID</Text>
                </View>

                <View style = {{flex : RFValue(0.20)}}>
                    <TextInput style = {styles.textInput} placeholder="Email"/>
                </View>

                <View style = {{flex : RFValue(0.25)}}>
                    <TouchableOpacity onPress={() => {this.passwordResetEmail()}}>
                        <Text style = {styles.continueButton}>Continue</Text>
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

    forgotPass : {
        flex:0.40,
        
        backgroundColor : "#234152",
      //  justifyContent : "center"
    },

    forgotText : {
        color : "white",
        fontWeight : "bold",
        fontSize : RFValue(30),
       
    },

    textInput : {
        borderWidth : RFValue(1),
        padding : RFValue(10),
        borderRadius : RFValue(10),
        margin : RFValue(15),
        marginTop : RFValue(40)
    },

    emailText : {
        color : "white",
        marginLeft : RFValue(30),
        marginTop : RFValue(10)
    },

    continueButton : {
        alignSelf : "center",
        fontWeight : "bold",
        marginTop : RFValue(30),
        fontSize : RFValue(20),
        backgroundColor : "#c1ff72",
        borderRadius : RFValue(10),
        paddingHorizontal : RFValue(90),
        padding : RFValue(10)
    }
})