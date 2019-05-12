import React , { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Container, Search, Message, Grid, Segment } from 'semantic-ui-react'
import PopularCourses from './CoursesComponent/PopularCourses';
import URL from '../environment';

class HomePage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {isLoading: false, results: [], value: '', courseList: [] };
        this.resetComponent = this.resetComponent.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    componentWillMount() {
       fetch(URL.apiurl+`/courselist.php?type=${encodeURIComponent('Technology')}`, {
            method: 'GET'
        },
            ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        var res = json.map(({ courseId, coursename, folderPath , courseimg, description }) => 
                        ({ courseId: courseId, title: coursename, image: folderPath+courseimg, description: description }))
                        this.setState({ courseList: res });
                    });
                }
            });
      }
    
      resetComponent(){
        this.setState({ isLoading: false, results: [], value: '' });
      } 
    
      handleResultSelect(e, { result }){
        this.setState({ value: result.title });
        this.context.router.history.push({
            pathname: '/coursedetails',
            query: {courseId: result.courseId},
        });
      } 
    
      handleSearchChange(e, { value }){
        this.setState({ isLoading: true, value })
      
        setTimeout(() => {
          if (this.state.value.length < 1) return this.resetComponent()
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
          const isMatch = result => re.test(result.title);
          this.setState({
            isLoading: false,
            results: _.filter(this.state.courseList, isMatch),
          })
        }, 300);
       
      }
    
    render(){
        const { isLoading, value, results } = this.state;
        return(
            <div id='Homediv'>
                <Container id='HometopContainer' textAlign='center'>
                <div id='searchHome'>
                <h3>Choose from the top Tutors online!</h3><br/><br/>
                <Grid>
                <Grid.Column width={6}>
                <Search
                input={{ fluid: true }}
                placeholder='Search Courses'
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    results={results}
                    value={value}
                    {...this.props}
                />
                </Grid.Column>
            </Grid>
                </div>
                </Container>               
                <PopularCourses />
            </div>
        )
    }
}
HomePage.contextTypes = {
    router: PropTypes.func.isRequired
  };
export default HomePage;