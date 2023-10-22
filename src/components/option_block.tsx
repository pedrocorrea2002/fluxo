import React from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

type Props = {
    title: String;
    color: String;
    filters: [];
    setFilters: Function;
}

export const OptionBlock = (Props) => {

    const styles = StyleSheet.create({
        filter: {
            height: 20,
            
            paddingHorizontal: 10,
            marginRight: 10,
            marginVertical: 5,
            borderRadius: 10,

            display: 'flex',
            textAlign: 'center',
            flexDirection: 'row'
        }
    });

    return (
        <TouchableOpacity
            style={[styles.filter, {backgroundColor:Props.color}]}
        >
            <Text style={{color:'white', fontWeight: 'bold'}}>{Props.title}</Text>
        </TouchableOpacity>
    )
}