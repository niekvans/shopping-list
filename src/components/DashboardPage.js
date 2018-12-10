import React from 'react';
import { Link } from 'react-router-dom';
import ListOverview from './ListOverview';

const DashboardPage = () => (
    <div>
        <div className="page-header">
            <div className="content-container">                
                <Link className="button" to="/create">Add new list</Link>
            </div>
        </div>
        <ListOverview />
    </div>
);

export default DashboardPage;