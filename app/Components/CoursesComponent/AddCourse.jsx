import React, { Component } from 'react';
import { Form, Label, Button, Grid, Responsive, Container } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import URL from '../../environment';

class AddNewcourse extends Component {
    constructor(props, context){
        super(props, context);
        this.state={
            coursename:'',
            description:'',
            extraDesc:'',
            coursedetails:'',
            coursecategory:'',
            img:''
           }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
              this.setState({img: event.target.files[0]})
      }
 
     
    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('coursename', this.state.coursename);
        formData.append('description', this.state.description);
        formData.append('extraDesc', this.state.extraDesc);
        formData.append('coursedetails', this.state.coursedetails);
        formData.append('coursecategory', this.state.coursecategory);
        formData.append('file',this.state.img);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
           }
        }
        fetch(URL.apiurl + '/newcourse.php', {
            method: 'POST',
            body: formData,
            config
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.context.router.history.push({
                        pathname: '/uploadSection',
                        query: {courseId: json},
                    });
                });
            }
        });
        }

render(){
    return(
        <div id='newCourse'>
        <Responsive as={Container} id='newCourseForm'> 
        <h2 class='heading'>Create New Course</h2>
         <Form onSubmit={(event) => {this.handleSubmit(event);}}>
            <Form.Field>
                <Form.Input label="Course Name" name="coursename" value={this.state.coursename}
                    onChange={(e) => this.setState({coursename: e.target.value})}/>
            </Form.Field>
            <Form.Field>
                <Form.TextArea label="Description" name="description" value={this.state.description}
                    onChange={(e) => this.setState({description: e.target.value})}/>
            </Form.Field>
            <Form.Field>
                <Form.TextArea label="Course Date" name="extraDesc" value={this.state.extraDesc}
                    onChange={(e) => this.setState({extraDesc: e.target.value})}/>
            </Form.Field>
            <Form.Field>
                <Form.TextArea label="Course Details" name="coursedetails" value={this.state.coursedetails}
                    onChange={(e) => this.setState({coursedetails: e.target.value})}/>
            </Form.Field>
            <Form.Field>
                <Form.TextArea label="Course Category" name="coursecategory" value={this.state.coursecategory}
                    onChange={(e) => this.setState({coursecategory: e.target.value})}/>
            </Form.Field>
            <Form.Field>
                <Form.Input label="Upload Course Image" name="img" type="file"
                 onChange={this.onChange} />
            </Form.Field>
            <Form.Button content='Submit' class="button" />   
         </Form>
         </Responsive>
        </div>
    )
}
}
AddNewcourse.contextTypes = {
    router: PropTypes.func.isRequired
  };
  
export default AddNewcourse;