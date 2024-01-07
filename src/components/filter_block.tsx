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

export const Filter_block = (Props) => {
    function remove_filter(){
        Props.setFilters(Props.filters.filter(a => a.title != Props.title))
    }

    //! console.log("Props:",Props) //! tem uma função dentro de mim

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
        <TouchableOpacity
            onPress={remove_filter}
            style={[styles.filter, {backgroundColor:Props.color}]}
        >
            <Text style={styles.filter_x}>X</Text>
            <Text style={{color:'white', fontWeight: 'bold'}}>{Props.title}</Text>
        </TouchableOpacity>
    )
}