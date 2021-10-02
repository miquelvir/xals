import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFoundPage from "./pages/notFoundPage/notFoundPage";
import PrivateRoute from "./helpers/privateRoute";
import RestaurantDashboardPage from "./pages/restaurantDashboardPage/restaurantDashboardPage";
import {userContext} from './contexts/userContext';
import AdminDashboardPage from "./pages/adminDashboardPage/adminDashboardPage";
import LoginPage from "./pages/loginPage/loginPage";

function App() {
    const routerRef = React.createRef();

    const [user, setUser] = useState({logged: false, ping: true});
    return (
        <div className="App">
            <userContext.Provider value={{user: user, setUser: setUser,}}>
                <BrowserRouter ref={routerRef} basename="/app">
                    <Switch>
                        <PrivateRoute path={'/admin'} baseRouter={routerRef} component={AdminDashboardPage}/>
                        <Route path={'/restaurant'} component={RestaurantDashboardPage}/>
                        <Route path={'/login'} component={LoginPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </BrowserRouter>
            </userContext.Provider>
        </div>
    );
}

export default App;
