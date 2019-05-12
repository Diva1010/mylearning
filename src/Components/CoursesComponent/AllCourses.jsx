import React, { Component } from 'react';
import { Menu, Card, Header, Grid, Image, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PopularCourses from './PopularCourses';
import URL from '../../environment';

class AllCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: 'allCourses', courseList: [] }
    }
    componentDidMount() {
        var url = URL.apiurl + `/courselist.php?type=${encodeURIComponent('Technology')}`;
        fetch(url, {
            method: 'GET'
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ courseList: json })
                });
            }
        });
    }

    handleItemClick(e, { name }) {
        this.setState({courseList: []});
        fetch(URL.apiurl+`/courselist.php?type=${encodeURIComponent(name)}`, {
            method: 'GET'
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ courseList: json })
                });
            }
        });
        console.log(name)
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
        return (
            <Container id='allCourses'>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column mobile={8} tablet={8} computer={4}>
                            <Menu vertical>
                                <Menu.Item>
                                <Menu.Header>Subjects</Menu.Header>
                    <Menu.Menu>
                                        <Menu.Item name='Technology' active={activeItem === 'Technology'}
                                            onClick={this.handleItemClick.bind(this)}>
                                            Technology
                    </Menu.Item>
                                        <Menu.Item name='arts' active={activeItem === 'arts'}
                                            onClick={this.handleItemClick.bind(this)}>
                                            Arts
                    </Menu.Item>
                                        <Menu.Item name='Business Management' active={activeItem === 'Business Management'}
                                            onClick={this.handleItemClick.bind(this)}>
                                            Business & Management
                    </Menu.Item>
                                        <Menu.Item onClick={this.handleItemClick.bind(this)}>
                                            <span class='links'><u>Show More </u></span>
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Menu.Item>
                                <Menu.Item>
                                <Menu.Header>Level</Menu.Header>  
                    <Menu.Menu onItemClick={this.handleItemClick.bind(this)}>
                                        <Menu.Item name='beginner' active={activeItem === 'beginner'}
                                            onClick={this.handleItemClick.bind(this)}>
                                            Beginner
                    </Menu.Item>
                                        <Menu.Item name='intermediate' active={activeItem === 'intermediate'}
                                            onClick={this.handleItemClick.bind(this)}>
                                            Intermediate
                    </Menu.Item>
                                        <Menu.Item name='advanced' active={activeItem === 'advanced'}
                                            onClick={this.handleItemClick.bind(this)}>
                                            Advanced
                    </Menu.Item>
                                    </Menu.Menu>
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column computer={12} mobile={16} tablet={16}>
                            <PopularCourses />
                            <br/><br/>
                            <div id="courseList" class="classList">
                                {this.state.courseList.length > 0 ?
                                    <div>
                                        <Header as='h3' dividing>
                                            Courses in {this.state.activeItem}
    </Header>
                                        <Grid columns='four'>
                                            <Grid.Row>
                                                {this.state.courseList.map((item) => (
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
                                                ))} <br/>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                    : ''}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>

        )
    }
}

export default AllCourses