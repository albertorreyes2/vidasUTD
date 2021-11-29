import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Hook personalizado para hacer una petición GET
 * @param {string} url - Endpoint a donde se hará la petición (debe incluir body y primera diagonal), ej: /userInfo?id=1
 * @param {any[]} [dependencyArray=[]] - Al actualizarse una de estas variables; se volvera a llamar la petición.
 */
export const useGetRequest = (url, dependencyArray = []) => {

    const [state, setState] = useState({
        data: [],
        loading: true
    })

    useEffect(() => {
        setState({ ...state, loading: true });

        axios.get(`${url}`)
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

    }, [...dependencyArray]);

    return state;
}