import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'

import { theme } from '../assets/style';
import { ArrowUp } from '../assets/Icons/svg_arrow_up';
import { ArrowDown } from '../assets/Icons/svg_arrow_down';

type Props = {
    title: String;
    value: Number;
    iconUrl: String;
    impact: String;
}

export const ValueBlock = (Props) => {
    // console.log("Props:", typeof(Props.value), Props.value, Props)

    return (
        <View style={styles.block}>
            <Text style={styles.title}>{Props.title}</Text>
            <View style={{flexDirection:'row'}}>
                {Props.impact == "Enter" ?
                    <ArrowDown width={40} height={40} color={theme.colors.gain}/> :
                    <ArrowUp width={40} height={40} color={theme.colors.lose}/>
                }

                <Text style={styles.value}>R$ {Props.value.toFixed(2)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        width: '45%',
        height: 100,
        borderRadius: 20,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: theme.colors.secondary
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 30,
        fontWeight: '900'
    }
});