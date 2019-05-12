import React, { Component } from 'react';
import { Card, Image, Radio, Grid, Icon, Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import image1 from '../../images/background.jpg';
import image2 from '../../images/webbg.jpg';
import image3 from '../../images/background1.jpg';
import URL from '../../environment';

class SelectTheme extends Component {
 
    constructor(props) {
        super(props);
        var user = JSON.parse(localStorage.getItem('user'));
        this.state = {templateId:'' , stuId: user.stuId };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e, { value }) {      
        this.setState({templateId: value});
    }
    handleSubmit(e){
        fetch(URL.apiurl+`/fetchuser.php?type=${encodeURIComponent('template')}`, {
            method: 'POST',
            body: JSON.stringify({  stuId: this.state.stuId,
                    template: this.state.templateId})
                },
                ).then(response => {
                    if (response.ok) {
                        if(this.state.templateId == '1'){
                            document.body.style.backgroundImage =  "url(" + image1 + ")";
                           }
                           else if(this.state.templateId == '2'){
                            document.body.style.backgroundImage =  "url(" + image2 + ")";
                           }
                           else if(this.state.templateId == '3'){
                            document.body.style.backgroundImage =  "url(" + image3 + ")";
                           }         
                           else{
                            document.body.style.backgroundImage =  "url(" + image2 + ")";
                           }    
                    }
                });
    }
    render(){
        const value  = this.state.templateId;
        return(
            <Card id="editTheme">
            <Card.Content header='Select a Theme' id="cardHeader" />
            <Card.Content>
            <Card.Group id='membersList'>
                <Card>
                    <Image src={image1} />
                <Card.Content>
                    <Radio label='Select'  value='1'
                    checked={value === '1'}
                    onChange={this.handleChange}/>                
                </Card.Content>
                </Card>
                <Card>
                    <Image src={image2} />
                <Card.Content>
                    <Radio label='Select'   value='2'
                    checked={value === '2'}
                    onChange={this.handleChange}/>              
                </Card.Content>
                </Card>
                <Card>
                    <Image src={image3} />
                <Card.Content>
                    <Radio label='Select'   value='3'
                    checked={value === '3'}
                    onChange={this.handleChange}/>                
                </Card.Content>
                </Card>
            </Card.Group>
            </Card.Content>
            <Button type= 'submit' onClick={this.handleSubmit.bind(this)} content='Submit' class="button" />
            </Card>
           
        )
    }
}
export default SelectTheme;