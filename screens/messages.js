import React, {useEffect, useState} from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Messages({route, navigation}) {
    const { user1, user2 } = route.params
    let arr4=[];
    const [arr1, setArr1] = useState([])
    const [arr2, setArr2] = useState([])
    const [arr3, setArr3] = useState([])


    const [messages, setMessages] = useState([
        // {
        //     _id: 0,
        //     text: 'thread created',
        //     createdAt: new Date().getTime(),
        //     system: true
        // },
        // {
        //     _id: 12,
        //     text: 'hello!',
        //     createdAt: new Date().getTime(),
        //     user: {
        //         _id: user2,
        //         name: user2
        //     }
        // },
        // {
        //     _id: 13,
        //     text: 'hello!2`212',
        //     createdAt: new Date().getTime(),
        //     user: {
        //         _id: user2,
        //         name: user2
        //     }
        // }
    ])
    function push(fromArray, toArray) {
        for(let i = 0, len = fromArray.length; i < len; i++) {
            toArray.push(fromArray[i]);
        }
        return toArray;
    }
    useEffect(() => {

            const unsubscribeListener = firestore()
                .collection('messages')
                .orderBy('createdAt', 'desc')
                .where("user1","==", user2.toLowerCase())
                .where("user2", "==", user1.toLowerCase())
                .onSnapshot(querySnapshot => {
                    try {
                        const messages1 = querySnapshot.docs.map(doc => {
                            const firebaseData = doc.data()
                            const data = {
                                _id: doc.id,
                                text: firebaseData.text,
                                createdAt: firebaseData.createdAt,
                            }
                            if (!firebaseData.system) {
                                data.user = {
                                    ...firebaseData.user1,
                                    _id: firebaseData.user1.toLowerCase(),
                                    name: firebaseData.user1.toLowerCase()
                                }
                                data.user2 = {
                                    ...firebaseData.user2,
                                    _id: firebaseData.user1.toLowerCase(),
                                    name: firebaseData.user2.toLowerCase()
                                }
                            }
                            return data
                        })
                        setMessages(messages1)
                    }
                    catch (e) {

                    }
                })

        const unsubscribeListener2 = firestore()
            .collection('messages')
            .where("user1","==", user1.toLowerCase())
            .where("user2", "==", user2.toLowerCase())
            // .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages2 = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data()
                    const data = {
                        _id: doc.id,
                        text: firebaseData.text,
                        createdAt: firebaseData.createdAt,
                    }
                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user1,
                            _id:firebaseData.user1.toLowerCase(),
                            name: firebaseData.user1.toLowerCase()
                        }
                        data.user2 = {
                            ...firebaseData.user2,
                            _id:firebaseData.user1.toLowerCase(),
                            name: firebaseData.user2.toLowerCase()
                        }
                    }
                    return data
                })
                setArr2(messages2)
                setMessages([...arr1, ...arr2])
                console.log([...arr1, ...arr2])
            })
        return () => [unsubscribeListener()]
    }, [])


    function handleSend(newMessage = []) {
        setMessages(GiftedChat.append(messages, newMessage))
        // const text = messages[0].text
        firestore()
            .collection('messages')
            .add({
                text: newMessage[0].text,
                createdAt: new Date().getTime(),
                user1: user1.toLowerCase(),
                user2: user2.toLowerCase(),
            })
    }
    return (
        <GiftedChat
            messages={messages}
            onSend={newMessage => handleSend(newMessage)}
            user={{
                _id: user1.toLowerCase()
            }}
        />
    )
}
