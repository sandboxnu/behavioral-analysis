import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserSignIn from './UserSignIn';
import AdminPanel from './AdminPanel';
import End from './End';

function AppRouter() {
    return (
        <Router>
            <div className='App'>
               <End/>
            </div>
        </Router>
    );
}

export default AppRouter;

{/* <Route path='/admin' exact component={AdminPanel}/>
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
    path='/' exact component={UserSignIn}
/> */}