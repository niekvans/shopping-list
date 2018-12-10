import React from 'react';
import ListItem from './ListItem';

export default class ListForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.list && props.list.title ? props.list.title : '',
            items: props.list && props.list.items ? props.list.items : [],
            currentItem: '',
            addingItemError: '',
            savingError: ''
        }
    };

    changeTitle = (event) => {
        const title = event.target.value;
        this.setState(() => ({ title }));
    };

    onSubmit = (event) => {
        event.preventDefault();
    };

    addItem = (event) => {
        event.preventDefault();
        const newItem = this.state.currentItem;
        if (newItem !== '' && this.state.items.indexOf(newItem) == -1) {
            this.setState(prevState => ({
                items: [...prevState.items, newItem],
                addingItemError: ''
            }));
            this.state.currentItem = '';
        }
        else if (this.state.items.indexOf(newItem) !== -1) {
            this.setState({
                addingItemError: 'Item already exists'
            });
        }
    };

    changeCurrentItem = (event) => {
        const currentItem = event.target.value;
        this.setState({ currentItem });
    };

    saveItem = (oldItem, newItem) => {
        if (this.state.items.indexOf(newItem) == -1) {
            this.setState(prevState => ({
                items: prevState.items.map((item) => item == oldItem ? newItem : item)
            }));
            return true
        };
        return false
    };

    removeItem = (item) => {
        this.setState(prevState => ({
            items: prevState.items.filter((listItem) => listItem !== item)
        }))
    };

    saveList = (event) => {
        event.preventDefault();
        const listData = { title: this.state.title, items: this.state.items };
        this.props.saveList(listData);
    }

    render() {
        return (   
                <form className="form">
                    <input
                        type="String"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.changeTitle}
                        className="text-input title"
                    />
                    {this.state.items.map((item) => <ListItem text={item} key={item} saveItem={this.saveItem} removeItem={this.removeItem} id={item} />)}
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
                        <button className="button" onClick={this.saveList}>Save List</button>
                    </div>
                </form>
        )
    };
};