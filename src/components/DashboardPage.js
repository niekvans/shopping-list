import React from 'react';
import { Link } from 'react-router-dom';
import ListOverview from './ListOverview';

const DashboardPage = () => (
    <div>
        <Link to="/create">Add new list</Link>
        <ListOverview />
    </div>
);

export default DashboardPage;