import { Dispatch } from 'react'
import { ADD_PERSON } from '../constants/actionTypes'
import { PersonInfo, PersonActionTypes } from '../constants/interfaces'


/** Добавляет нового пользователя в хранилище. */
export function addPerson(person: PersonInfo): PersonActionTypes {
    return {
        type: ADD_PERSON,
        payload: person
    }
}

/* Этапы запроса к серверу */

/** Уведомление об успешном завершении запроса. Обновляет данные в store. */
export function fetchPersonDataSuccess(persons: PersonInfo[]): PersonActionTypes {
    return {
        type: 'FETCH_PERSON_DATA_SUCCESS',
        payload: persons
    }
}

/** Уведомление об ошибке при запросе. */
export function fetchPersonDataFail(errorMsg: string): PersonActionTypes {
    return {
        type: 'FETCH_PERSON_DATA_FAIL',
        payload: errorMsg
    }
}

/** Уведомление о том, что запрос начат и еще не завершён. */
export function requestPersonData(): PersonActionTypes {
    return {
        type: 'REQUEST_PERSON_DATA'
    }
}

/** Запрос данных для построения таблицы 
 * @param urlN (1) малый набор данных, (2) большой набор данных
*/
export function fetchPersonData(urlN: number) {
    return (dispatch: Dispatch<PersonActionTypes>): void => {
        dispatch(requestPersonData())
        let url = ''

        // urlN указывает на выбранный набор данных:
        // 1 - малый 
        // 2 - большой

        switch (urlN) {
            case 1: {
                url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
                break;
            }
            case 2: {
                url = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
                break;
            }
        }

        fetch(url)
            .then(response => response.json(),
                error => dispatch(fetchPersonDataFail(error)))
            .then(persons => dispatch(fetchPersonDataSuccess(persons)))
    }
}

/** Уведомление о том, что процесс сортировки завершился успешно. Обновляет данные в store. */
export function sortTableSuccess(persons: PersonInfo[]): PersonActionTypes {
    return {
        type: 'SORT_TABLE_SUCCESS',
        payload: { isLoading: false, persons: persons }
    }
}

/** Уведомление о том, что процесс сортировки еще не завершён. */
export function sortTableStart(): PersonActionTypes {
    return {
        type: 'SORT_TABLE_START',
        payload: true
    }
}

/** Сортировка таблицы. 
 * @param option название столбца.
 * @param tableInfo исходные табличные данные.
*/
export function sortTable(option: string, order: boolean, tableInfo: PersonInfo[]) {
    return (dispatch: Dispatch<PersonActionTypes>): void => {
        dispatch(sortTableStart())
        if (order === false) {
            tableInfo.reverse()
        }
        else {
            switch (option) {
                case 'id': {
                    tableInfo.sort((a, b) => (a.id > b.id) ? 1 : ((a.id < b.id) ? -1 : 0))
                    break
                }
                case 'firstName': {
                    tableInfo.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((a.firstName < b.firstName) ? -1 : 0))
                    break
                }
                case 'lastName': {
                    tableInfo.sort((a, b) => (a.lastName > b.lastName) ? 1 : ((a.lastName < b.lastName) ? -1 : 0))
                    break
                }
                case 'email': {
                    tableInfo.sort((a, b) => (a.email > b.email) ? 1 : ((a.email < b.email) ? -1 : 0))
                    break
                }
                case 'phone': {
                    tableInfo.sort((a, b) => (a.phone > b.phone) ? 1 : ((a.phone < b.phone) ? -1 : 0))
                    break
                }
            }
        }
        dispatch(sortTableSuccess(tableInfo))
    }
}

