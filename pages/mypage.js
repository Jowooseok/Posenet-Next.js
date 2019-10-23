import React from 'react';
import { Form, Input, Button,Card, Avatar } from 'antd';
import Link from 'next/link';

const dummy = {
    nickname: 'Jrun2ng',
    Post: [],
    Followings: [],
    Followers: [],
    isLoggedIn : true,
};

const mypage = () => {
    return (
        <div>
            <Card
                actions={[
                    <div key="twit">짹짹<br />{dummy.Post.length}</div>,
                    <div key="follwing">팔로잉<br />{dummy.Followings.length}</div>,
                    <div key="follower">팔로워<br />{dummy.Followers.length}</div>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                    title={dummy.nickname}
                />
            </Card>
        </div>
    )
};

export default mypage;