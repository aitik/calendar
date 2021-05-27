import React, {useState} from 'react';
import {SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventCalendar from 'react-native-events-calendar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


let {width} = Dimensions.get('window');

let eventsD=[];
let userId='33';
let user = ''
// const Schedule: React.FC = ({route, navigation}) => {
class Schedule2 extends React.Component{
    constructor (props) {
        super(props)
        this.getEventsDb()
        this.state = {
            events: eventsD
        }
    }
    user1=this.props.route.params?.item;
    eventsD = [];
    async getEventsDb() {
        eventsD = [];
        await firestore()
            .collection("calendars").where("user", "==", this.user1)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, "=> ", doc.data());
                    // userId=doc.id.split('\n').join('');
                    userId = doc.id
                    console.log(userId + ' 1')
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        await firestore()
            .collection('calendars')
            // Filter results
            // .where('user', '==', 'aiteginakmatbekov2@gmail.com')
            .doc(userId)
            .collection('events')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(userId)
                    console.log(doc.data());
                    eventsD.push(doc.data())
                    console.log(this.state.events)
                });
            });
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <EventCalendar
                        // eventTapped={eventClicked}
                        // events={events}
                        events={this.state.events}
                        width={width}
                        size={60}
                        initDate={'2021-04-21'}
                        scrollToFirst
                    />
                </View>

            </SafeAreaView>


        );
    }
}

export default Schedule2;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
