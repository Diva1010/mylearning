import React, { Component } from 'react';
import { Card, Form, Menu, Grid, Icon, Container } from 'semantic-ui-react'
import URL from '../../environment';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]
class EditProfile extends Component {
 
    constructor(props) {
        super(props);
        var user = JSON.parse(localStorage.getItem('user'));
        this.state = { firstname:'', lastname:'', gender:'',password:'', stuId: user.stuId };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        
        fetch(URL.apiurl+`/fetchuser.php?userId=${encodeURIComponent(this.state.stuId)}&type=${encodeURIComponent('get')}`, {
            method: 'GET'
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ firstname: json[0].firstname});
                    this.setState({ lastname: json[0].lastname});
                    this.setState({ gender: json[0].gender == 'F' ? 'female' : 'male'});
                    this.setState({ username: json[0].username});
                    this.setState({ password: json[0].password});
                });
            }
        });    
    }
    handleSubmit(e){
        e.preventDefault();
        fetch(URL.apiurl+`/fetchuser.php?type=${encodeURIComponent('update')}`, {
                 method: 'POST',  
                 body: JSON.stringify({  stuId: this.state.stuId,
                                         firstname: this.state.firstname,
                                         lastname: this.state.lastname,
                                         gender: (this.state.gender == 'male' ? 'M' : 'F'),
                                         password: this.state.password
                 })
             },
             ).then(response => {
                 if (response.ok) {
                     this.props.history.push("/");             
                     }
                 });
    }
    
    render(){
        return(
            <Card id="editUser">
            <Card.Content header='Edit Profile' id="cardHeader" />
            <Card.Content>
                <Form onSubmit={(event) => { this.handleSubmit(event); }}>
                    <Form.Field>
                        <Form.Input label="First Name" name="fname" value={this.state.firstname}
                            onChange={(e) => this.setState({ firstname: e.target.value })}  />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input label="Last Name" name="lname" value={this.state.lastname}
                            onChange={(e) => this.setState({ lastname: e.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Select placeholder='Select Gender' label="Gender" name="gender" options={options} value={this.state.gender}
                            onChange={(e, data) => this.setState({ gender: data.value })} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input label="Username" disabled name="username" value={this.state.username} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input label="Password" type="password" name="password" value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })} />
                    </Form.Field>
                    <Form.Button content='Submit' class="button" />
                </Form>
            </Card.Content>
        </Card>
        );
    }
}
export default EditProfile;