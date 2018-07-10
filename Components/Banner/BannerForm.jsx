import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components


// Styles
import stylesBanner from '../../Styles/Components/Banner.css';
import styles from '../../Styles/App.css';

// Utils

class BannerForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleImageChange = this.handleImageChange.bind(this);
        this.productIdChange = this.productIdChange.bind(this);
        // this.contentTitleChange = this.contentTitleChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.submitBanner = this.submitBanner.bind(this);
    }

    handleImageChange(e){
        this.props.imageUrlChange(e.target.files[0]);
    }

    productIdChange(text){
        this.props.productIdChange(text);
    }

    // contentTitleChange(text){
    //     this.props.contentTitleChange(text);
    // }

    titleChange(text){
        this.props.titleChange(text);
    }

    /**
     *  배너 등록
     */
    submitBanner(){
        this.props.submitBanner()
    }

    render() {
        return (
            <div className={stylesBanner.bannerFormBox} >
                <div className={stylesBanner.bannerFormTable}>

                    <div className={stylesBanner.leftBox}>
                        <div className={stylesBanner.imageBox} style={{backgroundImage:'url('+this.props.imageUrl+')', backgroundSize:'cover'}}>
                            <div className={stylesBanner.imgAddBtn}>
                                <label className={stylesBanner.inputLabel} htmlFor={'uploadImage'}>썸네일 등록</label>
                                <input onChange={(e) => this.handleImageChange(e)} id={'uploadImage'} className={stylesBanner.inputFile}  type={'file'} accept={'image/*'} />
                            </div>

                            <div className={stylesBanner.imgDescription}>
                                이미지 크기는 322*316px가
                                제일 적합합니다
                            </div>

                            {/*<div className={stylesBanner.sellevCircle}>*/}
                                {/*<label>셀레버</label>*/}
                            {/*</div>*/}

                        </div>
                    </div>

                    <div className={stylesBanner.rightBox}>

                        <div className={stylesBanner.inputBox}>
                            <div className={stylesBanner.formInputLong}>
                                <div className={stylesBanner.titleCellLong}>
                                    <div className={stylesBanner.titleText}>상품ID</div>
                                </div>
                                <div className={stylesBanner.inputCell}>
                                    <input value={this.props.productId}
                                           onChange={(e) => this.productIdChange(e.target.value)}
                                           className={stylesBanner.formInput}
                                           placeholder={'상품ID를 입력해주세요.'}/>
                                </div>
                            </div>

                            {/*<div className={stylesBanner.formInputShort}>*/}
                                {/*<div className={stylesBanner.titleCellShort}>*/}
                                    {/*<div className={stylesBanner.titleText}>콘텐츠명</div>*/}
                                {/*</div>*/}
                                {/*<div className={stylesBanner.inputCell}>*/}
                                    {/*<input value={this.props.contentTitle}*/}
                                           {/*onChange={(e) => this.contentTitleChange(e.target.value)}*/}
                                           {/*className={stylesBanner.formInput}*/}
                                           {/*placeholder={'펀딩'}/>*/}
                                {/*</div>*/}
                            {/*</div>*/}

                            <div className={stylesBanner.formInputLong}>
                                <div className={stylesBanner.titleCellLong}>
                                    <div className={stylesBanner.titleText}>배너용제목</div>
                                </div>
                                <div className={stylesBanner.inputCell}>
                                    <input value={this.props.title}
                                           onChange={(e) => this.titleChange(e.target.value)}
                                           className={stylesBanner.formInput}
                                           placeholder={'배너용 제목을 입력해주세요.'}/>
                                </div>
                            </div>

                        </div>


                        <div className={stylesBanner.addBtn} onClick={this.submitBanner}>
                            등록
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
})(withRouter(BannerForm));