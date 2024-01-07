import react, {useState } from 'react'
import { BlurView } from '@react-native-community/blur'
import { StyleSheet, Modal, View, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native'

import { Category } from './category';
import { Clean_Buttton } from './clean_button';
import { OptionBlock } from './option_block';
import { InputDateTime } from './inputDateTime';

import { dateFormat, just_date, just_time } from '../assets/utils';
import { filter_colors } from '../assets/front_utils';

type Props = {
    setModalVisible: Function;
    entradas: [];
    saidas: [];
    setLancamentos: Function;
    load_moment: Date;
}

export const FilterModal = (Props) => {
    const [category,setCategory] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectedOrdenacao, setSelectedOrdenacao] = useState(["Data"])
    const [selectedSentido, setSelectedSentido] = useState(["Crescente"])
    const [startDate, setStartDate] = useState(new Date(0))
    const [endDate, setEndDate] = useState(new Date)
    
    const [userList, setUserList] = useState([])
    const geralList = [...Props.saidas,...Props.entradas]
    const ordenacao = ["Data", "Nome"]
    const sentido = ["Crescente", "Decrescente"]

    geralList.forEach(a => {
        if(!userList.includes(a.user)){
            setUserList([...userList, a.user])
        }
    })

    function closeButton(){
        let filters = []

        //! ADICIONDO FILTROS POR CATEGORIA
        if(category.length > 0){
            for(let a in category){
                console.log("aqui")
                filters.push({
                    title:category[a],
                    value:category[a],
                    color: filter_colors["Categoria"],
                    type: "category"
                })
            }
        }

        //! ADICIONANDO FILTROS POR USUÁRIO
        if(selectedUsers.length > 0){
            // for(let b in selectedUsers){
            selectedUsers.forEach(b => {
                filters.push({
                    title:`Usuário: ${b}`,
                    value:b,
                    color: filter_colors["Usuário"],
                    type:"user"
                })
            })
        }

        
        //  if(startDate != new Date(0)){ //! porque diferente?
        if(startDate.toDateString() != new Date(0).toDateString()){
            filters.push({
                title:`Data inicial: ${just_date(startDate)} ${just_time(startDate)}`,
                value: startDate,
                color: filter_colors["Data inicial"],
                type:"startDate"
            })
        }
        
        if(just_date(endDate) != just_date(Props.load_moment)){
            filters.push({
                title:`Data final: ${just_date(endDate)} ${just_time(endDate)}`,
                value: endDate,
                color: filter_colors["Data final"],
                type:"endDate"
            })
        }

        console.log("selectedOrdenacao:",selectedOrdenacao)
        console.log("selectedOrdenacao:",selectedOrdenacao)
        
        if(!Props.filters.filter(a => a.type=="order")[0] || `${selectedOrdenacao[0]}|${selectedSentido[0]}` != Props.filters.filter(a => a.type=="order")[0].value){
            filters.push({
                title:`Ordenação ${selectedSentido[0].toLowerCase()} por ${selectedOrdenacao[0].toLowerCase()}`,
                value: `${selectedOrdenacao[0]}|${selectedSentido[0]}`,
                color: filter_colors["Ordenação"],
                type:"order"
            })
        }

        Props.setFilters(filters)

        // console.log("startDate: ",startDate)
        // console.log("endDate: ",endDate)
        
        // //! FILTRANDO ENTRADAS
        // let entradas_filtered = Props.entradas.filter(a => (
        //         (category.length > 0 ? category.includes(a.category) : true) && //? FILTRO DE CATEGORIAS
        //         (selectedUsers.length > 0 ? selectedUsers.includes(a.user) : true) && //? FILTRO DE USUÁRIO
        //         a.date >= startDate && //? FILTRO DE DATA INICIAL
        //         a.date <= endDate //? FILTRO DE DATA FINAL
        // ))

        // //! FILTRANDO SAÍDAS
        // let saidas_filtered = Props.saidas.filter(b => (
        //         (category.length > 0 ? category.includes(b.category) : true) && //? FILTRO DE CATEGORIAS
        //         (selectedUsers.length > 0 ? selectedUsers.includes(b.user) : true) && //? FILTRO DE USUÁRIO
        //         b.date >= startDate && //? FILTRO DE DATA INICIAL
        //         b.date <= endDate //? FILTRO DE DATA FINAL
        // ))

        // //! ORDENANDO ENTRADAS E SAÍDAS
        // switch(selectedOrdenacao){
        //     case ["Data"] : {
        //         entradas_filtered = entradas_filtered.sort(a => a.date)
        //         saidas_filtered = saidas_filtered.sort(b => b.date)
        //     }; break;
        //     case ["Nome"] : {
        //         entradas_filtered = entradas_filtered.sort(a => a.name)
        //         saidas_filtered = saidas_filtered.sort(b => b.name)
        //     }; break;
        // }

        // //! DEFININDO DIREÇÃO DA ORDENAÇÃO
        // switch(selectedSentido){
        //     case ["Decrescente"] : {
        //         entradas_filtered = entradas_filtered = entradas_filtered = entradas_filtered.reverse()
        //         saidas_filtered = saidas_filtered = saidas_filtered = saidas_filtered.reverse()
        //     }
        // }



        // //! RENDERIZANDO ALTERAÇÕES E FECHANDO MODAL
        // Props.setLancamentos([
        //     ...entradas_filtered.map(val => { return { type: "saida", ...val } }),
        //     ...saidas_filtered.map(val => { return { type: "entrada", ...val } })
        // ])

        Props.setModalVisible(false)
    }

    return(
        <Modal transparent>
            {/* //! O BOTÃO OPACO */}
            <BlurView style={styles.blur_area} blurType='light'>
                <TouchableOpacity
                    style={styles.blur_block}
                    onPress={() => closeButton()}
                >
                    <Text style={styles.title}>Fechar</Text>
                </TouchableOpacity>
            </BlurView>
            <View style={styles.line}></View>
            
            {/* //! O PRÓPRIO MODAL */}
            <ScrollView 
                contentContainerStyle={styles.modal_container}
            >
                <Text style={styles.section_title}>FILTROS</Text>
                <Text style={styles.filter_label}>Categorias:</Text>
                {/* //! CATEGORIAS */}
                <View style={styles.category_container}>  
                    <Category
                        title="Mercado"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Conta"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Lanche"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Carro e ônibus"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Animal"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Presente"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Lazer"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Saúde"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Educação"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Refeição"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Hardware"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Ferramentas"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Salário"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Outro"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Clean_Buttton
                        title="Limpar campos"
                        category={category}
                        setCategory={setCategory}
                    />
                </View>
                {/* //! AQUI DEBAIXO FICA UM ESPAÇO, NÃO SEI PORQUE*/}

                <Text style={styles.filter_label}>Pessoas:</Text>
                <View style={styles.category_container}>
                    {userList.map(a => (
                        <OptionBlock
                            key={a}
                            title={a}
                            color={"black"}
                            options={selectedUsers}
                            setOptions={setSelectedUsers}
                            pressBehavior={"add"}
                        />
                    ))}
                </View>

                {/* //! DATAS */}
                <Text style={styles.filter_label}>Data inicial:</Text>
                <View style={styles.dateBox}>
                    <InputDateTime 
                        text="Data"
                        side="left"
                        date={startDate}
                        setDate={setStartDate}
                        mode="date"
                        content={just_date(startDate)}
                    />
                    <InputDateTime
                        text="Hora"
                        side="right"
                        date={startDate}
                        setDate={setStartDate}
                        mode="time"
                        content={just_time(startDate)}
                    />
                </View>

                <Text style={styles.filter_label}>Data final:</Text>
                <View style={styles.dateBox}>
                    <InputDateTime 
                        text="Data"
                        side="left"
                        date={endDate}
                        setDate={setEndDate}
                        mode="date"
                        content={just_date(endDate)}
                    />
                    <InputDateTime
                        text="Hora"
                        side="right"
                        date={endDate}
                        setDate={setEndDate}
                        mode="time"
                        content={just_time(endDate)}
                    />
                </View>

                {/* //! ORDENAÇÃO */}
                <View style={styles.line}></View>
                <Text style={styles.section_title}>ORDENAÇÃO</Text>

                <Text style={styles.filter_label}>
                    Campo:
                </Text>
                <View style={styles.category_container}>

                    {ordenacao.map(a => (
                        <OptionBlock
                            key={a}
                            title={a}
                            color={"black"}
                            options={selectedOrdenacao}
                            setOptions={setSelectedOrdenacao}
                            pressBehavior={"substitute"}
                        />
                    ))}
                </View>

                <Text style={styles.filter_label}>
                    Sentido:
                </Text>
                <View style={styles.category_container}>

                    {sentido.map(a => (
                        <OptionBlock
                            key={a}
                            title={a}
                            color={"black"}
                            options={selectedSentido}
                            setOptions={setSelectedSentido}
                            pressBehavior={"substitute"}
                        />
                    ))}
                </View>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    blur_area:{
        height: 100,
        width: '100%'
    },
    blur_block: {
        flex:1,
        display:'flex',

        justifyContent: 'center',
        alignItems:'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40
    },
    modal_container: {
        minHeight: Dimensions.get('screen').height - 100,
        minWidth: '80%',
        backgroundColor:'white'
    },

    //! SECTIONS
    line: {
        width: '100%',
        borderColor: 'black',
        borderTopWidth: 2
    },
    section_title:{
        width: '100%',

        fontSize:30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    //! CATEGORIES
    filter_label:{
        marginLeft: 10,
        fontSize:30,
        fontWeight: 'bold'
    },
    category_container:{
        flexDirection:'row',
        flexWrap: 'wrap',

        paddingHorizontal:10,
    },

    //! DATES
    dateBox: {
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    }
})