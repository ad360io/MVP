/*
Core Libs
*/
import React from 'react';

/*
Material UI Components
*/
import { Card, CardText } from 'material-ui/Card';

/*
Navigation
*/
import { Link } from 'react-router-dom';

/*
Local CSS
*/
import './DashboardPlaceholder.component.css';


const DashboardPlaceholder = () => (
    <Card className="dashboard-placeholder-container">
        <CardText>
            <h2 className="dashboard-placeholder-text">No analytical data available for your account yet.</h2> <br />
            <h3 className="dashboard-placeholder-text">Get Started:  </h3>
            <ul className="dashboard-placeholder-text">
                <li className="dashboard-placeholder-li">Pop into our <Link to="/marketplace">Marketplace</Link> to start shopping.</li>
                <li className="dashboard-placeholder-li"><Link to="/create">Create</Link> your own listings for others to buy.</li>
                <li className="dashboard-placeholder-li">Check your <Link to="/profile">Invites</Link> to see if others want to get in touch with you.</li>
            </ul>
        </CardText>
    </Card>

)


export default DashboardPlaceholder;