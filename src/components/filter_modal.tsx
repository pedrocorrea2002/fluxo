import { BlurView } from '@react-native-community/blur'
import react from 'react'
import { StyleSheet, Modal, View, TouchableOpacity, Text, Dimensions } from 'react-native'

type Props = {
    setModalVisible: Function;
}

export const FilterModal = (Props) => {
    return(
        <Modal transparent>
            <BlurView style={styles.blur_area} blurType='light'>
                <TouchableOpacity
                    style={styles.blur_block}
                    onPress={() => Props.setModalVisible(false)}
                >
                    <Text style={styles.title}>Fechar</Text>
                </TouchableOpacity>
            </BlurView>
            {/* 
                //! O PRÓPRIO MODAL
            */}
            <View style={styles.modal_container}>
                
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
    }
})