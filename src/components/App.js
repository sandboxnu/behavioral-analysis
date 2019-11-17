import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Launch from './Launch';
import AdminPanel from './AdminPanel';

function AppRouter() {
    return (
        <Router>
            <div className='App'>
                <Route path='/admin' exact component={AdminPanel}/>
                <Route path='/' exact component={Launch}/>
            </div>
        </Router>
    );
}

export default AppRouter;