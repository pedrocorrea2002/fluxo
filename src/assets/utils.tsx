//! ///// DATAS ///////////////////////////
export const monthList = {
    0:"Janeiro",1:"Feveiro",2:"Março",3:"Abril",4:"Maio",5:"Junho",6:"Julho",7:"Agosto",8:"Setembro",9:"Outubro",10:"Novembro",11:"Dezembro"}

//? CONVERTE Epoch PARA Date
export function dateFormat(date){
    const date2 = new Date(0)
    date2.setUTCMilliseconds(date)

    return date2
}

//? FORMATA A DATA PARA O FORMATO "Mês / ano"
export function dataFormat_toMonth(date){
    const date2 = dateFormat(date)
    const month = date2.getMonth()
    
    return `${monthList[month]} / ${date2.getFullYear()}`
}

//? HORAS
export function just_time(date = new Date){
    return `${leadingZeros(date.getHours(),2)}:${leadingZeros(date.getMinutes(),2)}:${leadingZeros(date.getSeconds(),2)}`
}

//? DATA
export function just_date(date = new Date){
    return `${leadingZeros(date.getDate(),2)}/${leadingZeros(date.getMonth(),2)}/${leadingZeros(date.getFullYear(),4)}`
}

//! ///// NÚMEROS ///////////////////////////
//? FORMATA DINHEIRO PARA O PADRÃO BRASILEIRO
export function moneyFormat(money) {
    return money.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'})
}

export function unundefined(num){
    if(num == undefined){
        return 0
    }else{
        return num
    }
}

export function leadingZeros(number, digits){
    while(number.toString().length < digits){
        number = `0${number}`
    }

    return number
}

//! ///// LISTAS ///////////////////////////
//? ELIMINA REPETIÇÕES EM UMA LISTA
export function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

export function sortAlfa(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
}