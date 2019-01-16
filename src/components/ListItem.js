import React from 'react';

// Database ref
import database from '../firebase/firebase';



export default class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            error: ''
        }
    };

    componentWillMount() {
        const ref = database.ref(`/${process.env.DATABASE_SECTION}/${this.props.listid}/items/${this.props.id}`);
        ref.on('value', (snapshot) => {
            this.setState({
                text: snapshot.val()
            })
        });
    };

    componentWillUnmount() {
        const ref = database.ref(`/${process.env.DATABASE_SECTION}/${this.props.listid}/items/${this.props.id}`);
        ref.off();
    }

    changeText = (event) => {
        const text = event.target.value;
        this.setState({ text });
    };

    removeItem = () => {
        const ref = database.ref(`/${process.env.DATABASE_SECTION}/${this.props.listid}/items/${this.props.id}`);
        ref.remove();
    };

    saveItem = () => {
        const ref = database.ref(`/${process.env.DATABASE_SECTION}/${this.props.listid}/items/${this.props.id}`);
        ref.set(this.state.text);
    };

    render() {
        return (
            <div className={this.state.error ? "list-item__error" : "list-item"}>
                <input
                    type="String"
                    value={this.state.text}
                    onChange={this.changeText}
                    onBlur={this.saveItem}
                    className="text-input"
                />
                <input type="button" onClick={this.removeItem} className="button-image" type="image" src="/images/delete_button.png" />
            </div>
        )
    }
};