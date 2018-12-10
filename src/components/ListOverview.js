import React from 'react';
import { connect } from 'react-redux';
import ListLink from './ListLink';

const ListOverview = (props) => (
    <div className="content-container">
        <div className="lists-header">
            <div className="show-for-mobile">Listnames</div>
            <div className="show-for-desktop">Listname</div>
            <div className="show-for-desktop">Created at</div>
        </div>
        <div className="lists-body">
            {props.lists.length === 0 ?
                <div className="lists-item lists-item--message">
                    <span>No lists yet</span>
                </div>
                :
                (
                    props.lists.map((list) => <ListLink key={list.id} {...list} />)
                )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    lists: state.lists
});

export default connect(mapStateToProps)(ListOverview);