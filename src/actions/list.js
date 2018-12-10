import database from './../firebase/firebase';

export const addList = ({ id, title, items }) => {
    return {
        type: 'ADD_LIST',
        id,
        title,
        items
    };
};

export const startAddList = (listData) => {
    return (dispatch) => {
        return database.ref('/lists').push({ title: listData.title, items: listData.items })
            .then((ref) => {
                dispatch(addList({
                    id: ref.key,
                    title: listData.title,
                    items: listData.items
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }
};

export const editList = ({ id, title, items }) => ({
    type: 'EDIT_LIST',
    id,
    title,
    items
});

export const startEditList = ({ id, title, items }) => {
    return (dispatch) => {
        return database.ref(`/lists/${id}`).update({ title, items })
            .then(() => {
                dispatch(editList({ id, title, items }));
            });
    }
};

export const setLists = (lists) => ({
    type: 'SET_LISTS',
    lists
});

export const startSetLists = () => {
    return (dispatch) => {
        return database.ref('lists').once('value')
            .then((snapshot) => {
                const lists = [];
                snapshot.forEach((childSnapshot) => {
                    lists.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setLists(lists));
            });
    };
};

export const removeList = (id) => ({
    type: 'REMOVE_LIST',
    id
});

export const startRemoveList = (id) => {
    return (dispatch) => {
        return database.ref(`lists/${id}`).remove()
            .then(() => {
                dispatch(removeList(id));
            })
    };
};