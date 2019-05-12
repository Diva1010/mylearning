import React, { Component } from 'react';
import { Input, Card, Header, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import URL from '../../environment';

class PopularCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { popularCourses: [] }
    }

    componentDidMount() {
        fetch(URL.apiurl+`/courselist.php?popular=${encodeURIComponent('1')}`, {
            method: 'GET'
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ popularCourses: json })
                });
            }
        });
    }

    render() {
        return (
            <div id="popular_courses" class="classList">
                {this.state.popularCourses.length > 0 ?
                    <div>
                        <Header as='h3' dividing>
                            Popular Courses
      </Header>
                        <Grid columns='four' divided>
                            <Grid.Row>
                                {this.state.popularCourses.map((item) => (
                                    <Grid.Column computer={4} mobile={6} tablet={5} as={Link} to={{ pathname: '/coursedetails', query: {courseId: item.courseId }}}>
                                        <Card fluid>
                                        <Image src={`${item.folderPath}${item.courseimg}`} />
                                            <Card.Content>
                                                <Card.Header>{item.coursename}</Card.Header>
                                                <Card.Meta>
                                                    <span className='date'>{item.extraDesc}</span>
                                                </Card.Meta>
                                                <Card.Description>{item.description}</Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                ))}
                            </Grid.Row>
                        </Grid>
                    </div>
                    : ''}
            </div>
        )
    }
}
export default PopularCourses;