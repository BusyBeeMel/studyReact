import React from "react";

import styles from '../../Styles/Common/Date.css';
import * as DateUtil from "../../../Admin/Lib/Utils/date";

export default class DateCustomInput extends React.Component {
    render () {
        return (
            <div className={styles.dateInput} onClick={this.props.onClick} >
                {
                    this.props.dateText === '' ?
                        this.props.placeholderText
                    :
                        DateUtil.format('defalut', this.props.dateText)

                }
            </div>
        )
    }
}