import React from 'react';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            error: ''
        }
    };

    changeText = (event) => {
        const text = event.target.value;
        this.setState({ text });
    };

    removeItem = () => {
        this.props.removeItem(this.props.id);
    };

    saveItem = () => {
        if (this.state.text !== this.props.text) {
            const succeeded = this.props.saveItem(this.props.text, this.state.text);
            if (!succeeded) {
                this.setState({
                    text: this.props.text,
                    error: 'Item already exists'
                });
            };
        };
    };

    render() {
        return (
            <div className="list-item">
                {this.state.error ? <p>{this.state.error}</p> : undefined}
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