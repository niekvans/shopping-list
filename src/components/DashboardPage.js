import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => (
    <div>
        <Link to="/create">Add new list</Link>
    </div>
);

export default DashboardPage;