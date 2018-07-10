import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Config from '../../Lib/Api/config';

// Components
import TableComponent from '../../Common/Table'
import CategoryTabs from '../../Components/Banner/CategoryTabs';
import BannerForm from '../../Components/Banner/BannerForm'

// Actions
import * as ActionBanner from '../../Data/Banner/actions'

// Styles
import stylesBanner from '../../Styles/Containers/Banner.css';
import stylesTable from '../../Styles/Common/Table.css'
import styles from '../../Styles/App.css';

// Utils
import classNames from 'classnames';
import * as NumberUtil from '../../Lib/Utils/parseNumber';
import * as ActionProduct from "../../Data/Product/action";


class BannerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',              // 상품제목
            storeId: '',            // 셀레버 userId
            price: '',              // 상품단가
            category: '',           // 카테고리
            descriptionShort: '',   // 간단설명
            hashtags: '',           // 해시태그
            description: '',         // 상품설명
            selectedIndex: 0,
            type: 1,
            productId: '',              // 콘텐츠ID
            imgFile: '',
            imageUrl: '',
            list: []
        }

        this.getList = this.getList.bind(this);

        this.onTabChange = this.onTabChange.bind(this);
        this.imageUrlChange = this.imageUrlChange.bind(this);
        this.productIdChange = this.productIdChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.submitBanner = this.submitBanner.bind(this);
        this.bannerDelete = this.bannerDelete.bind(this);

        this.orderDown = this.orderDown.bind(this);
        this.orderUp = this.orderUp.bind(this);
    }

    componentDidMount(){
        console.log(this.props.author)
    }

    getList(list){
        this.setState({list: list})
    }

    onTabChange(i){
        this.setState({
            selectedIndex: i,
            type: (i+1)
        });
        this.reset();
    }

    reset(){
        setTimeout(()=>{
            this.tableComponent.reset();
        })
    }

    imageUrlChange(image){
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

    productIdChange(text){
        this.setState({productId: text});
    }

    titleChange(text){
        this.setState({title: text});
    }

    submitBanner(){
        if(!this.state.imageUrl) {
            alert('이미지를 등록해주세요');
            return false;
        }else if(this.state.productId.length === 0 || this.state.productId.length > 20){
            alert('콘텐츠 아이디를 적어주세요');
            return false;
        }else if(this.state.title.length === 0){
            alert('배너용 제목을 적어주세요');
            return false;
        }else{

            ActionBanner.uploadImage(this.state.imgFile)
                .then((response) => {
                    if (response.code == 200) {

                        console.log(response)

                        let param = {
                            imageUrl: response.data.original,
                            productId: this.state.productId,
                            title:this.state.title,
                            type:this.state.type,
                            order: this.state.list.length+1
                        }

                        ActionBanner.updateBanner(param)
                            .then((response) => {
                                console.log(response)
                                this.reset();
                                this.setState({
                                    productId: '',
                                    // imgFile: '',
                                    imageUrl: '',
                                    title: ''
                                })
                            })
                            .catch((err) => {
                                alert(err)
                            })
                    }
                })
                .catch((err) => {
                })
        }
    }

    bannerDelete(product){
        if (window.confirm('삭제하시겠습니까?')){
            let param = {
                bannerId: product.bannerId,
            }

            ActionBanner.deleteBanner(param)
                .then((response) => {
                    console.log(response)
                    this.reset();
                })
                .catch((err) => {
                    alert(err)
                })

        }
    }

    orderDown(product, index){
        if(index === (this.state.list.length-1)){
            return;
        }
        let prevBannerId = this.state.list[index+1].bannerId;
        let prevTitle = this.state.list[index+1].title;
        let prevProductId = this.state.list[index+1].productId;
        let prevImageUrl = this.state.list[index+1].imageUrl;

        let param = {
            bannerId: product.bannerId,
            productId: product.productId,
            title: product.title,
            imageUrl: product.imageUrl,
            type: this.state.selectedIndex+1,
            order: index+2,
        }

        let param2 = {
            bannerId: prevBannerId,
            productId: prevProductId,
            title: prevTitle,
            imageUrl: prevImageUrl,
            type: this.state.selectedIndex+1,
            order: index+1
        }

        this.orderUpdate(param, param2);
    }

    orderUp(product, index){
        if(index === 0){
            return;
        }

        let prevBannerId = this.state.list[index-1].bannerId;
        let prevTitle = this.state.list[index-1].title;
        let prevProductId = this.state.list[index-1].productId;
        let prevImageUrl = this.state.list[index-1].imageUrl;

        let param = {
            // productId:product.productId,
            bannerId: product.bannerId,
            productId: product.productId,
            title: product.title,
            imageUrl: product.imageUrl,
            type: this.state.selectedIndex+1,
            order: index,
        }

        let param2 = {
            // productId:prevProductId,
            bannerId: prevBannerId,
            productId: prevProductId,
            title: prevTitle,
            imageUrl: prevImageUrl,
            type: this.state.selectedIndex+1,
            order: index+1
        }

        this.orderUpdate(param, param2);
    }

    orderUpdate(param, param2){
        const updateOrder = new Promise((resolve, reject) => {
            ActionBanner.updateBannerOrder(param).then((response) => {
                resolve(response);
            }).catch((err) => { reject(err); });
        });
        const updateOrder2 = new Promise((resolve, reject) => {
            ActionBanner.updateBannerOrder(param2).then((response) => {
                resolve(response);
            }).catch((err) => { reject(err); });
        });

        Promise.all([updateOrder, updateOrder2]).then((res) => {
            this.reset();
        }).catch((err) => {
            alert(err)
        });
    }

    render() {
        let headerContent;
        let renderTableHeader = Config.PAGE_BANNER.COLUMN_SIZE.map((size, index) => {
            if (index === 0) {
                headerContent = (
                    <div
                        className={stylesTable.column + ' ' + stylesTable.withCursor + ' ' + stylesTable.tableFieldName}
                        style={{ width: Config.PAGE_BANNER.COLUMN_SIZE[index] }}
                        key={index}
                        // onClick={this.sortTable.bind(this, index)}
                    >
                        {Config.PAGE_BANNER.COLUMN_NAME[index]}
                    </div>
                );
            } else {
                headerContent = (
                    <div
                        className={stylesTable.column + ' ' + stylesTable.tableFieldName}
                        style={{ width: Config.PAGE_BANNER.COLUMN_SIZE[index] }}
                        key={index}
                    >
                        {Config.PAGE_BANNER.COLUMN_NAME[index]}
                    </div>
                );
            }
            return headerContent;
        });
        let renderTableContent = (product, index) => {
            return (
                <div key={index} style={{backgroundColor:'#fff'}}>
                    <div className={stylesTable.tableContentItem} style={{cursor:'Auto'}}>
                        <div
                            className={stylesTable.column + ' ' + stylesTable.barcode}
                            style={{ width: Config.PAGE_BANNER.COLUMN_SIZE[0], fontSize: Config.PAGE_BANNER.COLUMN_FONT_SIZE[0], fontWeight: Config.PAGE_BANNER.COLUMN_FONT_WEIGHT[0], color: Config.PAGE_BANNER.COLUMN_COLOR[0] }}
                            // onClick={this.getProductDetail.bind(this, product)}
                        >
                            {product[Config.PAGE_BANNER.COLUMN_FIELD[0]]}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_BANNER.COLUMN_SIZE[1], fontSize: Config.PAGE_BANNER.COLUMN_FONT_SIZE[1], fontWeight: Config.PAGE_BANNER.COLUMN_FONT_WEIGHT[1], color: Config.PAGE_BANNER.COLUMN_COLOR[1] }}
                            // onClick={this.getProductDetail.bind(this, product)}
                        >
                            <div onClick={()=>this.orderUp(product, index)} style={{display:'inline', position:'absolute', top:25, padding:10, left:20}}>
                                <div className={styles.upArrow2} style={{display:'inline', borderColor:index === 0 ? '#ccc transparent' : '#5d83a6 transparent'}}></div>
                            </div>
                            <div onClick={()=>this.orderDown(product, index)} style={{display:'inline', position:'absolute', top:25, padding:10, left:45}}>
                                <div className={styles.downArrow2} style={{display:'inline', borderColor:index === this.state.list.length-1 ? '#ccc transparent' : '#5d83a6 transparent'}} ></div>
                            </div>

                        </div>
                        <div
                            className={stylesTable.column}
                            style={{ width: Config.PAGE_BANNER.COLUMN_SIZE[2], fontSize: Config.PAGE_BANNER.COLUMN_FONT_SIZE[2], fontWeight: Config.PAGE_BANNER.COLUMN_FONT_WEIGHT[2], color: Config.PAGE_BANNER.COLUMN_COLOR[2] }}
                            // onClick={this.getProductDetail.bind(this, product)}
                        >
                            {product[Config.PAGE_BANNER.COLUMN_FIELD[2]]}
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{width: Config.PAGE_BANNER.COLUMN_SIZE[3]}}
                            // onClick={this.getProductDetail.bind(this, product)}
                        >
                            <div className={stylesTable.tableImageFull} style={{ backgroundImage: product[Config.PAGE_BANNER.COLUMN_FIELD[3]] ? 'url("' + product[Config.PAGE_BANNER.COLUMN_FIELD[3]] + '")' : 'url("/admin/assets/img/common/img_ready_big.png")' }}></div>
                        </div>
                        <div
                            className={stylesTable.column}
                            style={{width: Config.PAGE_BANNER.COLUMN_SIZE[4], fontSize: Config.PAGE_BANNER.COLUMN_FONT_SIZE[4], fontWeight: Config.PAGE_BANNER.COLUMN_FONT_WEIGHT[4], color: Config.PAGE_BANNER.COLUMN_COLOR[4]}}
                        >
                            <span onClick={()=>this.bannerDelete(product)} style={{padding:5, cursor:'pointer'}}>
                                삭제
                            </span>
                        </div>


                    </div>

                    <div className={stylesBanner.tableItemUnerline}></div>

                </div>
            )
        }

        return (
            <div className={stylesBanner.bannerContainer}>

                <div style={{display:'inline-block', position:'relative', top:0, left:0, width:941}}>

                    <li style={{display:'inline'}}>
                        <div style={{float:'left'}} className={stylesBanner.bannerTitle}>배너관리</div>
                        <div style={{float:'left', borderRadius:10, backgroundColor:'#d8d8d8', marginTop:15, marginLeft:10, width:7, height:7, marginRight:10}}></div>
                    </li>

                    <div className={stylesBanner.bgImage}></div>

                    <CategoryTabs
                        tabs={['메인', '펀딩&마켓', '동영상']}
                        selectedTab={this.state.selectedIndex}
                        onTabChange={this.onTabChange}
                    />

                </div>

                <div className={stylesBanner.subTitleBox}>
                    <li className={stylesBanner.listTitle} style={{display:'inline-block'}}>등록된배너</li>
                    <li className={stylesBanner.listCount} style={{display:'inline-block'}}>{this.state.list.length}</li>
                </div>

                <div className={stylesTable.tableHeaderBox}>
                    <TableComponent
                        onRef={(ref) => { this.tableComponent = ref; }}
                        Get={ActionBanner.getBannerList}
                        GetCount={ActionBanner.getBannerCount}
                        isTabComponent={true}
                        HeaderComponent={renderTableHeader}
                        ListComponent={renderTableContent}
                        listString={"banners"}
                        list={this.getList}
                        pageView={'hide'}
                        Params={{
                            type: this.state.type,
                        }}
                    />

                    <div className={stylesBanner.bannerTitle}>
                        신규등록
                    </div>

                    <BannerForm
                        imageUrl={this.state.imageUrl}
                        productId={this.state.productId}
                        // contentName={this.state.contentTitle}
                        title={this.state.title}
                        imageUrlChange={this.imageUrlChange}
                        productIdChange={this.productIdChange}
                        // contentTitleChange={this.contentTitleChange}
                        titleChange={this.titleChange}
                        submitBanner={this.submitBanner}
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
})(withRouter(BannerContainer));