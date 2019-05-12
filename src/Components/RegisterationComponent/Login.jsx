import React, { Component } from 'React';
import { Form, Card, Message } from 'semantic-ui-react';
import image1 from '../../images/background.jpg';
import image2 from '../../images/webbg.jpg';
import image3 from '../../images/background1.jpg';
import PropTypes from 'prop-types';
import URL from '../../environment';

class Login extends React.Component {
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            loginfail: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        localStorage.clear();
        const loginBody = JSON.stringify({ username: this.state.username , password: this.state.password });
        if (this.state.username && this.state.password) {
            fetch(URL.apiurl+'/login.php', {
                method: 'POST',
                body: loginBody
            },
            ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        localStorage.setItem('user', JSON.stringify(json[0]));
                       if(json[0].template == '1'){
                        document.body.style.backgroundImage =  "url(" + image1 + ")";
                       }
                       else if(json[0].template == '2'){
                        document.body.style.backgroundImage =  "url(" + image2 + ")";
                       }
                       else if(json[0].template == '3'){
                        document.body.style.backgroundImage =  "url(" + image3 + ")";
                       }         
                       else{
                        document.body.style.backgroundImage =  "url(" + image2 + ")";
                       }    
                        this.context.router.history.push('/');
                    });
                }
                else{
                    console.log(response)
                    this.setState({loginfail : true});
                }
            })
            .catch(exception => {
                this.setState({loginfail : true});
            });
        }
        this.setState({ username: '', password: '' });
    }

    render() {
        return (
            <Card id="LoginCard">
                <Card.Content header='Login' id="cardHeader" />
                <Card.Content>
                    <Form onSubmit={(event) => { this.handleSubmit(event); }}>
                        <Form.Field>
                            <Form.Input label='Username' name="username" value={this.state.username}
                                onChange={(event) => this.setState({ username: event.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input label='Password' name="password" type='password' value={this.state.password}
                                onChange={(event) => this.setState({ password: event.target.value })} />
                        </Form.Field>
                        <Form.Button content='Submit' class="button"
                            disabled={!this.state.username || !this.state.password} />
                    </Form>
                    <br/>
              {this.state.loginfail ?
              <Message
                  error
                  header='Login Fail'
                  content='The Username/Password is incorrect'
              />
              : '' }
                </Card.Content>
            </Card>
        )
    }
}

Login.contextTypes = {
    router: PropTypes.func.isRequired
  };
  
export default Login;