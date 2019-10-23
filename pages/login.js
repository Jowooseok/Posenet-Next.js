import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useInput } from '../pages/signup'

const login = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const onSubmitForm = useCallback((e) =>{
        e.preventDefault();
        console.log({
            id, password,
        });
    },[id, password] );

    return (
        <div>
            <Form style={{ padding: 20 }} onSubmit ={onSubmitForm}>
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
                    <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                </div>

            </Form>
        </div>
    )
};

export default login;