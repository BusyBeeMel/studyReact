import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import Autocomplete from '@celebryts/react-autocomplete-tags'

// Actions
import * as ActionAccount from "../../Data/Account/actions";

// Styles
import stylesAccount from '../../Styles/Containers/Account.css';
import styles from '../../Styles/App.css';

// Utils
import Textarea from "react-textarea-autosize";
import * as ActionProduct from "../../Data/Product/action";

class AccountForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            profileImageFile: '',
            profileUrl: '',
            coverImageFile: '',
            coverUrl: '',
            name: '', // 활동명
            descriptionShort: '', // 한줄 소개글
            description: '', // 소개글
            hashtags: [],           // 해시태그
            memo: '', // 메모
            buttonText: '등록하기'
        }

        this.onProfileImageChange = this.onProfileImageChange.bind(this);
        this.onCoverImageChange = this.onCoverImageChange.bind(this);
        this.addHashTag = this.addHashTag.bind(this);
        this.delHashTag = this.delHashTag.bind(this);
        this.submitAccount = this.submitAccount.bind(this);
    }

    componentDidMount(){
        localStorage.clear();
        localStorage.setItem('accountPage', this.props.location.state.page);

        //상품 클릭으로 들어옴.
        if(this.props.location.state.item){
            this.getOneAccount();
        }
    }

    getOneAccount(){
        let userId = this.props.location.state.item.userId;

        let param = {
            userId: userId,
        }

        ActionAccount.getAccountList(param)
            .then((response)=>{
                console.log(response)
                if(response.code === 200){
                    console.log(response.data.users[0])
                    this.dataSetting(response.data.users[0]);
                }else{
                    alert('유저정보를 가져오지 못했습니다.');
                }
            })
            .catch((err)=>{

            })
    }

    dataSetting(user) {
        let tags = [];
        user.hashtags.map((key, i)=>{
            tags.push({label: key.hashtag, value: key.hashtag});
        })

        this.setState({
            userId: user.userId,
            profileUrl: user.profileUrl,
            coverUrl: user.coverUrl,
            name: user.name,
            descriptionShort: user.descriptionShort,
            description: user.description,
            memo: user.memo,
            hashtags:tags,
            buttonText: '수정하기'
        })
    }

    onProfileImageChange(e){
        let image = e.target.files[0];

        let reader = new FileReader();
        let file = image;

        reader.onloadend = () => {
            this.setState({
                profileImageFile: file,
                profileUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
    }

    onCoverImageChange(e){
        let image = e.target.files[0];

        let reader = new FileReader();
        let file = image;

        reader.onloadend = () => {
            this.setState({
                coverImageFile: file,
                coverUrl: reader.result
            });

        };
        reader.readAsDataURL(file);
    }

    addHashTag(tag){
        this.state.hashtags.push(tag)
        this.setState({
            hashtags: [...this.state.hashtags]
        })
        // console.log(this.state.hashtags)
    }

    delHashTag(tags){
        this.setState({
            hashtags: tags
        })
        // console.log(this.state.hashtags)
    }

    submitAccount(){
        console.log(this.state.profileUrl)
        console.log(this.state.coverUrl)
        console.log(this.state.name)
        console.log(this.state.descriptionShort)
        console.log(this.state.description)
        console.log(this.state.hashtags)
        console.log(this.state.memo)

        if(!this.state.coverUrl) {
            alert('커버 이미지를 등록해주세요');
            return false;
        }else if(!this.state.profileUrl) {
            alert('프로필 이미지를 등록해주세요');
            return false;
        }else if(this.state.name.trim().length === 0){
            alert('활동명을 적어주세요');
            return false;
        }else if(this.state.descriptionShort.trim().length === 0 || this.state.descriptionShort.trim().length > 20){
            alert('한줄소개를 20자 이내로 적어주세요');
            return false;
        }else if(this.state.description.trim().length === 0){
            alert('소개글을 적어주세요');
            return false;
        }else if(this.state.hashtags.length === 0){
            alert('해시태그를 적어주세요');
            return false;
        }else if(this.state.memo.trim().length === 0){
            alert('메모를 적어주세요');
            return false;
        }else{
            if(!this.props.location.state.item){
                this.addAccount();   // 신규
            }else{
                this.updateAccount();// 수정
            }
        }
    }

    addAccount(){

        let param = {
            name: this.state.name,
            descriptionShort: this.state.descriptionShort,
            description: this.state.description,
            hashtags: this.hashtagsArray(),
            memo: this.state.memo
        }

        ActionAccount.uploadImage(this.state.coverImageFile)
            .then((response) => {
                console.log(response)
                if (response.code == 200) {
                    param.coverUrl = response.data.original;

                    ActionAccount.uploadImage(this.state.profileImageFile)
                        .then((response) => {
                            console.log(response)
                            if (response.code == 200) {
                                param.profileUrl = response.data.original;

                                ActionAccount.createAccount(param)
                                    .then((response)=>{
                                        console.log(response)
                                        if (response.code == 200) {
                                            alert('등록에 성공하였습니다')
                                            history.back()
                                        }else{
                                            alert('등록에 실패하였습니다')
                                        }
                                    })
                                    .catch((err)=>{
                                        alert(err)
                                    })
                            }else{
                                alert('프로필 이미지 업로드에 실패하였습니다')
                            }
                        });

                }else {
                    alert('커버 이미지 업로드에 실패하였습니다')
                }
            });
    }

    updateAccount(){
        let param = {
            userId: this.state.userId,
            name: this.state.name,
            descriptionShort: this.state.descriptionShort,
            description: this.state.description,
            hashtags: this.hashtagsArray(),
            memo: this.state.memo,
            coverUrl: this.state.coverUrl,
            profileUrl: this.state.profileUrl
        }

        if(this.state.coverImageFile){ // 기존 커버 이미지를 변경함
            ActionAccount.uploadImage(this.state.coverImageFile)
                .then((response) => {
                    console.log(response)
                    if (response.code == 200) {

                        param.coverUrl = response.data.original;

                        if(this.state.profileImageFile){ // 기존 프로필이미지 변경함
                            ActionAccount.uploadImage(this.state.coverImageFile)
                                .then((response) => {
                                    console.log(response)
                                    if(response.code === 200){
                                        param.profileUrl = response.data.original;
                                        this.updateLogic(param);
                                    }else{
                                        alert('프로필 이미지 업로드를 실패하였습니다.')
                                    }
                                })
                        }else{
                            this.updateLogic(param);
                        }
                    }else{
                        alert('커버 이미지 업로드를 실패하였습니다.')
                    }
                })
        }else{
            if(this.state.profileImageFile){ // 기존 프로필이미지 변경함
                ActionAccount.uploadImage(this.state.coverImageFile)
                    .then((response) => {
                        console.log(response)
                        if(response.code === 200){
                            param.profileUrl = response.data.original;
                            this.updateLogic(param);
                        }else{
                            alert('프로필 이미지 업로드를 실패하였습니다.')
                        }
                    })
            }else{
                this.updateLogic(param);
            }
        }
    }

    updateLogic(param){
        ActionAccount.updateAccount(param)
            .then((response)=>{
                console.log(response)
                if (response.code == 200) {
                    alert('수정에 성공하였습니다')
                    history.back()
                }else{
                    alert('수정에 실패하였습니다')
                }
            })
            .catch((err)=>{
                alert(err)
            })
    }

    hashtagsArray(){
        let splitArr = [];
        this.state.hashtags.map((key, i)=>{
            let result = key.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            splitArr.push(result.trim());
            console.log(result)
        })
        let jsonVal = JSON.stringify(splitArr);
        console.log(jsonVal)
        return jsonVal.trim();
    }

    render() {

        return (
            <div className={stylesAccount.formContainer}>
                <div className={stylesAccount.formTitleBoxContainer}>
                    셀레버 등록
                </div>

                <div className={stylesAccount.formBgImage}></div>

                <div className={stylesAccount.formCardBoxContainer}>

                    <div className={stylesAccount.ht}></div>

                    <div className={stylesAccount.formCardInnerBox} style={{backgroundImage:'url('+this.state.coverUrl+')', backgroundSize:'cover'}}>
                        <div className={stylesAccount.imgAddBtn}>
                            <label className={stylesAccount.inputLabel} htmlFor={'uploadCoverImage'}>썸네일 등록</label>
                            <input onChange={(e) => this.onCoverImageChange(e)} id={'uploadCoverImage'}  className={stylesAccount.inputFile}  type={'file'} accept={'image/*'} />
                        </div>

                        <div className={stylesAccount.innerText}>
                            커버 이미지를 등록해주세요.
                        </div>
                        <div className={stylesAccount.innerText2}>
                            (1100x925 사이즈가 적합합니다)
                        </div>
                        <div className={stylesAccount.formCircleUserCamera} style={{backgroundImage:'url('+this.state.profileUrl+')', backgroundSize:'cover'}}>
                            <div className={stylesAccount.formProfileImg}></div>
                            <label className={stylesAccount.formCameraImgCenterBox} >
                                <label className={stylesAccount.formCameraImg2} htmlFor={'uploadProfileImage'}></label>
                                <input onChange={(e) => this.onProfileImageChange(e)} id={'uploadProfileImage'}  className={stylesAccount.inputFile}  type={'file'} accept={'image/*'} />
                            </label>
                        </div>
                    </div>

                    <div className={stylesAccount.formPadding}>
                        <div className={stylesAccount.formRow}>
                            <label className={stylesAccount.formLabel}>활동명</label>
                            <input className={stylesAccount.formInput}
                                   value={this.state.name}
                                   onChange={(e) => this.setState({name: e.target.value})}
                                   placeholder={'셀레버의 활동명을 입력해주세요.'}
                            />
                        </div>

                        <div className={stylesAccount.formRow}>
                            <label className={stylesAccount.formLabel}>한줄소개</label>
                            <input className={stylesAccount.formInput}
                                   value={this.state.descriptionShort}
                                   onChange={(e) => this.setState({descriptionShort: e.target.value})}
                                   placeholder={'20자 이내로 셀레버의 소개를 입력해주세요.'}
                            />
                        </div>


                        <div className={stylesAccount.formRow}>
                            <label className={stylesAccount.formLabel} style={{position:'relative', top:-129}}>소개글</label>
                            <textarea className={stylesAccount.formTextArea}
                                      value={this.state.description}
                                      onChange={(e) => this.setState({description: e.target.value})}
                                      placeholder={'해당 셀레버에 대한 소개를 입력해주세요.'}></textarea>
                        </div>
                        <div className={stylesAccount.formRow} style={{height:120}}>
                            <label className={stylesAccount.formLabel} style={{position:'relative'}}>해시태그</label>
                            <Autocomplete
                                tags={this.state.hashtags}
                                className={stylesAccount.hashtagInput}
                                saveOnBlur={true}
                                onDelete={(deleteTag, tags)=> this.delHashTag(tags)}
                                onAdd={(item)=> this.addHashTag(item)}
                            />
                        </div>
                        <div className={stylesAccount.formRow}>
                            <label className={stylesAccount.formLabel} style={{position:'relative', top:-129}}>메모</label>
                            <textarea className={stylesAccount.formTextArea}
                                      value={this.state.memo}
                                      onChange={(e) => this.setState({memo: e.target.value})}
                                      placeholder={'해당 셀레버에 대한 메모를 남기세요'}></textarea>
                        </div>
                    </div>

                </div>

                <div onClick={this.submitAccount} className={stylesAccount.formAddBtn}>
                    {this.state.buttonText}
                </div>

                <div className={styles.space50}></div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(AccountForm));