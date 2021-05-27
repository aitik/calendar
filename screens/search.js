import * as React from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TouchableOpacity from 'react-native';

const Search = ({route, navigation}) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    let users = [];
    useEffect(() => {
        firestore()
            .collection("calendars")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(doc.data());
                    users.push(doc.get('user'))
                });
            });
        setFilteredDataSource(users);
        setMasterDataSource(users);
    }, []);
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item
                    ? item.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            <View style={styles.item2}>
            <Text style={styles.TextComponentStyle2} onPress={() => getItem(item)}>
                {item.toUpperCase()}
            </Text>
                <Text style={styles.TextComponentStyle} onPress={() =>         navigation.navigate({
                    name: 'Chat',
                    params: { user1: auth().currentUser.email,
                    user2: item},
                })}> Chat </Text>
            </View>
        );
    };
    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };
    const getItem = (item) => {
        // Function for click on an item
        navigation.navigate({
            name: 'Calendar',
            params: { item: item },
        })
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <SearchBar
                    round
                    searchIcon={{ size: 30 }}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Type Here..."
                    value={search}
                />
                <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item) => item}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
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
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
        height: 75,
    },
    item2: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    TextComponentStyle: {

        borderRadius: 5,

        // Set border width.
        borderWidth: 2,

        // Set border Hex Color Code Here.
        borderColor: '#FF5722',

        // Setting up Text Font Color.
        color: '#B2BABB',

        // Setting Up Background Color of Text component.
        backgroundColor : '#2C3E50',

        // Adding padding on Text component.
        padding : 2,

        fontSize: 20,

        textAlign: 'center',

        margin: 10
    },
    TextComponentStyle2: {

        borderRadius: 4,

        // Set border width.
        borderWidth: 2,

        // Set border Hex Color Code Here.
        borderColor: '#FF5722',

        // Setting up Text Font Color.
        color: '#B2BABB',

        // Setting Up Background Color of Text component.
        backgroundColor : '#2C3E50',

        // Adding padding on Text component.
        padding : 2,

        fontSize: 12,

        textAlign: 'center',

        margin: 3
    }
});
export default Search;
