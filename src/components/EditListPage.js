import React from 'react';
import { connect } from 'react-redux';

// Components
import ListForm from './ListForm';

// Functions
import { startEditList } from './../actions/list';

export class EditListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    };

    saveList = (listData) => {
        if (listData.title == '') {
            this.setState({
                error: 'Please enter a title for your list'
            });
        }
        else {
            const update = {
                id: this.props.list.id,
                title: listData.title,
                items: listData.items
            }
            this.props.startEditList(update);
            this.props.history.push("/dashboard");
        }
    };

    render() {
        return (
            <div>
                <h1>Editing: {this.props.list.title}</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <ListForm saveList={this.saveList} />
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startEditList: (id, title, items) => dispatch(startEditList(id, title, items))
});

const mapStateToProps = (state, props) => {
    return {
        list: state.lists.find((list) => list.id === props.match.params.id)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditListPage);