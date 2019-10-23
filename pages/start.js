import React, { useState } from 'react'
import Link from 'next/link';
import { Steps, Button, message, Card, Row, Col, Drawer, Form, Input, Divider } from 'antd';


const { Step } = Steps;
const { Meta } = Card;

const steps = [
    {
        title: '이전운동기록',
        content: 'First-content',
    },
    {
        title: '운동설정',
        content: 'Second-content',
    },
    {
        title: '운동준비',
        content: 'Third-content',
    },
    {
        title: '운동시작',
        content: 'Fourth-content',
    },
    {
        title: '운동결과',
        content: 'Last-content',
    },
    
];


const start = () => {

    const [current, setCurrent] = useState(0);
    const [deadliftVisible, setDeadliftVisible] = useState(false);
    const [pushupVisible, setPushupVisible] = useState(false);
    const [squatVisible, setSquatVisible] = useState(false);
    const [situpVisible, setSitupVisible] = useState(false);
    const [deadliftNumber, setDeadliftNumber] = useState('');
    const [pushupNumber , setPushupNumber] = useState('');
    const [squatNumber, setSquatNumber] = useState('');
    const [situpNumber, setSitupNumber] = useState('');
    const [deadliftSets, setDeadliftSets] = useState('');
    const [pushupSets , setPushupSets] = useState('');
    const [squatSets, setSquatSets] = useState('');
    const [situpSets, setSitupSets] = useState('');


    const next = () => {
        setCurrent(current + 1);
    }
    const prev = () => {
        setCurrent(current - 1);
    }

    const showDeadliftDrawer = () => {
        setDeadliftVisible(true);
    }

    const onCloseDeadlift = () => {
        setDeadliftVisible(false);
    }

    const showPushupDrawer = () => {
        setPushupVisible(true);
    }

    const onClosePushup = () => {
        setPushupVisible(false);
    }
    const showSquatDrawer = () => {
        setSquatVisible(true);
    }

    const onCloseSquat = () => {
        setSquatVisible(false);
    }
    const showSitupDrawer = () => {
        setSitupVisible(true);
    }

    const onCloseSitup = () => {
        setSitupVisible(false);
    }

    const onDeadliftSubmit = (e) =>{
        e.preventDefault
        onCloseDeadlift()
    }

    const onChangeDeadliftNumber = (e) =>{
        setDeadliftNumber(e.target.value)
    }

    const onChangeDeadliftSets = (e) =>{
        setDeadliftSets(e.target.value)
    }

    const onPushupSubmit = (e) =>{
        e.preventDefault
        onClosePushup()
    }

    const onChangePushupNumber = (e) =>{
        setPushupNumber(e.target.value)
    }

    const onChangePushupSets = (e) =>{
        setPushupSets(e.target.value)
    }

    const onSitupSubmit = (e) =>{
        e.preventDefault
        onCloseSitup()
    }

    const onChangeSitupNumber = (e) =>{
        setSitupNumber(e.target.value)
    }

    const onChangeSitupSets = (e) =>{
        setSitupSets(e.target.value)
    }

    const onSquatSubmit = (e) =>{
        e.preventDefault
        onCloseSquat()
    }

    const onChangeSquatNumber = (e) =>{
        setSquatNumber(e.target.value)
    }

    const onChangeSquatSets = (e) =>{
        setSquatSets(e.target.value)
    }
    
    const contents = () => {
        if (current == 0) {
            return (
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="날짜" bordered={false}>
                                운동내역
                </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="날짜" bordered={false}>
                                운동내역
                </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="날짜" bordered={false}>
                                운동내역
                </Card>
                        </Col>
                    </Row>
                </div>
            )

        }
        else if (current == 1) {
            return (
                <div>
                    <Card size="small" title="운동설정현황" extra={<></>} style={{ width: 300, height: 520 , position:'absolute', right : 800, top : 200}}> {/* 나중에 right 수정 */}
                    {
                            <div>
                                <div>
                                    <h3>데드리프트</h3>
                                    개수 : {deadliftNumber} <br />
                                    세트 : {deadliftSets}
                                    <Divider />
                                </div>
                                <div>
                                    <h3>팔굽혀펴기</h3>
                                    개수 : {pushupNumber} <br />
                                    세트 : {pushupSets}
                                    <Divider />
                                </div>
                                <div>
                                    <h3>스쿼트</h3>
                                    개수 : {squatNumber} <br />
                                    세트 : {squatSets}
                                    <Divider />
                                </div>
                                <div>
                                    <h3>윗몸일으켜기</h3>
                                    개수 : {situpNumber} <br />
                                    세트 : {situpSets}
                                </div>
                            </div>
                    }
                </Card>
                <div style={{
                    height: 780,
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid #ebedf0',
                    borderRadius: 2,
                    padding: 48,
                    textAlign: 'center',
                    background: '#fafafa',
                }}>
                    
                    <Row gutter={15} style={{ marginBottom: 15 }}>
                        <Col span={12}>
                            <Card title="데드리프트" bordered={true} style={{cursor : "pointer"}}
                                cover={<img alt="데드리프트" src="../static/deaflift.png" style={{ marginTop: 30, height: 200 }} />}
                                onClick={showDeadliftDrawer}
                            >

                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="팔굽혀펴기" bordered={true} style={{cursor : "pointer"}}
                                cover={<img alt="팔굽혀펴기" src="../static/pushup.png" style={{ marginTop: 30, height: 200 }} />}
                                onClick={showPushupDrawer}
                            >
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={15} style={{ marginTop: 15 }}>
                        <Col span={12}>
                            <Card title="스쿼트" bordered={true} style={{cursor : "pointer"}}
                                cover={<img alt="스쿼트" src="../static/squat.png" style={{ marginTop: 30, height: 200 }} />}
                                onClick={showSquatDrawer}
                            >
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="윗몸일으켜기" bordered={true} style={{cursor : "pointer"}}
                                cover={<img alt="윗몸일으켜기" src="../static/situp.jpg" style={{ marginTop: 30, height: 200 }} />}
                                onClick={showSitupDrawer}
                            >
                            </Card>
                        </Col>
                    </Row>

                    <Drawer
                        title={'데드리프트'}
                        placement="right"
                        closable={false}
                        onClose={onCloseDeadlift}
                        visible={deadliftVisible}
                        getContainer={true}
                        style={{ position: 'absolute' }}
                    >
                            <Form onSubmit = {onDeadliftSubmit}>
                                <div>
                                    개수 : <Input value={deadliftNumber} placeholder='0' onChange = {onChangeDeadliftNumber} required/>
                                </div>
                                <div style = {{marginTop : 10}}>
                                    세트 : <Input value={deadliftSets} placeholder='0' onChange = {onChangeDeadliftSets} required/>
                                </div>
                                <Button type="primary" htmlType="submit" style={{marginTop : 15}}>등록</Button>
                            </Form>
                    </Drawer>
                    <Drawer
                        title={'팔굽혀펴기'}
                        placement="right"
                        closable={false}
                        onClose={onClosePushup}
                        visible={pushupVisible}
                        getContainer={true}
                        style={{ position: 'absolute' }}
                    >
                        <Form onSubmit = {onPushupSubmit}>
                                <div>
                                    개수 : <Input value={pushupNumber} placeholder='0' onChange = {onChangePushupNumber} required/>
                                </div>
                                <div style = {{marginTop : 10}}>
                                    세트 : <Input value={pushupSets} placeholder='0' onChange = {onChangePushupSets} required/>
                                </div>
                                <Button type="primary" htmlType="submit" style={{marginTop : 15}}>등록</Button>
                            </Form>
                    </Drawer>
                    <Drawer
                        title={'스쿼트'}
                        placement="right"
                        closable={false}
                        onClose={onCloseSquat}
                        visible={squatVisible}
                        getContainer={true}
                        style={{ position: 'absolute' }}
                    >
                         <Form onSubmit = {onSquatSubmit}>
                                <div>
                                    개수 : <Input value={squatNumber} placeholder='0' onChange = {onChangeSquatNumber} required/>
                                </div>
                                <div style = {{marginTop : 10}}>
                                    세트 : <Input value={squatSets} placeholder='0' onChange = {onChangeSquatSets} required/>
                                </div>
                                <Button type="primary" htmlType="submit" style={{marginTop : 15}}>등록</Button>
                            </Form>
                    </Drawer>
                    <Drawer
                        title={'윗몸일으켜기'}
                        placement="right"
                        closable={false}
                        onClose={onCloseSitup}
                        visible={situpVisible}
                        getContainer={true}
                        style={{ position: 'absolute' }}
                    >
                        <Form onSubmit = {onSitupSubmit}>
                                <div>
                                    개수 : <Input value={situpNumber} placeholder='0' onChange = {onChangeSitupNumber} required/>
                                </div>
                                <div style = {{marginTop : 10}}>
                                    세트 : <Input value={situpSets} placeholder='0' onChange = {onChangeSitupSets} required/>
                                </div>
                                <Button type="primary" htmlType="submit" style={{marginTop : 15}}>등록</Button>
                            </Form>
                    </Drawer>

                </div>
                </div>
            )
        } else if(current==2) {
            return (
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={24}>
                        <Card size="small" title="운동설정현황" extra={<></>} style={{ }}> {/* 나중에 right 수정 */}
                    {
                            <div>
                                <div style={{marginBottom : 40}}>
                                    <h3>데드리프트</h3>
                                    <img alt="데드리프트이미지" src="../static/deaflift.png" style={{ height: 75 , right : 15   ,   position:'absolute'}} />
                                    개수 : {deadliftNumber} <br />
                                    세트 : {deadliftSets}
                                    <Divider />
                                </div>
                                <div style={{marginBottom : 40}}>
                                    <h3>팔굽혀펴기</h3>
                                    <img alt="팔굽혀펴기이미지" src="../static/pushup.png" style={{ height: 75 , right : 15   ,   position:'absolute'}} />
                                    개수 : {pushupNumber} <br />
                                    세트 : {pushupSets}
                                    <Divider />
                                </div>
                                <div style={{marginBottom : 40}}>
                                    <h3>스쿼트</h3>
                                    <img alt="스쿼트이미지" src="../static/squat.png" style={{ height: 75 , right : 15   ,   position:'absolute'}} />
                                    개수 : {squatNumber} <br />
                                    세트 : {squatSets}
                                    <Divider />
                                </div>
                                <div style={{marginBottom : 30}}>
                                    <h3>윗몸일으켜기</h3>
                                    <img alt="윗몸일으켜기이미지" src="../static/situp.jpg" style={{ height: 75 , right : 15   ,   position:'absolute'}} />
                                    개수 : {situpNumber} <br />
                                    세트 : {situpSets}
                                </div>
                            </div>
                    }
                </Card>
                        </Col>
                    </Row>
                </div>
            );
        }else if(current==3){
            return (
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={24}>
                        
                        </Col>
                    </Row>
                </div>
            );

        }else{
            return (
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={24}>
                        
                        </Col>
                    </Row>
                </div>
            );

        }
    }

    return (
        <div style={{ marginTop: 30  }}>
            <Steps current={current} style={{ marginBottom: 20 }} >
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content"> {/*커렌트 값 */}
                {contents()}
            </div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
            </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
            </Button>
                )}
                {current > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                        Previous
            </Button>
                )}
            </div>
        </div>
    )
}

export default start;
