import React from 'react';
import styles from './Header.css';
import { Link } from 'dva/router';
import {  Button } from 'antd';
function Header() {
  return (
    <div>
        <div className={styles.header}>
            <p className={styles.logo}>CoolForm</p>
            <div className={styles.loginBtn}>
                <Button type="primary"><Link to="/LogIn">登 录</Link></Button>
            </div>
            <div className={styles.signinBtn}>
                <Button type="primary"><Link to="/SignIn">注 册</Link></Button>
            </div>
          </div>
       
    </div>
  );
}

export default Header;
