import React, {useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col, Card, Avatar, Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { useInput } from '../pages/signup';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user';



const AppLayout = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const onChangeIsLoggedIn = () => {
        setIsLoggedIn(false);
    }
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const onSubmitForm = useCallback((e) =>{
        e.preventDefault();
        if(id === "wooseok" && password == "1234")
            setIsLoggedIn(true);
    },[id, password] );

    //redux
    const ReduxUser = useSelector(state=>state.user); //구조문법으로 {usLoggedIn, user} = useSelector(state=>state.user); 사용 가능
    console.log(ReduxUser);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loginAction);
        dispatch(logoutAction);
        dispatch(loginAction);
    }, []); 

    
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
                        <Menu.Item key="logout"><Button onClick = {onChangeIsLoggedIn}>로그아웃</Button></Menu.Item>
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
                                <Button type="primary" htmlType="submit" loading={false} style={{ marginRight: 5 }}>로그인</Button>

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

