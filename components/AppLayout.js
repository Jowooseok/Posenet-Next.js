import React, {useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col, Card, Avatar, Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { useInput } from '../pages/signup';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_REQUEST } from '../reducers/user';



const AppLayout = ({ children }) => {


    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const ReduxUser = useSelector(state=>state.user); //구조문법으로 const {useLoggedIn, user} = useSelector(state=>state.user); 사용 가능
    const {isLoggingIn, isLoggedIn,} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const onChangeIsLogout = () =>{
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }
    const onSubmitForm = useCallback((e) =>{
        e.preventDefault();
        
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                id, password,
            },
        });
       
    },[id, password] );
    
    
    return (
        <>
            <div>
                {isLoggedIn
                    ?
                    <Menu mode="horizontal">
                        <Menu.Item key="index"><Link href='/index'><a >Jrun2ng</a></Link></Menu.Item>
                        <Menu.Item key="mail">
                            <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                        </Menu.Item>
                        <Menu.Item key="start"><Link href="/start"><a>Start</a></Link></Menu.Item>
                        <Menu.Item key="mypage" ><Link href="/mypage"><a>Mypage</a></Link></Menu.Item>
                        <Menu.Item key="logout"><Button onClick = {onChangeIsLogout}>로그아웃</Button></Menu.Item>
                    </Menu>
                    :
                    <Menu mode="horizontal">
                        <Menu.Item key="index"><Link href='/index'><a >Jrun2ng</a></Link></Menu.Item>
                        <Menu.Item key="mail">
                            <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                        </Menu.Item>
                        <Menu.Item key="signup"><Link href="/signup"><a>회원가입</a></Link></Menu.Item>
                    </Menu>
                }
                <Row>
                    <Col xs={24} md={6}>
                        {!isLoggedIn?
                    <div>
                        <Form style={{ padding: 20 , marginTop: 20 , paddingRight : 200 }} onSubmit ={onSubmitForm}>
                            <div>
                                <label htmlFor="user-id">아이디</label>
                                <br />
                                <Input name="user-id" required value={id} onChange={onChangeId} />
                            </div>
                            <div>
                                <label htmlFor="user-password" >비밀번호</label>
                                <br />
                                <Input name="user-password" type="password" required value={password} onChange={onChangePassword} />
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <Button type="primary" htmlType="submit" loading={isLoggingIn} style={{ marginRight: 5 }}>로그인</Button>

                            </div>

                        </Form>
                        
                    </div>
                    :
                    <div></div>
                        }


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