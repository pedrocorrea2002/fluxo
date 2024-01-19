import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database'

import { ValueBlock } from "../components/valueBlock";
import { Button } from "../components/button";
import { theme } from "../assets/style";
import { ArrowUp } from '../assets/Icons/svg_arrow_up';
import { ArrowDown } from '../assets/Icons/svg_arrow_down';
import { Extract } from '../assets/Icons/svg_extract';

import { dataFormat_toMonth, onlyUnique } from "../assets/utils";

export const Main = () => {
    const navigation = useNavigation();
    var a = 1

    //? PULA PRA PRÓXIMA DATA
    function nextItem() {
        if (filteredMonths[dateIndex + 1] !== undefined) {
            setSelectedMonth(filteredMonths[dateIndex + 1])
            setDateIndex(dateIndex + 1)
        }
    }

    //? PULA PRA DATA ANTERIOR
    function previousItem() {
        if (filteredMonths[dateIndex - 1] !== undefined) {
            setSelectedMonth(filteredMonths[dateIndex - 1])
            setDateIndex(dateIndex - 1)
        }
    }
    
    //? LISTAS DE ENTRADAS E SAÍDAS
    const [lancamentos, setLancamentos] = useState([])
    const [saidas, setSaidas] = useState([])
    const [entradas, setEntradas] = useState([])

    //? VALORES EXIBIDOS NA TELA
    const [entradasTotais, setEntradasTotais] = useState(0)
    const [entradasMes, setEntradasMes] = useState(0)
    const [saidasTotais, setSaidasTotais] = useState(0)
    const [saidasMes, setSaidasMes] = useState(0)
    const [saldoTotal, setSaldoTotal] = useState(0)
    const [saldoMes, setSaldoMes] = useState(0)
    
    //? VARIÁVEIS DE MÊS
    const [months, setMonths] = useState([])
    const [filteredMonths, setFilteredMonths] = useState([])
    const [dateIndex, setDateIndex] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState("")
    
    //? PREENCHENDO ENTRADAS E SAIDAS /////////////////////////
    const saidasDB = database().ref('/saidas/')
    const entradasDB = database().ref('/entradas/')

    useEffect(() => {
        saidasDB.once('value', snapshot => {
            const listaSaidas = []

            for(let indexSaida in snapshot.val()){
                listaSaidas.push(snapshot.val()[indexSaida])
            }
            setSaidas(listaSaidas)
        })
    
        entradasDB.once('value', snapshot => {
            const listaEntradas = []

            for(let indexEntrada in snapshot.val()){
                listaEntradas.push(snapshot.val()[indexEntrada])
            }

            setEntradas(listaEntradas)
        })
    },[a])
    a = 1

    useEffect(() => {
        setLancamentos([
            ...saidas.map(val => { return { type: "saida", ...val } }),
            ...entradas.map(val => { return { type: "entrada", ...val } })
        ])
    },[entradas,saidas])

    useEffect(() => {
        //? TOTAL
        setMonths(lancamentos.sort((a, b) => { return a.date - b.date }).map(item => dataFormat_toMonth(item.date)))
        setEntradasTotais(entradas.reduce((a,b) => a + b.value ,0))
        setSaidasTotais(saidas.reduce((a,b) => a + b.value ,0))

        //? DO MÊS
        //! Foi repetido aqui porque por algum motivo o useEffect do dateIndex está executando antes da lista de lançamentos estar preenchida e depois só executa de novo quando é trocado o mês, o que deixa os valores de mês zerados caso não for trocado de página
        setEntradasMes(lancamentos
            .filter(a => a.type == "entrada"  && dataFormat_toMonth(a.date) == selectedMonth)
            .reduce((a,b) => a + b.value ,0))
        setSaidasMes(lancamentos
            .filter(a => a.type == "saida" && dataFormat_toMonth(a.date) == selectedMonth)
            .reduce((a,b) => a + b.value ,0))
    },[lancamentos])

    useEffect(() => {
        setSaldoTotal(entradasTotais - saidasTotais)
    },[entradasTotais,saidasTotais])

    useEffect(() => {
        setFilteredMonths(months.filter(onlyUnique))
    },[months])

    useEffect(() => {
        setSelectedMonth(filteredMonths[0])   
    },[filteredMonths])

    useEffect(() => {
        if(lancamentos.length > 0){
            setEntradasMes(lancamentos
                            .filter(a => a.type == "entrada"  && dataFormat_toMonth(a.date) == selectedMonth.toString())
                            .reduce((a,b) => a + b.value ,0))
            setSaidasMes(lancamentos
                            .filter(a => a.type == "saida" && dataFormat_toMonth(a.date) == selectedMonth.toString())
                            .reduce((a,b) => a + b.value ,0))
        }
    },[dateIndex,selectedMonth])

    useEffect(() => {
        setSaldoMes(entradasMes - saidasMes)
    },[entradasMes,saidasMes])
    //? ////////////////////////////////////////////////////

    const styles = StyleSheet.create({
        page:{
            flex:1,
            alignItems: 'center',
            alignContent: 'space-between',
            paddingBottom: 40
        },
        title:{
            fontSize:30,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        container:{
            // width:,
            height: 200,
            // marginTop: 20,
            marginLeft: 20,
            paddingRight: 60,
            // flexWrap: "wrap",
            
            flexDirection: 'row',
            // justifyContent: 'space-evenly'
        },
        buttonBlock: {
            width:'100%',
            height:'60%',
            alignItems:'center',
            justifyContent:'space-evenly'
        },
        dateBar: {
            marginTop: 20,
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: "flex-end"
        },
        dateBar2: {
            flexDirection: 'row',
        },
        date: {
            fontSize: 30,
            fontWeight: 'bold',
        },
        leftArrow: {
            color: dateIndex == 0 || lancamentos.length == 0 ? "#bfbdbd" : "black"
        },
        rightArrow: {
            color: dateIndex == filteredMonths.length - 1 || lancamentos.length == 0 ? "#bfbdbd" : "black"
        }
      });

    return(
        <View style={styles.page}>
            <Text style={styles.title}>Controle de fluxo</Text>
            <ScrollView contentContainerStyle={styles.container} horizontal>
                <ValueBlock title="Entradas totais" value={entradasTotais} impact="Enter"/>
                <ValueBlock title="Saídas totais" value={saidasTotais} impact="Leave"/>
                <ValueBlock title="Saldo total" value={saldoTotal} impact="neutral"/>
            </ScrollView>
            <View style={styles.dateBar}>
                <View style={styles.dateBar2}>
                    <TouchableOpacity onPress={() => previousItem()} activeOpacity={dateIndex == 0 ? 100 : 0.5}>
                        <Text style={[styles.date, styles.leftArrow]}>◀</Text>
                    </TouchableOpacity>

                    <Text style={[styles.date, { width: 250, marginHorizontal: 10, textAlign: "center" }]}>{selectedMonth ? selectedMonth : "-------- / ----"}</Text>

                    <TouchableOpacity onPress={() => nextItem()} activeOpacity={dateIndex == filteredMonths.length - 1 ? 100 : 0.5}>
                        <Text style={[styles.date, styles.rightArrow]}>▶</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.container} horizontal>
                <ValueBlock title="Entradas do mês" value={entradasMes} impact="Enter"/>
                <ValueBlock title="Saídas do mês" value={saidasMes} impact="Leave"/>
                <ValueBlock title="Saldo do mês" value={saldoMes} impact="neutral"/>
            </ScrollView>
            <View style={styles.buttonBlock}>
                <Button 
                    title="Extrato" 
                    color="orange"
                    icon={<Extract width={50} height={50} color={"white"}/>}
                    height={100}
                    onPress={() => navigation.navigate("Extract")}
                />
                <Button 
                    title="Saida" 
                    color={theme.colors.lose}
                    icon={<ArrowUp width={50} height={50} color={"white"}/>}
                    height={100}
                    onPress={() => navigation.navigate("Outcomings")}
                />
                <Button 
                    title="Entrada" 
                    color={theme.colors.gain}
                    icon={<ArrowDown width={50} height={50} color={"white"}/>}
                    height={100}
                    onPress={() => navigation.navigate("Incomings")}
                />
            </View>
        </View>
    )
}