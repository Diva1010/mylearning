import React, { Component } from 'react';
import { Table, Button, Input, Form, Message, Container, Label } from 'semantic-ui-react'
import URL from '../../environment';

class Assessment extends Component {
    constructor(props) {
        super(props);
        this.state = { courseId:'', assignmentData:[], stuId:'', file:'', userrole:'', grade:[], assignmentFile:'', duedate:'' };
        this.onChange = this.onChange.bind(this);
        this.getAssessmentData = this.getAssessmentData.bind(this);
    }
    getAssessmentData(){
        if(this.state.userrole == 'student'){
            fetch(URL.apiurl + `/assessment.php?courseId=${encodeURIComponent(this.state.courseId)}&user=${encodeURIComponent('student')}&userId=${encodeURIComponent(this.state.stuId)}`, {
                method: 'GET'
            },
            ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        this.setState({ assignmentData: json });
                    });
                }
            }); 
            }
            else{
                fetch(URL.apiurl+`/assessment.php?courseId=${encodeURIComponent(this.state.courseId)}&user=${encodeURIComponent('teacher')}`, {
                method: 'GET'
            },
            ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        this.setState({ assignmentData: json });
                    });
                }
            });
            }
          
    }
    componentDidMount() {
        this.state.courseId = this.props.location.query.courseId;     
        var user = JSON.parse(localStorage.getItem('user'));
        this.state.userrole = user.userrole;  
        this.state.stuId = user.stuId;
        this.getAssessmentData();     
    }

    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
              if(this.state.userrole == 'student'){
                this.setState({file: event.target.files[0]})
              }
              else{
                this.setState({assignmentFile: event.target.files[0]})
              }
      }

      handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();        
        formData.append('courseId', this.state.courseId);
        const {id} = e.target;        
        formData.append('assignmentId', this.state.assignmentData[id].assignmentId);
        if(this.state.userrole == 'student'){    
        formData.append('studentId', this.state.stuId);  
        formData.append('file',this.state.file);
        formData.append('user','student');
        }
        else{
            formData.append('studentId', this.state.assignmentData[id].stuId);
            formData.append('user','teacher');
            formData.append('grade',this.state.grade[id]);  
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
           }
        }
        fetch(URL.apiurl+'/submitAssignment.php', {
            method: 'POST',
            body: formData,
            config
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({submitSucess: true})
                    setTimeout(() => {
                        this.setState({
                            submitSucess:false
                        });
                      }, 2000);
                      this.getAssessmentData();
                });
            }
        });
        }
        SubmitAssignment(e){
            e.preventDefault();
            const formData = new FormData();        
            formData.append('courseId', this.state.courseId);
            formData.append('file',this.state.assignmentFile);
            formData.append('duedate', this.state.duedate);            
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
               }
            }
            fetch(URL.apiurl+'/uploadAssignment.php', {
                method: 'POST',
                body: formData,
                config
            },
            ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        this.setState({submitSucess: true})
                        setTimeout(() => {
                            this.setState({
                                submitSucess:false
                            });
                          }, 2000);
                    });
                }
            });
        }

    render(){
        return(
            <div id='assessmentDiv'>
               {this.state.submitSucess ? 
                 <Message
                success
                header='Submit successful'
                content='Successfully Submitted!'
            />
            : ''}
            {this.state.userrole == 'student' ?
                <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Assigment</Table.HeaderCell>
                    <Table.HeaderCell>Due Date</Table.HeaderCell>                    
                    <Table.HeaderCell>Upload Assigment</Table.HeaderCell>
                    <Table.HeaderCell>Date Submitted</Table.HeaderCell>
                    <Table.HeaderCell>Grade</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.state.assignmentData.map((item,index) => (
                <Table.Row>
                    <Table.Cell>
                    <a target="_blank" href={`${item.assignfolder}${item.assignfile}`}>{item.assignfile}</a>
                   </Table.Cell>
                    <Table.Cell>
                        {item.duedate}
                    </Table.Cell>
                    <Table.Cell>
                    {item.grade == 0?
                       <input label="Upload Solution" name="img" type="file" onChange={this.onChange} />
                    :
                    <a target="_blank" href={`${item.answerfolder}${item.answerfile}`}>{item.answerfile}</a>
                    }
                    </Table.Cell>
                    <Table.Cell>
                        {item.datesubmitted}
                    </Table.Cell>
                    <Table.Cell>
                        {item.grade}
                    </Table.Cell>
                    <Table.Cell>
                    {item.grade == 0?
                    <Button type='submit' id={index} content='Submit' onClick={this.handleSubmit.bind(this)} class="button" />   
                    : 'Submitted'}
                    </Table.Cell>
                </Table.Row>
                ))}
                </Table.Body>
                </Table>
                :
                <div>
                <div id='uploadSection'>
                <Form onSubmit={(event) => {this.SubmitAssignment.bind(this)}}>
                <h2>Upload New Assignment</h2>
                <Form.Field>
                    <label>Upload Assignment</label>
                    <input label="Upload Assignment" name="assignment" type="file" onChange={this.onChange} />
                </Form.Field>
                <Form.Field>
                    <label>Date</label>
                    <input type="datetime-local" name="duedate" value={this.state.duedate}
                    onChange={(e) => this.setState({duedate: e.target.value})}/>
                </Form.Field>
                <Form.Field>
                    <Button type='submit' content='Submit' onClick={this.SubmitAssignment.bind(this)} class="button" />
                </Form.Field>
                </Form>
                </div>
                <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Assigment</Table.HeaderCell>
                    <Table.HeaderCell>Student ID</Table.HeaderCell>                    
                    <Table.HeaderCell>Answers</Table.HeaderCell>
                    <Table.HeaderCell>Date Submitted</Table.HeaderCell>
                    <Table.HeaderCell>Grade</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.state.assignmentData.map((item, index) => (
                <Table.Row>
                    <Table.Cell>
                    Assignment_{item.assignmentId}
                   </Table.Cell>
                    <Table.Cell>
                        {item.stuId}
                    </Table.Cell>
                    <Table.Cell>
                    <a target="_blank" href={`${item.answerfolder}${item.answerfile}`}>{item.answerfile}</a>
                    </Table.Cell>
                    <Table.Cell>
                        {item.datesubmitted}
                    </Table.Cell>
                    <Table.Cell>
                    {item.grade == 0 ?
                        <Input placeholder='Grade' value={this.state.grade[index]}
                             onChange={(e) => {
                                 this.state.grade[index] = e.target.value} }/>
                        : <span>{item.grade}</span>
                        }
                         </Table.Cell>
                    <Table.Cell>
                    {item.grade == 0 ?
                    <Button type='submit' id={index} content='Submit' onClick={this.handleSubmit.bind(this)} class="button" />   
                    : 'Graded' }
                    </Table.Cell>
                </Table.Row>
                ))}
                </Table.Body>
                </Table>
                </div>
            }
            </div>
        )
    }

}
export default Assessment