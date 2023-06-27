import * as React from "react";
import {
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Platform, 
  StatusBar, 
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class FlashScreen extends React.Component{
    render(){
        return(
          <View style = {styles.container}>

                <SafeAreaView style = {styles.droidSafeArea} />
                <ImageBackground source = {require("../assets/Flash.png")}
                style = {styles.backgroundImage}>

                    <View>
                        <Text style = {styles.titleText}>Task Manager</Text>
                        <Text style = {styles.descriptionText}>          This application that lets you plan, organize and prioritize all your tasks so that you can finish them within the limited time frame and in the almost efficient manner</Text>
                    </View>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Registered")}>
                        <Text style = {styles.goText}>GO</Text>
                    </TouchableOpacity>
                </ImageBackground>

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
    marginTop: Platform.OS == "android" ? StatusBar.setHidden(true) : RFValue(0)
  },

  backgroundImage : {
    flex : RFValue(1),
    resizeMode : "cover",
    height : screenHeight,
    width : screenWidth
  },

  titleText : {
    fontSize : RFValue(45),
    fontWeight : "bold",
    color : "black",
    alignSelf : "center",
    marginTop : RFValue(390)
  },

  descriptionText : {
    alignSelf : "center",
    padding : RFValue(10),
    marginTop : RFValue(18)
  },

  goText : {
    alignSelf : "center",
    fontWeight : "bold",
    fontSize : RFValue(30),
    marginTop : screenHeight/25,
    backgroundColor : "#c1ff72",
    borderRadius : RFValue(10),
    paddingHorizontal : RFValue(90),
    padding : RFValue(10)
  }
})