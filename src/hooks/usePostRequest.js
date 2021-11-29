import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Hook personalizado para hacer una petición POST
 * @param {string} url - Endpoint a donde se hará la petición (debe incluir primera diagonal), ej: /users
 * @param {Object} params - Objeto de parámetros (clave-valor) para enviarse, ej: {user: 'Ricardo'}
 * @param {any[]} [dependencyArray=[]] - Al actualizarse una de estas variables; se volvera a llamar la petición.
 * @param {boolean} [visible] - Si es falso no se llama la petición, útil en componentes que inician ocultos como un Modal o Drawer.
 */
export const usePostRequest = (url, params = {}, dependencyArray = [], visible = true) => {

    

    const [state, setState] = useState({
        data: [],
        loading: true
    })

    useEffect(() => {

        if (!visible) {
            return;
        }
        setState({ ...state, loading: true });


        axios.post(`${url}`, params)
            .then((res) => {
                if (res.data.ok) {
                    setState({ loading: false, data: res.data.result });
                } else {
                    setState({ ...state, loading: false });
                }
            })
            .catch((err) => {
                setState({ ...state, loading: false });
            })

    }, [...Object.values(params), ...dependencyArray, visible]);

    return state;
}