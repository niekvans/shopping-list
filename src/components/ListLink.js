import React from 'react';
import { Link } from 'react-router-dom';

const ListLink = ({ id, title }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h1>{title}</h1>
        </Link>
    </div>
);

export default ListLink;