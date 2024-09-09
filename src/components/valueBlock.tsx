import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'

import { theme } from '../assets/style';
import { ArrowUp } from '../assets/Icons/svg_arrow_up';
import { ArrowDown } from '../assets/Icons/svg_arrow_down';
import { Balance } from '../assets/Icons/svg_balance';

type Props = {
    title: String;
    value: Number;
    iconUrl: String;
    impact: String;
}

export const ValueBlock = (Props) => {
    return (
        <View style={styles.block}>
            <Text style={styles.title}>{Props.title}</Text>
            <View style={{flexDirection:'row'}}>
                {Props.impact == "Enter" ?
                    <ArrowDown width={40} height={40} color={theme.colors.gain}/> :
                    Props.impact == "Leave" ?
                        <ArrowUp width={40} height={40} color={theme.colors.lose}/> :
                        <Balance width={40} height={40} color={theme.colors.balance}/>
                }

                <Text style={styles.value}>{Props.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        width: "auto",
        height: 100,
        borderRadius: 20,
        marginHorizontal: 10,
        paddingHorizontal: 10,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: theme.colors.secondary
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 25,
        fontWeight: '900'
    }
});