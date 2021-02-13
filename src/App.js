import './App.css';
import Header from "./components/Header";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import Developers from "./pages/Developers";
import ContactDeveloper from "./pages/ContactDeveloper";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobDescription from "./pages/JobDescription";
import Registration from "./pages/Registration";
import UserEdit from "./pages/UserEdit";
import DeveloperProfileEdit from "./pages/DeveloperProfileEdit";
import UserSavedDevelopers from "./pages/UserSavedDevelopers";
import UserSavedJobs from "./pages/UserSavedJobs";
import UsersJobs from "./pages/UsersJobs";
import UserJobEdit from "./pages/UserJobEdit";

const App = () => {
    return (
      <Router>
        <div className="app">
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/registration">
                    <Registration/>
                </Route>
                <Route path="/developers/saved">
                    <Header/>
                    <UserSavedDevelopers/>
                </Route>
                <Route path="/jobs/saved">
                    <Header/>
                    <UserSavedJobs/>
                </Route>
                <Route path="/jobs/user">
                    <Header/>
                    <UsersJobs/>
                </Route>
                <Route path="/job/edit/:id">
                    <Header/>
                    <UserJobEdit/>
                </Route>
                <Route path="/job/edit">
                    <Header/>
                    <UserJobEdit/>
                </Route>
                <Route path="/developers/contact">
                    <Header/>
                    <ContactDeveloper/>
                </Route>
                <Route path="/developers/profile">
                    <Header/>
                    <Profile/>
                </Route>
                <Route path="/developers">
                    <Header/>
                    <Developers/>
                </Route>
                <Route path="/freelancer/profile">
                    <Header/>
                    <DeveloperProfileEdit/>
                </Route>
                <Route path="/jobs/description/:id">
                    <Header/>
                    <JobDescription/>
                </Route>
                <Route path="/jobs">
                    <Header/>
                    <Jobs/>
                </Route>
                <Route path="/user/profile">
                    <Header/>
                    <UserEdit/>
                </Route>
                <Route path="/">
                    <Header/>
                    <LandingPage/>
                    <Footer/>
                </Route>
            </Switch>
        </div>
      </Router>
    );
}

export default App;
