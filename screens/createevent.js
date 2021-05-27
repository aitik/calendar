import * as React from 'react';
import { TextInput } from 'react-native-paper';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

const CreateEvent = ({navigation}) => {
    const [start, onChangeStart] = React.useState('2021-04-21 00:00:00');
    const [end, onChangeEnd] = React.useState('2021-04-21 02:00:00');
    const [title, onChangeTitle] = React.useState('');
    const [summary, onChangeSummary] = React.useState('');
    const ReturnEvent = [];
    return (
        <View>
            <TextInput
                label="Title"
                value={title}
                onChangeText={onChangeTitle}
            />
            <TextInput
                label="Start Time"
                value={start}
                onChangeText={onChangeStart}
            />
            <TextInput
                label="End Time"
                value={end}
                onChangeText={onChangeEnd}
            />
            <TextInput
                label="Summary"
                value={summary}
                onChangeText={onChangeSummary}
            />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={

                    () =>{ReturnEvent.push(title, start, end, summary); navigation.navigate({
                        name: 'Schedule',
                        params: { eventp: ReturnEvent },
                    })}}
            >
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={

                    () =>{navigation.navigate({
                        name: 'Schedule'
                    })}}
            >
                <Text style={styles.saveButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};
function getEvent(items){

}
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
    }
});
export default CreateEvent;
