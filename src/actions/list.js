import database from './../firebase/firebase';

export const addList = ({ id, title, items }) => {
    return {
        type: 'ADD_LIST',
        id,
        title,
        items
    };
};

const databaseSection = process.env.DATABASE_SECTION;

export const setLists = (lists) => ({
    type: 'SET_LISTS',
    lists
});

export const startSetLists = () => {
    return (dispatch) => {
        return database.ref(`/${databaseSection}`).once('value')
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

export const startRemoveList = (id) => {
    return database.ref(`/${databaseSection}/${id}`).remove()
        .then(() => {
        })
};