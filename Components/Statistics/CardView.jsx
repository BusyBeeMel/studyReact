import React from 'react';
import {
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// CSS
import stylesForm from '../../Styles/Components/Statistics.css';
import styles from '../../Styles/App.css';

import * as convert from "../../Lib/Utils/converter";

import {Bar} from 'react-chartjs-2';

import moment from "moment/moment";
moment.lang('ko', {
    weekdays: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
    weekdaysShort: ["일","월","화","수","목","금","토"],
});

/*
* this.props.force
*/
class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let {type, title, subText} = this.props;

        if(type === '1'){
            return (
                <div className={stylesForm.cardContainer}>
                    <div className={stylesForm.singleInner}>
                        <div className={styles.cardTitleText}>
                            {title}
                        </div>
                        <div className={styles.cardSubText}>
                            {convert.converNumberComma(subText)}
                        </div>
                    </div>
                </div>
            );
        }else if(type === '2'){
            return (
                <div className={stylesForm.cardSmContainer}>
                    <div className={stylesForm.singleInner}>
                        <div className={styles.cardTitleText}>
                            {title}
                        </div>
                        <div className={styles.cardSubText}>
                            {convert.converNumberComma(subText)}
                        </div>
                    </div>
                </div>
            );
        }else if(type === '3'){
            return (
                <div className={stylesForm.bottomLeftCard}>
                    <div className={stylesForm.singleInner}>
                        <div className={styles.cardTitleText}>
                            {title}
                        </div>
                        <div className={styles.cardSubText} >
                            {subText}
                        </div>
                    </div>
                </div>
            )
        }else if(type === '4'){
            let arr = [];
            let totalCnt = 0;
            let result = [];
            console.log(this.props.subText)
            if(this.props.subText.length > 0){
                this.props.subText.map((key, i)=>{
                    console.log(key.date)
                    let dt = moment(key.date);
                    console.log(dt.format("ddd"));

                    arr.push(dt.format("ddd"))
                    totalCnt += key.prices;
                    result.push(key.prices);
                })
            }

            let data = {
                labels: arr,
                datasets: [
                    {
                        label: totalCnt,
                        backgroundColor: 'rgba(250, 40, 40, 0.72)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: '#fa2828',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: result
                    }
                ]
            };
            return(
                <div className={stylesForm.bottomRightCard}>
                    <div className={stylesForm.singleInner}>
                        <Bar
                            data={data}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                </div>
            )
        }else if(type === '5'){
            let arr = [];
            let totalCnt = 0;
            let result = [];
            console.log(this.props.subText)
            if(this.props.subText.length > 0){
                this.props.subText.map((key, i)=>{
                    console.log(key.date)
                    let dt = moment(key.date);
                    console.log(dt.format("ddd"));

                    arr.push(dt.format("ddd"))
                    totalCnt += key.count;
                    result.push(key.count);
                })
            }

            let data = {
                labels: arr,
                datasets: [
                    {
                        label: totalCnt,
                        backgroundColor: 'rgba(250, 40, 40, 0.72)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: '#fa2828',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: result
                    }
                ]
            };
            return(
                <div className={stylesForm.bottomRightCard}>
                    <div className={stylesForm.singleInner}>
                        <Bar
                            data={data}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                </div>
            )
        }else if(type === 'google'){
            return (
                <div onClick={this.props.goGoogle} className={stylesForm.cardContainer} style={{backgroundColor:'#fa2828', cursor:'pointer'}}>
                    <div className={stylesForm.singleInner}>
                        <div className={styles.cardTitleText} style={{color:'#ffffff'}}>
                            {title}
                        </div>
                        <div className={styles.cardSubText} style={{color:'#ffffff'}}>
                            {subText}
                        </div>
                    </div>
                </div>
            );
        }else if(type === 'weekly') {
            return(
                <div className={stylesForm.bottomLeftCard} style={{backgroundColor:'#fa2828'}}>
                    <div className={stylesForm.singleInner} style={{marginLeft:-25}}>
                        <div className={styles.cardTitleText} style={{color:'#ffffff', marginTop:50}}>
                            {title}
                        </div>
                        <div className={styles.cardSubText} style={{color:'#ffffff'}}>
                            {subText}
                        </div>
                    </div>
                </div>
                )
        }
    }
}
export default connect()(withRouter(CardView));
