export default function reducer(state, action) {
    switch (action.type) {

        case 'TRIGGER_ACTION':
            const KEY2 = `trigger${action.item}`;
            return {
                ...state,
                [KEY2]: !state[KEY2]
            }

        default:
            return state;
    }
}
