import React , { Component } from 'react';
import { Input, Card, Form, Grid, Image } from 'semantic-ui-react'
import URL from '../environment';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            email: '',
            query: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        fetch(URL.apiurl+'/contactus.php', {
            method: 'POST',  
            body: JSON.stringify({ subject: this.state.subject,
                                    email: this.state.email,
                                    query: this.state.query
            })
        },
        ).then(response => {
            if (response.ok) {
                console.log(response);
            }
        });
    }

    render(){
        return(
            <div id='contactUsdiv'>
            <div class='centerData'>
                <h2 class='heading'> Contact Us </h2>
                <h3> Contact us for any queries</h3><br/>
            </div>
            <Card id="ContactCard">
                <Card.Content header='Contact Form' id="contactFormHeader" />
                <Card.Content>
                    <Form onSubmit={(event) => { this.handleSubmit(event); }}>
                        <Form.Field>
                            <Form.Input label="Subject" name="subject" value={this.state.subject}
                                onChange={(e) => this.setState({ subject: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input label="Email" name="email" value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea label="Query" name="query" value={this.state.query}
                                onChange={(e) => this.setState({ query: e.target.value })} />
                        </Form.Field>
                        <Form.Button content='Submit' class="button" />
                    </Form>
                </Card.Content>
            </Card>
            </div>
        )
    }
}

export default ContactUs;