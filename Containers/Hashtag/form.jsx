import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import TopBox from '../../Components/Hashtag/TopBox';

// Actions

// Styles
import styleHashtag from '../../Styles/Containers/Hashtag.css';
import styles from '../../Styles/App.css';
import * as ActionProduct from "../../Data/Product/action";

// Utils

class HashtagForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hashtagId: '',         //해시태그id
            hashtag    : '',        // 제목
            imageUrl: '',           // 이미지
            imgFile: '',           // 파일
            buttonText: '등록하기',           // 파일
        }

        this.imageChange = this.imageChange.bind(this);
        this.hashtagChange = this.hashtagChange.bind(this);
        this.submitFunding = this.submitFunding.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount(){
        localStorage.clear();
        localStorage.setItem('hashtagPage', this.props.location.state.page);
    }

    dataSetting(product) {

        this.setState({
            isVisible: true,
            imageUrl: product.imageUrl,
            hashtag: product.hashtag,
            buttonText: '수정하기',
        })
    }

    imageChange(image){
        let reader = new FileReader();
        let file = image;

        reader.onloadend = () => {
            this.setState({
                imgFile: file,
                imageUrl: reader.result
            });

            console.log(reader.result)
            console.log(file.name)
        };
        reader.readAsDataURL(file);
    }

    hashtagChange(text) {
        this.setState({hashtag: text});
    }

    submitFunding(){

        console.log(this.state.hashtag)
        console.log(this.state.imageUrl)

        if(this.state.hashtag.trim().length === 0 || this.state.hashtag.trim().length > 20){
            alert('제목을 20자 이내로 적어주세요');
            return false;
        }else if(!this.state.imageUrl) {
            alert('이미지를 등록해주세요');
            return false;
        }else{

            if(!this.props.location.state.item){
                this.addProduct();   // 신규
            }else{
                this.updateProduct();// 수정
            }
        }
    }

    addProduct(){
        ActionProduct.uploadImage(this.state.imgFile)
            .then((response) => {
                console.log(response)
                if (response.code == 200) {
                    let param = {
                        hashtag: this.state.hashtag,
                        imageUrl: response.data.original,
                    }

                    ActionProduct.updateProduct(param)
                        .then((response) => {
                            console.log(response)
                            if(response.code === 200){
                                alert('등록 완료하였습니다')
                                history.back()
                            }else{
                                alert('동영상 등록에 실패하였습니다')
                            }
                        })
                        .catch((err) => {
                            alert(err)
                        })
                }else{
                    alert('이미지 업로드를 실패하였습니다.')
                }
            })
            .catch((err) => {
                // return Promise.resolve(null);
            })
    }

    updateProduct(){
        if(this.state.imgFile){ // 기존 이미지를 변경함
            ActionProduct.uploadImage(this.state.imgFile)
                .then((response) => {
                    console.log(response)
                    if (response.code == 200) {
                        this.updateLogic(response.data.original);
                    }else{
                        alert('이미지 업로드를 실패하였습니다.')
                    }
                })
        }else{
            this.updateLogic(this.state.imageUrl);
        }
    }

    updateLogic(imageUrl){
        let param = {
            hashtag: this.state.hashtag,
            imageUrl: imageUrl
        }

        ActionProduct.updateProduct(param)
            .then((response) => {
                console.log(response)
                if(response.code === 200){
                    alert('수정 완료하였습니다')
                    history.back()
                }else{
                    alert('동영상 수정에 실패하였습니다')
                }
            })
            .catch((err) => {
                alert(err)
            })
    }

    render() {
        return (
            <div className={styleHashtag.formContainer}>

                <div className={styleHashtag.bgImage}>
                </div>

                <div className={styleHashtag.formTitle}>
                    해시태그 등록
                </div>

                <div className={styles.space12}></div>

                <TopBox
                    imageUrl={this.state.imageUrl}
                    hastag={this.state.hastag}
                    imageChange={this.imageChange}
                    hashtagChange={this.hashtagChange}
                />

                <div className={styles.space12}></div>

                <div className={styles.space12}></div>

                <div className={styles.space30}></div>

                <div className={styleHashtag.bottomBtnBox}>

                    <div className={styleHashtag.addBtn} onClick={this.submitFunding}>
                        {this.state.buttonText}
                    </div>

                </div>

                <div className={styles.space100}></div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HashtagForm));