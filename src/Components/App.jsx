import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Switch } from 'react-router';
import HomePage from './HomePage';
import NavBar from './HeaderComponent/NavBar';
import Footer from './Footer';
import Login, {fakeAuth} from './RegisterationComponent/Login';
import SignUp from './RegisterationComponent/SignUp';
import CourseDetails from './CoursesComponent/courseDetails';
import UserCourses from './CoursesComponent/UserCourses';
import ViewCourse from './CoursesComponent/ViewCourse';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import AllCourses from './CoursesComponent/AllCourses';
import AddNewcourse from './CoursesComponent/AddCourse';
import MemberList from './UserComponent/MemberList';
import UploadSection from './CoursesComponent/UploadSection';
import Assessment from './CoursesComponent/Assessment';
import NotFound from './NotFound';
import EditProfile from './UserComponent/EditProfile';
import SelectTheme from './UserComponent/SelectTheme';
import image2 from '../images/webbg.jpg';

class App extends Component {
    constructor(props){
        super(props);
    }
    

  render() {
    localStorage.clear();
    document.body.style.backgroundImage =  "url(" + image2 + ")";
    return (
      <Router>
        <div>
          <NavBar />
          {this.props.children}
          <div class="Site-content">
          <Switch>
          <Route name="home" exact path="/" component={HomePage} />
          <Route path="/courses" component={AllCourses} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/contactus" component={ContactUs} />
          <Route path="/login"  component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/coursedetails" component={CourseDetails} />
          <Route path="/myCourses" component={UserCourses} />
          <Route path="/viewCourse" component={ViewCourse} />
          <Route path='/addcourse' component={AddNewcourse} />
          <Route path='/members' component={MemberList} />
          <Route path='/uploadSection' component={UploadSection} />
          <Route path='/assessment' component={Assessment} />
          <Route path='/editprofile' component={EditProfile} />
          <Route path='/selecttheme' component={SelectTheme} />
          <Route component={NotFound} />
          </Switch>
          </div>
          < Footer />
        </div>
      </Router>
    )
  }
}

export default App;