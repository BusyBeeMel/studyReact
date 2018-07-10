import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import TopBox from '../../Components/Video/TopBox';
import MiddleBox from '../../Components/Video/MiddleBox';
import BottomBox from '../../Components/Video/BottomBox';

// Actions

// Styles
import styleVideo from '../../Styles/Containers/Video.css';
import styles from '../../Styles/App.css';
import * as ActionProduct from "../../Data/Product/action";

// Utils

class VideoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 2,
            title: '',              // 제목
            storeId: '',            // 셀레버 userId
            youtubeUrl: '',         // 영상url
            seconds: '',            // 재생시간
            category: '',           // 카테고리
            hashtags: [],           // 해시태그
            description: '',        // 영상 설명
            imageUrl: '',           // 이미지
            imgFile: '',           // 파일
            buttonText: '등록하기',           // 파일
            isVisible: false        // ckEditor버그처리용
        }

        this.imageChange = this.imageChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.sellevChange = this.sellevChange.bind(this);
        this.youtubeUrlChange = this.youtubeUrlChange.bind(this);
        this.secondsChange = this.secondsChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
        this.addHashTag = this.addHashTag.bind(this);
        this.delHashTag = this.delHashTag.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);

        this.submitFunding = this.submitFunding.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount(){
        localStorage.clear();
        localStorage.setItem('videoPage', this.props.location.state.page);

        if(this.props.location.state.item){
            this.getOneProduct();
        }else{
            this.setState({isVisible: true})
        }
    }

    getOneProduct(){

        let productId = this.props.location.state.item.productId;

        let param = {
            productId: productId
        }

        ActionProduct.getOneProduct(param)
            .then((response)=>{
                console.log(response)
                this.dataSetting(response.data.product);
            })
            .catch((err)=>{

            })
    }

    dataSetting(product) {
        let tags = [];
        product.hashtags.map((key, i)=>{
            tags.push({label: key.hashtag, value: key.hashtag});
        })

        this.setState({
            isVisible: true,
            productId: product.productId,
            imageUrl: product.imageUrl,
            title: product.title,
            storeId: product.store.userId,
            category: product.category,
            youtubeUrl: product.typeInfo.youtubeUrl,
            seconds: product.typeInfo.seconds,
            description: product.description,
            hashtags: tags,
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

    titleChange(text){
        this.setState({title: text});
    }

    sellevChange(text){
        this.setState({storeId: text});
    }

    youtubeUrlChange(text){
        this.setState({youtubeUrl: text});
    }

    secondsChange(text){
        this.setState({seconds: text});
    }

    categoryChange(text){
        this.setState({category: text});
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

    descriptionChange(text){
        this.setState({description: text});
    }

    /**
     *  동영상 등록
     */
    submitFunding(){

        console.log(this.state.title)
        console.log(this.state.storeId)
        console.log(this.state.youtubeUrl)
        console.log(this.state.category)
        console.log(this.state.hashtags)
        console.log(this.state.description)
        console.log(this.state.seconds)

        if(this.state.title.trim().length === 0 || this.state.title.trim().length > 20){
            alert('제목을 20자 이내로 적어주세요');
            return false;
        }else if(this.state.storeId.toString().trim().length === 0){
            alert('셀레버 아이디를 적어주세요');
            return false;
        }else if(this.state.youtubeUrl.trim().length === 0){
            alert('영상 url을 적어주세요');
            return false;
        }else if(this.state.seconds.toString().trim().length === 0){
            alert('재생시간을 적어주세요');
            return false;
        }else if(this.state.hashtags.length === 0){
            alert('해시태그를 적어주세요');
            return false;
        }else if(this.state.description.trim().length === 0){
            alert('영상 설명을 적어주세요');
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
                        type: this.state.type,
                        productId:'',
                        storeId : this.state.storeId,
                        title: this.state.title,
                        youtubeUrl: this.state.youtubeUrl,
                        seconds: this.state.seconds,
                        category: this.state.category,
                        hashtags: this.hashtagsArray(),
                        description: this.state.description,
                        imageUrl: response.data.original,
                        currency: 'krw'
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
            type: this.state.type,
            productId:this.state.productId,
            storeId : this.state.storeId,
            title: this.state.title,
            youtubeUrl: this.state.youtubeUrl,
            seconds: this.state.seconds,
            category: this.state.category,
            hashtags: this.hashtagsArray(),
            description: this.state.description,
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

    // 해시태그 특수문자 및 빈공간 제거
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
            <div className={styleVideo.formContainer}>

                <div className={styleVideo.bgImage}>
                </div>

                <div className={styleVideo.formTitle}>
                    동영상 등록
                </div>

                <div className={styles.space12}></div>

                <TopBox
                    imageUrl={this.state.imageUrl}
                    title={this.state.title}
                    sellevId={this.state.storeId}
                    youtubeUrl={this.state.youtubeUrl}
                    seconds={this.state.seconds}
                    category={this.state.category}
                    imageChange={this.imageChange}
                    titleChange={this.titleChange}
                    sellevChange={this.sellevChange}
                    youtubeUrlChange={this.youtubeUrlChange}
                    secondsChange={this.secondsChange}
                    categoryChange={this.categoryChange}
                />

                <div className={styles.space12}></div>

                <MiddleBox
                    hashtags={this.state.hashtags}
                    addHashTag={this.addHashTag}
                    delHashTag={this.delHashTag}
                />

                <div className={styles.space12}></div>

                {
                    this.state.isVisible &&
                    <BottomBox
                        description={this.state.description}
                        descriptionChange={this.descriptionChange}
                    />
                }

                <div className={styles.space30}></div>

              <div className={styleVideo.bottomBtnBox}>

                    <div className={styleVideo.addBtn} onClick={this.submitFunding}>
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
})(withRouter(VideoForm));