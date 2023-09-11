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

export const Outcomings = () => {
    const [name, setName] = useState("")
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState("")
    
    const saidas = database().ref('/0/saidas/')

    function insertValues(){
        if(name && value && category){
            saidas.push({
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
                <Text style={styles.title}>Nova saída</Text>
                <Input 
                    text="Nome"
                    placeholder="Digite o nome da saída"
                    onChangeText={setName}
                />
                <Input 
                    text="Valor"
                    placeholder="Digite o valor da saída"
                    onChangeText={value => setValue(Number(value))}
                    keyboardType="decimal-pad"
                />
                <Text style={styles.subtitle}>Categoria:</Text>
                <View style={styles.category_container}>
                    <Category
                        title="Mercado"
                        icon={Market}
                        color="violet"
                        category={category}
                        setCategory={setCategory}
                    />
                    <Category
                        title="Conta"
                        icon={Bill}
                        color="black"
                        category={category}
                        setCategory={setCategory}
                    />
                    <Category
                        title="Lanche"
                        icon={Snack}
                        color="#ff6200"
                        category={category}
                        setCategory={setCategory}
                    />
                    <Category
                        title="Carro e ônibus"
                        icon={Wheel}
                        color="#50bd02"
                        category={category}
                        setCategory={setCategory}
                    />
                    <Category
                        title="Animal"
                        icon={Pet}
                        color="purple"
                        category={category}
                        setCategory={setCategory}
                    />
                    <Category
                        title="Presente"
                        icon={Gift}
                        color="#025412"
                        category={category}
                        setCategory={setCategory}
                    />
                    <Category
                        title="Lazer"
                        icon={Fun}
                        color="blue"
                        category={category}
                        setCategory={setCategory}
                    />
                    <Category
                        title="Saúde"
                        icon={Health}
                        color="red"
                        category={category}
                        setCategory={setCategory}
                    />
                    <Category
                        title="Educação"
                        icon={Education}
                        color="#ffd000"
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