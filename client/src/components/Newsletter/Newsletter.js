import React, {Component} from 'react';
import "./Newsletter.scss";
import Form from "../Form/Form"
import icon from "./assets/Mail_Ico_.png";

class Newsletter extends Component {
    render() {
        return (
            < div className="Newsletter">
                <div className="Newsletter__text">
                    <h2 className="Newsletter__heading">NEWS LETTER</h2>
                    <p className="Newsletter__paragraph">join us now to get all news and special offers</p>
                </div>

                    <form className="Newsletter__form" method="POST" action={this.props.url}>
                        <picture>
                            <img src={icon} alt="icon of an envelope"/>
                        </picture>
                        <input type="email" name="email" className="Newsletter__input"
                               placeholder="type your email here"/>
                        <input type="submit" className="Newsletter__button" placeholder="type your email here"/>
                    </form>

            </div>
        );
    }
}

export default Newsletter;