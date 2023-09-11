import React, {useState} from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native'
import database from '@react-native-firebase/database'
import DatePicker from 'react-native-datepicker'

import { Input } from "../components/input";
import { Category } from "../components/category";
import { Button } from "../components/button";

import { theme } from "../assets/style";
import {Plus} from "../assets/Icons/svg_plus"
import { Other } from "../assets/Icons/categories/svg_other";
import { Work } from "../assets/Icons/categories/svg_work";

export const Incomings = () => {
    let a = new Date
    const [name, setName] = useState("")
    const [value, setValue] = useState(0)

    const [category, setCategory] = useState("")
    const [date, setDate] = useState(new Date)
    const [showableDate, setShowableDate] = useState("")
    const [show, setShow] = useState(false)
    
    const entradas = database().ref('/0/entradas/')

    function insertValues(){
        if(name && value && category){
            entradas.push({
                category: category,
                date: Date.now(),
                id: Date.now(),
                name: name,
                user: "pedro",
                value: value
            })
        }else{
            Alert.alert("Você preencher um nome, um valor e escolher uma categoria")
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: "25%" }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.page}>
                <Text style={styles.title}>Nova entrada</Text>
                <Input 
                    text="Nome"
                    placeholder="Digite o nome da entrada"
                    onChangeText={setName}
                />
                <Input 
                    text="Valor"
                    placeholder="Digite o valor da entrada"    
                    // onChangeText={setValue}
                />

                <DatePicker
                  format="DD/MM/YYYY HH:MM:SS"
                  style={{height:30, width:"90%"}}
                />

                
                <Text style={styles.subtitle}>Categoria:</Text>
                <View style={styles.category_container}>
                    <Category
                        title="Salário"
                        icon={Work}
                        color="brown"
                        category={category}
                        setCategory={setCategory}
                    />
                    <Category
                        title="Outro"
                        icon={Other}
                        color="gray"
                        category={category}
                        setCategory={setCategory}
                    />
                </View>
                <Button

                    color={theme.colors.gain}
                    title="Adicionar"
                    icon={<Plus width={"25%"} height={"50%"} color={"white"}/>}
                    height={"15%"}
                    onPress={() => insertValues()}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page:{
        alignItems: 'center',
        alignContent: 'space-between'
    },
    title:{
        fontSize:30,
        fontWeight: 'bold'
    },
    subtitle:{
        width: '90%',
        marginTop: 20,

        fontSize:30,
        fontWeight: 'bold'
    },
    category_container:{
        marginHorizontal:10,
        marginBottom: 50,

        flexDirection:'row',
        flexWrap: 'wrap',
    }
  });