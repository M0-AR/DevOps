import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import {useEffect} from "react";
import {CookiesProvider, useCookies} from "react-cookie";

function App() {
    useEffect(() => {
        document.title = "BookUs - Booking Service"
    })
    return (
        <div className="App">
            <CookiesProvider>
                    <Page/>
            </CookiesProvider>
        </div>
    );
}

const Page = () => {
    const [cookies] = useCookies();

    if (cookies.ticket) return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path='/' exact component={Dashboard}/>
            </Switch>
        </Router>
    )
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/signin' component={Login}/>
                <Route path='/' component={Dashboard}/>
                <Route path='/signup' component={Registration}/>
            </Switch>
        </Router>
    )
}

export default App;
