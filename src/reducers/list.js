export default (state = {}, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            return {
                id: action.id,
                title: action.title
            };
        case 'REMOVE_LIST':
            return {
                id: action.id
            };
        case 'EDIT_LIST':
            return {
                id: action.id,
                title: action.title
            }
        default:
            return state;
    }
};