//! ///// DATAS ///////////////////////////
export const monthList = {
    0: "Janeiro", 1: "Fevereiro", 2: "Março", 3: "Abril", 4: "Maio", 5: "Junho", 6: "Julho", 7: "Agosto", 8: "Setembro", 9: "Outubro", 10: "Novembro", 11: "Dezembro"
}

//? CONVERTE Epoch PARA Date
export function dateFormat(date) {
    const date2 = new Date(0)
    date2.setMilliseconds(date)

    return date2
}

//? FORMATA A DATA PARA O FORMATO "Mês / ano"
export function dataFormat_toMonth(date) {
    const date2 = dateFormat(date)
    const month = date2.getMonth()

    return `${monthList[month]} / ${date2.getFullYear()}`
}

//? HORAS
export function just_time(date = new Date) {
    return `${leadingZeros(date.getHours(), 2)}:${leadingZeros(date.getMinutes(), 2)}:${leadingZeros(date.getSeconds(), 2)}`
}

//? DATA
export function just_date(date = new Date) {
    return `${leadingZeros(date.getDate(), 2)}/${leadingZeros(date.getMonth() + 1, 2)}/${leadingZeros(date.getFullYear(), 4)}`
}

//! ///// NÚMEROS ///////////////////////////
//? FORMATA DINHEIRO PARA O PADRÃO BRASILEIRO
export function moneyFormat(money) {
    return money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function unundefined(num) {
    if (num == undefined) {
        return 0
    } else {
        return num
    }
}

export function leadingZeros(number, digits) {
    while (number.toString().length < digits) {
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

//? FAZ A ORDENAÇÃO DA TELA DE EXTRATO PELA ORDEM DE PRIOEIRDADE >> ano,mes,critério, nome (if critério == data)
export function sortMonth_other(a, b, criteria, direction) {
    //^ PRIORIDADE: ano, mes, criteria, nome (se data)

    criteria = {"Data":"date","Nome":"name"}[criteria] //? trocando o que vem no filtro pelo nome do campo
    let date_a = dateFormat(a.date)
    let date_b = dateFormat(b.date)
    let year_a = date_a.getFullYear()
    let year_b = date_b.getFullYear()
    let month_a = date_a.getMonth()
    let month_b = date_b.getMonth()

    //! NÃO ESTOU ENTRANDO AQUI QUANDO O FILTRO É EXCLUÍDO   
    //* ordenação por ano
    if (year_a > year_b) {
        return direction == "Crescente" ? 1 : -1
    } else if (year_a < year_b) {
        return direction == "Crescente" ? -1 : 1
    } else {
        //* ordenação por mês
        if (month_a > month_b) {
            return direction == "Crescente" ? 1 : -1
        } else if (month_a < month_b) {
            return direction == "Crescente" ? -1 : 1
        } else {
            //* ordenação pelo critério
            if (a[criteria] > b[criteria]) {
                return direction == "Crescente" ? 1 : -1
            }else if (a[criteria] < b[criteria]) {
                return direction == "Crescente" ? 1 : 1
            }else if(criteria == "date"){
                 //* se o critério for a data e o dia for exatamente o mesmo, é ordenado pelo nome em ordem crescente
                if (a.name > b.name) {
                    return 1
                }else if (a.name < b.name) {
                    return -1
                }
            }else{
                return 0;
            }
        }
    }
}

export function sortMonth_category(a, b, direction) {
    //^ PRIORIDADE: ano, mes, criteria, nome (se data)
    let date_a = dateFormat(a.date)
    let date_b = dateFormat(b.date)
    let year_a = date_a.getFullYear()
    let year_b = date_b.getFullYear()
    let month_a = date_a.getMonth()
    let month_b = date_b.getMonth()

    //! NÃO ESTOU ENTRANDO AQUI QUANDO O FILTRO É EXCLUÍDO   
    //* ordenação por ano
    if (year_a > year_b) {
        return direction == "Crescente" ? 1 : -1
    } else if (year_a < year_b) {
        return direction == "Crescente" ? -1 : 1
    } else {
        //* ordenação por mês
        if (month_a > month_b) {
            return direction == "Crescente" ? 1 : -1
        } else if (month_a < month_b) {
            return direction == "Crescente" ? -1 : 1
        } else {
            //* ordenação pelo critério
            if (a.type > b.type) {
                return 1
            }else if (a.type < b.type) {
                return -1
            }else{
                if (a.category > b.category) {
                    1
                }else if (a.category < b.category) {
                    -1
                }else{
                    return 0
                }
            }
        }
    }
}
//TODO: Não está ordenando por ano

export function sortTotal_Category(a,b){
    if (a.type > b.type) {
        return 1
    }else if (a.type < b.type) {
        return -1
    }else{
        if (a.category > b.category) {
            return 1
        }else if (a.category < b.category) {
            return -1
        }else{
            return 0
        }
    }
}
