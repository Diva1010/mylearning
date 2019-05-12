import React, { Component } from 'react';
import { Button, Card, Confirm, Grid, Image, Container } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import URL from '../../environment';

class CourseDetails extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = { isOpen: false, courseDetails:[],courseId:'' }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.registerCourse = this.registerCourse.bind(this);
    }

    componentDidMount() {
        this.state.courseId = this.props.location.query.courseId;
        fetch(URL.apiurl+`/coursedetails.php?courseId=${encodeURIComponent(this.state.courseId)}`, {
            method: 'GET'
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ courseDetails: json[0] });
                });
            }
        });
    }

    openModal() {
        this.setState({ isOpen: true })
    }

    closeModal() {
        this.setState({ isOpen: false })
    }
    registerCourse() {
        var user = JSON.parse(localStorage.getItem('user'));
        if(user){
            fetch(URL.apiurl+`/registercourse.php?courseId=${encodeURIComponent(this.state.courseId)}&stuId=${encodeURIComponent(user.stuId)}`, {
            method: 'GET'
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.context.router.history.push('/myCourses');
                });
            }
        });
        }
        else{
            this.context.router.history.push('/login');
        }
        
        this.closeModal();
    }

    render() {
        return (
            <Grid id="courseDetails" columns='two'>
                <Grid.Row>
                    <Grid.Column width={10}>
                    <Container id='courseHeader'>
                    <h2 class='heading'> {this.state.courseDetails.coursename} </h2>
                    <p>{this.state.courseDetails.description} </p>
                    <p>{this.state.courseDetails.extraDesc} </p>
                    </Container>
                    <Container id='courseDesc'>
                      <h3 class='heading'> Course Description: </h3>
                        <p>
                        {this.state.courseDetails.coursedetails} 
                        </p>
</Container>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Card id="registerCard">
                        <Image src={`${this.state.courseDetails.folderPath}${this.state.courseDetails.courseimg}`} />
                            <Card.Content>
                                <Card.Header>{this.state.courseDetails.coursename} </Card.Header>
                                <Card.Meta>
                                    <span className='date'>{this.state.courseDetails.extraDesc}</span>
                                </Card.Meta>
                                <Card.Description>
                                    <Button onClick={this.openModal}>Register</Button>
                                    <Confirm open={this.state.isOpen} onCancel={this.closeModal} onConfirm={this.registerCourse} />
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
CourseDetails.contextTypes = {
    router: PropTypes.func.isRequired
  };
export default CourseDetails;