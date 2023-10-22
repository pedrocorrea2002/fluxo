import React, { useState } from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

type Props = {
    title: String;
    color: String;
    options: [];
    setOptions: Function;
    pressBehavior:  "substitute"|"add"
}

export const OptionBlock = (Props) => {

    const [onPressing, setOnPressing] = useState(false)

    function button_action(){
        if(Props.pressBehavior == "add"){
            if(Props.options.includes(Props.title)){
                Props.setOptions(Props.options.filter(a => a != Props.title))
            }else{
                Props.setOptions([...Props.options,Props.title])
            }
        }else{
            if(Props.options.includes(Props.title)){
                Props.setOptions([])
            }else{
                Props.setOptions([Props.title])
            }
        }
    }

    const styles = StyleSheet.create({
        optionBox: {           
            paddingHorizontal: 10,
            paddingVertical: 2,
            marginRight: 10,
            marginVertical: 5,
            borderRadius: 10,

            display: 'flex',
            textAlign: 'center',
            flexDirection: 'row',

            borderWidth: 5,
            borderColor: (onPressing || Props.options.includes(Props.title) ? Props.color : 'white'),
            backgroundColor: (onPressing || Props.options.includes(Props.title) ? 'white' : Props.color)
        },
        optionText: {
            color:  (onPressing || Props.options.includes(Props.title) ? Props.color : 'white'),
            fontWeight: 'bold',
            fontSize:20
        }
    });

    return (
        <TouchableOpacity
            activeOpacity={100}
            style={[styles.optionBox]}
            onPressIn={() => setOnPressing(true)}
            onPressOut={() => setOnPressing(false)}
            onPress={button_action}
        >
            <Text style={styles.optionText}>{Props.title}</Text>
        </TouchableOpacity>
    )
}