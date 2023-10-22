import { BlurView } from '@react-native-community/blur'
import react, { useState } from 'react'
import { StyleSheet, Modal, View, TouchableOpacity, Text, Dimensions } from 'react-native'
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

type Props = {
    setModalVisible: Function;
    saidas: [];
    entradas: [];
}

export const FilterModal = (Props) => {
    const [category,setCategory] = useState([])
    const [userList, setUserList] = useState(
        [...Props.saidas,...Props.entradas].reduce((a,b = []) => {
            console.log("a:",a," - b:",b)

            if(!b.includes(a)){
                b.push(a)
            }
        })
    )

    console.log(userList)

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
            
            {/* //! O PRÓPRIO MODAL */}
            <View style={styles.modal_container}>
                <Text style={styles.filter_label}>Categorias:</Text>
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
                        title="Outro"
                        icon={Other}
                        color="gray"
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
                </View>
                {/* //! AQUI DEBAIXO FICA UM ESPAÇO, NÃO SEI PORQUE*/}

                <Text style={styles.filter_label}>Pessoas:</Text>
                <View style={styles.category_container}>
                    <OptionBlock
                        title={"a"}
                        color={"black"}
                    />
                </View>

                <Text style={styles.filter_label}>Período:</Text>
            </View>
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
    }
})