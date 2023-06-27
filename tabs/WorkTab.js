import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  Arrow,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
 
 
export default function WorkTab() {
     const [expoPushToken, setExpoPushToken] = useState('');
     const [notification, setNotification] = useState(false);
     const notificationListener = useRef();
     const responseListener = useRef();
     const[task,setTask] =useState('');
     const[date,setDate] =useState('');
     const[minDate,setMinDate] =useState('');
     const[triggerDay,setTriggerDay]=useState('');
     const[triggerMonth,setTriggerMonth]=useState('');
     const[time,setTime] =useState('00');
     const[min,setMin] =useState('00');
     const [triggerTS,setTriggerTS]=useState('');
     const hourOptions = ['00', '01', '02', '03', '04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
     const minuteOptions = ['00','05','10', '15','20','25', '30','35','40', '45','50','55'];

const trigger = new Date(triggerTS);


trigger.setHours(time);
trigger.setMinutes(min);
trigger.setSeconds(0);

     async function sendPushNotification(expoPushToken) {
       
       if (task != ""){
        const identifier =  await Notifications.scheduleNotificationAsync({
          
          content: {
            title: "Task Manager",
            body: task,
            data: {},
          },
        // trigger:{minute:50,hour:11,month:6,day:1,repeats:false},
     trigger,
        });
      //  await Notifications.cancelScheduledNotificationAsync(identifier);
        Alert.alert('You have successfully subscribed for notifications');
      }
      else {
        Alert.alert("Please Enter the Task Description")
      }
     }
  useEffect(() => {
   
     
   // this.loadFontsAsync();
    var d = new Date();
    console.log(d.toDateString())
    setMinDate(d)
}, []);


  async function submitButton() {
    if (date && time && task) {
       await db.collection(firebase.auth().currentUser.email).add({
        date: date,
        time: time,
        task: task,
        taskType:'work',
        min:min,
       
      });
     // this.setState({ task: '', date: '', time: '' });
      Alert.alert('Task Added');
      setTask(null);
      setTime(null);
      setMin(null);
    } else {
     // this.setState({ task: '', date: '', time: '' });
     Alert.alert('Please fill in all the fields including selecting a date');
    }
  };
 
    return (
      <ScrollView style = {{flex : 1, backgroundColor : "white",height:screenHeight,width:screenWidth}}>
        <SafeAreaView style={styles.droidSafeArea} />
    
        <Text style = {{alignSelf : "center", marginTop : RFValue(10), fontSize : RFValue(15)}}>#work</Text>
        <Text style = {{
            alignSelf : "center",
            fontSize : RFValue(30)
        }}>Create Task</Text>

<TextInput
         style={{
          borderWidth : RFValue(1),
      padding : RFValue(10),
      borderRadius : RFValue(10),
     margin:RFValue(5),
      
     
        }}
          placeholder={'Tasks'}
          multiline = {true}
          onChangeText={(text) => {
            setTask( text );
          }}
          value={task}
        />
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{padding:RFValue(10),fontSize:18,color:'grey'}}>Hour-</Text>
<Picker
        selectedValue={time}
        onValueChange={(itemValue) => setTime(itemValue)}
        style={{width:100}}
       
      >
        {hourOptions.map((hour) => (
          <Picker.Item key={hour} label={hour} value={hour} />
        ))}
      </Picker>
      </View>


      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{padding:RFValue(10),fontSize:18,color:'grey'}}>Minute-</Text>
      <Picker
        selectedValue={min}
        onValueChange={(itemValue) => setMin(itemValue)}
      style={{width:100}}
      >
        {minuteOptions.map((minute) => (
          <Picker.Item key={minute} label={minute} value={minute} />
        ))}
      </Picker>
    </View>

        {/* <TextInput
           style={{
            borderWidth : RFValue(1),
        padding : RFValue(10),
        borderRadius : RFValue(10),
       margin:RFValue(5),
        
       
          }}
          placeholder={'Time in 24 Hours'}
          onChangeText={(text) => {
            setTime( text );
          }}
          value={time}
        />

<TextInput
          style={{
            borderWidth : RFValue(1),
        padding : RFValue(10),
        borderRadius : RFValue(10),
       margin:RFValue(5),
        
       
          }}
          placeholder={'Time in mins'}
          onChangeText={(text) => {
            setMin( text );
          }}
          value={min}
        /> */}

        <Calendar
          onDayPress={(day) => {
            console.log("Calender date"+ day.timestamp)
            setTriggerTS(day.timestamp)
            setDate(day.dateString) ;
            Alert.alert("Date Selected");
           setTriggerDay(day.day)
           setTriggerMonth(day.month)
         
          }}
          //style = {{marginTop : RFValue(-15)}}
           theme={{
    backgroundColor: 'white',
    calendarBackground: 'white',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: 'black',
    selectedDayTextColor: 'black',
    todayTextColor: 'green',
    dayTextColor: 'black',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'green',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: '#234152',
    indicatorColor: 'black',
   // textDayFontFamily: 'Comic-Neue',
   // textMonthFontFamily: 'Comic-Neue',
   // textDayHeaderFontFamily: 'Comic-Neue',
    textDayFontWeight: '300',
    textMonthFontWeight: '5',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  }}
         
        //  minDate = {minDate}
        />


        


        <TouchableOpacity onPress={async () => {
                  await sendPushNotification(expoPushToken)}}
        style={{alignSelf:'flex-end'}}>
            <Text style = {{marginTop : RFValue(8), marginRight : RFValue(10),color:'#234152',fontWeight:'bold'}}>
                Need to be Notified? Click here
            </Text>
            
        </TouchableOpacity>


        <TouchableOpacity
          onPress={submitButton}>
          <Text style={styles.buttonStyle}> Submit </Text>
        </TouchableOpacity>
      </ScrollView>
    );
   
  }




const styles = StyleSheet.create({
  header: {
    backgroundColor: '#234152',
    height: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: RFValue(30),
    color : "white"
   // fontFamily : "Comic-Neue"
  },
  droidSafeArea: {
    marginTop : Platform.OS == "android" ? StatusBar.setHidden(true) : RFValue(0)
  },
  buttonStyle: {
    alignSelf : "center",
    fontWeight : "bold",
    marginTop : screenHeight/50,
    fontSize : RFValue(20),
    backgroundColor : "#c1ff72",
    borderRadius : RFValue(10),
    padding : RFValue(10),
    paddingHorizontal : RFValue(90)
  },
});
