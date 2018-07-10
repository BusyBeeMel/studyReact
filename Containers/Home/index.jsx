import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import Home from '../../Components/Home'
import CardView from '../../Components/Forms/CardView';

// Actions
import * as ActionStat from '../../Data/Statistics/actions';

// Styles
import stylesHome from '../../Styles/Containers/Home.css';
import stylesHeader from '../../Styles/Components/Home.css';
import styles from '../../Styles/App.css';

// Utils

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            today: {
                commentAmount: 0,
                likeAmount:0,
                productSales:0,
                signup:0
            },
            weekly: {
                fundingSales: 0,
                marketSales: 0,
                signup: 0,
                signupDaily: []
            }
        }

        this.moreView = this.moreView.bind(this);
        this.fundingDetail = this.fundingDetail.bind(this);
        this.productOrderDetail = this.productOrderDetail.bind(this);
        this.goGoogle = this.goGoogle.bind(this);
    }

    componentDidMount(){
        let param = {};
        ActionStat.getStatisticsMain(param)
            .then((response)=>{
                console.log(response)
                if(response.code === 200){
                    this.setState({
                        today: response.data.today,
                        weekly: response.data.weekly
                    })
                }else{
                    alert('정보를 불러오지 못했습니다.');
                }

            })
            .catch((err)=>{
                alert('정보를 불러오지 못했습니다.');
            })
    }

    moreView(){
        alert('더보기')
    }

    fundingDetail(){
        alert('펀딩 자세히보기')
    }

    productOrderDetail(){
        alert('상품주문 자세히보기')
    }

    goGoogle(){
        window.open('https://analytics.google.com/analytics/web/provision/?authuser=0#provision/SignUp/');
    }

    render() {
        return (
            <div className={stylesHome.homeContainer}>
                <div className={stylesHeader.homeContainer}>

                    <li className={styles.inlineBlock}>
                        <div className={stylesHeader.today}>Today</div>
                    </li>
                    <li className={styles.inlineBlock}>
                        <div className={stylesHeader.todayCircle} style={{marginBottom:-3}}></div>
                    </li>

                    <div className={stylesHeader.countCardBox}>
                        <ul style={{width:960, backgroundColor:'rgba(244, 244, 244, 0.28)', height:130, borderRadius:20}}>
                            <li style={{marginLeft:10, marginTop:10}}>
                                <div style={{position:'absolute', left:0, top:75, width:80, height:80, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '-153px -141px', backgroundSize:320, opacity:0.5 }}></div>
                                <CardView
                                    text={['댓글', '좋아요']}
                                    subText={this.state.today.commentAmount}
                                    dualText={this.state.today.likeAmount}
                                    type={'dual'}
                                />
                            </li>
                            <li>
                                <div style={{position:'absolute', left:235, top:80, width:70, height:70, backgroundImage:'url(/assets/img/ic_statistics.png)', backgroundPosition: '-126px -2px', backgroundSize:600}}></div>
                                <CardView
                                    text={'펀딩 & 상품'}
                                    subText={this.state.today.productSales}
                                    type={'single'}
                                />
                            </li>
                            <li>
                                <div style={{position:'absolute', left:470, top:80, width:70, height:70, backgroundImage:'url(/assets/img/ic_dashboard_home.png)', backgroundPosition: '-235px -8px', backgroundSize:600}}></div>
                                <CardView
                                    text={'신규가입'}
                                    subText={this.state.today.signup}
                                    type={'single'}
                                />
                            </li>
                            <li>
                                <CardView
                                    text={'Google Analytics'}
                                    subText={'확인하기'}
                                    type={'google'}
                                    goGoogle={this.goGoogle}
                                />
                            </li>
                        </ul>
                    </div>

                    <div className={stylesHeader.underLine}></div>

                    <div>
                        <li className={styles.inlineBlock}>
                            <div className={stylesHeader.weekly}>Weekly</div>
                        </li>
                        <li className={styles.inlineBlock}>
                            <div className={stylesHeader.weeklyCircle}></div>
                        </li>
                    </div>


                    <div style={{float:'left', width:448, height:500, marginRight:20}}>
                        <div className={stylesHeader.weeklySubText}>가입자 통계</div>

                        <div style={{backgroundColor:'rgba(244, 244, 244, 0.28)', width:468, padding:10, borderRadius:20}}>
                            <div style={{position:'absolute', left:350, top:335, width:90, height:70, backgroundImage:'url(/assets/img/bg_order.png)', backgroundSize:'cover'}}></div>
                          <CardView
                            text={'총 가입자 수'}
                            subText={this.state.weekly.signup}
                            type={'horizontal_sm'}
                          />

                          <div style={{height:11}}></div>

                            <div style={{position:'absolute', left:22, top:579, width:80, height:75, backgroundImage:'url(/assets/img/ic_dashboard_home.png)', backgroundPosition: '-228px -8px', backgroundSize:600}}></div>
                          <CardView
                            text={'총 가입자 수'}
                            subText={this.state.weekly.signupDaily}
                            type={'chart'}
                          />
                        </div>

                    </div>
                    <div style={{float:'left', width:458, height:500}}>
                        <div style={{display:'inline-block', position:'relative', top:0, left:0, width:'100%'}}>
                            <div className={stylesHeader.weeklySubRightText}>펀딩 & 주문 액</div>
                            <div onClick={this.moreView} className={stylesHeader.weeklySubRightMoreText}>더보기</div>
                        </div>


                      <div style={{backgroundColor:'rgba(244, 244, 244, 0.28)', width:478, padding:10, borderRadius:20, marginTop:-5}}>
                        <div style={{float:'left'}}>
                            <div style={{position:'absolute', left:515, top:290, width:185, height:205, backgroundImage:'url(/assets/img/bg_funding.png)', backgroundSize:'contain'}}></div>
                          <CardView
                            text={'펀딩'}
                            subText={this.state.weekly.fundingSales}
                            type={'vertical'}
                            detailGo={this.fundingDetail}
                          />
                        </div>
                        <div style={{float:'left', marginLeft:12}}>
                            <div style={{position:'absolute', left:746, top:310, width:185, height:180, backgroundImage:'url(/assets/img/bg_market.png)', backgroundSize:'contain'}}></div>
                          <CardView
                            text={'상품주문'}
                            subText={this.state.weekly.marketSales}
                            type={'vertical'}
                            detailGo={this.productOrderDetail}
                          />
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HomeContainer));