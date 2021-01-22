import './App.css';
import Header from "./components/Header";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Developers from "./components/Developers";
import ContactDeveloper from "./components/ContactDeveloper";
import Profile from "./components/Profile";

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
