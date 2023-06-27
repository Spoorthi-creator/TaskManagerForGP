import * as React from "react"
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native"
import firebase from "firebase"
import { RFValue } from "react-native-responsive-fontsize";

export default class Loading extends React.Component{

    componentDidMount(){
        this.checkIfLogedIn()
    }

    checkIfLogedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.props.navigation.navigate("BottomTab")
            } else {
              this.props.navigation.navigate("FlashScreen")
            }
          });
    }

    render(){
        return(
            <View style = {styles.container}>

                <SafeAreaView style = {styles.droidSafeArea} />

                <Text style = {styles.text}>Loading...</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : RFValue(1),
        justifyContent : "center"
    },

    droidSafeArea : {
        marginTop : Platform.OS == "android" ? StatusBar.setHidden(true) : RFValue(0)
    },

    text : {
        alignSelf : "center",
        fontSize:30,
        color:'#234152'
    }
})