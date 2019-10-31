import React, {Component} from 'react';
import "./Form.scss"
import icon from "./assets/Mail_Ico_.png"

class Form extends Component {
    render() {
        return (
            <form className="From" method={this.props.method} action={this.props.url} >
                <picture>
                    <img src={icon} alt="icon of an envelope"/>
                </picture>
                <input type="email" name="email" className="From__input" placeholder="type your email here" />
                <input type="submit" className="From__button" placeholder="type your email here" />
            </form>
        );
    }
}

export default Form;