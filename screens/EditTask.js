import { StyleSheet, Text, View,TextInput,TouchableOpacity, Dimensions,Alert,Pressable, SafeAreaView ,StatusBar} from 'react-native'
import React from 'react'
import firebase from "firebase";
import db from '../config';
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from '@expo/vector-icons';

const screenHeight = Dimensions.get("window").height

export default class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         task:'',
         time:'',
         selectedId_state:this.props.route.params.detailId['id']
        }
    }
   
    componentDidMount(){
        console.log(this.state.selectedId_state)
        this.getData();
            }
   
    getData=async()=>
    {


        var response=await db.collection(firebase.auth().currentUser.email).doc(this.state.selectedId_state).get();


console.log(response.data());
this.setState({
    task: response.data().task,
    time: response.data().time,
 
})


console.log(response.data());


    }


    updateData=async()=>{
        await db.collection(firebase.auth().currentUser.email).doc(this.state.selectedId_state).update({
            task: this.state.task,
            time: this.state.time,
           
        });
        Alert.alert('Updated');
           
    }
 


    render(){
  return (
   
    <View style={{flex:1}}>
        <StatusBar hidden={true} translucent={true} />
         <Pressable onPress={()=>this.props.navigation.navigate('Home')} style={{margin:10}}>
            <AntDesign name="leftcircleo" size={35} color="black"/></Pressable>
        <Text style = {styles.editTask}>Edit Task</Text>
         <TextInput
                style={{
                    
                    borderWidth : RFValue(1),
                    padding : RFValue(10),
                    borderRadius : RFValue(10),
                    margin : RFValue(15),
                    marginTop : RFValue(30)
                    // fontFamily : "Comic-Neue"
                }}
                placeholder={'Tasks'}
                multiline = {true}
                onChangeText={(val)=>{this.setState({task : val})}}
                value={this.state.task}
            />


            <TextInput
                style={{
                    borderWidth : RFValue(1),
                    padding : RFValue(10),
                    borderRadius : RFValue(10),
                    margin : RFValue(15),
                    marginTop : RFValue(1)
                    //  fontFamily : "Comic-Neue"
                }}
                placeholder={'Time'}
                onChangeText={(val)=>{this.setState({time : val})}}
                value={this.state.time}
            />


<TouchableOpacity
                style={{}}
                onPress={() => {this.updateData()}}>
                <Text style={styles.button}> Update </Text>
            </TouchableOpacity>
    </View>

  )
  }
}

const styles = StyleSheet.create({
    editTask : {
        fontSize : RFValue(30),
        alignSelf : "center",
        //marginTop : RFValue(40)
    },
    button : {
        alignSelf : "center",
        fontWeight : "bold",
        marginTop : screenHeight/50,
        fontSize : RFValue(20),
        backgroundColor : "#c1ff72",
        borderRadius : RFValue(10),
        padding : RFValue(10),
        paddingHorizontal : RFValue(90)
    }
})
