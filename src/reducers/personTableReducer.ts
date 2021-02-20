import { ADD_PERSON, FETCH_PERSON_DATA_FAIL, FETCH_PERSON_DATA_SUCCESS, REQUEST_PERSON_DATA } from '../constants/actionTypes'
import { PersonActionTypes, PersonState } from '../constants/interfaces';

export function personReducer(
    state: PersonState = {
        isFetching: false, // Статус выполнения запроса к серверу
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
        default: {
            return state;
        }
    }
}

