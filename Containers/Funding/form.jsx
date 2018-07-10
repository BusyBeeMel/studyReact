import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';

// Components
import TopBox from '../../Components/Funding/TopBox';
import MiddleBox from '../../Components/Funding/MiddleBox';
import BottomBox from '../../Components/Funding/BottomBox';
import OptionBox from '../../Components/Funding/OptionBox';

// Actions
import * as ActionProduct from "../../Data/Product/action";
import {productRequiredInfo} from "../../Data/Product/productRequiredInfo";

// Styles
import styleFunding from '../../Styles/Containers/Funding.css';
import styles from '../../Styles/App.css';

// Utils
import moment from "moment/moment";
import * as DateUtil from "../../../Admin/Lib/Utils/date";

class FundingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 1,                // 펀딩
            productId: '',
            title: '',              // 상품제목
            storeId: '',            // 셀레버 userId
            goalToRaise: '',        // 펀딩목표액
            category: 1,           // 카테고리
            descriptionShort: '',   // 간단설명
            description: productRequiredInfo[1],         // 상품설명
            hashtags: [],           // 해시태그
            imageUrl: '',           // 이미지
            imgFile: '',           // 이미지
            startAt: moment().format("YYYY-MM-DD"),           // 펀딩시작일
            endAt: moment().format("YYYY-MM-DD"),           // 펀딩종료일

            optionBoxList: [{op_title: '', op_price: '', op_deliverAt: '', op_deliveryPrice: '', op_inventoryQuantity: ''}],
            isVisible: false,        // ckEditor버그처리용
            buttonText: '등록하기'
        }

        this.optionDelList = [];

        this.titleChange = this.titleChange.bind(this);
        this.sellevChange = this.sellevChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
        this.descriptionShotChange = this.descriptionShotChange.bind(this);
        this.addHashTag = this.addHashTag.bind(this);
        this.delHashTag = this.delHashTag.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.imageChange = this.imageChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.goalToRaiseChange = this.goalToRaiseChange.bind(this);

        this.op_titleChange = this.op_titleChange.bind(this);
        this.op_priceChange = this.op_priceChange.bind(this);
        this.op_deliverAtChange = this.op_deliverAtChange.bind(this);
        this.op_deliveryPriceChange = this.op_deliveryPriceChange.bind(this);
        this.op_inventoryQuantityChange = this.op_inventoryQuantityChange.bind(this);

        this.optionAdd = this.optionAdd.bind(this);
        this.optionDelete = this.optionDelete.bind(this);

        this.submitFunding = this.submitFunding.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount(){
        localStorage.clear();
        localStorage.setItem('fundingPage', this.props.location.state.page);

        // setTimeout(()=>{
        //     this.props.history.goBack();
        // }, 1000)


        //상품 클릭으로 들어옴.
        if(this.props.location.state.item){
            this.getOneProduct();
        }else{
            this.setState({isVisible: true})
        }
    }

    /**
     *  수정 데이터 call
     */
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

    /**
     *  수정화면 데이터 세팅
     */
    dataSetting(product){
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
            goalToRaise: product.typeInfo.goalToRaise,
            startAt: product.typeInfo.startAt,
            endAt: product.typeInfo.endAt,
            category: product.category,
            descriptionShort: product.descriptionShort,
            description: product.description,
            hashtags: tags,
            buttonText: '수정하기'
        })

        console.log(product.optionInfo)

        this.setState({
            optionBoxList: product.optionInfo
        })

        this.state.optionBoxList.map((key, i)=>{
            this.state.optionBoxList[i].op_title = key.title;
            this.state.optionBoxList[i].op_price = key.price;
            this.state.optionBoxList[i].op_deliverAt = key.deliverAt;
            this.state.optionBoxList[i].op_deliveryPrice = key.deliveryPrice;
            this.state.optionBoxList[i].op_inventoryQuantity = key.inventoryQuantity;
        })

        this.setState({optionBoxList: [...this.state.optionBoxList]});

    }

    titleChange(text){
        this.setState({title: text});
    }

    sellevChange(text){
        this.setState({storeId: text});
    }

    priceChange(text){
        this.setState({price: text});
    }

    categoryChange(idx){
        this.setState({isVisible: false})
        console.log(this.state.description)
        if(this.state.description.indexOf('<p><strong>[필수입력사항]') === -1){
            setTimeout(()=>{
                this.setState({
                    description: this.state.description + productRequiredInfo[idx],
                    isVisible: true
                })
            })
        }else{
            let startIndex = this.state.description.indexOf('<p><strong>[필수입력사항]');
            let substring = this.state.description.substring(0, startIndex);
            console.log(substring)
            setTimeout(()=>{
                this.setState({
                    description: substring + productRequiredInfo[idx],
                    isVisible: true
                })
            })
        }

        this.setState({category: idx});
    }

    descriptionShotChange(text){
        this.setState({descriptionShort: text});
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

    dateChange(type, date){
        if(type === 'start'){
            this.setState({
                // startAt: moment(date).format("YYYY-MM-DD")
                startAt: DateUtil.getCurrentTimeStamp(date)
            })
        }else{
            this.setState({
                // endAt: moment(date).format("YYYY-MM-DD")
                endAt: DateUtil.getCurrentTimeStamp(date)
            })
        }
    }

    goalToRaiseChange(text){
        this.setState({goalToRaise: text});
    }

    op_titleChange(i, text){
        this.state.optionBoxList[i].op_title = text;
        this.setState({optionBoxList: [...this.state.optionBoxList]});
    }

    op_priceChange(i, text){
        this.state.optionBoxList[i].op_price = text;
        this.setState({optionBoxList: [...this.state.optionBoxList]});
    }

    op_deliverAtChange(i, date){
        this.state.optionBoxList[i].op_deliverAt = DateUtil.getCurrentTimeStamp(date);
        this.setState({optionBoxList: [...this.state.optionBoxList]});
    }

    op_deliveryPriceChange(i, text){
        this.state.optionBoxList[i].op_deliveryPrice = text;
        this.setState({optionBoxList: [...this.state.optionBoxList]});
    }

    op_inventoryQuantityChange(i, text){
        this.state.optionBoxList[i].op_inventoryQuantity = text;
        this.setState({optionBoxList: [...this.state.optionBoxList]});
    }

    optionAdd(){
        let arr = this.state.optionBoxList;
        arr.push({op_title: '', op_price: '', op_deliverAt: '', op_deliveryPrice: '', op_inventoryQuantity: ''});
        this.setState({
            optionBoxList: arr,
        })
    }

    optionDelete(index){
        if(this.state.optionBoxList.length === 1){
            alert('최소 1개 이상의 옵션이 필요합니다')
        }else{
            this.optionDelList.push(this.state.optionBoxList[index]);

            this.state.optionBoxList.splice(index, 1);
            this.setState({
                optionBoxList: this.state.optionBoxList
            })
        }
    }

    /**
     *  펀딩상품 등록
     */
    submitFunding(){
        console.log(this.state.title)
        console.log(this.state.storeId)
        console.log(this.state.goalToRaise)
        console.log(this.state.category)
        console.log(this.state.descriptionShort)
        console.log(this.state.hashtags)
        console.log(this.state.description)
        console.log(this.state.startAt)
        console.log(this.state.endAt)
        console.log(this.state.imageUrl)
        console.log(this.state.op_deliverAt)

        if(this.state.title.trim().length === 0 || this.state.title.trim().length > 20){
            alert('제목을 20자 이내로 적어주세요');
            return false;
        }else if(this.state.storeId.toString().trim().length === 0){
            alert('셀레버 아이디를 적어주세요');
            return false;
        }else if(this.state.goalToRaise.toString().trim().length === 0){
            alert('펀딩목표액을 적어주세요');
            return false;
        }else if(this.state.descriptionShort.trim().length === 0 || this.state.descriptionShort.trim().length > 200) {
            alert('펀딩의 간단설명을 200자 이내로 적어주세요');
            return false;
        }else if(this.state.hashtags.length === 0){
            alert('해시태그를 입력해주세요');
            return false;
        }else if(this.state.description.trim().length === 0){
            alert('펀딩 상세설명을 적어주세요');
            return false;
        }else if(!this.state.imageUrl) {
            alert('이미지를 등록해주세요');
            return false;
        }else{

            let result = true;
            this.state.optionBoxList.map((key, i)=>{
                if(result){
                    if(key.op_title.trim().length === 0){
                        alert('옵션설명을 적어주세요');
                        result = false;
                    }else if(key.op_price.toString().trim().length === 0){
                        alert('옵션 가격을 적어주세요');
                        result = false;
                    }else if(key.op_deliverAt.trim().length === 0){
                        alert('옵션 발송 예정일을 적어주세요');
                        result = false;
                    }else if(key.op_deliveryPrice.toString().trim().length === 0){
                        alert('옵션 배송비를 적어주세요');
                        result = false;
                    }else if(key.op_inventoryQuantity.toString().trim().length === 0){
                        alert('옵션 제한수량을 적어주세요');
                        result = false;
                    }else{
                        let now = moment(key.op_deliverAt);
                        let end = moment(this.state.endAt);
                        let duration = moment.duration(now.diff(end));
                        let days = duration.asDays();
                        if(days < 1){
                            alert('배송시작일은 펀딩종료일보다 하루 이상 늦어야합니다.');
                            result = false;
                        }
                    }
                }
            })

            if(result){
                if(!this.props.location.state.item){
                    this.addProduct();   // 신규
                }else{
                    this.updateProduct();// 수정
                }
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
                        productId: this.state.productId,
                        storeId: this.state.storeId,
                        title: this.state.title,
                        goalToRaise: this.state.goalToRaise,
                        description: this.state.description,
                        descriptionShort: this.state.descriptionShort,
                        category: this.state.category,
                        imageUrl: response.data.original,
                        hashtags: this.hashtagsArray(),
                        startAt: this.state.startAt,
                        endAt: this.state.endAt,
                        currency: 'krw'
                    }

                    console.log('서버로 보낼 파라미터값')
                    console.log(param)

                    ActionProduct.updateProduct(param)
                        .then((response) => {
                            console.log('저장완료.!')
                            console.log(response)
                            if(response.code === 200){
                                this.state.optionBoxList.map((key, i)=>{
                                    let option = {
                                        optionId:0,
                                        productId: response.data.productId,
                                        title: key.op_title,
                                        price: key.op_price,
                                        deliverAt: key.op_deliverAt,
                                        deliveryPrice: key.op_deliveryPrice,
                                        inventoryQuantity: key.op_inventoryQuantity,
                                        currency: 'krw'
                                    }

                                    console.log('옵션')
                                    console.log(option)

                                    ActionProduct.updateOption(option)
                                        .then((response) => {
                                            console.log(response)
                                            if(response.code === 200){
                                                if(this.state.optionBoxList.length === i+1){
                                                    alert('저장 완료하였습니다');
                                                    history.back()
                                                }
                                            }else{
                                                alert('펀딩 등록에 실패하였습니다. 셀레버ID가 올바른지 확인해주세요.')
                                            }
                                        })
                                        .catch((err) => {

                                        })
                                });
                            }else{
                                alert('펀딩 등록에 실패하였습니다. 셀레버ID가 올바른지 확인해주세요.');
                            }
                        })
                        .catch((err) => {
                            alert(err)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
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
            type:this.state.type,
            productId: this.state.productId,
            storeId: this.state.storeId,
            title: this.state.title,
            goalToRaise: this.state.goalToRaise,
            description: this.state.description,
            descriptionShort: this.state.descriptionShort,
            category: this.state.category,
            imageUrl: imageUrl,
            hashtags: this.hashtagsArray(),
            startAt: this.state.startAt,
            endAt: this.state.endAt,
        }

        ActionProduct.updateProduct(param)
            .then((response) => {
                console.log('수정완료.!')
                console.log(response)
                if(response.code === 200){

                    //기존 옵션 삭제
                    if(this.optionDelList.length > 0){
                        this.optionDelList.map((key, i)=>{
                            let option = {
                                productId: response.data.productId,
                                optionId: key.optionId,
                                isDeleted: true
                            }

                            console.log('옵션')
                            console.log(option)

                            ActionProduct.updateOption(option)
                                .then((response) => {
                                    console.log(response)
                                    if(response.code === 200){
                                        console.log('옵션삭제 완료')
                                    }else{
                                        alert('옵션삭제에 실패하였습니다')
                                    }
                                })
                                .catch((err) => {

                                })
                        })
                    }

                    //옵션 업데이트
                    this.state.optionBoxList.map((key, i)=>{
                        let option = {
                            productId: response.data.productId,
                            optionId: key.optionId,
                            title: key.op_title,
                            price: key.op_price,
                            deliverAt: key.op_deliverAt,
                            deliveryPrice: key.op_deliveryPrice,
                            inventoryQuantity: key.op_inventoryQuantity,
                            currency: 'krw'
                        }

                        console.log('옵션')
                        console.log(option)

                        ActionProduct.updateOption(option)
                            .then((response) => {
                                console.log(response)
                                if(response.code === 200){
                                    if(this.state.optionBoxList.length === i+1){
                                        alert('수정 완료하였습니다')
                                        history.back()
                                    }
                                }else{
                                    alert('옵션 등록/수정에 실패하였습니다.');
                                }
                            })
                            .catch((err) => {

                            })
                    });

                }else{
                    alert('옵션 등록/수정에 실패하였습니다.');
                }
            })
            .catch((err) => {
                alert(err)
            })
    }

    optionBox(){
        return(
            this.state.optionBoxList.map((key, i)=>{
                return(
                        <OptionBox
                            index={i}
                            title={this.state.optionBoxList[i].op_title}
                            price={this.state.optionBoxList[i].op_price}
                            deliverAt={this.state.optionBoxList[i].op_deliverAt}
                            deliveryPrice={this.state.optionBoxList[i].op_deliveryPrice}
                            inventoryQuantity={this.state.optionBoxList[i].op_inventoryQuantity}
                            titleChange={this.op_titleChange}
                            priceChange={this.op_priceChange}
                            deliverAtChange={this.op_deliverAtChange}
                            deliveryPriceChange={this.op_deliveryPriceChange}
                            inventoryQuantityChange={this.op_inventoryQuantityChange}
                            optionAdd={this.optionAdd}
                            optionDelete={this.optionDelete}
                        />
                )
            })
        )
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
            <div className={styleFunding.formContainer}>

                <div className={styleFunding.bgImage}>
                </div>

                <div className={styleFunding.formTitle}>
                    펀딩상품 등록 {this.props.sort}
                </div>

                <div className={styles.space12}></div>

                <TopBox
                    title={this.state.title}
                    sellevId={this.state.storeId}
                    price={this.state.price}
                    category={this.state.category}
                    imageUrl={this.state.imageUrl}
                    startAt={this.state.startAt}
                    endAt={this.state.endAt}
                    goalToRaise={this.state.goalToRaise}
                    titleChange={this.titleChange}
                    sellevChange={this.sellevChange}
                    categoryChange={this.categoryChange}
                    imageChange={this.imageChange}
                    dateChange={this.dateChange}
                    goalToRaiseChange={this.goalToRaiseChange}
                />

                <div className={styles.space12}></div>

                <MiddleBox
                    descriptionShort={this.state.descriptionShort}
                    descriptionShotChange={this.descriptionShotChange}
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

                <div className={styles.space12}></div>

                {this.optionBox()}

                <div className={styles.space100}></div>

                <div className={styleFunding.bottomBtnBox}>
                    <div className={styleFunding.addBtn} onClick={this.submitFunding}>
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
})(withRouter(FundingForm));
