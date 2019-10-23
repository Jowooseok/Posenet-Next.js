import React from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col, Card, Avatar, Button, Form } from 'antd';
import PropTypes from 'prop-types';

const dummy = {
    isLoggedIn : true,
};

const AppLayout = ({ children }) => {
    return (
        <>
            <div>
                {dummy.isLoggedIn
                    ?
                    <Menu mode="horizontal">
                        <Menu.Item key="index"><Link href='/index'><a >Jrun2ng</a></Link></Menu.Item>
                        <Menu.Item key="mail">
                            <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                        </Menu.Item>
                        <Menu.Item key="start"><Link href="/start"><a>Start</a></Link></Menu.Item>
                        <Menu.Item key="mypage" ><Link href="/mypage"><a>Mypage</a></Link></Menu.Item>
                        <Menu.Item key="logout"><Button>로그아웃</Button></Menu.Item>
                    </Menu>
                    :
                    <Menu mode="horizontal">
                        <Menu.Item key="index"><Link href='/index'><a >Jrun2ng</a></Link></Menu.Item>
                        <Menu.Item key="mail">
                            <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                        </Menu.Item>
                        <Menu.Item key="signup"><Link href="/signup"><a>회원가입</a></Link></Menu.Item>
                        <Menu.Item key="login"><Link href="/login"><a>로그인</a></Link></Menu.Item>
                    </Menu>
                }
                <Row>
                    <Col xs={24} md={6}>

                    </Col>
                    <Col xs={24} md={12}>
                        {children}
                    </Col>
                    <Col xs={24} md={6}>

                    </Col>
                </Row>

            </div>
        </>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node,

};

export default AppLayout;

