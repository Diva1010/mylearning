import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Message, Responsive, Container } from 'semantic-ui-react'
import URL from '../../environment';

class UploadSection extends Component {
    constructor(props){
        super(props);
        this.state={
            courseId:'',
            sectionName:'',
            subsectionName:'',
            file:'',
            sectionCreated:false
           }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadfile = this.uploadfile.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        var courseId = this.props.location.query.courseId;
        this.state.courseId = courseId;
    }
    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
              this.setState({file: event.target.files[0]})
      }
     
    uploadfile(file){
        
        const formData = new FormData();
        formData.append('courseId', this.state.courseId);
        formData.append('sectionName', this.state.sectionName);
        formData.append('subsectionName', this.state.subsectionName);
        formData.append('file',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
           }
        }
        fetch(URL.apiurl+ '/uploadsection.php', {
            method: 'POST',
            body: formData,
            config
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    console.log(json)
                });
            }
        });
    }
    handleSubmit(e){
        e.preventDefault();
        this.uploadfile(this.state.file);
        this.setState({sectionCreated: true})
        setTimeout(() => {
            this.setState({
               sectionCreated:false
            });
          }, 2000);
        this.setState({
            sectionName:'',
            subsectionName:'',
            file:''
           });
           document.getElementById('myfile').value = "";
        }
render(){
    return(
        <div id='uploadsection'>
          {this.state.sectionCreated ? 
                 <Message
                success
                header='Upload successful'
                content='Section Successfully Created!'
            />
            : ''}
            <Responsive as={Container} id='newCourseForm'> 
            <h2 class='heading'>Upload Lectures</h2>
            <Form onSubmit={(event) => {this.handleSubmit(event);}}>
                <Responsive as={Container} id='newSection'>
                <Form.Field>
                    <Form.Input label="Section Name" name="sectionName" value={this.state.sectionName}
                        onChange={(e) => this.setState({sectionName: e.target.value})}/>
                </Form.Field>
                <Form.Group>               
                <Form.Field>
                    <Form.Input label="Sub-Section Name" name="subsectionName" value={this.state.subsectionName}
                        onChange={(e) => this.setState({subsectionName: e.target.value})}/>
                </Form.Field>
                <Form.Field>
                <Form.Input label="Upload Video" name="file" type="file" id='myfile'
                 onChange={this.onChange} />
                </Form.Field>
                </Form.Group>
                <Form.Button content='Add Another Section' type='submit' class="button" />   
                </Responsive><br/>                   
            </Form>
            <Button as={Link} to='/courses'>Finish</Button>
            </Responsive>
        </div>

    )
}
}
export default UploadSection;