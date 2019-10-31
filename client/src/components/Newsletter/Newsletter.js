import React, {Component} from 'react';
import "./Newsletter.scss";
import Form from "../Form/Form"

class Newsletter extends Component {
    render() {
        return (
            < div className="Newsletter">
                <div className="Newsletter__text">
                    <h2 className="Newsletter__heading">NEWS LETTER</h2>
                    <p className="Newsletter__paragraph">join us now to get all news and special offers</p>
                </div>

                <div className="Newsletter__form">
                    <Form/>
                </div>

            </div>
        )
            ;
    }
}

export default Newsletter;