import React, { useState,useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SectionList
} from 'react-native'
import database from '@react-native-firebase/database'
import { dateFormat, dataFormat_toMonth, onlyUnique, just_date, sortAlfa, sortMonth_other } from "../../assets/utils";

import { Filter } from "../../assets/Icons/svg_filter";
import { Extract_item } from "../../components/extract_item";
import { Filter_block } from "../../components/filter_block";
import { FilterModal } from "../../components/filter_modal";
import { filter_colors } from "../../assets/front_utils";
import { dados } from '../../../controlador-de-fluxo-default-rtdb-export'


export const Extract = () => {
    const [filters,setFilters] = useState([{
                title:"Ordenação crescente por data",
                value:"Data|Crescente",
                color:filter_colors["Ordenação"],
                type:"order"
            }])
    const [modalVisible,setModalVisible] = useState(false)

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
    // const saidasDB = database().ref('/saidas/')
    // const entradasDB = database().ref('/entradas/')
    const saidasDB = dados.saidas
    const entradasDB = dados.entradas
    
    useEffect(() => {
        //* Pegando entradas do firebase e jogando em um array
        const listaEntradas = []

        for(const indexEntrada in entradasDB){
            listaEntradas.push(entradasDB[indexEntrada])
        }
        setEntradas(listaEntradas)

        //* Pegando saídas do firebase e jogando em um array
        const listaSaidas = []
        for(const indexSaida in saidasDB){
            listaSaidas.push(saidasDB[indexSaida])
        }
        setSaidas(listaSaidas)
            
        // entradasDB.once('value', snapshot => {
            // for(const indexEntrada in snapshot.val()){
            //     listaEntradas.push(snapshot.val()[indexEntrada])
            // }
        // })

        // saidasDB.once('value', snapshot => {
            // for(const indexSaida in snapshot.val()){
                // listaSaidas.push(snapshot.val()[indexSaida])
            // }
        // })
    },[])

    useEffect(() => {
        var not_filtered = [
            ...saidas.map(val => { return { type: "saida", ...val } }),
            ...entradas.map(val => { return { type: "entrada", ...val } })
        ]

        //! EFETUANDO AS FILTRAGENS
        let already_category = false
        let already_user = false
        filters.forEach(filter => {
            console.log("filter: ",filter)

            //! FILTRNADO CATEGORIAS
            if(filter.type == "category" && !already_category){
                console.log("category")
                const all_categories = filters.filter(a => a.type == "category").map(a => a.value)

                already_category = true
                not_filtered = not_filtered.filter(a => all_categories.includes(a.category))
            }
            //! FILTRANDO USUÁRIOS
            if(filter.type == "user" && !already_user){
                console.log("user")
                const all_users = filters.filter(a => a.type == "user").map(a => a.value)

                already_user = true
                not_filtered = not_filtered.filter(a => all_users.includes(a.user))
            }
            //! FILTRANDO POR DATA INICIAL
            if(filter.type == "startDate"){
                console.log("startDate")
                not_filtered = not_filtered.filter(a => new Date(a.date) >= filter.value)
            }
            //! FILTRANDO POR DATA FINAL
            if(filter.type == "endDate"){
                console.log("endDate")
                not_filtered = not_filtered.filter(a => new Date(a.date) <= filter.value)
            }

            if(filter.type == "order"){
                const order = filter.value.split("|")

                not_filtered = not_filtered.sort((a,b) => sortMonth_other(a,b,order[0],order[1]))
            }

            
        })

        // console.log("itens:",not_filtered.length)
        // console.log(not_filtered.map((item,index,array) => {return just_date(dateFormat(item.date)).concat(" ",item.name," \n")}))
        console.log(not_filtered.map((item,index,array) => {return item.date}))
        
        setLancamentos(not_filtered)
    },[entradas,saidas,filters])

    useEffect(() => {
        setMonths(lancamentos.map(item => dataFormat_toMonth(item.date)))
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
            marginBottom: 10,
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
        total_header: {
            width: '90%',
            borderBottomWidth: 2,
        },
        total_header_sections:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        total_header_section: {
            width: '50%',
            height: 30,

            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        total_header_filters: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',

            flexWrap: 'wrap'
        },
        total_section_rectangle: {
            width: 20,
            height: 20,

            borderRadius:7,
            marginRight: 10
        },
        total_section_value: {
            fontWeight: 'bold',
            marginLeft: 10
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
            let group = groupedList.find((item2) => item2.title === dateFormat(item.date).getDate())

            if (!group) {
                groupedList.push({
                    title: dateFormat(item.date).getDate(),
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

                    <Text style={[styles.date, { width: 250, marginHorizontal: 10, textAlign: "center" }]}>{selectedMonth ? selectedMonth : "-------- / ----"}</Text>

                    <TouchableOpacity onPress={() => nextItem()} activeOpacity={dateIndex == filteredMonths.length - 1 ? 100 : 0.5}>
                        <Text style={[styles.date, styles.rightArrow]}>▶</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                    <Filter width={30} height={30} color={"black"} />
                </TouchableOpacity>
            </View>
            <View style={styles.total_header}>
                <View style={styles.total_header_filters}>
                    {filters.map((item) => (
                        <Filter_block
                            key={item.title}
                            title={item.title}
                            color={item.color}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    ))}
                </View>
                <View style={styles.total_header_sections}>
                    <View style={styles.total_header_section}>
                        <View style={[styles.total_section_rectangle, {backgroundColor: 'green'}]}></View>
                        <Text>Entrada:</Text>
                        <Text style={styles.total_section_value}>R$ 11.000,00</Text>
                    </View>
                    <View style={styles.total_header_section}>
                        <View style={[styles.total_section_rectangle, {backgroundColor: 'red'}]}></View>
                        <Text>Saída:</Text>
                        <Text style={styles.total_section_value}>R$ 11.000,00</Text>
                    </View>
                </View>
            </View>

            <SectionList
                sections={groupLancamentos(lancamentos.filter(item => (dataFormat_toMonth(item.date) == selectedMonth ? 1 : 0)))}
                keyExtractor={(item) => String(item.date)}
                contentContainerStyle={{ width: "100%", alignItems: 'center', paddingBottom: "50%" }}
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
            {modalVisible &&
                <FilterModal
                    setModalVisible={setModalVisible}
                    entradas={entradas}
                    saidas={saidas}
                    setLancamentos={setLancamentos}
                    filters={filters}
                    setFilters={setFilters}
                    load_moment={new Date(Date.now())}
                />
            }
        </View>

    )
}