import React, {Component} from 'react';
import "./Newsletter.scss";
import icon from "./assets/Mail_Ico_.png";

class Newsletter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        if (!event.target.checkValidity()) {
            event.target.validate();
            event.preventDefault();
        } else {

            fetch('http://localhost:3000/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({"email": this.state.value})
            }).then(res => {
                    if (res.status === 201) {
                        this.setState({value: "SUCCESS"});
                    } else {
                        this.setState({value: "ERROR"});
                    }
                }
            );
            event.preventDefault();
        }
    }

    render() {
        return (
            < div className="Newsletter">
                <div className="Newsletter__text">
                    <h2 className="Newsletter__heading">NEWS LETTER</h2>
                    <p className="Newsletter__paragraph">join us now to get all news and special offers</p>
                </div>

                <form className="Newsletter__form"
                      onSubmit={this.handleSubmit}>
                    <picture>
                        <img src={icon} alt="icon of an envelope"/>
                    </picture>
                    <input name="email" type="email" className="Newsletter__input" value={this.state.value}
                           onChange={this.handleChange}
                           placeholder="type your email here"/>
                    <input type="submit" className="Newsletter__button" placeholder="type your email here"/>
                </form>
            </div>
        );
    }
}

export default Newsletter;