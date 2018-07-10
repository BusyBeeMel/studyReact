import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import stylesStat from '../../Styles/Components/Statistics.css';

// Utils

class CategoryTabs extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let {selectedTab} = this.props;

        return (
            <div >
                <ul className={stylesStat.navTabs}>
                    {
                        this.props.tabs.map((key, i)=>{

                            return(
                                <li key={i} onClick={() => this.props.onTabChange(i)}>
                                    {
                                        i === selectedTab
                                            ?
                                            <span className={stylesStat.tabTextStyle + ' ' + stylesStat.active} >{key}</span>
                                            :
                                            <span className={stylesStat.tabTextStyle} >{key}</span>
                                    }

                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(CategoryTabs));