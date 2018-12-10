import React from 'react';
import { Link } from 'react-router-dom';

const ListLink = ({ id, title }) => (
    <div>
        <Link className="lists-item" to={`/edit/${id}`}>
            <h3 className="lists-item__title">{title}</h3>
        </Link>
    </div>
);

export default ListLink;