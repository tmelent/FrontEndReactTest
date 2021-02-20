import { Dispatch } from 'react'
import { ADD_PERSON } from '../constants/actionTypes'
import { PersonInfo, PersonActionTypes, RequestPersonData } from '../constants/interfaces'


// Action Creator для добавления нового пользователя
export default function addPerson(person: PersonInfo): PersonActionTypes {
    return {
        type: ADD_PERSON,
        payload: person
    }
}

export function fetchPersonDataSuccess(persons: PersonInfo[]): PersonActionTypes {
    return {
        type: 'FETCH_PERSON_DATA_SUCCESS',
        payload: persons
    }
}

export function fetchPersonDataFail(errorMsg: string): PersonActionTypes {
    return {
        type: 'FETCH_PERSON_DATA_FAIL',
        payload: errorMsg
    }
}

export function requestPersonData(): PersonActionTypes {
    return {
        type: 'REQUEST_PERSON_DATA'        
    }
}


// Асинхронный запрос данных для построения таблицы 
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

