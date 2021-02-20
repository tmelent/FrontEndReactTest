import { fetchPersonData } from "../actions/personTableActions";
import { ADD_PERSON, FETCH_PERSON_DATA_FAIL, FETCH_PERSON_DATA_SUCCESS, REQUEST_PERSON_DATA } from "./actionTypes";

// Общее состояние приложения. 
export interface State {
    personState: PersonState
}

// Состояние данных таблицы.
export interface PersonState {
    isFetching: boolean,
    persons: PersonInfo[]
}

// Описание данных, полученных с сервера
export interface PersonInfo {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: Address
}

export interface Address {
    streetAddress: string,
    city: string,
    state: string,
    zip: string
}

// Добавление новой строки в начало таблицы
export interface AddPersonAction {
    type: typeof ADD_PERSON,
    payload: PersonInfo
}

// Запущен процесс получения данных с сервера
export interface RequestPersonData {
    type: typeof REQUEST_PERSON_DATA    
    
}

// Данные с сервера успешно получены
export interface FetchPersonDataSuccess {
    type: typeof FETCH_PERSON_DATA_SUCCESS,
    payload: PersonInfo[]
}

// Произошла ошибка при получении данных с сервера
export interface FetchPersonDataFail {
    type: typeof FETCH_PERSON_DATA_FAIL,
    payload: string
}


// Общий тип для операций с данными таблицы
export type PersonActionTypes = AddPersonAction | FetchPersonDataSuccess | RequestPersonData | FetchPersonDataFail 