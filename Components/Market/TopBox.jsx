import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components


// Styles
import styleMarket from '../../Styles/Components/Market.css';
import styles from '../../Styles/App.css';
import {categoryId2Name} from "../../Data/Product/category";

// Utils

class TopBox extends React.Component {
    constructor(props) {
        super(props);

        this.titleChange = this.titleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.sellevChange = this.sellevChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
    }

    handleImageChange(e){
        this.props.imageChange(e.target.files[0]);
    }

    titleChange(text){
        this.props.titleChange(text);
    }

    sellevChange(text){
        this.props.sellevChange(text);
    }

    priceChange(text){
        this.props.priceChange(text);
    }

    categoryChange(text){
        this.props.categoryChange(text);
    }

    render() {
        return (
            <div className={styleMarket.formTopBox} >
                <div className={styleMarket.formTable}>
                    <div className={styleMarket.leftBox}>
                        <div className={styleMarket.imageBox} style={{backgroundImage:'url('+this.props.imageUrl+')', backgroundSize:'cover'}}>
                            <div className={styleMarket.imgAddBtn}>
                                <label className={styleMarket.inputLabel} htmlFor={'uploadImage'}>썸네일 등록</label>
                                <input onChange={(e) => this.handleImageChange(e)} id={'uploadImage'} className={styleMarket.inputFile}  type={'file'} accept={'image/*'} />
                            </div>

                            <div className={styleMarket.imgDescription}>
                                이미지 크기는 482*384px가
                                제일 적합합니다
                            </div>

                            {/*<div className={styleMarket.sellevCircle}>*/}
                                {/*<label>셀레버</label>*/}
                            {/*</div>*/}

                        </div>
                    </div>

                    <div className={styleMarket.rightBox}>

                        <div className={styleMarket.inputBox}>
                            <div className={styleMarket.formInputFirstTable}>
                                <div className={styleMarket.titleCellLong}>
                                    <div className={styleMarket.titleText}>제목</div>
                                </div>
                                <div className={styleMarket.inputCell}>
                                    <input value={this.props.title}
                                           onChange={(e) => this.titleChange(e.target.value)}
                                           className={styleMarket.formInput}
                                           placeholder={'제목을 20자 이내로 적어주세요.'}/>
                                </div>
                            </div>

                            <div className={styleMarket.formInputTable}>
                                <div className={styleMarket.titleCellLong}>
                                    <div className={styleMarket.titleText}>셀레버ID</div>
                                </div>
                                <div className={styleMarket.inputCell}>
                                    <input value={this.props.sellevId}
                                           onChange={(e) => this.sellevChange(e.target.value)}
                                           className={styleMarket.formInput}
                                           placeholder={'셀레버ID를 적어주세요.'}/>
                                </div>
                            </div>

                            {/*<div className={styleMarket.formInputTable}>*/}
                                {/*<div className={styleMarket.titleCellLong}>*/}
                                    {/*<div className={styleMarket.titleText}>상품단가</div>*/}
                                {/*</div>*/}
                                {/*<div className={styleMarket.inputCell}>*/}
                                    {/*<input value={this.props.price}*/}
                                           {/*onChange={(e) => this.priceChange(e.target.value)}*/}
                                           {/*className={styleMarket.formInput}*/}
                                           {/*placeholder={'목표액을 적어주세요.'}/>*/}
                                    {/*<label className={styleMarket.inputRightCount}>원</label>*/}
                                {/*</div>*/}
                            {/*</div>*/}

                            <div className={styleMarket.formInputTable}>
                                <div className={styleMarket.titleCellLong}>
                                    <div className={styleMarket.titleText}>카테고리</div>
                                </div>
                                <div className={styleMarket.inputCell}>
                                    <select value={this.props.category} onChange={(e) => this.categoryChange(e.target.value)} >
                                        <option value={1}>{categoryId2Name[1]}</option>
                                        <option value={2}>{categoryId2Name[2]}</option>
                                        <option value={3}>{categoryId2Name[3]}</option>
                                        <option value={4}>{categoryId2Name[4]}</option>
                                        <option value={5}>{categoryId2Name[5]}</option>
                                        <option value={6}>{categoryId2Name[6]}</option>
                                        <option value={7}>{categoryId2Name[7]}</option>
                                        <option value={8}>{categoryId2Name[8]}</option>
                                        <option value={9}>{categoryId2Name[9]}</option>
                                        <option value={10}>{categoryId2Name[10]}</option>
                                        <option value={11}>{categoryId2Name[11]}</option>
                                        <option value={12}>{categoryId2Name[12]}</option>
                                        <option value={13}>{categoryId2Name[13]}</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <div className={styles.space30}></div>

            </div>
        );
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(TopBox));