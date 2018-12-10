import React from 'react';
import { connect } from 'react-redux';

// Components
import ListForm from './ListForm';

// Functions
import { startAddList } from './../actions/list';

export class AddListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    };

    addList = (listData) => {
        if (listData.title == '') {
            this.setState({
                error: 'Please enter a title for your list'
            });
        }
        else {
            this.props.startAddList(listData);
            this.props.history.push("/dashboard");
        }
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Creating a new List</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.state.error ? <p className="form__error">{this.state.error}</p> : undefined}
                    <ListForm saveList={this.addList} />
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startAddList: (title, items) => dispatch(startAddList(title, items))
});


export default connect(undefined, mapDispatchToProps)(AddListPage);