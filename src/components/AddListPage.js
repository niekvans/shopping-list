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
        console.log(listData);
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
                <h1>Creating a new List</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <ListForm saveList={this.addList} />
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startAddList: (title, items) => dispatch(startAddList(title, items))
});


export default connect(undefined, mapDispatchToProps)(AddListPage);