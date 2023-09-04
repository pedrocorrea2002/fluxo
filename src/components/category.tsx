import React, {useState, Dispatch, SetStateAction} from "react"
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native'

type Props = TouchableOpacityProps & {
    title: String,
    icon: React.ReactNode,
    color: String,
    category: String,
    setCategory: Dispatch<SetStateAction<string>>
}

export const Category = (Props) => {
    const [onPressing, setOnPressing] = useState(false)

    const styles = StyleSheet.create({
        category:{
            width: '30%',
            aspectRatio: 1,

            padding: 5,
            margin: 5,
            
            borderWidth: 5,
            borderColor: (onPressing || Props.category == Props.title ? Props.color : 'white'),
            borderRadius: 15,
            backgroundColor: (onPressing || Props.category == Props.title ? 'white' : Props.color),
    
            alignItems: 'center',
            justifyContent: 'center'
        },
        categoryTitle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: (onPressing || Props.category == Props.title ? Props.color : 'white'),
            textAlign: 'center'
        }
    })

    return (    
        <TouchableOpacity 
            activeOpacity={100}
            style={styles.category}
            onPressIn={() => setOnPressing(true)}
            onPressOut={() => setOnPressing(false)}
            onPress={() => Props.setCategory(Props.title)}
        >
            <Props.icon
                width={'60%'}
                height={'60%'}
                color={onPressing || Props.category == Props.title ? Props.color : 'white'}
            />
            <Text
                style={styles.categoryTitle}
            >
                {Props.title}
            </Text>
        </TouchableOpacity>
    )
}