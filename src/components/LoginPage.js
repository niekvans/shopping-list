import React from 'react';
import { firebase } from '../firebase/firebase';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    };

    changeEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
    };

    changePassword = (event) => {
        const password = event.target.value;
        this.setState({ password });
    };

    startLogin = (event) => {
        event.preventDefault();
        return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((result) => {
                this.setState({ error: '' });
            })
            .catch((error) => {
                this.setState({ error: error.message, password: '' });
            });
    };

    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Shopping List</h1>
                    <p>Welcome to the shopping list!</p>
                    <form onSubmit={this.startLogin}>
                        <input
                            type="String"
                            name="email"
                            value={this.state.email}
                            onChange={this.changeEmail}
                        />
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.changePassword}
                        />
                        {this.state.error ? <p>{this.state.error}</p> : undefined}
                        <button className="button">Login</button>
                    </form>
                </div>
            </div>
        );
    }
};