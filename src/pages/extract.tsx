import React, { useState,useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SectionList,
} from 'react-native'
import database from '@react-native-firebase/database'
import { dateFormat, dataFormat_toMonth, onlyUnique } from "../assets/utils";

import { Filter } from "../assets/Icons/svg_filter";
import { Extract_item } from "../components/extract_item";


export const Extract = () => {
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

    //? VARIÁVEIS DE MÊS
    const [months, setMonths] = useState([])
    const [filteredMonths, setFilteredMonths] = useState([])
    const [dateIndex, setDateIndex] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState("")
    
    //? PREENCHENDO ENTRADAS E SAÍDAS
    const saidasDB = database().ref('/0/saidas/')
    const entradasDB = database().ref('/0/entradas/')
    
    useEffect(() => {
        saidasDB.once('value', snapshot => {
            const listaSaidas = []

            for(indexSaida in snapshot.val()){
                listaSaidas.push(snapshot.val()[indexSaida])
            }
            setSaidas(listaSaidas)
        })
    
        entradasDB.once('value', snapshot => {
            const listaEntradas = []

            for(indexEntrada in snapshot.val()){
                listaEntradas.push(snapshot.val()[indexEntrada])
            }
            setEntradas(listaEntradas)
        })
    },[])

    useEffect(() => {
        setLancamentos([
            ...saidas.map(val => { return { type: "saida", ...val } }),
            ...entradas.map(val => { return { type: "entrada", ...val } })
        ])

    },[entradas,saidas])

    useEffect(() => {
        console.log(lancamentos)

        setMonths(lancamentos.sort((a, b) => { return a.date - b.date }).map(item => dataFormat_toMonth(item.date)))
    },[lancamentos])

    useEffect(() => {
        setFilteredMonths(months.filter(onlyUnique))
    },[months])

    useEffect(() => {
        setSelectedMonth(filteredMonths[0])   
    },[filteredMonths])

    const styles = StyleSheet.create({
        page: {
            alignItems: 'center',
            alignContent: 'space-between'
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold'
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
        },
        groupHeader: {
            minWidth: '90%',
            marginTop: 15,

            fontSize: 30,
            fontWeight: 'bold'
        }
    })

    function groupLancamentos(lista) {
        const groupedList = []
        lista.forEach((item) => {
            let group = groupedList.find((item2) => item2.title === dateFormat(item.date).getUTCDate())

            if (!group) {
                groupedList.push({
                    title: dateFormat(item.date).getUTCDate(),
                    data: [item]
                })
            } else {
                group.data.push(item)
            }
        })

        return groupedList
    }

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Extrato</Text>
            <View style={styles.dateBar}>
                <View style={styles.dateBar2}>
                    <TouchableOpacity onPress={() => previousItem()} activeOpacity={dateIndex == 0 ? 100 : 0.5}>
                        <Text style={[styles.date, styles.leftArrow]}>◀</Text>
                    </TouchableOpacity>

                    <Text style={[styles.date, { width: 201, marginHorizontal: 10, textAlign: "center" }]}>{selectedMonth ? selectedMonth : "-------- / ----"}</Text>

                    <TouchableOpacity onPress={() => nextItem()} activeOpacity={dateIndex == filteredMonths.length - 1 ? 100 : 0.5}>
                        <Text style={[styles.date, styles.rightArrow]}>▶</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Filter width={30} height={30} color={"black"} />
                </TouchableOpacity>
            </View>

            <SectionList
                sections={groupLancamentos(lancamentos.filter(item => (dataFormat_toMonth(item.date) == selectedMonth ? 1 : 0)).sort((a, b) => { return a.date - b.date }))}
                keyExtractor={(item) => String(item.date)}
                contentContainerStyle={{ width: "100%", alignItems: 'center', paddingBottom: "25%" }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Extract_item
                        name={item.name}
                        value={item.value}
                        date={item.date}
                        type={item.type}
                        category={item.category}
                        user={item.user}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.groupHeader}>Dia {title}</Text>
                )}
            />
        </View>

    )
}