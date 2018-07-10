import React from 'react';
import {
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// CSS
import stylesForm from '../../Styles/Components/FormLayout.css';
import styles from '../../Styles/App.css';
import Config from "../../Lib/Api/config";
import * as convert from "../../Lib/Utils/converter";

//
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
    }

    render() {
        if (this.props.type === 'single') {
            return (
                <div className={stylesForm.cardContainer}>
                    <div className={stylesForm.singleInner}>
                        <div className={styles.cardTitleText}>
                            {this.props.text}
                        </div>
                        <div className={styles.cardSubText}>
                            {convert.converNumberComma(this.props.subText)}
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.type === 'dual') {
            return (
                <div className={stylesForm.cardContainer}>
                    <div className={stylesForm.dualInner}>
                        <div className={styles.cardTitleText}>
                            {this.props.text[0]}
                        </div>
                        <div className={styles.cardSubText}>
                            {convert.converNumberComma(this.props.subText)}
                        </div>
                    </div>
                    <div className={stylesForm.dualInner}>
                        <div className={styles.cardTitleText}>
                            {this.props.text[1]}
                        </div>
                        <div className={styles.cardSubText}>
                            {convert.converNumberComma(this.props.dualText)}
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.type === 'google') {
            return (
                <div onClick={this.props.goGoogle} className={stylesForm.cardGoogleContainer} style={{cursor:'pointer'}}>
                    <div className={stylesForm.singleInner}>
                        <div className={stylesForm.googleText}>
                            {this.props.text}
                        </div>
                        <div className={stylesForm.googleSubText}>
                            {this.props.subText}
                        </div>
                    </div>
                </div>
            )
        }else if(this.props.type === 'horizontal_sm'){
            return (
                <div className={styles.cardHorizonSmBox}>
                    <div className={stylesForm.singleInner}>
                        <div className={styles.cardHorizonText} >
                            {this.props.text}
                        </div>
                        <div className={styles.cardHorizonSub} >
                            {convert.converNumberComma(this.props.subText)}
                        </div>
                    </div>
                </div>
                )
        }else if(this.props.type === 'chart'){
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

            return (
                <div className={stylesForm.cardChartContainer}>
                    <div className={stylesForm.singleInner}>
                        <Bar
                            data={data}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: true
                            }}
                        />
                    </div>
                </div>
            )
        }else if(this.props.type === 'vertical'){
            return (
                <div className={stylesForm.cardVerticalContainer}>
                    <div className={stylesForm.singleInner}>
                        <div className={styles.cardHorizonText} style={{width:'100%', textAlign:'center', paddingLeft:0, marginTop:185}}>
                            {this.props.text}
                        </div>
                        <div className={styles.cardHorizonSub} style={{width:'100%', textAlign:'center', paddingLeft:0}}>
                            {convert.converNumberComma(this.props.subText)}<span style={{fontSize:18}}>원</span>
                        </div>
                        <div className={styles.cardHorizonText} style={{width:'100%', textAlign:'center', paddingLeft:0}}>
                            <label onClick={()=>this.props.detailGo()} className={stylesForm.horizonLabel}>자세히보기 →</label>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
export default connect()(withRouter(CardView));
