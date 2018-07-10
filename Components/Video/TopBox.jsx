import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components


// Styles
import stylesVideo from '../../Styles/Components/Video.css';
import styles from '../../Styles/App.css';
import {categoryId2Name} from "../../Data/Product/category";

// Utils

class TopBox extends React.Component {
    constructor(props) {
        super(props);

        this.titleChange = this.titleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.sellevChange = this.sellevChange.bind(this);
        this.youtubeUrlChange = this.youtubeUrlChange.bind(this);
        this.secondsChange= this.secondsChange.bind(this);
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

    youtubeUrlChange(text){
        this.props.youtubeUrlChange(text);
    }

    secondsChange(text){
        this.props.secondsChange(text);
    }

    categoryChange(text){
        this.props.categoryChange(text);
    }

    render() {
        return (
            <div className={stylesVideo.formTopBox} >
                <div className={stylesVideo.formTable}>

                    <div className={stylesVideo.leftBox}>
                        <div className={stylesVideo.imageBox} style={{backgroundImage:'url('+this.props.imageUrl+')', backgroundSize:'cover'}}>
                            <div className={stylesVideo.imgAddBtn}>
                                <label className={stylesVideo.inputLabel} htmlFor={'uploadImage'}>썸네일 등록</label>
                                <input onChange={(e) => this.handleImageChange(e)} id={'uploadImage'} className={stylesVideo.inputFile}  type={'file'} accept={'image/*'} />
                            </div>

                            <div className={stylesVideo.imgDescription}>
                                이미지 크기는 482*384px가
                                제일 적합합니다
                            </div>

                            {/*<div className={stylesVideo.sellevCircle}>*/}
                                {/*<label>셀레버</label>*/}
                            {/*</div>*/}

                        </div>
                    </div>

                    <div className={stylesVideo.rightBox}>

                        <div className={stylesVideo.inputBox}>
                            <div className={stylesVideo.formInputFirstTable}>
                                <div className={stylesVideo.titleCellLong}>
                                    <div className={stylesVideo.titleText}>제목</div>
                                </div>
                                <div className={stylesVideo.inputCell}>
                                    <input value={this.props.title}
                                           onChange={(e) => this.titleChange(e.target.value)}
                                           className={stylesVideo.formInput}
                                           placeholder={'제목을 20자 이내로 적어주세요.'}/>
                                </div>
                            </div>

                            <div className={stylesVideo.formInputTable}>
                                <div className={stylesVideo.titleCellLong}>
                                    <div className={stylesVideo.titleText}>셀레버ID</div>
                                </div>
                                <div className={stylesVideo.inputCell}>
                                    <input value={this.props.sellevId}
                                           onChange={(e) => this.sellevChange(e.target.value)}
                                           className={stylesVideo.formInput}
                                           placeholder={'셀레버ID를 입력해주세요'}/>
                                </div>
                            </div>

                            <div className={stylesVideo.formInputTable}>
                                <div className={stylesVideo.titleCellLong}>
                                    <div className={stylesVideo.titleText}>영상URL</div>
                                </div>
                                <div className={stylesVideo.inputCell}>
                                    <input value={this.props.youtubeUrl}
                                           onChange={(e) => this.youtubeUrlChange(e.target.value)}
                                           className={stylesVideo.formInput}
                                           placeholder={'영상 URL을 적어주세요.'}/>
                                </div>
                            </div>

                            <div className={stylesVideo.formInputTable}>
                                <div className={stylesVideo.titleCellLong}>
                                    <div className={stylesVideo.titleText}>재생시간</div>
                                </div>
                                <div className={stylesVideo.inputCell}>
                                    <input value={this.props.seconds}
                                           onChange={(e) => this.secondsChange(e.target.value)}
                                           className={stylesVideo.formInput}
                                           placeholder={'초단위로 적어주세요. (ex: 3분짜리면 180)'}/>
                                </div>
                            </div>

                            <div className={stylesVideo.formInputTable}>
                                <div className={stylesVideo.titleCellLong}>
                                    <div className={stylesVideo.titleText}>카테고리</div>
                                </div>
                                <div className={stylesVideo.inputCell}>
                                    <select value={this.props.category} onChange={(e) => this.categoryChange(e.target.value)} >
                                        <option value={100}>{categoryId2Name[100]}</option>
                                        <option value={101}>{categoryId2Name[101]}</option>
                                        <option value={102}>{categoryId2Name[102]}</option>
                                        <option value={103}>{categoryId2Name[103]}</option>
                                        <option value={104}>{categoryId2Name[104]}</option>
                                        <option value={105}>{categoryId2Name[105]}</option>
                                        <option value={106}>{categoryId2Name[106]}</option>
                                        <option value={107}>{categoryId2Name[107]}</option>
                                        <option value={108}>{categoryId2Name[108]}</option>
                                        <option value={200}>{categoryId2Name[200]}</option>
                                        <option value={201}>{categoryId2Name[201]}</option>
                                        <option value={202}>{categoryId2Name[202]}</option>
                                        <option value={203}>{categoryId2Name[203]}</option>
                                        <option value={204}>{categoryId2Name[204]}</option>
                                        <option value={205}>{categoryId2Name[205]}</option>
                                        <option value={206}>{categoryId2Name[206]}</option>
                                        <option value={207}>{categoryId2Name[207]}</option>
                                        <option value={208}>{categoryId2Name[208]}</option>
                                        <option value={209}>{categoryId2Name[209]}</option>
                                        <option value={210}>{categoryId2Name[210]}</option>
                                        <option value={211}>{categoryId2Name[211]}</option>
                                        <option value={212}>{categoryId2Name[212]}</option>
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