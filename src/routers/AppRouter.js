import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import DashboardPage from './../components/DashboardPage';
import LoginPage from './../components/LoginPage';
import AddListPage from '../components/AddListPage';
import EditListPage from '../components/EditListPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={DashboardPage} exact={true} />
                <PrivateRoute path="/create" component={AddListPage} exact={true} />
                <PrivateRoute path="/edit/:id" component={EditListPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
)


export default AppRouter;