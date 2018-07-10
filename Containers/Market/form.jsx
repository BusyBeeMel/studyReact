import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import TopBox from '../../Components/Market/TopBox';
import MiddleBox from '../../Components/Market/MiddleBox';
import BottomBox from '../../Components/Market/BottomBox';
import OptionBox from '../../Components/Market/OptionBox';
import OptionDigitalBox from '../../Components/Market/OptionDigitalBox';

// Actions
import * as ActionProduct from "../../Data/Product/action";

// Styles
import styleMarket from '../../Styles/Containers/Market.css';
import styles from '../../Styles/App.css';

// Utils
import * as DateUtil from "../../Lib/Utils/date";
import {productRequiredInfo} from "../../Data/Product/productRequiredInfo";


class MarketForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 0,                // 마켓
            productId: '',
            title: '',              // 상품제목
            storeId: '',            // 셀레버 userId
            category: 1,           // 카테고리
            descriptionShort: '',   // 간단설명
            hashtags: [],           // 해시태그
            description: productRequiredInfo[1],         // 상품설명
            imageUrl: '',           // 이미지
            imgFile: '',           // 파일
            currency: 'krw',

            optionBoxList: [{op_title: '', op_price: '', op_deliveryPrice: '', op_inventoryQuantity: '', op_imageUrl: '', op_imageFile: ''}],
            isVisible: false,        // ckEditor버그처리용
            buttonText: '등록하기',

            isRadioVisible: true,
            selectedOption: '0',    // 일반상품, 디지털콘텐츠 radio
        }

        this.optionDelList = [];

        this.imageChange = this.imageChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.sellevChange = this.sellevChange.bind(this);
        // this.priceChange = this.priceChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
        this.descriptionShotChange = this.descriptionShotChange.bind(this);
        this.addHashTag = this.addHashTag.bind(this);
        this.delHashTag = this.delHashTag.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);

        this.op_titleChange = this.op_titleChange.bind(this);
        this.op_priceChange = this.op_priceChange.bind(this);
        this.op_deliveryPriceChange = this.op_deliveryPriceChange.bind(this);
        this.op_inventoryQuantityChange = this.op_inventoryQuantityChange.bind(this);
        this.op_imageUrlChange = this.op_imageUrlChange.bind(this);
        this.op_imageFileChange = this.op_imageFileChange.bind(this);

        this.optionAdd = this.optionAdd.bind(this);
        this.optionDelete = this.optionDelete.bind(this);

        this.handleRadioChange = this.handleRadioChange.bind(this);

        this.submitFunding = this.submitFunding.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount(){

        localStorage.clear();
        localStorage.setItem('marketPage', this.props.location.state.page);

        //상품 클릭으로 들어옴.
        if(this.props.location.state.item){
            this.getOneProduct();
            this.setState({isRadioVisible: false}); //수정화면에선 라디오박스 hide
        }else{
            this.setState({isVisible: true})
        }
    }

    getOneProduct(){
        let product = this.props.location.state.item;

        let param = {
            productId: product.productId
        }

        ActionProduct.getOneProduct(param)
            .then((response)=>{
                console.log(response)
                this.dataSetting(response.data.product);
            })
            .catch((err)=>{

            })
    }

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
            category: product.category,
            descriptionShort: product.descriptionShort,
            description: product.description,
            hashtags: tags,
            buttonText: '수정하기',
            selectedOption: product.optionInfo[0].fileUrl ? '1' : '0'  // 옵션값에 fileUrl이 있으면 디지털 없으면 일반
        })

        this.setState({
            optionBoxList: product.optionInfo
        })

        this.state.optionBoxList.map((key, i)=>{
            this.state.optionBoxList[i].op_title = key.title;
            this.state.optionBoxList[i].op_price = key.price;
            this.state.optionBoxList[i].op_deliveryPrice = key.deliveryPrice;
            this.state.optionBoxList[i].op_inventoryQuantity = key.inventoryQuantity;
            this.state.optionBoxList[i].op_imageUrl = key.fileUrl;
        })

        this.setState({optionBoxList: [...this.state.optionBoxList]});
    }

    titleChange(text){
        this.setState({title: text});
    }

    sellevChange(text){
        this.setState({storeId: text});
    }

    // priceChange(text){
    //     this.setState({price: text});
    // }

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

    op_titleChange(i, text){
        this.state.optionBoxList[i].op_title = text;
        this.setState({optionBoxList: [...this.state.optionBoxList]});
    }

    op_priceChange(i, text){
        this.state.optionBoxList[i].op_price = text;
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

    op_imageUrlChange(i, image){
        let reader = new FileReader();
        let file = image;

        reader.onloadend = () => {
            this.state.optionBoxList[i].op_imageUrl = reader.result;
            this.state.optionBoxList[i].op_imageFile = file;
            this.setState({optionBoxList: [...this.state.optionBoxList]});
        };
        reader.readAsDataURL(file);

    }

    op_imageFileChange(i, text){
        this.state.optionBoxList[i].op_imageFile = text;
        this.setState({optionBoxList: [...this.state.optionBoxList]});
    }

    optionAdd(){
        let arr = this.state.optionBoxList;
        arr.push({op_title: '', op_price: '', op_deliveryPrice: '', op_inventoryQuantity: '', op_imageUrl: '', op_imageFile: ''});
        this.setState({
            optionBoxList: arr,
        });
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
        if(this.state.title.trim().length === 0 || this.state.title.trim().length > 20){
            alert('제목을 20자 이내로 적어주세요');
            return false;
        }else if(this.state.storeId.toString().trim().length === 0){
            alert('셀레버 아이디를 적어주세요');
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
                        alert('옵션명을 적어주세요');
                        result = false;
                    }else if(key.op_price.toString().trim().length === 0){
                        alert('옵션 가격을 적어주세요');
                        result = false;
                    }else if(this.state.selectedOption === '0' && key.op_deliveryPrice.toString().trim().length === 0){
                        alert('옵션 배송비를 적어주세요');
                        result = false;
                    }else if(this.state.selectedOption === '0' && key.op_inventoryQuantity.toString().trim().length === 0){
                        alert('옵션 제한수량을 적어주세요');
                        result = false;
                    }else if(this.state.selectedOption === '1' && key.op_imageUrl.length === 0){
                        alert('이미지를 등록해주세요');
                        result = false;
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
        let productId;

        console.log('업로드할 이미지'+ this.state.imgFile)

        ActionProduct.uploadImage(this.state.imgFile)
            .then((response) => {
                if (response.code == 200) {
                    let param = {
                        type: this.state.type,
                        productId: this.state.productId,
                        storeId: this.state.storeId,
                        title: this.state.title,
                        description: this.state.description,
                        descriptionShort: this.state.descriptionShort,
                        category: this.state.category,
                        imageUrl: response.data.original,
                        hashtags: this.hashtagsArray(),
                        currency: this.state.currency
                    }

                    ActionProduct.updateProduct(param)
                        .then((response) => {
                            if(response.code === 200){
                                productId = response.data.productId;
                                if(this.state.selectedOption === '0') {
                                    this.state.optionBoxList.map((key, i)=>{
                                        let option = {
                                            optionId:0,
                                            productId: response.data.productId,
                                            title: key.op_title,
                                            price: key.op_price,
                                            deliveryPrice: key.op_deliveryPrice,
                                            inventoryQuantity: key.op_inventoryQuantity,
                                            currency: this.state.currency
                                        }
                                        ActionProduct.updateOption(option)
                                            .then((response) => {
                                                console.log(response)
                                                if(response.code === 200){
                                                    if(this.state.optionBoxList.length === i+1){
                                                        alert('저장 완료하였습니다');
                                                        history.back()
                                                    }
                                                }else{
                                                    alert('상품 등록에 실패하였습니다. 셀레버ID가 올바른지 확인해주세요.')
                                                }
                                            })
                                            .catch((err) => {

                                            })
                                    });
                                }else{
                                    this.state.optionBoxList.map((key, i)=>{
                                        ActionProduct.uploadFile(key.op_imageFile)
                                            .then((response) => {
                                                console.log(response)
                                                if (response.code == 200) {
                                                    let option = {
                                                        optionId:0,
                                                        productId: productId,
                                                        title: key.op_title,
                                                        price: key.op_price,
                                                        fileUrl: response.data.original,
                                                        currency: this.state.currency
                                                    }
                                                    ActionProduct.updateOption(option)
                                                        .then((response) => {
                                                            console.log(response)
                                                            if(response.code === 200){
                                                                if(this.state.optionBoxList.length === i+1){
                                                                    alert('저장 완료하였습니다');
                                                                    history.back()
                                                                }
                                                            }else{
                                                                alert('상품 등록에 실패하였습니다. 셀레버ID가 올바른지 확인해주세요.')
                                                            }
                                                        })
                                                        .catch((err) => {

                                                        })
                                                }else{
                                                    alert('이미지 업로드를 실패하였습니다.')
                                                }
                                            })
                                    });
                                }
                            }else{
                                alert('상품 등록에 실패하였습니다. 셀레버ID가 올바른지 확인해주세요.');
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

    updateProduct() {
        if (this.state.imgFile) { // 이미지를 변경함
            ActionProduct.uploadImage(this.state.imgFile)
                .then((response) => {
                    console.log(response)
                    if (response.code == 200) {
                        this.updateLogic(response.data.original);
                    }else{
                        alert('이미지 업로드를 실패하였습니다.')
                    }
                })
        } else {
            this.updateLogic(this.state.imageUrl);
        }
    }

    updateLogic(imageUrl){
        let productId;
        let param = {
            type:this.state.type,
            productId: this.state.productId,
            storeId: this.state.storeId,
            title: this.state.title,
            description: this.state.description,
            descriptionShort: this.state.descriptionShort,
            category: this.state.category,
            imageUrl: imageUrl,
            hashtags: this.hashtagsArray(),
        }

        ActionProduct.updateProduct(param)
            .then((response) => {
                console.log('수정완료.!')
                console.log(response)
                if(response.code === 200){
                    productId = response.data.productId;

                    //기존 옵션 삭제
                    if(this.optionDelList.length > 0){
                        this.optionDelList.map((key, i)=>{
                            let option = {
                                productId: productId,
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

                        if(this.state.selectedOption === '0'){
                            let option = {
                                productId: productId,
                                optionId: key.optionId,
                                title: key.op_title,
                                price: key.op_price,
                                deliveryPrice: key.op_deliveryPrice,
                                inventoryQuantity: key.op_inventoryQuantity,
                                currency: 'krw'
                            }

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
                        }else{
                            if(key.op_imageFile){     //이미지 수정을 한경우
                                ActionProduct.uploadFile(key.op_imageFile)
                                    .then((response) => {
                                        console.log(response)
                                        if (response.code == 200) {
                                            let option = {
                                                optionId: key.optionId,
                                                productId: productId,
                                                title: key.op_title,
                                                price: key.op_price,
                                                fileUrl: response.data.original,
                                                currency: 'coin'
                                            }

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
                                        }
                                    })

                            }else{
                                let option = {
                                    productId: productId,
                                    optionId: key.optionId,
                                    title: key.op_title,
                                    price: key.op_price,
                                    fileUrl: key.fileUrl,
                                    currency: 'coin'
                                }

                                console.log(option)
                                //
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
                            }
                        }

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
                if(this.state.selectedOption === '0'){
                    return(
                        <OptionBox
                            index={i}
                            title={this.state.optionBoxList[i].op_title}
                            price={this.state.optionBoxList[i].op_price}
                            deliveryPrice={this.state.optionBoxList[i].op_deliveryPrice}
                            inventoryQuantity={this.state.optionBoxList[i].op_inventoryQuantity}
                            titleChange={this.op_titleChange}
                            priceChange={this.op_priceChange}
                            deliveryPriceChange={this.op_deliveryPriceChange}
                            inventoryQuantityChange={this.op_inventoryQuantityChange}
                            optionAdd={this.optionAdd}
                            optionDelete={this.optionDelete}
                        />
                    )
                }else{
                    return(
                        <OptionDigitalBox
                            index={i}
                            title={this.state.optionBoxList[i].op_title}
                            price={this.state.optionBoxList[i].op_price}
                            imageUrl={this.state.optionBoxList[i].op_imageUrl}
                            titleChange={this.op_titleChange}
                            priceChange={this.op_priceChange}
                            imageUrlChange={this.op_imageUrlChange}
                            optionAdd={this.optionAdd}
                            optionDelete={this.optionDelete}
                        />
                    )
                }
            })
        )
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

    // 일반/디지털 radio
    handleRadioChange(e){
        this.setState({
            selectedOption: e.target.value,
            optionBoxList: [{op_title: '', op_price: '', op_deliveryPrice: '', op_inventoryQuantity: '', op_imageUrl: '', op_imageFile: ''}],
            currency: e.target.value === 0 ? 'krw' : 'coin'
        });
    }

    render() {
        return (
            <div className={styleMarket.formContainer}>

                <div className={styleMarket.bgImage}>
                </div>

                <div className={styleMarket.formTitle}>
                    마켓상품 등록
                </div>

                <div className={styles.space12}></div>

                {
                    this.state.isRadioVisible &&
                    <div className={styleMarket.formTopSelectBox}>
                        <li style={{display:'inline'}}>
                            <input
                                type="radio"
                                value="0"
                                checked={this.state.selectedOption === '0'}
                                onChange={this.handleRadioChange}
                            />
                            <span style={{fontSize:14, position:'relative', top:1, left:5}}>일반상품</span>
                        </li>
                        <li style={{display:'inline', marginLeft:15}}>
                            <input
                                type="radio"
                                value="1"
                                checked={this.state.selectedOption === '1'}
                                onChange={this.handleRadioChange}
                            />
                            <span style={{fontSize:14, position:'relative', top:1, left:5}}>디지털콘텐츠</span>
                        </li>
                    </div>
                }

                <TopBox
                    imageUrl={this.state.imageUrl}
                    title={this.state.title}
                    sellevId={this.state.storeId}
                    // price={this.state.price}
                    category={this.state.category}
                    imageChange={this.imageChange}
                    titleChange={this.titleChange}
                    sellevChange={this.sellevChange}
                    // priceChange={this.priceChange}
                    categoryChange={this.categoryChange}
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
                <div className={styleMarket.bottomBtnBox}>
                    <div className={styleMarket.addBtn} onClick={this.submitFunding}>
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
})(withRouter(MarketForm));