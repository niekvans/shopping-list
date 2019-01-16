import React from 'react';

// Components
import ListForm from './ListForm';

// Functions
import { startRemoveList } from './../actions/list';

export class EditListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    };

    saveListAndPush = () => {
        this.props.history.push("/dashboard");
    }

    removeList = (event) => {
        event.preventDefault();
        startRemoveList(this.props.match.params.id);
        this.props.history.push("/dashboard");
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Editing: {this.props.list && this.props.list.title ? this.props.list.title : 'No Title'}</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.state.error ? <p className="form__error">{this.state.error}</p> : undefined}
                    <ListForm saveListAndPush={this.saveListAndPush} listid={this.props.match.params.id} />
                    <button className="button button--secondary" onClick={this.removeList}>Remove List</button>
                </div>

            </div>
        );
    };
};

export default EditListPage;