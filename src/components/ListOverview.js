import React from 'react';
import ListLink from './ListLink';

// Database ref
import database from '../firebase/firebase';

export class ListOverview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lists: []
        }
    };

    componentWillMount() {
        database.ref(`/${process.env.DATABASE_SECTION}`).on('value', (snapshot) => {
            let dbLists = snapshot.val();
            let lists = [];
            for (let item in snapshot.val()) {
                lists.push({
                    title: dbLists[item].title,
                    id: item
                })
            };
            this.setState({
                lists
            });
        });
    };

    componentWillUnmount() {
        database.ref(`/${process.env.DATABASE_SECTION}`).off();
    };

    render() {
        return (

            <div className="content-container">
                <div className="lists-header">
                    <div className="show-for-mobile">Listnames</div>
                    <div className="show-for-desktop">Listname</div>
                    <div className="show-for-desktop">Created at</div>
                </div>
                <div className="lists-body">
                    {this.state.lists.length === 0 ?
                        <div className="lists-item lists-item--message">
                            <span>No lists yet</span>
                        </div>
                        :
                        (
                            this.state.lists.map((list) => <ListLink key={list.id} {...list} />)
                        )
                    }
                </div>
            </div>
        )
    }
}

export default ListOverview;