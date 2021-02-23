import { ADD_PERSON, FETCH_PERSON_DATA_FAIL, FETCH_PERSON_DATA_SUCCESS, REQUEST_PERSON_DATA, SORT_TABLE_START, SORT_TABLE_SUCCESS } from '../constants/actionTypes'
import { PersonActionTypes, PersonState } from '../constants/interfaces';

export function personReducer(
    state: PersonState = {
        isFetching: false, // Статус выполнения запроса к серверу
        isLoading: false,
        persons: []
    },
    action: PersonActionTypes): PersonState {

    switch (action.type) {        
        case ADD_PERSON: {
            return {
                ...state,
                persons: [action.payload, ...state.persons]
            }
        }
        case REQUEST_PERSON_DATA: {
            return {
                ...state,
                isFetching: true
            }
        }
        case FETCH_PERSON_DATA_SUCCESS: {
            return {
                isFetching: false,
                persons: action.payload
            }
        }
        case FETCH_PERSON_DATA_FAIL: {
            return state;
        }
        case SORT_TABLE_START: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case SORT_TABLE_SUCCESS: {
            return {
                ...state,
                isLoading: action.payload.isLoading,
                persons: action.payload.persons
            }
        }
        default: {
            return state;
        }
    }
}

