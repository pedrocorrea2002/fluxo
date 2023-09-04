import React from "react"
import {
    View,
    Text,
    TextInput,
    TextInputProps,
    StyleSheet
} from 'react-native'

type Props = TextInputProps & {
    text: String;
}

export const Input = ({text, ...rest}: Props) => {
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >{text}</Text>
            <TextInput
                style={styles.input}
                {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
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
    }
  });