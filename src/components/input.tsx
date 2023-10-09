import React, {useRef} from "react"
import {
    View,
    Text,
    TextInput,
    TextInputProps,
    StyleSheet,
    Keyboard
} from 'react-native'

type Props = TextInputProps & {
    text: String;
    display: String;
}

export const Input = ({text,display, ...rest}: Props) => {
    const input = useRef()

    // console.log(typeof(display),display)
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >{text}</Text>
            <TextInput
                ref={input}
                style={styles.input}
                {...rest}
            />
            <Text
                style={[styles.display, {display: display ? "flex" :  "none"}]}
                onPress={() => input.current.focus()}
            >
                {display}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 65,
        width: '90%',

        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,

        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15  

    },
    text:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    input:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    display:{
        display: "flex",
        fontSize: 20,
        fontWeight: 'bold',
        bottom:26,
        backgroundColor:"#f1f1f1"
    }
  });