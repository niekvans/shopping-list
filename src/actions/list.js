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
                console.log(id);
                dispatch(editList({ id, title, items }));
            });
    }
}
