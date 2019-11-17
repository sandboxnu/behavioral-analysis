import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserSignIn from './UserSignIn';
import AdminPanel from './AdminPanel';

function AppRouter() {
    return (
        <Router>
            <div className='App'>
                <Route path='/admin' exact component={AdminPanel}/>
                <Route path='/' exact component={UserSignIn}/>
            </div>
        </Router>
    );
}

export default AppRouter;