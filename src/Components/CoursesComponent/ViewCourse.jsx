import React, { Component } from 'react';
import { Accordion, Button, Menu, Grid, Icon, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import URL from '../../environment';

class ViewCourse extends Component {
 
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0, activeItem: 'allCourses', courseSections:[], courseSubSections: [], courseId:'', videopath:'', subSectionId:'' };
    }
    componentDidMount() {
        this.state.courseId = this.props.location.query.courseId;
        fetch(URL.apiurl+`/viewcourse.php?courseId=${encodeURIComponent(this.state.courseId)}&type=${encodeURIComponent('section')}`, {
            method: 'GET'
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ courseSections: json });
                    fetch(URL.apiurl+`/viewcourse.php?courseId=${encodeURIComponent(this.state.courseId)}&section=${encodeURIComponent(this.state.courseSections[0].section)}&type=${encodeURIComponent('subsection')}`, {
                        method: 'GET'
                    },
                    ).then(response => {
                        if (response.ok) {
                            response.json().then(json => {
                                this.setState({ courseSubSections: json });
                                this.setState({subSectionId: this.state.courseSubSections[0].subsecId  ,videopath: this.state.courseSubSections[0].folderpath + this.state.courseSubSections[0].video});
                            });
                        }
                    });
                });
            }
        });
        window.addEventListener('load', this.handleLoad);      
    }
    handleLoad(){
        var user = JSON.parse(localStorage.getItem('user'));
        var postbody = JSON.stringify({ stuId: user.stuId, subsecId: this.state.subSectionId, type:'update'  });
        this.video.addEventListener('ended', function(e) {
            fetch(URL.apiurl+`/usercourses.php`, {
                method: 'POST',
                body: postbody
            },
            ).then(response => {
                if (response.ok) {
                    console.log(response)
                }
            });
        });
    }
   
    handleClick(e, titleProps) {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index;
        fetch(URL.apiurl+`/viewcourse.php?courseId=${encodeURIComponent(this.state.courseId)}&section=${encodeURIComponent(titleProps.children)}&type=${encodeURIComponent('subsection')}`, {
            method: 'GET'
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ courseSubSections: json });
                });
            }
        });
        this.setState({ activeIndex: newIndex })
    }
    handleItemClick(e) {
        const {id} = e.target;
        this.setState({subSectionId: this.state.courseSubSections[id].subsecId  ,videopath: this.state.courseSubSections[id].folderpath + this.state.courseSubSections[id].video});
        console.log(id);
    }
    render() {
        const { activeIndex } = this.state
        const { activeItem } = this.state
        const ref = (el) => { this.video = el }
        return (
            <Container id='courseContainer'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={6} mobile={16} tablet={6}>
                            <Accordion styled>
                            {this.state.courseSections.map((sectionheader,index) => ( 
                                <span>
                                <Accordion.Title active={activeIndex === index} index={index}
                                    onClick={this.handleClick.bind(this)}>
                                    {sectionheader.section}
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === index}>
                                    <Menu class='courseSubmenu' vertical>
                                    {this.state.courseSubSections.map((subsectionheader, subindex) => (
                                        <Menu.Item id={subindex} name={'video_'+subindex} active={activeItem === 'video_'+subindex}
                                            onClick={this.handleItemClick.bind(this)}>
                                            {subsectionheader.subsection}
                                            { subsectionheader.completed && subsectionheader.completed == 1 ? 
                                            <Icon name='checkmark' /> : ''
                                            }
                                        </Menu.Item>
                                    ))}
                                    </Menu>
                                </Accordion.Content>   
                                </span>
                             ))}             
                            </Accordion>
                        </Grid.Column>
                        <Grid.Column computer={10} mobile={16} tablet={16}>
                         <video controls ref={ref} width="680" height="400" type="video/mp4" src={this.state.videopath}>
                        </video> 
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Button as={Link} to={{ pathname: '/assessment', query: {courseId: this.state.courseId }}}>Assessment</Button>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default ViewCourse;