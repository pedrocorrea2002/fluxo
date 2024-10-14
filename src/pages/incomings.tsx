import React, {useState} from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native'
import database from '@react-native-firebase/database'

import { Input } from "../components/input";
import { InputDateTime } from "../components/inputDateTime";
import { Category } from "../components/category";
import { Button } from "../components/button";

import { theme } from "../assets/style";
import {Plus} from "../assets/Icons/svg_plus"
import { Other } from "../assets/Icons/categories/svg_other";
import { Work } from "../assets/Icons/categories/svg_work";
import { just_date, just_time } from "../assets/utils";

export const Incomings = () => {
    const [name,setName] = useState("")
    const [value,setValue] = useState(0)
    const [category,setCategory] = useState([])
    const [date, setDate] = useState(new Date(Date.now()))
    
    const entradas = database().ref('/entradas/')

    function insertValues(){
        console.log("name:",name)
        console.log("value:",value)
        console.log("category:",category)

        if(name && value && category[0]){
            console.log("entrei")

            entradas.push({
                category: category[0],
                date: date.getTime(),
                id: Date.now(),
                name: name,
                user: "pedro",
                value: value/100
            })
            
            setName("")
            setValue(0)
            setCategory([])
            setDate(new Date(Date.now()))
        }else{
            Alert.alert("Você deve preencher um nome, um valor e escolher uma categoria")
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
                    display={name}
                    value={name}
                    placeholder="Digite o nome da entrada"
                    onChangeText={setName}
                />
                <Input 
                    text="Valor"
                    value={value.toString()}
                    display={(Number(value)/100).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}                    
                    placeholder="Digite o valor da entrada"    
                    onChangeText={a => setValue(Number(a))}
                    keyboardType="decimal-pad"
                />
                <View style={{flexDirection:'row'}}>
                    <InputDateTime 
                        text="Data"
                        side="left"
                        date={date}
                        setDate={setDate}
                        mode="date"
                        content={just_date(date)}
                    />
                    <InputDateTime
                        text="Hora"
                        side="right"
                        date={date}
                        setDate={setDate}
                        mode="time"
                        content={just_time(date)}
                    />
                </View>
                <Text style={styles.subtitle}>Categoria:</Text>
                <View style={styles.category_container}>
                    <Category
                        title="Salário"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Benefício"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Serviço extra"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Venda"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Câmbio"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Renda fixa"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Investir"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Outro"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
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