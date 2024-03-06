import React, { createContext, useReducer } from 'react';

const initialState = {
 token: null,
 userid: null,
 username: null

};

function authReducer(state, action) {
 switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        userid: action.payload.userid,
        username: action.payload.username,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        userid: null,
        username: null,
      };
    default:
      return state;
 }
}

export const AuthContext = createContext();

export function AuthProvider({ children }) {
 const [authState, dispatch] = useReducer(authReducer, initialState);

 // Función para iniciar sesión y actualizar el estado
 const login = async (data) => {
    dispatch({ type: 'LOGIN', payload: data });
 };

 // Función para cerrar sesión y limpiar el estado
 const logout = () => {
    dispatch({ type: 'LOGOUT' });
 };

 return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
 );
}
