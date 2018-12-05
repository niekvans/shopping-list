import React from 'react';
import { connect } from 'react-redux';

export class NewListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.list ? props.list.title : ''
        }
    };

    changeTitle = (event) => {
        const title = event.target.value;
        this.setState(() => ({ title }));
    };

    onSubmit = (event) => {
        event.preventDefault();
        
    };


    render() {
        return (
            <div>
                <h1>Creating new List</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="String"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.changeTitle}
                    />
                    <button>Save</button>


                </form>
            </div>
        )
    }

}

// const connectStateToProps

export default connect()(NewListPage);