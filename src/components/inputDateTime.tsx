import React, {useState} from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'; 

export const InputDateTime = (Props) => {
    //////! DATETIME INPUT FUNCTIONS //////
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        Props.setDate(currentDate);
      };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
        value: Props.date,
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    };
    const showDatepicker = () => {
        showMode('date');
      };
    
    const showTimepicker = () => {
        showMode('time');
    };
    //////////////////////////////////////!

    const styles = StyleSheet.create({
        container:{
            width: '45%',
    
            marginVertical: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
    
            borderColor: 'black',
            borderWidth: 2,
            borderTopStartRadius: Props.side == 'left' ? 15 : 0,
            borderBottomStartRadius: Props.side == 'left' ? 15 : 0,
            borderTopEndRadius: Props.side == 'right' ? 15 : 0,
            borderBottomEndRadius: Props.side == 'right' ? 15 : 0
        },
        text:{
            fontSize: 20,
            fontWeight: 'bold'
        },
        input:{
            fontSize: 20,
            fontWeight: 'bold'
        }
      });

    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >{Props.text}</Text>
            <TouchableOpacity
                onPress={() => {
                    Props.mode == "time" ? showTimepicker() : showDatepicker()
                }}
            >
                <Text style={styles.input}>
                    {Props.content}
                </Text>
            </TouchableOpacity>
        </View>
    )
}