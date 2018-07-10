import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Config from '../../Lib/Api/config';

// Components
import TableComponent from '../../Common/Table'

// Actions
import * as ActionHashtag from "../../Data/HashTag/actions";
import * as ActionUpload from "../../Data/FileUpload/actions";

// Styles
import stylesHashtag from '../../Styles/Containers/Hashtag.css';
import stylesTable from '../../Styles/Common/Table.css'
import styles from '../../Styles/App.css';

// Utils
import * as DateUtil from "../../../Admin/Lib/Utils/date";




class HashtagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            sort: 'desc',
            sortMethod: 'date',
            totalCount: 0,
            category: 0,
            modalBody: '',
            initialPage: 0,
            isChecked: false,

            imageUrl: '',           // 이미지
            imgFile: '',           // 파일
        }

        this.handleChangeChk = this.handleChangeChk.bind(this);
        this.getTotalCount = this.getTotalCount.bind(this);
        this.handleUploadImageUrl = this.handleUploadImageUrl.bind(this);
    }
    componentWillMount() {
        document.addEventListener("message", (data) => {
            if (JSON.parse(data.data).type === 'imageUpload') {
                this.setState({
                    imageUrl: JSON.parse(data.data).imageUrl
                });
            }
        });
    }
    componentDidMount(){
        if(localStorage.getItem('hashtagPage')){
            this.setState({
                initialPage: Number(localStorage.getItem('hashtagPage'))
            })
            // this.tableComponent.loadList(Number(localStorage.getItem('fundingPage')));
            localStorage.clear();
        }
    }

    getTotalCount(total){
        let totalHashtag = total.data.count;
        this.setState({totalCount: totalHashtag})
    }

    reset(){
        setTimeout(() => {
            this.tableComponent.reset();
        })
    }

    handleChangeChk(){
        this.setState({
            isChecked: !this.state.isChecked,
        });

        this.reset();
    }
    handleUploadImageUrl(e) {

        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imageUrl: file,
                imgFile: reader.result,
            });
        };
        reader.readAsDataURL(file);
        console.log(file);

        setTimeout(() => {
            let promises = [];

            if(this.state.imgFile){ // 기존 이미지를 변경함
                promises.push(ActionUpload.uploadImage(this.state.imgFile)
                    .then((response) => {
                        console.log(response);
                        if (response.code == 200) {
                            this.setState({
                                imageUrl: response.data.original,
                            })
                            console.log('imageUrl');
                            console.log(response);
                            return Promise.resolve(null);
                        }else{
                            alert('이미지 업로드를 실패하였습니다.');
                        }

                        setTimeout(() => {
                            Promise.all(promises).then(() => {
                                let params = {
                                    imageUrl: this.state.imageUrl,
                                }
                                ActionHashtag.getHashTagUpdate(params)
                                    .then((response) => {
                                        if (response.code === 200) {
                                            alert('이미지를 수정했습니다.');
                                            this.setState({
                                                imageUrl: this.state.imageUrl,
                                            })
                                        } else {
                                            alert('업로드를 실패하였습니다.');
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                            })
                        }, 100);
                    })
                )
            } else{
                this.setState({
                    imageUrl: this.state.imageUrl,
                })
            }
        }, 100);
    }

    render() {

        let renderTableHeader = () => {
            let tableFields = Config.PAGE_HASHTAG.COLUMN_SIZE.map((size, index) => {
                if (index === 0) {
                    return (
                        <div
                            className={stylesTable.column + ' ' + stylesTable.withCursor + ' ' + stylesTable.tableFieldName}
                            style={{ width: Config.PAGE_HASHTAG.COLUMN_SIZE[index] }}
                            key={index}
                        >
                            {Config.PAGE_HASHTAG.COLUMN_NAME[index]}
                            { index == 0 && this.state.sort == 'desc' ? <span className={styles.downArrow} ></span> : null}
                            { index == 0 && this.state.sort == 'asc' ? <span className={styles.upArrow} ></span> : null}
                        </div>
                    );
                } else {
                    return (
                        <div
                            className={stylesTable.column + ' ' + stylesTable.tableFieldName}
                            style={{ width: Config.PAGE_HASHTAG.COLUMN_SIZE[index] }}
                            key={index}
                        >
                            {Config.PAGE_HASHTAG.COLUMN_NAME[index]}
                        </div>
                    );
                }
            });
            return (
                <div>
                    <div className={stylesTable.tableOption}>
                    </div>
                    <div>{tableFields}</div>
                </div>
            );
        }

        let renderTableContent = (product, index) => {
            return (
                <div key={index} style={{backgroundColor:'#ffffff'}}>

                    <div className={stylesTable.tableContentItem}>
                        <div
                            className={stylesTable.column + ' ' + stylesTable.barcode}
                            style={{ width: Config.PAGE_HASHTAG.COLUMN_SIZE[0], fontSize: Config.PAGE_HASHTAG.COLUMN_FONT_SIZE[0], fontWeight: Config.PAGE_HASHTAG.COLUMN_FONT_WEIGHT[0], color: Config.PAGE_HASHTAG.COLUMN_COLOR[0] }}
                        >
                            <div style={{fontSize:11, fontWeight:'bold'}}>
                                {product[Config.PAGE_HASHTAG.COLUMN_FIELD[0]]}
                            </div>
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_HASHTAG.COLUMN_SIZE[1], fontSize: Config.PAGE_HASHTAG.COLUMN_FONT_SIZE[1], fontWeight: Config.PAGE_HASHTAG.COLUMN_FONT_WEIGHT[1], color: Config.PAGE_HASHTAG.COLUMN_COLOR[1] }}
                        >
                            <div style={{fontSize:11, fontWeight:'bold', color:'#606060'}}>
                                {product[Config.PAGE_HASHTAG.COLUMN_FIELD[1]]}
                            </div>
                        </div>
                        <div
                            className={stylesTable.column + ' ' + stylesTable.leftColumn + ' ' + stylesTable.imageBox}
                            style={{ width: Config.PAGE_HASHTAG.COLUMN_SIZE[2], fontSize: Config.PAGE_HASHTAG.COLUMN_FONT_SIZE[2], fontWeight: Config.PAGE_HASHTAG.COLUMN_FONT_WEIGHT[2], color: Config.PAGE_HASHTAG.COLUMN_COLOR[2] }}
                        >
                            <div className={stylesTable.tableImage} style={{ backgroundImage: product[Config.PAGE_HASHTAG.COLUMN_FIELD[2]] ? 'url("' + product[Config.PAGE_HASHTAG.COLUMN_FIELD[2]] + '")' : 'url("/assets/img/bg_hashtag_default.png")' }}></div>
                        </div>
                        <div
                            className={stylesTable.column + ' ' + stylesTable.uploadBox}
                            style={{width: Config.PAGE_HASHTAG.COLUMN_SIZE[3], fontSize: Config.PAGE_HASHTAG.COLUMN_FONT_SIZE[3], fontWeight: Config.PAGE_HASHTAG.COLUMN_FONT_WEIGHT[3], color: Config.PAGE_HASHTAG.COLUMN_COLOR[3] }}
                        >
                            <label htmlFor={'uploadProfile'} className={stylesTable.uploadBtn}>이미지 업로드</label>
                            <input className={stylesTable.uploadInput} id={'uploadProfile'} type={'file'} accept={'image/*'} onChange={(e) => this.handleUploadImageUrl(e)} onClick={(e) => this.handleUploadImageUrl(e)}/>
                        </div>

                    </div>

                    <div className={stylesHashtag.tableItemUnerline} />

                </div>
            )
        }
        return (
            <div className={stylesHashtag.hashtagContainer}>

                <div className={stylesHashtag.listTopBox}>
                    <div className={stylesHashtag.listTopBoxLeft}>
                        <div className={stylesHashtag.hashtagTitle}>해시태그 관리
                            <span className={stylesHashtag.redText}>{this.state.totalCount}</span>
                        </div>
                    </div>
                </div>
                <div className={stylesHashtag.bgImage}>
                </div>

                <div className={styles.space20}></div>

                <div className={stylesTable.tableHeaderBox}>
                    <TableComponent
                        onRef={(ref) => { this.tableComponent = ref; }}
                        Get={ActionHashtag.getHashTagList}
                        GetCount={ActionHashtag.getHashTagCount}
                        isTabComponent={true}
                        HeaderComponent={renderTableHeader()}
                        ListComponent={renderTableContent}
                        listString={"hashtags"}
                        totalCount={this.getTotalCount}
                        initialPage={this.state.initialPage}
                        Params={{
                            sort: this.state.sort,
                            sortMethod: this.state.sortMethod,
                        }}
                    />
                </div>

            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HashtagList));