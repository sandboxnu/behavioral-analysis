import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserSignIn from './UserSignIn';
import AdminPanel from './AdminPanel';

function AppRouter() {
    return (
        <Router>
            <div className='App'>
                <Route path='/admin' exact component={AdminPanel}/>
                <Route
                    path='/a'
                    render={(props) => <UserSignIn {...props} condition={"A"} />}
                />
                <Route
                    path='/b'
                    render={(props) => <UserSignIn {...props} condition={"B"} />}
                />
                <Route
                    path='/c'
                    render={(props) => <UserSignIn {...props} condition={"C"} />}
                />
                <Route
                    path='/d'
                    render={(props) => <UserSignIn {...props} condition={"D"} />}
                />
               <Route
                    path='/'
                    render={(props) => <UserSignIn {...props} condition={"A"} />}
                />
            </div>
        </Router>
    );
}

export default AppRouter;