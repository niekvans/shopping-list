import React from 'react';
import { connect } from 'react-redux';

// Components
import ListForm from './ListForm';

// Functions
import { startEditList, startRemoveList } from './../actions/list';

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

    removeList = (event) => {
        event.preventDefault();
        this.props.startRemoveList(this.props.list.id);
        this.props.history.push("/dashboard");
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Editing: {this.props.list.title}</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.state.error ? <p className="form__error">{this.state.error}</p> : undefined}
                    <ListForm saveList={this.saveList} list={this.props.list} />
                    <button className="button button--secondary" onClick={this.removeList}>Remove List</button>
                </div>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startEditList: (id, title, items) => dispatch(startEditList(id, title, items)),
    startRemoveList: (id) => dispatch(startRemoveList(id))
});

const mapStateToProps = (state, props) => {
    return {
        list: state.lists.find((list) => list.id === props.match.params.id)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditListPage);