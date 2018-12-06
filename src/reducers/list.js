const listReducerDefaultState = [];

export default (state = listReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    items: action.items
                }
            ]


        case 'REMOVE_LIST':
            return {
                id: action.id
            };
        case 'EDIT_LIST':
            return state.map((list) => {
                console.log(list);
                console.log(action);
                if (list.id === action.id) {
                    console.log('changing this list', action.title, action.items);
                    return {
                        id: action.id,
                        title: action.title,
                        items: action.items
                    }
                }
                else {
                    return list
                }
            })

        default:
            return state;
    }
};