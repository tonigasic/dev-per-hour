import './App.css';
import Header from "./components/Header";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import Developers from "./pages/Developers";
import ContactDeveloper from "./pages/ContactDeveloper";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobDescription from "./pages/JobDescription";

function App() {
  return (
      <Router>
        <div className="app">
            <Switch>
                <Route path="/login">
                    <Login/>
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
                <Route path="/jobs/description">
                    <Header/>
                    <JobDescription/>
                </Route>
                <Route path="/jobs">
                    <Header/>
                    <Jobs/>
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
