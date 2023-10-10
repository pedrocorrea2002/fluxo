import React from 'react'
import {
    Text,
    View,
    TouchableOpacityProps,
    StyleSheet,
    TouchableOpacity,
    DimensionValue
} from 'react-native'

type Props = TouchableOpacityProps & {
    title: String;
    color: String;
    icon: React.ReactNode;
    height: DimensionValue;
}

export const Button = ({ title, color, icon, height, ...rest }: Props) => {

    const styles = StyleSheet.create({
        title: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
        },
        buttonContainer:{
            width: '90%',
            height: height,
            borderRadius: 30,
            backgroundColor: `${color}`,
            paddingHorizontal: 20
        },
        button: {
            flex:1,
            flexDirection: 'row',

            justifyContent: 'space-between',
            alignItems: 'center'
        }
    });

    return (
        <TouchableOpacity 
            style={styles.buttonContainer}
            activeOpacity={0.5}
            {...rest}
        >
            <View style={styles.button}>
                {icon}
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}