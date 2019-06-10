import {createContext} from 'react';

export const StateContext = createContext({})

export const initialState = {
    menu: null
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'menu':
            return {
                ...state,
                menu: action.menu
            }
        default:
            return state;
    }

};