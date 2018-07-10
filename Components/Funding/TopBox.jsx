import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DateCustomInput from '../../Common/Date/DateCustomInput';

// Styles
import stylesFunding from '../../Styles/Components/Funding.css';
import styles from '../../Styles/App.css';

// Utils
import DatePicker from 'react-datepicker';
import {categoryId2Name} from "../../Data/Product/category";

class TopBox extends React.Component {
    constructor(props) {
        super(props);

        this.titleChange = this.titleChange.bind(this);
        this.sellevChange = this.sellevChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.goalToRaiseChange = this.goalToRaiseChange.bind(this);
    }

    titleChange(text){
        this.props.titleChange(text);
    }

    sellevChange(text){
        this.props.sellevChange(text);
    }

    goalToRaiseChange(text){
        this.props.goalToRaiseChange(text);
    }

    categoryChange(text){
        this.props.categoryChange(text);
    }

    handleImageChange(e){
        this.props.imageChange(e.target.files[0]);
    }

    dateChange(type, date){
        this.props.dateChange(type, date);
    }

    render() {
        return (
            <div className={stylesFunding.formTopBox} >
                <div className={stylesFunding.formTable}>

                    <div className={stylesFunding.leftBox}>
                        <div className={stylesFunding.imageBox} style={{backgroundImage:'url('+this.props.imageUrl+')', backgroundSize:'cover'}}>
                            <div className={stylesFunding.imgAddBtn}>
                              <label className={stylesFunding.inputLabel} htmlFor={'uploadImage'}>썸네일 등록</label>
                              <input onChange={(e) => this.handleImageChange(e)} id={'uploadImage'}  className={stylesFunding.inputFile}  type={'file'} accept={'image/*'} />
                            </div>

                            <div className={stylesFunding.imgDescription}>
                                이미지 크기는 482*384px가
                                제일 적합합니다
                            </div>
                        </div>
                    </div>

                    <div className={stylesFunding.rightBox}>

                        <div className={stylesFunding.inputBox}>
                            <div className={stylesFunding.formInputFirstTable}>
                                <div className={stylesFunding.titleCellLong}>
                                    <div className={stylesFunding.titleText}>제목</div>
                                </div>
                                <div className={stylesFunding.inputCell}>
                                    <input value={this.props.title}
                                           onChange={(e) => this.titleChange(e.target.value)}
                                           className={stylesFunding.formInput}
                                           placeholder={'제목을 20자 이내로 적어주세요.'}/>
                                </div>
                            </div>

                            <div className={stylesFunding.formInputTable}>
                                <div className={stylesFunding.titleCellLong}>
                                    <div className={stylesFunding.titleText}>셀레버ID</div>
                                </div>
                                <div className={stylesFunding.inputCell}>
                                    <input value={this.props.sellevId}
                                           onChange={(e) => this.sellevChange(e.target.value)}
                                           className={stylesFunding.formInput}
                                           placeholder={'셀레버ID를 적어주세요.'}/>
                                </div>
                            </div>

                            <div className={stylesFunding.formInputTable}>
                                <div className={stylesFunding.titleCellLong}>
                                    <div className={stylesFunding.titleText}>펀딩 목표액</div>
                                </div>
                                <div className={stylesFunding.inputCell}>
                                    <input value={this.props.goalToRaise}
                                           onChange={(e) => this.goalToRaiseChange(e.target.value)}
                                           className={stylesFunding.formInput}
                                           placeholder={'펀딩 목표액을 적어주세요.'}/>
                                    <label className={stylesFunding.inputRightCount}>원</label>
                                </div>
                            </div>

                            <div className={stylesFunding.formInputTable}>
                                <div className={stylesFunding.titleCellShort}>
                                    <div className={stylesFunding.titleText}>펀딩 시작일</div>
                                </div>
                                <div className={stylesFunding.inputCellDate}>
                                    <DatePicker
                                        ref={(c) => this._calendar = c}
                                        customInput={<DateCustomInput dateText={this.props.startAt} />}
                                        onChange={this.dateChange.bind(this, 'start')} />
                                </div>
                                <div className={stylesFunding.inputCellDate}>
                                    <div className={stylesFunding.dateImage} onClick={()=> this._calendar.setOpen(true)}>
                                    </div>
                                </div>

                                <div className={stylesFunding.titleCellShort}>
                                    <div className={stylesFunding.titleText}>펀딩 종료일</div>
                                </div>
                                <div className={stylesFunding.inputCellDate}>
                                    <DatePicker
                                        ref={(c) => this._calendar2 = c}
                                        customInput={<DateCustomInput dateText={this.props.endAt} />}
                                        onChange={this.dateChange.bind(this, 'end')} />
                                </div>
                                <div className={stylesFunding.inputCellDate}>
                                    <div className={stylesFunding.dateImage} onClick={()=> this._calendar2.setOpen(true)}>
                                    </div>
                                </div>
                            </div>

                            <div className={stylesFunding.formInputTable}>
                                <div className={stylesFunding.titleCellLong}>
                                    <div className={stylesFunding.titleText}>카테고리</div>
                                </div>
                                <div className={stylesFunding.inputCell}>
                                    <select value={this.props.category} onChange={(e) => this.categoryChange(e.target.value)}>
                                        <option value={1}>{categoryId2Name[1]}</option>
                                        <option value={2}>{categoryId2Name[2]}</option>
                                        <option value={3}>{categoryId2Name[3]}</option>
                                        <option value={4}>{categoryId2Name[4]}</option>
                                        <option value={5}>{categoryId2Name[5]}</option>
                                        <option value={6}>{categoryId2Name[6]}</option>
                                        <option value={7}>{categoryId2Name[7]}</option>
                                        <option value={8}>{categoryId2Name[8]}</option>
                                        <option value={9}>{categoryId2Name[9]}</option>
                                        <option value={11}>{categoryId2Name[11]}</option>
                                        <option value={12}>{categoryId2Name[12]}</option>
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