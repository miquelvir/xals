import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFoundPage from "./pages/notFoundPage/notFoundPage";
import PrivateRoute from "./helpers/privateRoute";
import RestaurantDashboardPage from "./pages/restaurantDashboardPage/restaurantDashboardPage";
import { userContext } from './contexts/userContext';
import AdminDashboardPage from "./pages/adminDashboardPage/adminDashboardPage";
import LoginPage from "./pages/loginPage/loginPage";
import { BaseConfirmContextProvider } from './contexts/confirmContext';
import { ThemeContextProvider } from './contexts/themeContext';
import { palette } from './palette';
import {LanguageContextProvider} from './contexts/languageContext';

function App() {
    const routerRef = React.createRef();

    const [user, setUser] = useState({ logged: false, ping: true });
    return (
        <ThemeContextProvider>
            <div className={`App ${palette.bg} min-h-screen min-w-screen`}>
                <LanguageContextProvider>
                    <userContext.Provider value={{ user: user, setUser: setUser, }}>
                        <BaseConfirmContextProvider>
                            <BrowserRouter ref={routerRef} basename="/app">
                                <Switch>
                                    <PrivateRoute path={'/admin'} baseRouter={routerRef} component={AdminDashboardPage} />
                                    <Route path={'/restaurant'} component={RestaurantDashboardPage} />
                                    <Route path={'/login'} component={LoginPage} />
                                    <Route component={NotFoundPage} />
                                </Switch>
                            </BrowserRouter>
                        </BaseConfirmContextProvider>
                    </userContext.Provider>
                    </LanguageContextProvider>
            </div>
        </ThemeContextProvider>
    );
}

export default App;
