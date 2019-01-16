import React from 'react';

// Components
import ListForm from './ListForm';

// Database ref
import database from '../firebase/firebase';

export class AddListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            id: ''
        }
    };

    componentWillMount() {
        const newRef = database.ref(`/${process.env.DATABASE_SECTION}`).push({
            items: [],
            title: ''
        });
        this.setState({
            id: newRef.key
        });
    }


    saveListAndPush = () => {
        this.props.history.push("/dashboard");
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
                    <ListForm saveListAndPush={this.saveListAndPush} listid={this.state.id} />
                </div>
            </div>
        );
    }
};

export default AddListPage;