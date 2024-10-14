import React, { Dispatch, SetStateAction, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableOpacity
} from 'react-native'
import database from '@react-native-firebase/database'
import {Menu, MenuTrigger, MenuOptions, MenuOption} from 'react-native-popup-menu'
import {dateFormat, leadingZeros, moneyFormat} from '../assets/utils'

import { ArrowDown } from "../assets/Icons/svg_arrow_down"
import { ArrowUp } from "../assets/Icons/svg_arrow_up"
import { Work } from "../assets/Icons/categories/svg_work"
import { Other } from "../assets/Icons/categories/svg_other"
import { Market } from "../assets/Icons/categories/svg_market"
import { Bill } from "../assets/Icons/categories/svg_bill"
import { Snack } from "../assets/Icons/categories/svg_snack"
import { Wheel } from "../assets/Icons/categories/svg_wheel"
import { Pet } from "../assets/Icons/categories/svg_pet"
import { Gift } from "../assets/Icons/categories/svg_gift"
import { Fun } from "../assets/Icons/categories/svg_fun"
import { Health } from "../assets/Icons/categories/svg_health"
import { Education } from "../assets/Icons/categories/svg_education"
import { Meal } from "../assets/Icons/categories/svg_meal"
import { Hardware } from "../assets/Icons/categories/svg_hardware"

type Props = {
    itemId: String,
    name: String,
    value: Number,
    date: Number,
    type: "Entrada" | "Saída",
    category: String,
    user: String,
    gettingEntradasSaida: Dispatch<SetStateAction<null>>
}

export const Extract_item = (Props) => {
    const [confirmationPopUp, setConfirmationPopUp] = useState(false)
    const [thisSize, setThisSize] = useState(0);

    function showConfirmationPopUp(){
        setConfirmationPopUp(true)
    }

    function deletarItem(){
        let defaultPath = Props.type == 'entrada' ? '/entradas/' : '/saidas/'

        //! MODAL DE CONFIRMAÇÃO
        database().ref(defaultPath).child(Props.itemId).remove()

        //! RECARREGAR LISTA
        Props.waitForDelection(Props.itemId)
    }

    const categoryColor_Icon = {
        "Salário" : {
            color: "brown",
            icon() {return(<Work height={35} width={35} color="white"/>)}
        },
        "Mercado" : {
            color: "violet",
            icon() {return(<Market height={35} width={35} color="white"/>)}
        },
        "Conta" : {
            color: "black",
            icon() {return(<Bill height={35} width={35} color="white"/>)}
        },
        "Lanche" : {
            color: "#ff6200",
            icon() {return(<Snack height={35} width={35} color="white"/>)}
        },
        "Carro e ônibus" : {
            color: "#50bd02",
            icon() {return(<Wheel height={35} width={35} color="white"/>)}
        },
        "Animal" : {
            color: "purple",
            icon() {return(<Pet height={35} width={35} color="white"/>)}
        },
        "Presente" : {
            color: "#025412",
            icon() {return(<Gift height={35} width={35} color="white"/>)}
        },
        "Lazer" : {
            color: "blue",
            icon() {return(<Fun height={35} width={35} color="white"/>)}
        },
        "Saúde" : {
            color: "red",
            icon() {return(<Health height={35} width={35} color="white"/>)}
        },
        "Educação" : {
            color: "#ffd000",
            icon() {return(<Education height={35} width={35} color="white"/>)}
        },
        "Refeição" : {
            color:"#700000",
            icon() {return(<Meal height={35} width={35} color="white"/>)}
        },
        "Hardware" : {
            color:"#06c4d2",
            icon() {return(<Hardware height={35} width={35} color="white"/>)}
        },
        "Ferramentas" : {
            color:"#3c3c3c",
            icon() {return(<Meal height={35} width={35} color="white"/>)}
        },
        "Outro" : {
            color: "gray",
            icon() {return(<Other height={35} width={35} color="white"/>)}
        },
        "entrada" : {
            color:"#32DB50",
            icon() {return(<ArrowDown height={35} width={35} color="white"/>)}
        },
        "saida" : {
            color:"#cc0000",
            icon() {return(<ArrowUp height={35} width={35} color="white"/>)}
        }
    }

    //TROCAR POR STYLED COMPONENT
    const styles = StyleSheet.create({
        container:{
            minWidth:'90%',
            maxWidth: '90%',
            marginBottom: 5,

            borderColor: categoryColor_Icon[Props.category].color,
            borderWidth: 5.5,
            borderRadius: 20,

            flexDirection: 'row'
        },
        iconContainer:{
            width: "20%",
            aspectRatio: "1/1",
            backgroundColor: categoryColor_Icon[Props.category].color,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 5,

            justifyContent: 'center',
            alignItems: 'center'
        },
        infoContainer:{
            width: (Dimensions.get("screen").width * 0.9) - 133,
            paddingLeft: 5
        },
        name:{
            fontSize: 20,
            fontWeight: 'bold'
        },
        value:{
            fontSize: 25,
            fontWeight: 'bold'
        },
        bottomBand:{
        //   width: "100%",

          flexDirection:'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        date:{
            display: Props.date ? "flex" : "none",
            fontSize: 15
        },
        user:{
            display: Props.user ? "flex" : "none"
        },

        // OPÇÕES DE AÇÃO POR ITEM
        optionsButtonText: {
            fontSize: 30
        },

        // MODO DE CONFIRMAÇÃO DE EXCLUSÃO
        confirmationPopUpContainer:{
            backgroundColor:categoryColor_Icon[Props.category].color,
            height:thisSize,
            flexDirection: "column"
        },
        confirmationPopUpPiece1:{
            width:"auto",
            height: "50%"
        },
        confirmationPopUpText:{
            fontSize:20,
            color: "white",
            fontWeight: "bold"
        },
        confirmationPopUpPiece2:{
            height:"50%",
            flexDirection:"row",
            justifyContent:"space-evenly"
        },
        confirmationPopUpBottom:{
            width: "40%"
        },
        confirmationPopUpBottomText:{
            textAlign:"center",
            fontSize:25,
            fontWeight:"bold",
            color: "white"
        }
    })

    return (
        <>  
            {!confirmationPopUp ? 
                <View style={styles.container} onLayout={(a) => setThisSize(a.nativeEvent.layout.height)}>
                    <View style={styles.iconContainer}>
                        {categoryColor_Icon[Props.category ? Props.category : Props.type].icon()}
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{Props.name}</Text>
                        <Text style={styles.value}>{moneyFormat(Props.value)}</Text>
                        <View style={styles.bottomBand}>
                            <Text style={styles.date}>{Props.date ? leadingZeros(dateFormat(Props.date).getHours(),2)+":"+leadingZeros(dateFormat(Props.date).getMinutes(),2) : ""}</Text>
                            <Text style={styles.user}>{Props.user}</Text>
                        </View>
                    </View>
                    <View style={[styles.iconContainer, {backgroundColor:"transparent", width:50, alignSelf:"center", position:"absolute", right:0}]}>
                        {Props.category && (
                            Props.type == "entrada" ? 
                                <ArrowDown height={50} width={50} color="green"/>
                            : <ArrowUp height={50} width={50} color="red"/>
                        )}
                        <Menu>
                            <MenuTrigger>
                                <Text style={styles.optionsButtonText}>㊂</Text>
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption>
                                    <Text>Editar</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => showConfirmationPopUp()}>
                                    <Text>Deletar</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                </View>
            :
                <View style={[styles.container, styles.confirmationPopUpContainer]}>
                    <View style={styles.confirmationPopUpPiece1}>
                        <Text style={styles.confirmationPopUpText}> Deseja mesmo excluir?</Text>
                    </View>
                    <View style={styles.confirmationPopUpPiece2}>
                        <TouchableOpacity style={styles.confirmationPopUpBottom} onPress={() => deletarItem()}>
                            <Text style={[styles.confirmationPopUpBottomText]}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmationPopUpBottom} onPress={() => setConfirmationPopUp(false)}>
                            <Text style={[styles.confirmationPopUpBottomText]}>Não</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
    )
}