import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserSignIn from './components/UserSignIn';
import AdminPanel from './components/AdminPanel';

function AppRouter() {
    return (
        <Router>
            <div className='App'>
                <Route path='/admin' exact component={AdminPanel} />
                <Route
                    path='/blue'
                    render={(props) => <UserSignIn {...props} condition={"A"} />}
                />
                <Route
                    path='/red'
                    render={(props) => <UserSignIn {...props} condition={"B"} />}
                />
                <Route
                    path='/teal'
                    render={(props) => <UserSignIn {...props} condition={"C"} />}
                />
                <Route
                    path='/green'
                    render={(props) => <UserSignIn {...props} condition={"D"} />}
                />
                <Route
                    path='/tutorial'
                    render={(props) => <UserSignIn {...props} condition={"tutorial"} />}
                />
                <Route
                    path='/' exact component={UserSignIn}
                />
            </div>
        </Router>
    );
}

export default AppRouter;