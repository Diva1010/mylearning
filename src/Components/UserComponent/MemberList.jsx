import React, { Component } from 'react'
import { Card, Image, Button, Confirm, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import URL from '../../environment';

class MemberList extends React.Component{
  constructor(props) {
    super(props);
    this.state = { memberList: [], userrole:'', open: false, userId:'' };
    this.close = this.close.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
}
  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ userrole : user.userrole });
    fetch(URL.apiurl+`/userList.php`, {
        method: 'GET'
    },
    ).then(response => {
        if (response.ok) {
            response.json().then(json => {
                this.setState({ memberList: json })
            });
        }
    });
}
close(){
    this.setState({ open: false })
}

handleremove(e){
    const {id} = e.target;
    var ID = this.state.memberList[id].stuId;
    this.setState({userId : ID });
    this.setState({ open: true })
}
confirmDelete(){
    fetch(URL.apiurl+`/updateUser.php?type=${encodeURIComponent('delete')}&stuId=${encodeURIComponent(this.state.userId)}`, {
        method: 'GET'
    },
    ).then(response => {
        if (response.ok) {
            this.setState({ open: false });
            fetch(URL.apiurl+`/userList.php`, {
                method: 'GET'
            },
            ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        this.setState({ memberList: json })
                    });
                }
            });
        }
    });
}

    render(){
        return(
            <div id='membersContainer'>
            <Card.Group id='membersList'>
            {this.state.memberList.map((item, index) => (
    <Card>
      <Card.Content>
          {item.gender == 'F' ? 
           <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
        :
        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
            }
    <Card.Header>{item.firstname} {item.lastname}</Card.Header>
        <Card.Meta>{item.userrole}</Card.Meta>
      </Card.Content>
      <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.confirmDelete} />
      <Card.Content extra>
      {this.state.userrole == 'admin' ? 
      <div className='ui buttons'>
          <Button id= {index} onClick={this.handleremove.bind(this)} basic color='red'>         
            Remove
          </Button>
        </div> : ''
      }
      </Card.Content>
    </Card>
            ))}
  </Card.Group>
  <Button as={ Link } to='/signup' >Add Member</Button> 
  </div>
        );
    }
}
export default MemberList;