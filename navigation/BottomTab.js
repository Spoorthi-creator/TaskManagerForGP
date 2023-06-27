import * as React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RFValue } from "react-native-responsive-fontsize";
import { Foundation } from '@expo/vector-icons';

import Home from "../screens/Home";
import WorkTab from "../tabs/WorkTab";
import PersonalTab from "../tabs/PersonalTab";
import StudyTab from "../tabs/StudyTab";

const Tab = createMaterialBottomTabNavigator();
//const Tab = createBottomTabNavigator();

export default class BottomTab extends React.Component{
  render(){
    return(
      <Tab.Navigator 
      initialRouteName="Home"
       activeColor="#c1ff72"
       inactiveColor="#e4fd9c"
       barStyle = {styles.bottomTab}
      labeled={true}
      screenOptions={({route}) => ({
        tabBarIcon : ({ focused, color, size}) => {
          let iconName;
         // let rn=route.name;
          if (route.name === "Home") {
            iconName = "home"
          } 
          if (route.name === "Work") {
            iconName = "plus"
          } 
          if (route.name === "Personal") {
            iconName = "plus"
          } 
          if (route.name === "Study") {
            iconName = "plus"
          } 

          return (
            <Foundation name = {iconName} size = {24} color = "#c1ff72"/>
          )
        },
        
        
      })}
    
      >

        <Tab.Screen name = "Home" component={Home}  />
        <Tab.Screen name = "Work" component={WorkTab} />
        <Tab.Screen name = "Personal" component={PersonalTab} />
        <Tab.Screen name = "Study" component={StudyTab} />     

      </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({

  bottomTab : {
    backgroundColor: '#234152',
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    height : RFValue(63),
   // overflow: 'hidden',
    position: 'absolute'

  }
})