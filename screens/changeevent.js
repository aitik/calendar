import * as React from 'react';
import { TextInput } from 'react-native-paper';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

const ChangeEvent = ({route, navigation}) => {

    const {startp, endp, summaryp, titlep} = route.params;
    const [start, onChangeStart] = React.useState(startp);
    const [end, onChangeEnd] = React.useState(endp);
    const [title, onChangeTitle] = React.useState(titlep);
    const [summary, onChangeSummary] = React.useState(summaryp);


    const ReturnEvent = [];
    return (
        <View>
            {/*<TextInput*/}
            {/*    label="Date"*/}
            {/*    value={date}*/}
            {/*    onChangeText={date => setDate(date)}*/}
            {/*/>*/}
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

                    () =>{ReturnEvent.push(title, start, end, summary, titlep, startp, endp, summaryp); navigation.navigate({
                        name: 'Schedule',
                        params: { eventp: ReturnEvent },
                        merge: true,
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
export default ChangeEvent;
