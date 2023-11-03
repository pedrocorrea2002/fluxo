import React, {useState, Dispatch, SetStateAction, useEffect} from "react"
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    Dimensions
} from 'react-native'

type Props = {
    title: String,
    icon: React.ReactNode,
    setCategory: Dispatch<SetStateAction<string>>
}

export const Clean_Buttton = (Props) => {
    const [onPressing, setOnPressing] = useState(false)

    const styles = StyleSheet.create({
        category:{
            width: Dimensions.get("screen").width/3.5,
            maxWidth: 110,
            aspectRatio: 1,

            padding: 5,
            margin: 5,
            
            borderWidth: 5,
            borderColor: (onPressing ? "black" : 'white'),
            borderRadius: 15,
            backgroundColor: (onPressing ? 'white' : "black"),
    
            alignItems: 'center',
            justifyContent: 'center'
        },
        categoryTitle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: (onPressing ? "black" : 'white'),
            textAlign: 'center'
        }
    })

    function button_action(){
        Props.setCategory([])
    }
    
    return (    
        <TouchableOpacity 
            activeOpacity={100}
            style={styles.category}
            onPressIn={() => setOnPressing(true)}
            onPressOut={() => setOnPressing(false)}
            onPress={button_action}
        >
            <Props.icon
                width={'60%'}
                height={'60%'}
                color={onPressing ? "black" : 'white'}
            />
            <Text
                style={styles.categoryTitle}
            >
                {Props.title}
            </Text>
        </TouchableOpacity>
    )
}