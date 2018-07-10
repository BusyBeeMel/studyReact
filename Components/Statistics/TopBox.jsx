import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// Components
import DateCustomInput from '../../Common/Date/DateCustomInput';
import CardView from '../../Components/Statistics/CardView';

// Styles
import stylesHeader from '../../Styles/Components/Home.css';

// Utils
import DatePicker from 'react-datepicker';

class TopBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={stylesHeader.countCardBox}>
                <ul style={{width:960, backgroundColor:'rgba(244, 244, 244, 0.28)', height:150, borderRadius:20, margin:0, padding:0}}>
                    <li style={{marginTop:30, marginLeft:10, display:'inline-block'}}>
                        <CardView
                            title={'총 결제금액'}
                            subText={this.state.totalPay}
                            type={'single'}
                        />
                    </li>

                    <li style={{display:'inline-block', marginLeft:10}}>
                        <CardView
                            title={'총 주문'}
                            subText={this.state.totalOrder}
                            type={'single'}
                        />
                    </li>

                    <li style={{display:'inline-block', marginLeft:10}}>
                        <CardView
                            title={'Google Analytics'}
                            subText={'확인하기'}
                            type={'google'}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

export default TopBox;