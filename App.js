
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Schedule from './screens/calendar';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CreateEvent from './screens/createevent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import ChangeEvent from './screens/changeevent';
import Schedule2 from './screens/smncalendar';
import Messages from './screens/messages';


import Search from './screens/search';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

import {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Button,
    NativeModules,
} from 'react-native';
const { RNTwitterSignIn } = NativeModules;

import {TextInput} from 'react-native-paper';
// import {
//     Route,
//     BrowserRouter as Router,
//     Switch,
//     Redirect,
// } from "react-router-dom";


const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


// function MyTabs() {
//     return (
//         <Tab.Navigator
//             initialRouteName="Feed"
//             activeColor="#e91e63"
//             barStyle={{backgroundColor: 'tomato'}}
//         >
//             <Tab.Screen
//                 name="Schedule"
//                 component={Schedule}
//             />
//             <Tab.Screen
//                 name="Details"
//                 component={DetailsScreen}
//             />
//         </Tab.Navigator>
//     );
// }
// function PrivateRoute({ component: Component, authenticated, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={(props) => authenticated === true
//                 ? <Component {...props} />
//                 : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
//         />
//     )
// }
//
// function PublicRoute({ component: Component, authenticated, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={(props) => authenticated === false
//                 ? <Component {...props} />
//                 : <Redirect to='' />}
//         />
//     )
// }
console.disableYellowBox = true;
const App = () => {
    // const [userInfo, setUserInfo] = useState(null);
    // const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');



    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        console.log(user)
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;
  //   useEffect(() => {
  //       // Initial configuration
  //       GoogleSignin.configure({
  //           // Mandatory method to call before calling signIn()
  //           scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  //           // Repleace with your webClientId
  //           // Generated from Firebase console
  //           webClientId: '1064730106385-qc2e06l6001t7h1ia1o1vjgq8ce7dubg.apps.googleusercontent.com',
  //       });
  //       // Check if user is already signed in
  //       _isSignedIn();
  //   }, []);
  //
  //   const _isSignedIn = async () => {
  //       const isSignedIn = await GoogleSignin.isSignedIn();
  //       if (isSignedIn) {
  //           alert('User is already signed in');
  //           // Set User Info if user is already signed in
  //           await _getCurrentUserInfo();
  //       } else {
  //           console.log('Please Login');
  //       }
  //       setGettingLoginStatus(false);
  //   };
  //
  //   const _getCurrentUserInfo = async () => {
  //       try {
  //           let info = await GoogleSignin.signInSilently();
  //           console.log('User Info --> ', info);
  //           setUserInfo(info);
  //       } catch (error) {
  //           if (error.code === statusCodes.SIGN_IN_REQUIRED) {
  //               alert('User has not signed in yet');
  //               console.log('User has not signed in yet');
  //           } else {
  //               alert("Unable to get user's info");
  //               console.log("Unable to get user's info");
  //           }
  //       }
  //   };
  //
  //   const _signIn = async () => {
  //       // It will prompt google Signin Widget
  //       try {
  //           await GoogleSignin.hasPlayServices({
  //               // Check if device has Google Play Services installed
  //               // Always resolves to true on iOS
  //               showPlayServicesUpdateDialog: true,
  //           });
  //           const userInfo = await GoogleSignin.signIn();
  //           console.log('User Info --> ', userInfo);
  //           setUserInfo(userInfo);
  //       } catch (error) {
  //           console.log('Message', JSON.stringify(error));
  //           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //               alert('User Cancelled the Login Flow');
  //           } else if (error.code === statusCodes.IN_PROGRESS) {
  //               alert('Signing In');
  //           } else if (
  //               error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
  //           ) {
  //               alert('Play Services Not Available or Outdated');
  //           } else {
  //               alert(error.message);
  //           }
  //       }
  //   };
  //
  //   const _signOut = async () => {
  //       setGettingLoginStatus(true);
  //       // Remove user session from the device.
  //       try {
  //           await GoogleSignin.revokeAccess();
  //           await GoogleSignin.signOut();
  //           // Removing user Info
  //           setUserInfo(null);
  //       } catch (error) {
  //           console.error(error);
  //       }
  //       setGettingLoginStatus(false);
  //   };
  // return (
  //     <SafeAreaView style={{flex: 1}}>
  //         <View style={styles.container}>
  //             <View style={styles.container}>
  //                 {userInfo !== null ? (
  //                     <>
  //                         <Image
  //                             source={{uri: userInfo.user.photo}}
  //                             style={styles.imageStyle}
  //                         />
  //                         <Text style={styles.text}>
  //                             Name: {userInfo.user.name}
  //                         </Text>
  //                         <Text style={styles.text}>
  //                             Email: {userInfo.user.email}
  //                         </Text>
  //                         <TouchableOpacity
  //                             style={styles.buttonStyle}
  //                             onPress={_signOut}>
  //                             <Text>Logout</Text>
  //                         </TouchableOpacity>
  //                     </>
  //                 ) : (
  //                     <GoogleSigninButton
  //                         style={{width: 312, height: 48}}
  //                         size={GoogleSigninButton.Size.Wide}
  //                         color={GoogleSigninButton.Color.Light}
  //                         onPress={_signIn}
  //                     />
  //                 )}
  //             </View>
  //         </View>
  //     </SafeAreaView>
    if(!user){
        return (
            <SafeAreaView style={{flex: 1}}>
                <View>
                    <Text style={styles.logoText}>Vstrent</Text>
                    <TextInput
                        style={styles.loginFormTextInput}
                        label="Email"
                        value={email}
                        onChangeText={onChangeEmail}
                    />
                    <TextInput
                        style={styles.loginFormTextInput}
                        secureTextEntry={true}
                        label="Password"
                        value={password}
                        onChangeText={onChangePassword}
                    />
                    <Button
                        buttonStyle={styles.loginButton}
                        title="Email Sign-Up"
                        onPress={() => emailSignUp(email, password)}
                    />
                    <Button
                        buttonStyle={styles.loginButton}
                        title="Email Sign-In"
                        onPress={() => emailSignIn(email, password)}
                    />
                    <Button
                        buttonStyle={styles.loginButton}
                        title="Google Sign-In"
                        // onPress={() => onGoogleButtonPress()}
                    />
                    <Button
                        buttonStyle={styles.loginButton}
                    title="Twitter Sign-In"
                    // onPress={() => onTwitterButtonPress().then(() => console.log('Signed in with Twitter!'))}
                    />

                </View>
            </SafeAreaView>
        );
    }
    return(
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="Home">
          <Stack.Screen
              name="Schedule"
              component={Schedule}
              // options={{ title: 'Welcome' }}
              >
          </Stack.Screen>

          <Stack.Screen name="Sign In" component={SignInScreen} />
            <Stack.Screen name="Create Event" component={CreateEvent} />
            <Stack.Screen name="Change Event" component={ChangeEvent} />
            <Stack.Screen name="Home" component={MyDrawer} />
            <Stack.Screen name="Calendar" component={Schedule2} />
            <Stack.Screen name="Chat" component={Messages}   options={({ route }) => ({
                title: route.params.user2
            })} />


            {/*<Stack.Screen name="DayEvents" component={dayevents} />*/}
        </Stack.Navigator>

        {/*<MyTabs/>*/}
      </NavigationContainer>

  );
};

function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Schedule">
            <Drawer.Screen
                name="Schedule"
                component={Schedule}
                options={{ drawerLabel: 'Calendar' }}
            />
            <Drawer.Screen
                name="CreateEvent"
                component={CreateEvent}
                options={{ drawerLabel: 'Create Event' }}
            />
            <Drawer.Screen
                name="Search"
                component={Search}
                options={{ drawerLabel: "Search" }}
            />
            <Drawer.Screen
                name="SignOut2"
                component={SignOut}
                options={{ drawerLabel: auth().currentUser.email }}
            />
            <Drawer.Screen
                name="SignOut"
                component={SignOut}
                options={{ drawerLabel: 'Sign out' }}
            />
        </Drawer.Navigator>
    );
}
GoogleSignin.configure({
    webClientId: '1064730106385-qc2e06l6001t7h1ia1o1vjgq8ce7dubg.apps.googleusercontent.com',
});
async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
}

async function onTwitterButtonPress() {
    // // Perform the login request
    // const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
    //
    // // Create a Twitter credential with the tokens
    // const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
    //
    // // Sign-in the user with the credential
    // return auth().signInWithCredential(twitterCredential);
}
async function AnonymousSignIn(){
    auth()
        .signInAnonymously()
        .then(() => {
            console.log('User signed in anonymously');
        })
        .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
                console.log('Enable anonymous in your firebase console.');
            }

            console.error(error);
        });
}
function SignInScreen() {
    const [email, onChangeEmail, password, onChangePassword] = useState('');
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.logoText}>Vstrent</Text>
                <TextInput
                    style={styles.loginFormTextInput}
                    label="Email"
                    value={email}
                    onChangeText={onChangeEmail}
                />
                <TextInput
                    style={styles.loginFormTextInput}
                    secureTextEntry={true}
                    label="Password"
                    value={password}
                    onChangeText={onChangePassword}
                />
                <Button
                    buttonStyle={styles.loginButton}
                    title="Email Sign-Up"
                    onPress={() => emailSignUp(email, password)}
                />
                <Button
                    buttonStyle={styles.loginButton}
                    title="Email Sign-In"
                    onPress={() => emailSignIn(email, password)}
                />
                <Button
                    buttonStyle={styles.loginButton}
                    title="Google Sign-In"
                    // onPress={() => onGoogleButtonPress()}
                />
                <Button
                    buttonStyle={styles.loginButton}
                    title="Twitter Sign-In"
                    // onPress={() => onTwitterButtonPress().then(() => console.log('Signed in with Twitter!'))}
                />

            </View>
        </SafeAreaView>
    );
}
async function emailSignUp(email, password){
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
            }

            console.error(error);
        });
    let userId;
    await firestore()
        .collection("calendars")
        .add({
            user: email
        }).then(r => {
        userId=r.id;
        console.log("added to db")
    })
    await firestore()
        .collection('calendars')
        .doc(userId)
        .collection('events')
        .doc('event1');
    await firestore()
        .collection('calendars')
        .doc(userId)
        .collection('events')
        .doc('event1')
        .set({
            title: "My first event",
            start: '2021-04-21 00:00:00',
            end: '2021-04-21 02:00:00',
            summary: 'cool',
        }).then(r => {
        console.log("added to db2")
    })

}
function emailSignIn(email, password){
    auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
            }

            console.error(error);
        });


}
function SignOut(){
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
        return (
            <SafeAreaView style={{flex: 1}}>
                <View>
                    <Text style={styles.logoText}>Vstrent</Text>
                    <TextInput
                        style={styles.loginFormTextInput}
                        label="Email"
                        value={email}
                        onChangeText={onChangeEmail}
                    />
                    <TextInput
                        style={styles.loginFormTextInput}
                        secureTextEntry={true}
                        label="Password"
                        value={password}
                        onChangeText={onChangePassword}
                    />
                    <Button
                        buttonStyle={styles.loginButton}
                        title="Email Sign-Up"
                        onPress={() => emailSignUp(email, password)}
                    />
                    <Button
                        buttonStyle={styles.loginButton}
                        title="Email Sign-In"
                        onPress={() => emailSignIn(email, password)}
                    />
                    <Button
                        buttonStyle={styles.loginButton}
                        title="Google Sign-In"
                        // onPress={() => onGoogleButtonPress()}
                    />
                    <Button
                        buttonStyle={styles.loginButton}
                        title="Twitter Sign-In"
                        // onPress={() => onTwitterButtonPress().then(() => console.log('Signed in with Twitter!'))}
                    />

                </View>
            </SafeAreaView>
        );
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    },
    imageStyle: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 30,
    },
    footerHeading: {
        fontSize: 18,
        textAlign: 'center',
        color: 'grey',
    },
    footerText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'grey',
    },
    saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 5
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 15,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1
    },
    loginFormTextInput: {
        height: 50,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
});

