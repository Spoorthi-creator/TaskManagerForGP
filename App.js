import * as React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native" 
import { LogBox} from 'react-native';
import FlashScreen from "./screens/FlashScreen";
import Login from "./screens/Login";
import Registered from "./screens/Registered";
import Loading from "./screens/Loading";
import ForgotPassword from "./screens/ForgotPassword";
import BottomTab from "./navigation/BottomTab";
import EditTask from "./screens/EditTask";

const Stack = createStackNavigator();
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);
export default class App extends React.Component{
  render(){
    return(
      <NavigationContainer>

        <Stack.Navigator screenOptions = {{headerShown : false}}>

          <Stack.Screen name = "Loading" component={Loading} />
          <Stack.Screen name = "FlashScreen" component={FlashScreen}/>
          <Stack.Screen name = "Login" component={Login}/>
          <Stack.Screen name = "Registered" component={Registered}/>
          <Stack.Screen name = "ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name = "EditTask" component={EditTask} />
          <Stack.Screen name = "BottomTab" component={BottomTab} />
          
        </Stack.Navigator>

      </NavigationContainer>
    )
  }
}