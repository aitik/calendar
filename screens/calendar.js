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
// const Schedule: React.FC = ({route, navigation}) => {
class Schedule extends React.Component{
    eventsD = [];
    async getEventsDb() {
        eventsD = [];
        await firestore()
            .collection("calendars").where("user", "==", auth().currentUser.email)
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
        console.log(userId)

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
                    // this.setState((state) =>{
                    //     return{events: state.events.push(doc.data())}
                    // })
                    console.log(this.state.events)
                });
            });
    }
    constructor (props) {
        super(props)
        this.getEventsDb()
        this.state = {
            events: eventsD
        }
    }
    async _eventTapped(event) {
        this.props.navigation.push('Change Event',
            {
                startp: event.start,
                endp: event.end,
                summaryp: event.summary,
                titlep: event.title,
            })
    }
    async componentDidMount(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props.route.params?.eventp) {
            if (this.props.route.params?.eventp[4]) {
                if (this.props.route.params?.eventp[1] === this.props.route.params?.eventp[5] &&
                    this.props.route.params?.eventp[2] === this.props.route.params?.eventp[6] &&
                    this.props.route.params?.eventp[0] === this.props.route.params?.eventp[4] &&
                    this.props.route.params?.eventp[3] === this.props.route.params?.eventp[7]
                ) {
                    alert("They are the same")
                } else {
                    alert("Updated")
                    await firestore()
                        .collection('calendars')
                        .doc(userId)
                        .collection('events')
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                if(doc.get('title')===this.props.route.params?.eventp[4] &&
                                    doc.get('start')===this.props.route.params?.eventp[5] &&
                                    doc.get('end')===this.props.route.params?.eventp[6] &&
                                    doc.get('summary')===this.props.route.params?.eventp[7]
                                ){
                                    this.updateEvent(this.props.route.params?.eventp[0], this.props.route.params?.eventp[1], this.props.route.params?.eventp[2], this.props.route.params?.eventp[3], doc.id)
                                }
                            });
                        });
                    await this.getEventsDb()
                }
            } else {
                alert('Created')
                await firestore()
                    .collection('calendars')
                    .doc(userId)
                    .collection('events')
                    .add({
                        start: this.props.route.params?.eventp[1],
                        end: this.props.route.params?.eventp[2],
                        title: this.props.route.params?.eventp[0],
                        summary: this.props.route.params?.eventp[3],
                    })
                    .then(() => {
                        console.log(' added!');
                    });
                this.getEventsDb()
                this.state.events.push({
                    start: this.props.route.params?.eventp[1],
                    end: this.props.route.params?.eventp[2],
                    title: this.props.route.params?.eventp[0],
                    summary: this.props.route.params?.eventp[3],
                })
            }
        }
    }
    async updateEvent(title, start, end, summary, id){
        console.log("HERe "+userId+' '+id)
        await firestore()
            .collection('calendars')
            .doc(userId)
            .collection('events')
            .doc(id)
            .update({
                title: title,
                start: start,
                end: end,
                summary: summary,
            })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <EventCalendar
                        // eventTapped={eventClicked}
                        // events={events}
                        eventTapped={this._eventTapped.bind(this)}
                        events={this.state.events}
                        width={width}
                        size={60}
                        initDate={'2021-04-21'}
                        scrollToFirst
                    />
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70,
                            position: 'absolute',
                            bottom: 10,
                            left: 10,
                            height: 70,
                            backgroundColor: '#fff',
                            borderRadius: 100,
                        }}
                        onPress={() => {this.getEventsDb(); this.setState({events: eventsD}); this.props.navigation.goBack}}
                    >
                        <Icon name="refresh" size={30} color="#01a699"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70,
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            height: 70,
                            backgroundColor: '#fff',
                            borderRadius: 100,
                        }}
                        onPress={() => this.props.navigation.push('Create Event')}
                    >
                        <Icon name="plus" size={30} color="#01a699"/>
                    </TouchableOpacity>
                    {/*<NavigationContainer>*/}
                    {/*    <Tab.Navigator>*/}
                    {/*        <Tab.Screen name="SignIn" component={SignInScreen} />*/}
                    {/*        <Tab.Screen name="Schedule" component={Schedule} />*/}
                    {/*    </Tab.Navigator>*/}
                    {/*</NavigationContainer>*/}



                </View>

            </SafeAreaView>


        );
    }
}

export default Schedule;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
