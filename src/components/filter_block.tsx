import React from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

type Props = {
    title: String;
    color: String;
}

export const Filter_block = (Props) => {

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
        },
        filter_x:{
            marginRight: 5,
            color: 'white',

            fontWeight: 'bold'
        }
    });

    return (
        <TouchableOpacity style={[styles.filter, {backgroundColor:Props.color}]}>
            <Text style={styles.filter_x}>X</Text>
            <Text style={{color:'white', fontWeight: 'bold'}}>{Props.title}</Text>
        </TouchableOpacity>
    )
}