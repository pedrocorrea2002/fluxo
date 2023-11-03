import { BlurView } from '@react-native-community/blur'
import react, { useEffect, useState } from 'react'
import { StyleSheet, Modal, View, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native'
import { Category } from './category';
import { Market } from '../assets/Icons/categories/svg_market';
import { Bill } from '../assets/Icons/categories/svg_bill';
import { Snack } from '../assets/Icons/categories/svg_snack';
import { Wheel } from '../assets/Icons/categories/svg_wheel';
import { Pet } from '../assets/Icons/categories/svg_pet';
import { Gift } from '../assets/Icons/categories/svg_gift';
import { Fun } from '../assets/Icons/categories/svg_fun';
import { Health } from '../assets/Icons/categories/svg_health';
import { Education } from '../assets/Icons/categories/svg_education';
import { Meal } from '../assets/Icons/categories/svg_meal';
import { Other } from '../assets/Icons/categories/svg_other';
import { Work } from '../assets/Icons/categories/svg_work';
import { OptionBlock } from './option_block';
import { InputDateTime } from './inputDateTime';
import { just_date, just_time } from '../assets/utils';
import { Hardware } from '../assets/Icons/categories/svg_hardware';
import { Tool } from '../assets/Icons/categories/svg_tool';
import { Trash } from '../assets/Icons/svg_trash';
import { Clean_Buttton } from './clean_button';

type Props = {
    setModalVisible: Function;
    saidas: [];
    entradas: [];
}

export const FilterModal = (Props) => {
    const [category,setCategory] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [selectedOrdenacao, setSelectedOrdenacao] = useState([])
    const [selectedSentido, setSelectedSentido] = useState([])
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

    return(
        <Modal transparent>
            {/* //! O BOTÃO OPACO */}
            <BlurView style={styles.blur_area} blurType='light'>
                <TouchableOpacity
                    style={styles.blur_block}
                    onPress={() => Props.setModalVisible(false)}
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
                        icon={Market}
                        color="violet"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Conta"
                        icon={Bill}
                        color="black"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Lanche"
                        icon={Snack}
                        color="#ff6200"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Carro e ônibus"
                        icon={Wheel}
                        color="#50bd02"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Animal"
                        icon={Pet}
                        color="purple"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Presente"
                        icon={Gift}
                        color="#025412"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Lazer"
                        icon={Fun}
                        color="blue"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Saúde"
                        icon={Health}
                        color="red"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Educação"
                        icon={Education}
                        color="#ffd000"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Refeição"
                        icon={Meal}
                        color="#700000"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Hardware"
                        icon={Hardware}
                        color="#06c4d2"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Ferramentas"
                        icon={Tool}
                        color="#3c3c3c"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Salário"
                        icon={Work}
                        color="brown"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Category
                        title="Outro"
                        icon={Other}
                        color="gray"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"add"}
                    />
                    <Clean_Buttton
                        title="Limpar campos"
                        icon={Trash}
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
                            options={selectedUser}
                            setOptions={setSelectedUser}
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