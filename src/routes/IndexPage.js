import React from 'react';
import { connect } from 'dva';
import styles  from './IndexPage.css';
import { Link } from 'dva/router';
import QuestionPanel from '../components/questionPanel/QuestionPanel.js';
import EditPanel from '../components/editPanel/EditPanel.js';
import { Layout, Menu, Breadcrumb, Icon,Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class IndexPage extends React.PureComponent {
  constructor(){
    super();
  }
  state = {
    collapsed: false,
  };
 
  changeEditBox = () => {
      this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render(){

  return (
   <Layout style={{ height: '100vh'}}>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Button>提 交</Button></Menu.Item>
        <Menu.Item key="2" className={styles.previewBtn}>
          <Button onClick={this.changeEditBox}>
              预 览
          </Button></Menu.Item>
      </Menu>
      
    </Header>
    <Layout style={{position:'relative',height:'100%' }}>
  
      <QuestionPanel style={{background:'#fff'}} />
      <div style={{position: 'absolute',height: '100%',width: '90%', background: 'rgba(255,255,255,0.9)',transition:'all 1s ease 0s'}} className={ this.state.collapsed ? styles.slideMove : styles.moveback}> 
         <EditPanel/>
      </div>
     
      
      
    </Layout>
  </Layout>
  )
   }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);