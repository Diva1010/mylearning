import React, { Component } from 'React';
import { Input, Menu, Dropdown, Message , Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.jpg'
import PropTypes from 'prop-types';
import image2 from '../../images/webbg.jpg';

class NavBar extends Component {
    constructor(props, context){
        super(props, context);
        this.state = { activeItem: 'home', isLoggedIn: false, username: '', role:'', logOut: false };
    }
    handleDismiss(){
        this.setState({ logOut: false });
        console.log(this.state.logOut)
    }
    handleItemClick(e, { name }){
        this.setState({ activeItem: name })
    }
   
    logOut(){
        localStorage.clear();
        this.setState({
            logout : true,
            username: ''
        });
        
        setTimeout(() => {
            this.setState({
               activeItem:'home', isLoggedIn: false, username: '', role:'', logout:false
            });
          }, 2000);
        document.body.style.backgroundImage =  "url(" + image2 + ")";
        this.context.router.history.push('/');
       
    }
    componentWillUpdate(){
        var user = JSON.parse(localStorage.getItem('user'));
       if(user && !this.state.username){
            this.setState({ activeItem: 'home', isLoggedIn: true , username : user.firstname + ' ' + user.lastname, role:user.userrole });   
        }               
    }

    render(){
        
        const { activeItem } = this.state
        return(          
            <div>
                {this.state.logout ? 
                 <Message
                success
                header='Logout successful'
                content='You have successfully logged out!'
            />
            : ''}
        <Menu pointing>
        <Menu.Item as={Link} to='/' onClick={this.handleItemClick.bind(this)}>
            <img class="logo" src={logo} />
            <span> <h2> myLearning </h2></span>
        </Menu.Item>
          <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} 
          onClick={this.handleItemClick.bind(this)}  />
          <Menu.Item
          as={Link} to='/courses'
            name='courses'
            active={activeItem === 'courses'} onClick={this.handleItemClick.bind(this)}
          />
          <Menu.Item
          as={Link} to='/aboutus'
            name='aboutus'
            active={activeItem === 'aboutus'} onClick={this.handleItemClick.bind(this)}
          />
          <Menu.Item
          as={Link} to='/contactus'
            name='contactus'
            active={activeItem === 'contactus'} onClick={this.handleItemClick.bind(this)}
          />
            <Menu.Menu position='right'>
           { this.state.isLoggedIn ?
                <Dropdown  item text={this.state.username}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/editprofile" icon='edit' text='Edit Profile' />
                  <Dropdown.Item as={Link} to="/myCourses" icon='video play' text='My Courses'
                  active={activeItem === 'contactus'} onClick={this.handleItemClick.bind(this)} />
                    { this.state.role == 'admin' || this.state.role == 'teacher' ?
                      <Dropdown.Item as={Link} to="/addcourse" icon='book' text='Add New Course' 
                      active={activeItem === 'contactus'} onClick={this.handleItemClick.bind(this)}/> : 
                      ''
                  }
                   { this.state.role == 'admin' || this.state.role == 'teacher' ?
                      <Dropdown.Item as={Link} to="/members" icon='user' text='Members'
                      active={activeItem === 'contactus'} onClick={this.handleItemClick.bind(this)} /> : 
                      ''
                  }
                  <Dropdown.Item icon='settings' text='Account Settings' as={Link} to="/selecttheme" />
                  <Dropdown.Item icon='sign-out' text='Log Out' onClick={this.logOut.bind(this)} />
                </Dropdown.Menu>
              </Dropdown>
            :  <Menu.Item as={Link} to='/login' name='Login' 
            active={activeItem === 'login'} onClick={this.handleItemClick.bind(this)}/> }
        </Menu.Menu>
        </Menu>
      </div>
        );
    }
}
NavBar.contextTypes = {
    router: PropTypes.func.isRequired
  };

export default NavBar;