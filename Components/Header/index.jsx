import React from 'react';
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles

import stylesHeader from '../../Styles/Components/Header.css';

class Header extends React.Component {

  componentDidMount() {
    console.log("first====")
    console.log(this.props.author);
  }
  logout() {
    let loginUrl;
    if (this.props.author.type == 1) {
      loginUrl = '/login';
    } else {
      loginUrl = '/suser/login';
    }
  }

  render() {
    return (
      <div className={stylesHeader.headerContainer}>
        {/*<button className={stylesHeader.headerToggler + ' navbar-toggler'} onClick={this.props.openSidebar} type={'button'}>*/}
          {/*<span className={'sr-only'}>Toggle Navigation</span>*/}
          {/*<span className={stylesHeader.iconBar + ' ' + stylesHeader.firstIconBar}></span>*/}
          {/*<span className={stylesHeader.iconBar}></span>*/}
          {/*<span className={stylesHeader.iconBar}></span>*/}
        {/*</button>*/}

          <div
              className={stylesHeader.headerLogoBox}
          >
              <Link to={ '/admin'}>
                  <span className={stylesHeader.headerTitle}>Sellev</span>
              </Link>
              <span className={stylesHeader.headerSubTitle}>overview</span>
          </div>
          <div className={stylesHeader.headerRight}>
              <div className={stylesHeader.headerName}>
                  <img className={stylesHeader.headerProfileImg} src={"/assets/img/ic_profile.png"} alt="" />
                  &nbsp;&nbsp;반갑습니다! {this.props.author.userId}님
              </div>
              {this.props.author.id ? (
                  <div
                      className={styles.grayBorderBtn + ' ' + styles.smallBtn}
                      onClick={this.logout.bind(this)}
                  >
                      로그아웃
                  </div>
              ) : null}
          </div>

      </div>
    );
  }
}
export default connect((state) => {
  return {
    author: state.data.auth.author,
  };
})(withRouter(Header));
