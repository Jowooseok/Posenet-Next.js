import React, { useState } from 'react'
import Link from 'next/link';
import { Steps, Button, message, Card, Row, Col, Drawer } from 'antd';


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
        title: '운동시작하기',
        content: 'Last-content',
    },
];


const start = () => {

    const [current, setCurrent] = useState(0);
    const [visible, setVisible] = useState(false);
    const [exercise, setExercise] = useState('');

    const next = () => {
        setCurrent(current + 1);
    }
    const prev = () => {
        setCurrent(current - 1);
    }

    const showDrawer = (e) => {
        setVisible(true); 
    }

    const onClose = () => {
        setVisible(false);
    }

    const deadliftState = () =>{
        setExercise("데드리프트")
    }

    const pushupState = () =>{
        setExercise("팔굽혀펴기")
    }

    const squatState = () =>{
        setExercise("스쿼트")
    }

    const situpState = () =>{
        setExercise("윗몸일으켜기")
    }

    const contents = () => {
        if (current == 0) {
            return (
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                </Card>
                        </Col>
                    </Row>
                </div>
            )

        }
        else if (current == 1) {
            return (
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
                            <Card title="데드리프트" bordered={true}
                                cover={<img alt="deadlift" src="../static/deaflift.png" style={{ marginTop: 30, height: 200 }} />}
                                onClick={showDrawer}
                            >

                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="팔굽혀펴기" bordered={true}
                                cover={<img alt="deadlift" src="../static/pushup.png" style={{ marginTop: 30, height: 200 }} />}
                                onClick={showDrawer}
                            >
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={15} style={{ marginTop: 15 }}>
                        <Col span={12}>
                            <Card title="스쿼트" bordered={true}
                                cover={<img alt="deadlift" src="../static/squat.png" style={{ marginTop: 30, height: 200 }} />}
                                onClick={showDrawer}
                            >
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="윗몸일으켜기" bordered={true}
                                cover={<img alt="deadlift" src="../static/situp.jpg" style={{ marginTop: 30, height: 200 }} />}
                                onClick={showDrawer}
                            >
                            </Card>
                        </Col>
                    </Row>

                    <Drawer
                        title={exercise}
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >
                        <p>Some contents...</p>
                    </Drawer>

                </div>
            )
        } else {
            return (
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                </Card>
                        </Col>
                    </Row>
                </div>
            );

        }
    }

    return (
        <div style={{ marginTop: 30 }}>
            <Steps current={current} style={{ marginBottom: 20 }}>
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
