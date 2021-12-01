import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

export const StateProvider = ({reducer, children}) => (
    <StateContext.Provider value={useReducer(reducer, {theme: 'dark'})}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
