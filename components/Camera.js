import { drawKeyPoints, drawSkeleton } from './utills'
import React, { Component, useState } from 'react'
import * as posenet from '@tensorflow-models/posenet'
import Start from '../pages/start';

class PoseNet extends Component {


  state = {
    currentExserciseName: '',
    currentExserciseNumber: '0',
    currentExserciseDestininationNumber: '',
    currentExerciseSet: '0',
    trigger: '-1',
    deadliftSet : '1',
    squatSet : '1',
    shoulderpressSet : '1',
    k : 0,

    //숄더프레스에 필요한 좌표 스테이트
    leftSholderY : '',
    leftWristY : '',

    //데드리프트에 필요한 좌표 스테이트
    leftElbowY: '',
    rightElbowY: '',
    leftHipY: '',
    rightHipY: '',
    score : '',
    //윗몸일으켜기에 필요한 좌표 스테이트

    //스쿼트에 필요한 좌표 스테이트
    leftKnee : '',
    RightKnee : '',
  };


  //운동할 배열 설정
  exerciseArr = [];

  exerciseArrFun = () => {
    //목표량
    let dN = this.props.dN;
    let pN = this.props.pN;
    let sitN = this.props.sitN;
    let sqN = this.props.sqN;
    let eSet = this.props.eS;

    for (let i = 0; i < eSet; i++) {
      if (dN !== '') {
        this.exerciseArr.push(["데드리프트", dN])
      }
      if (pN !== '') {
        this.exerciseArr.push(["숄더프레스", pN])
      }
      if (sitN !== "") {
        this.exerciseArr.push(["윗몸일으키기", sitN])
      }
      if (sqN !== "") {
        this.exerciseArr.push(["스쿼트", sqN])
      }
    }
  }


  deadliftFunc = (e) => {

    if(e){
      this.setState({
        currentExserciseName: e[0],
        currentExserciseDestininationNumber: e[1],
        currentExerciseSet : this.state.deadliftSet,
      })
    }

    if ((this.state.trigger === '-1') && (Math.abs((Number(this.state.leftKnee)) - (Number(this.state.leftElbowY)))) < 110 ) { //팔꿈치와 무릎의 거리차
      this.setState({
        trigger : '1',
      })
    }

    if (( Math.abs((Number(this.state.leftKnee)) - (Number(this.state.leftElbowY))) > 140 )  && this.state.trigger === '1' && (this.state.score > 0.92)) {
      this.setState({
        currentExserciseNumber: String(Number(this.state.currentExserciseNumber) + 1),
        trigger : '-1'
      })
    
    }

    if ((this.state.currentExserciseNumber === this.state.currentExserciseDestininationNumber)&& this.state.currentExserciseName==="데드리프트") {
      this.setState({
        deadliftSet : String(Number(this.state.deadliftSet) + 1),
        currentExserciseNumber : '0',
        k : this.state.k + 1,
      })

      this.exerciseArr.shift();
      setTimeout(function() {
       console.log('데드')
      }, 1500);

      console.log(this.exerciseArr)

      if((this.exerciseArr.length == 0)){
        this.props.callbackCurrent(4);}
    }

  }

  squatFunc = (e) => {

    if(e){
      this.setState({
        currentExserciseName: e[0],
        currentExserciseDestininationNumber: e[1],
        currentExerciseSet : this.state.squatSet,
      })
    }


    if ((this.state.trigger === '-1') && (Math.abs((Number(this.state.leftKnee)) - (Number(this.state.leftHipY)))) < 30 ) { //무릎이 엉덩이와 차이가 없으면
      this.setState({
        trigger : '1',
      })
    }

    if (( Math.abs((Number(this.state.leftKnee)) - (Number(this.state.leftHipY))) > 80 )  && this.state.trigger === '1' && (this.state.score > 0.92)) {
      this.setState({
        currentExserciseNumber: String(Number(this.state.currentExserciseNumber) + 1),
        trigger : '-1'
      })
    }

  

    if ((this.state.currentExserciseNumber === this.state.currentExserciseDestininationNumber) && this.state.currentExserciseName==="스쿼트") {
      this.setState({
        squatSet : String(Number(this.state.squatSet) + 1),
        currentExserciseNumber : '0',
        k : this.state.k + 1,
      })
      this.exerciseArr.shift();
      setTimeout(function() {
        console.log('스쿼트')
       }, 1500);

      if((this.exerciseArr.length == 0)){
        this.props.callbackCurrent(4);
      }
    }

  }

  shoulderpressFunc = (e) => {

    if(e){
      this.setState({
        currentExserciseName: e[0],
        currentExserciseDestininationNumber: e[1],
        currentExerciseSet : this.state.shoulderpressSet,
      })
    }


    if ((this.state.trigger === '-1') && (Number(this.state.leftElbowY) > Number(this.state.leftSholderY))) { //어깨보다 팔굼치가 아래면
      this.setState({
        trigger : '1',
      })
    }

    if (Number(this.state.noseY) > Number(this.state.leftWristY) && (Number(this.state.leftElbowY) < Number(this.state.leftSholderY)) && this.state.trigger === '1' && (this.state.score > 0.60)) {
      this.setState({
        currentExserciseNumber: String(Number(this.state.currentExserciseNumber) + 1),
        trigger : '-1',
      })
    }

    if ((this.state.currentExserciseNumber === this.state.currentExserciseDestininationNumber) && this.state.currentExserciseName==="숄더프레스") {
      this.setState({
        shoulderpressSet : String(Number(this.state.shoulderpressSet) + 1),
        currentExserciseNumber : '0',
        k : this.state.k + 1,
      })
      this.exerciseArr.shift();
      setTimeout(function() {
        console.log('숄더프레스')
       }, 1500);

      if((this.exerciseArr.length == 0)){
        this.props.callbackCurrent(4);
      }
    }

  }


  ohChangeTitle = () => {
    let arrlen = this.exerciseArr.length;
    let e = this.exerciseArr;

    console.log(this.exerciseArr);
    console.log(arrlen +": arrlen")

    try{
    if(arrlen>0){
      if (e[0][0] === "데드리프트") {
        this.deadliftFunc(e[0]);
      }
      else if (e[0][0] === "윗몸일으키기") {
        this.setState({
          currentExserciseName: e[0][0],
          currentExserciseDestininationNumber: e[0][1],
        })
        //데드리프트 함수
      }
      else if (e[0][0] === "숄더프레스") {
        this.shoulderpressFunc(e[0]);
       
      }
      else if (e[0][0] === "스쿼트") {
        this.squatFunc(e[0]);
       
      }
    }else{
      this.props.callbackCurrent(4);
    }

  }catch(e){
    console.log(e);
  }
  }


  constructor(props) {
    super(props, PoseNet.defaultProps)
  }


  static defaultProps = {
    videoWidth: 1000,
    videoHeight: 700,
    flipHorizontal: true,
    algorithm: 'multi-pose',
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: '#ffadea',
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...'
  }

  getCanvas = elem => {
    this.canvas = elem
  }

  getVideo = elem => {
    this.video = elem
  }

  async componentDidMount() {

    this.exerciseArrFun();
    this.ohChangeTitle();

    try {
      await this.setupCamera()
    } catch (error) {
      throw new Error(
        'This browser does not support video capture, or this device does not have a camera'
      )
    }

    try {
      this.posenet = await posenet.load()
    } catch (error) {
      throw new Error('PoseNet failed to load')
    } finally {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 200)
    }

    this.detectPose()
  }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      )
    }
    const { videoWidth, videoHeight } = this.props
    const video = this.video
    video.width = videoWidth
    video.height = videoHeight

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: videoWidth,
        height: videoHeight
      }
    })

    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    const { videoWidth, videoHeight } = this.props
    const canvas = this.canvas
    const canvasContext = canvas.getContext('2d')

    canvas.width = videoWidth
    canvas.height = videoHeight

    this.poseDetectionFrame(canvasContext)
  }

  poseDetectionFrame(canvasContext) {
    const {
      algorithm,
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      minPartConfidence,
      maxPoseDetections,
      nmsRadius,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth
    } = this.props

    const posenetModel = this.posenet
    const video = this.video

    const findPoseDetectionFrame = async () => {
      let poses = []

      switch (algorithm) {
        case 'multi-pose': {
          poses = await posenetModel.estimateMultiplePoses(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            maxPoseDetections,
            minPartConfidence,
            nmsRadius
          )
          break
        }
        case 'single-pose': {
          const pose = await posenetModel.estimateSinglePose(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride
          )
          poses.push(pose)
          break
        }
      }

      canvasContext.clearRect(0, 0, videoWidth, videoHeight)

      if (showVideo) {
        canvasContext.save()
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
        canvasContext.restore()
      }

      poses.forEach(({ score, keypoints }) => {
        if (score >= minPoseConfidence) {
          if (showPoints) {
            drawKeyPoints(
              keypoints,
              minPartConfidence,
              skeletonColor,
              canvasContext
            )
          }
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              canvasContext
            )
          }
        }
      }
      )

      try{
      if(poses[0].keypoints[7]){
      this.setState({
        //데드리프트를 위한 셋스테이트
        leftElbowY: poses[0].keypoints[7].position.y,
        rightElbowY: poses[0].keypoints[8].position.y,
        leftHipY: poses[0].keypoints[11].position.y,
        rightHipY: poses[0].keypoints[12].position.y,
        score : poses[0].score,

        //스쾃
        leftKnee : poses[0].keypoints[13].position.y,
        RightKnee : poses[0].keypoints[14].position.y,

        //숄더프레스
        noseY : poses[0].keypoints[0].position.y,
        leftSholderY : poses[0].keypoints[5].position.y,
        leftWristY : poses[0].keypoints[9].position.y,

      })
    }
  }catch(e){
    console.log(e);
  }

      this.ohChangeTitle();

      requestAnimationFrame(findPoseDetectionFrame)
    }
    findPoseDetectionFrame()
  }


  render() {
    return (
      <div>
        <div>
          <h1 style={{ textAlign: 'center' }} >{this.state.currentExerciseSet} Set {this.state.currentExserciseName} 개수:{this.state.currentExserciseNumber} 목표개수:{this.state.currentExserciseDestininationNumber}</h1>
          <video id="videoNoShow" playsInline ref={this.getVideo} />
          <canvas className="webcam" ref={this.getCanvas} />
          <style jsx>{`
                .webcam {
                  margin: 0 auto;
                  margin-left: auto;
                  margin-right: auto;
                  padding: 6px;
                }
                
                #videoNoShow {
                  transform: scaleX(-1);
                  -moz-transform: scaleX(-1);
                  -o-transform: scaleX(-1);
                  -webkit-transform: scaleX(-1);
                  display: none !important;
                }

    `}</style>

        </div>
      </div>
    )
  }
}

export default PoseNet