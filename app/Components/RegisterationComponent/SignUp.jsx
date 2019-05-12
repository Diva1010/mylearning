import React, { Component } from 'react'
import { Form, Card, Dropdown } from 'semantic-ui-react';
import URL from '../../environment';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]
const roleoptions = [
    { key:'teacher', text: 'Teacher', value:'teacher' },
    { key:'student', text: 'Student', value:'student' }
]
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            gender: 'male',
            username: '',
            password: '',
            userrole:'student'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
       fetch(URL.apiurl+`/updateUser.php?type=${encodeURIComponent('register')}`, {
                method: 'POST',  
                body: JSON.stringify({ firstname: this.state.fname,
                                        lastname: this.state.lname,
                                        gender: (this.state.gender == 'male' ? 'M' : 'F'),
                                        username: this.state.username,
                                        password: this.state.password,
                                        userrole: this.state.userrole
                })
            },
            ).then(response => {
                if (response.ok) {
                    this.props.history.push("/members");             
                    }
                });
    }

    render() {
        return (
            <Card id="SignUpCard">
                <Card.Content header='Registeration' id="cardHeader" />
                <Card.Content>
                    <Form onSubmit={(event) => { this.handleSubmit(event); }}>
                        <Form.Field>
                            <Form.Input label="First Name" name="fname" value={this.state.fname}
                                onChange={(e) => this.setState({ fname: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input label="Last Name" name="lname" value={this.state.lname}
                                onChange={(e) => this.setState({ lname: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Form.Select placeholder='Select Gender' label="Gender" name="gender" options={options} value={this.state.gender}
                                onChange={(e, data) => this.setState({ gender: data.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input label="Username" name="username" value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input label="Password" type="password" name="password" value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Form.Select placeholder='Select User Role' label="role" name="role" options={roleoptions} value={this.state.userrole}
                                onChange={(e, data) => this.setState({ userrole: data.value })} />
                        </Form.Field>
                        <Form.Button content='Submit' class="button"
                            disabled={!this.state.fname || !this.state.lname || !this.state.gender || !this.state.username || !this.state.password} />
                    </Form>
                </Card.Content>
            </Card>
        )
    }
}

export default SignUp;