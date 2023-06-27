import * as React from "react"
import {
    View, 
    Text, 
    StyleSheet, 
    Platform, 
    StatusBar, 
    SafeAreaView,
    TouchableOpacity,
    Alert,
    Dimensions,
    ScrollView,
    FlatList
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { ListItem } from "react-native-elements"
import firebase from "firebase";
import db from "../config";
import { MaterialIcons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height

export default class Home extends React.Component{

    constructor(){
        super()
        this.state = {
            name : "",
            email : firebase.auth().currentUser.email,
            tasks : [],
            backgroundColor : "white",
            backgroundColor2 : "white",
            backgroundColor3 : "white",
            backgroundColor4 : "white"
        }
    }

    componentDidMount(){
        this.getUserDetails();
        this.getTasks();
    }

    getTasks = () => {
        const user = firebase.auth().currentUser;

    const email = user.email;

    db.collection(email).onSnapshot((snapshot) => {
      var allT = [];
      snapshot.docs.map((doc) => {
        var task = doc.data();
        task.id = doc.id;
        allT.push(task);
      })
      this.setState({ tasks: allT });
     
    });
    }

    // deleteUser = (id) => {
    //     const user = firebase.auth().currentUser;

    // const email = user.email;

    // db.collection(email)
    // .doc(id).delete().then(() => {
    //     Alert.alert("Task Deleted Successfully")
    // })
    // .catch((error) => {
    //     Alert.alert("Something went wrong ! Try again later")
    // })
    // this.getTasks()
    // }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            Alert.alert("Signed Out Successfully")
          }).catch((error) => {
            var errorMessage = error.message
            Alert.alert(errorMessage)
          });
    }

    getUserDetails = () => {
        db.collection("users")
          .where("email", "==", this.state.email)
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
              this.setState({name : doc.data().name})
            })
        })
    }

    changeColor = () => {
        this.setState({
            backgroundColor : "lightblue",
            backgroundColor2 : "white",
            backgroundColor3 : "white",
            backgroundColor4 : "white"
        })
        const user = firebase.auth().currentUser;

    const email = user.email;

    db.collection(email)
    .where("taskType", "==", 'work')
    .onSnapshot((snapshot) => {
      var allT = [];
      snapshot.docs.map((doc) => {
        var task = doc.data();

        allT.push(task);
      })
      this.setState({ tasks: allT });
     
    });
    }

    changeColor2 =() => {
        this.setState({
            backgroundColor : "white",
            backgroundColor2 : "lightblue",
            backgroundColor3 : "white",
            backgroundColor4 : "white"
        })
        const user = firebase.auth().currentUser;

    const email = user.email;

    db.collection(email)
    .where("taskType", "==", 'personal')
    .onSnapshot((snapshot) => {
      var allT = [];
      snapshot.docs.map((doc) => {
        var task = doc.data();

        allT.push(task);
      })
      this.setState({ tasks: allT });
     
    });
    }

    changeColor3 =() => {
        this.setState({
            backgroundColor : "white",
            backgroundColor2 : "white",
            backgroundColor3 : "lightblue",
            backgroundColor4 : "white"
        })
        const user = firebase.auth().currentUser;

    const email = user.email;

    db.collection(email)
    .where("taskType", "==", 'study')
    .onSnapshot((snapshot) => {
      var allT = [];
      snapshot.docs.map((doc) => {
        var task = doc.data();

        allT.push(task);
      })
      this.setState({ tasks: allT });
     
    });
    }

    changeColor4 =() => {
        this.setState({
            backgroundColor : "white",
            backgroundColor2 : "white",
            backgroundColor3 : "white",
            backgroundColor4 : "lightblue"
        })
        this.getTasks();
        
    }

     handleDelete = (postId) => {
        Alert.alert(
          'Delete post',
          'Are you sure?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed!'),
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => this.deleteTask(postId),
            },
          ],
          {cancelable: false},
        );
      };
      
       deleteTask= async(id)=>{
       await db.collection(firebase.auth().currentUser.email).doc(id).delete().then(() => {
          alert("Task successfully deleted!");
         
      }).catch((error) => {
          alert("Something went wrong!Try later");
      });
      this.getTasks()
      }

       emptylist=()=>{
        return(
          <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',}}>
      <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}} > No tasks at the moment</Text>
      </View>
        ) 
      }

    renderItem = ({item}) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate("EditTask", {detailId : item})}>
            <View style = {styles.taskStyles}>
                <View>
                <TouchableOpacity style = {{alignSelf : 'flex-end', marginTop : RFValue(5),
                marginRight : RFValue(10)}}
                onPress={()=>{this.handleDelete(item.id)}}>
                    <MaterialIcons name="delete" size={26} color="red" />
                </TouchableOpacity>
                </View>
                <Text style = {{
                    fontSize : RFValue(15),
                    marginLeft : RFValue(5),
                    marginTop : RFValue(-5)
                }}>Date : {item.date}</Text>
                <Text style = {{
                    fontSize : RFValue(15),
                    marginLeft : RFValue(5)
                }}>Time : {item.time}:{item.min}</Text>
                <Text style = {{
                    alignSelf : "center",
                    fontSize : RFValue(23)
                }}>{item.task}</Text>
                <Text style = {{
                    alignSelf : "flex-end",
                    marginRight : RFValue(5)
                }}>#{item.taskType}</Text>
            </View>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style = {styles.container}>

                <SafeAreaView style = {styles.droidSafeArea} />

                <View style = {styles.mainTextView}>
                    <Text style = {styles.mainText}>  Hello, {this.state.name}</Text>
                </View>

                <TouchableOpacity style = {styles.logout}
                    onPress={()=>{this.signOut()}}>
                        <MaterialIcons name="logout" size={45} color="#c1ff72" />
                </TouchableOpacity>

                <Text style = {styles.notes}>   Your</Text>
                <Text style = {[styles.notes, {marginTop : RFValue(-1)}]}>      Notes</Text>

                <View style = {{flex : 0.18, flexDirection : 'row',margin:5}}>
                    <ScrollView horizontal>
                    <TouchableOpacity>
                            <Text style = {[{backgroundColor : this.state.backgroundColor4}, styles.horiz]}
                            onPress={()=>this.changeColor4()}>#all</Text>
                        </TouchableOpacity>
                        <Text>   </Text>
                        <TouchableOpacity>
                            <Text style = {[{backgroundColor : this.state.backgroundColor}, styles.horiz]}
                            onPress={()=>this.changeColor()}>#work</Text>
                        </TouchableOpacity>
                        <Text>    </Text>
                        <TouchableOpacity> 
                            <Text style = {[{backgroundColor:this.state.backgroundColor2},styles.horiz]} 
                            onPress={()=>this.changeColor2()}>#personal</Text>
                        </TouchableOpacity>
                        <Text>     </Text>
                        <TouchableOpacity>
                            <Text style = {[{backgroundColor : this.state.backgroundColor3}, styles.horiz]}
                            onPress={()=>this.changeColor3()}>#study</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style = {{flex : 0.70, marginBottom : RFValue(63)}}>
                   
                        <FlatList 
                        ListEmptyComponent={()=>this.emptylist()}
                        scrollEnabled
                        data = {this.state.tasks}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index)=>index.toString()}/> 
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

    mainTextView : {
        flex : 0.13,
        backgroundColor : "#234152",
        justifyContent : "center"
    },

    mainText : {
        fontSize : RFValue(30),
        color : "white",
        justifyContent : 'center'
    },

    notes : {
        fontSize : RFValue(50),
        marginTop : RFValue(25)
    },

    logout : {
        alignSelf : 'flex-end',
        marginTop : screenHeight/-14,
        marginRight : RFValue(15)
    },

    horiz : {
        fontSize : RFValue(20),
        marginTop : RFValue(25),
        borderRadius : RFValue(30),
        borderWidth : RFValue(1),
        padding : RFValue(4),
        paddingHorizontal : RFValue(10)
    },

    taskStyles : {
        flex : 1,
        borderWidth : RFValue(2),
        
    }
})