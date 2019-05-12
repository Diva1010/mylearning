import React, { Component } from 'react';
import { Input, Card, Progress, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import URL from '../../environment';

class UserCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { userCourses: [] }
    }

    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('user'));
        var postbody = JSON.stringify({ stuId: user.stuId, type:'view'  });
        fetch(URL.apiurl+'/usercourses.php', {
            method: 'POST',
            body: postbody
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    var courseList = [];
                    var sum=0;
                    json.map((item, index) => {
                        if(index < (json.length-1) && item.courseId == json[index+1].courseId){
                            sum+= parseInt(item.completed);
                        }
                        else{
                            let percentage = (sum/ (index+1))*100;
                            sum =0;
                            let course= [];
                            course['courseId'] = json[index].courseId;
                            course['coursename'] = json[index].coursename;
                            course['extraDesc'] = json[index].extraDesc;
                            course['folderPath'] = json[index].folderPath;
                            course['courseimg'] = json[index].courseimg;
                            course['progress'] = percentage;
                            courseList.push(course);
                        }
                        
                    });
                    this.setState({ userCourses: courseList })
                });
            }
        });
    }
  render() {
    return (
        <div id="my_courses" class="classList">
        <h3 class='heading'>My Courses</h3>
        <Grid columns='four'>
          <Grid.Row>
          {this.state.userCourses.map((item) => (
          <Grid.Column computer={4} mobile={6} tablet={5} as={Link} to={{ pathname: '/viewCourse', query: {courseId: item.courseId }}}>
          <Card fluid>
          <Image src={`${item.folderPath}${item.courseimg}`} />
              <Card.Content>
              <Card.Header>{item.coursename}</Card.Header>
              <Card.Meta>
                  <span className='date'>{item.extraDesc}</span>
              </Card.Meta>
              <Card.Description><Progress percent={item.progress} color='cadet blue' progress /></Card.Description>
              </Card.Content>
          </Card>
          </Grid.Column>
          ))}
          </Grid.Row>
      </Grid>
    </div>
    )
  }
}
export default UserCourses;