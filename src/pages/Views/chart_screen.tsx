import React, { useState,useEffect, cloneElement } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SectionList,
    FlatList,
    Image,
    Dimensions
} from 'react-native'
import database from '@react-native-firebase/database'
import { dateFormat, dataFormat_toMonth, onlyUnique, moneyFormat, sortMonth_category, just_date, sortTotal_Category } from "../../assets/utils";

import { Filter } from "../../assets/Icons/svg_filter";
import { Extract_item } from "../../components/extract_item";
import { Filter_block } from "../../components/filter_block";
import { FilterModal } from "../../components/filter_modal";
import { category_front, filter_colors } from "../../assets/front_utils";
import { theme } from "../../assets/style";
import { Extract_item_category } from "../../components/extract_item_category";
import { useNavigation } from "@react-navigation/native";

import {
    PieChart,
    LineChart
} from "react-native-chart-kit"

export const Chart_screen = () => {
    const navigation = useNavigation();

    const [filters,setFilters] = useState([{
                title:"Ordenação crescente por data",
                value:"Data|Decrescente",
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
    const saidasDB = database().ref('/saidas/')
    const entradasDB = database().ref('/entradas/')
    // const saidasDB = dados.saidas
    // const entradasDB = dados.entradas

    //? DADOS PARA ALIMENTAR OS GRÁFICOS
    const [entradasPieData, setEntradasPieData] = useState([])
    const [saidasPieData, setSaidasPieData] = useState([])

    useEffect(() => {
        //* Pegando entradas do firebase e jogando em um array
        const listaEntradas = []

        // for(const indexEntrada in entradasDB){
        //     listaEntradas.push(entradasDB[indexEntrada])
        // }
        entradasDB.once('value', snapshot => {
            for(const indexEntrada in snapshot.val()){
                listaEntradas.push(snapshot.val()[indexEntrada])
            }

            setEntradas(listaEntradas)
        })


        //* Pegando saídas do firebase e jogando em um array
        const listaSaidas = []
        // for(const indexSaida in saidasDB){
        //     listaSaidas.push(saidasDB[indexSaida])
        // }
        saidasDB.once('value', snapshot => {
            for(const indexSaida in snapshot.val()){
                listaSaidas.push(snapshot.val()[indexSaida])
            }

            setSaidas(listaSaidas)
        })
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
            //! FILTRNADO CATEGORIAS
            if(filter.type == "category" && !already_category){
                const all_categories = filters.filter(a => a.type == "category").map(a => a.value)

                already_category = true
                not_filtered = not_filtered.filter(a => all_categories.includes(a.category))
            }
            //! FILTRANDO USUÁRIOS
            if(filter.type == "user" && !already_user){
                const all_users = filters.filter(a => a.type == "user").map(a => a.value)

                already_user = true
                not_filtered = not_filtered.filter(a => all_users.includes(a.user))
            }
            //! FILTRANDO POR DATA INICIAL
            if(filter.type == "startDate"){
                not_filtered = not_filtered.filter(a => new Date(a.date) >= filter.value)
            }
            //! FILTRANDO POR DATA FINAL
            if(filter.type == "endDate"){
                not_filtered = not_filtered.filter(a => new Date(a.date) <= filter.value)
            }

            if(filter.type == "order"){
                const order = filter.value.split("|")

                not_filtered = not_filtered.sort((a,b) => sortMonth_category(a,b,order[1]))
            }
        })

        //* caso a ordenação personalizada for excluída e não houve mais filtro nenhum sobrando, é aplicado a ordenação padrão
        if(filters.length == 0){
            not_filtered = not_filtered.sort((a,b) => sortMonth_category(a,b,"Decrescente"))
        }
        
        setLancamentos(not_filtered)
    },[entradas,saidas,filters])

    useEffect(() => {
        setMonths(lancamentos.map(item => dataFormat_toMonth(item.date)))
    },[lancamentos])

    useEffect(() => {
        console.log("month:",lancamentos.map(a => `${dataFormat_toMonth(dateFormat(a.date))}\n`))
        setFilteredMonths(["Total",...months.filter(onlyUnique)])
    },[months])

    useEffect(() => {
        //* PREENCHENDO O DATASET DO GRÁFICO COM BASE NO MÊS ESCOLHIDO
        let month_entradas_data = groupLancamentos(
            lancamentos.filter(item => item.type == "entrada" && (selectedMonth == "Total" ? true : (dataFormat_toMonth(item.date) == selectedMonth)))
        )

        let month_saidas_data = groupLancamentos(
            lancamentos.filter(item => item.type == "saida" && (selectedMonth == "Total" ? true : (dataFormat_toMonth(item.date) == selectedMonth)))
        )

        setEntradasPieData([])
        setSaidasPieData([])

        console.log("month_entradas_data:",month_entradas_data)
        console.log("month_saidas_data:",month_saidas_data)
        
        //* preenchendo dados do gráfico de pizza de entradas
        setEntradasPieData(month_entradas_data.map(a => {return {
            name: a.category,
            value: a.value,
            color: category_front[a.category].color,
            legendFontColor: category_front[a.category].color,
            legendFontSize: 12
        }}))

        //* preenchendo dados do gráfico de pizza de saídas
        setSaidasPieData(month_saidas_data.map(a => {return {
            name: a.category,
            value: a.value,
            color: category_front[a.category].color,
            legendFontColor: category_front[a.category].color,
            legendFontSize: 12
        }}))
    },[selectedMonth,lancamentos])

    useEffect(() => {
        setSelectedMonth(filteredMonths[0])
        setDateIndex(0)
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
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        total_header_section: {
            height: 30,

            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginHorizontal: 5
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

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    }

    function groupLancamentos(lista) {
        const groupedList = []

        lista.forEach((item) => {
            let group = groupedList.findIndex((item2) => item2.category == item.category && item.type == item2.type)

            if(group != -1){
                groupedList[group].value += item.value
            }else{
                groupedList.push(JSON.parse(JSON.stringify(item)))
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

                {/* //* BOTÃO DE TROCA DE TELA */}
                <TouchableOpacity 
                    onPress={() => {navigation.navigate("Extract")}}
                    style={{width:30,height:30}}
                >
                    <Image source={require("../../assets/change_screen.png")} style={{width:30,height:30}}/>
                </TouchableOpacity>

                {/* //* BOTÃO DE FILTRO E ORDENAÇÃO */}
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
                        <View style={[styles.total_section_rectangle, {backgroundColor: theme.colors.gain}]}></View>
                        <Text>Entrada:</Text>
                        <Text style={styles.total_section_value}>
                            {
                                moneyFormat(
                                    selectedMonth == "Total" ? 
                                        lancamentos.filter(item => (item.type == "entrada" ? 1 : 0)).reduce((sum,a) => sum += a.value,0)  
                                    : 
                                        lancamentos.filter(item => (
                                            dataFormat_toMonth(item.date) == selectedMonth && item.type == "entrada" ? 1 : 0
                                        )).reduce((sum,a) => sum += a.value,0)
                                )
                            }
                        </Text>
                    </View>
                    <View style={styles.total_header_section}>
                        <View style={[styles.total_section_rectangle, {backgroundColor: theme.colors.lose}]}></View>
                        <Text>Saída:</Text>
                        <Text style={styles.total_section_value}>
                            {
                                moneyFormat(
                                    selectedMonth == "Total" ? 
                                        lancamentos.filter(item => (item.type == "saida" ? 1 : 0)).reduce((sum,a) => sum += a.value,0)  
                                    : 
                                        lancamentos.filter(item => (
                                            dataFormat_toMonth(item.date) == selectedMonth && item.type == "saida" ? 1 : 0
                                        )).reduce((sum,a) => sum += a.value,0)
                                )
                            }
                        </Text>
                    </View>
                </View>
            </View>

            <Text style={styles.date}>Entradas</Text>
            <PieChart
                chartConfig={chartConfig}
                data={entradasPieData} 
                height={200}
                width={Dimensions.get("window").width}
                accessor="value"
                backgroundColor = 'white'
                paddingLeft="2"
            />

            <Text style={styles.date}>Saídas</Text>
            <PieChart
                chartConfig={chartConfig}
                data={saidasPieData}
                height={200}
                width={Dimensions.get("window").width}
                accessor="value"
                backgroundColor = 'white'
                paddingLeft="2"
                avoidFalseZero

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

//TODO: Poder comparar a evolução de duas categorias ao longo dos meses em um gráfico de linhas
//TODO: Ver a fatia de cada categoria ou de algumas categorias em um gráfico de pizza