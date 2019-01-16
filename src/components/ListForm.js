import React from 'react';
import ListItem from './ListItem';

// Database ref
import database from '../firebase/firebase';

export default class ListForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            items: [],
            currentItem: '',
            addingItemError: '',
            savingError: ''
        }
    };

    componentWillMount() {
        if (this.props.listid) {
            database.ref(`/${process.env.DATABASE_SECTION}/${this.props.listid}`).on('value', (snapshot) => {
                let items = {};
                let newList = [];
                if (snapshot.val()) {
                    items = snapshot.val().items;
                    for (let item in items) {
                        newList.push({
                            key: item,
                            text: items[item]
                        });
                    }
                    this.setState({
                        items: newList,
                        title: snapshot.val().title
                    });
                }
            });
        }
    };

    componentWillUnmount() {
        if (this.props.listid) {
            database.ref(`/${process.env.DATABASE_SECTION}/${this.props.listid}`).off();
        }
    };


    changeTitle = (event) => {
        const title = event.target.value;
        this.setState(() => ({ title }));
    };

    saveTitle = () => {
        if (this.state.title !== '') {
            database.ref(`/${process.env.DATABASE_SECTION}/${this.props.listid}`).update({
                title: this.state.title
            });
        }
        else {

        }
    }

    addItem = (event) => {
        event.preventDefault();
        const newItem = this.state.currentItem;
        if (newItem !== '' && this.state.items.indexOf(newItem) == -1) {
            database.ref(`/${process.env.DATABASE_SECTION}/${this.props.listid}/items`).push(newItem);
            this.setState({
                currentItem: ''
            });
        }
        else if (this.state.items.indexOf(newItem) !== -1) {
            this.setState({
                addingItemError: 'Item already in list'
            });
        }
    };

    changeCurrentItem = (event) => {
        const currentItem = event.target.value;
        this.setState({ currentItem });
    };

    saveListAndPush = (event) => {
        event.preventDefault();
        this.props.saveListAndPush();
    };

    render() {
        return (
            <div className="form">
                <form
                    onSubmit={() => event.preventDefault()}
                >
                    <input
                        type="submit"
                        onSubmit={() => event.preventDefault()}
                        className="hidden"
                    />
                    <input
                        type="String"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.changeTitle}
                        className="text-input title"
                        onBlur={this.saveTitle}
                    />
                    {this.state.items.map((item) => <ListItem text={item.text} key={item.key} id={item.key} listid={this.props.listid} />)}
                </form>
                <form onSubmit={this.addItem}>
                    {this.state.addingItemError ? <p>{this.state.addingItemError}</p> : undefined}
                    <input
                        type="String"
                        placeholder="Add item to the list"
                        value={this.state.currentItem}
                        onChange={this.changeCurrentItem}
                        className="text-input"
                    />
                </form>
                <div>
                    <button className="button" onClick={this.saveListAndPush}>Save List</button>
                </div>
            </div>
        )
    };
};