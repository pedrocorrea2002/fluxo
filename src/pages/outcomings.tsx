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
import { Category } from "../components/category";
import { Button } from "../components/button";

import { theme } from "../assets/style";
import {Market} from "../assets/Icons/categories/svg_market"
import {Bill} from "../assets/Icons/categories/svg_bill"
import {Plus} from "../assets/Icons/svg_plus"
import {Snack} from "../assets/Icons/categories/svg_snack";
import {Wheel} from "../assets/Icons/categories/svg_wheel";
import {Pet} from "../assets/Icons/categories/svg_pet";
import { Gift } from "../assets/Icons/categories/svg_gift";
import { Other } from "../assets/Icons/categories/svg_other";
import { Fun } from "../assets/Icons/categories/svg_fun";
import { Health } from "../assets/Icons/categories/svg_health";
import { Education } from "../assets/Icons/categories/svg_education";
import { Meal } from "../assets/Icons/categories/svg_meal";
import { InputDateTime } from "../components/inputDateTime";
import { just_date, just_time } from "../assets/utils";

export const Outcomings = () => {
    const [name,setName] = useState("")
    const [value,setValue] = useState(0)
    const [category,setCategory] = useState("")
    const [date, setDate] = useState(new Date(Date.now()))
    
    const saidas = database().ref('/saidas/')

    function insertValues(){
        if(name && value && category){
            saidas.push({
                category: category,
                id: Date.now(),
                date: date.getTime(),
                name: name,
                user: "pedro",
                value: value
            })

            setName("")
            setValue(0)
            setCategory("")
            setDate(new Date(Date.now()))
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
                <Text style={styles.title}>Nova saída</Text>
                <Input 
                    text="Nome"
                    display={name}
                    value={name}
                    placeholder="Digite o nome da saída"
                    onChangeText={setName}
                />
                <Input 
                    text="Valor"
                    value={value.toString()}
                    display={value.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}
                    placeholder="Digite o valor da saída"
                    
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
                        title="Mercado"
                        icon={Market}
                        color="violet"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Conta"
                        icon={Bill}
                        color="black"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Lanche"
                        icon={Snack}
                        color="#ff6200"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Carro e ônibus"
                        icon={Wheel}
                        color="#50bd02"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Animal"
                        icon={Pet}
                        color="purple"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Presente"
                        icon={Gift}
                        color="#025412"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Lazer"
                        icon={Fun}
                        color="blue"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Saúde"
                        icon={Health}
                        color="red"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Educação"
                        icon={Education}
                        color="#ffd000"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Refeição"
                        icon={Meal}
                        color="#700000"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Outro"
                        icon={Other}
                        color="gray"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                </View>
                <Button
                    color={theme.colors.gain}
                    title="Adicionar"
                    icon={<Plus width={"25%"} height={"50%"} color={"white"}/>}
                    height={"10%"}
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
        marginBottom: 20,

        flexDirection:'row',
        flexWrap: 'wrap',
    }
  });