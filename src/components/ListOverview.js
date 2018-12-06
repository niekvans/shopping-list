import React from 'react';
import { connect } from 'react-redux';
import ListLink from './ListLink';

const ListOverview = (props) => (
    <div>
        <h1>Lists</h1>
        {props.lists.length === 0 ? <p>No lists yet</p>
            :
            (
                props.lists.map((list) => <ListLink key={list.id} {...list} />)
            )
        }
    </div>
);

const mapStateToProps = (state) => ({
    lists: state.lists
});

export default connect(mapStateToProps)(ListOverview);