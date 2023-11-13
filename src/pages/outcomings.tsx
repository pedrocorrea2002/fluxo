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
import {Plus} from "../assets/Icons/svg_plus"
import { InputDateTime } from "../components/inputDateTime";
import { just_date, just_time, numberEnsurer } from "../assets/utils";

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
                    value={value} /* //! QUANDO VOLTA A 0, O RESTANTE DO TEXTO MANTEM */
                    display={value.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}
                    placeholder="Digite o valor da saída"
                    
                    onChangeText={a => {setValue(numberEnsurer(a))}}
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
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Conta"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Lanche"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Carro e ônibus"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Animal"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Presente"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Lazer"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Saúde"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Educação"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Refeição"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Hardware"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Ferramentas"
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