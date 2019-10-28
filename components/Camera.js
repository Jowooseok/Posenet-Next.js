import { drawKeyPoints, drawSkeleton } from './utills'
import React, { Component, useState } from 'react'
import * as posenet from '@tensorflow-models/posenet'

class PoseNet extends Component {

  state = {
    currentExserciseName : '',
    currentExserciseNumber : '0',
    currentExserciseDestininationNumber : '',
    currentExerciseSet : '0',

    //팔굽혀펴기에 필요한 좌표 스테이트
    
    //데드리프트에 필요한 좌표 스테이트
    leftElbowY : '',
    rightElbowY : '',
    leftHipY : '',
    rightHipY : '',
    //윗몸일으켜기에 필요한 좌표 스테이트

    //스쿼트에 필요한 좌표 스테이트
  };

  constructor(props) {
    super(props, PoseNet.defaultProps)
  }

 
  static defaultProps = {
    videoWidth: 700,
    videoHeight: 500,
    flipHorizontal: true,
    algorithm: 'single-pose',
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
      this.setState({
        //데드리프트를 위한 셋스테이트
        leftElbowY : poses[0].keypoints[7].position.y,
        rightElbowY : poses[0].keypoints[8].position.y,
        leftHipY : poses[0].keypoints[11].position.y,
        rightHipY : poses[0].keypoints[12].position.y,

      })
      // console.log(poses[0])
      requestAnimationFrame(findPoseDetectionFrame)
    }
    findPoseDetectionFrame()
  }

  
    //운동할 배열 설정
    exerciseArr = [];
  
    exerciseArrFun = () =>{
      //목표량
      let dN = this.props.dN;
      let pN = this.props.pN;
      let sitN = this.props.sitN;
      let sqN = this.props.sqN;
  

      if(dN!==""){
        this.exerciseArr.push(["데드리프트", dN])
      }
      if(pN!==""){
        this.exerciseArr.push(["팔굽혀펴기", pN])
      }
      if(sitN!==""){
        this.exerciseArr.push(["윗몸일으키기", sitN])
      }
      if(sqN!==""){
        this.exerciseArr.push(["데드리프트", sqN])
      }
    }
    

    deadliftFunc = () =>{
      let trigger = -1;

      console.log(trigger)

      if((this.leftElbowY < this.leftHipY) && (this.rightElbowY < this.rightHipY)){
        trigger = 1;
      }

      if((this.leftElbowY < this.leftHipY) && (this.rightElbowY < this.rightHipY)){
        trigger = 0;
        this.setState({
          currentExserciseNumber : this.state.currentExserciseNumber + 1,
        })
        trigger = -1;
      }

      if(this.state.currentExserciseNumber === this.state.currentExserciseDestininationNumber){
        return ;
      }

    }



    ohChangeTitle = () =>{
      let arrlen = this.exerciseArr.length;

      this.exerciseArr.map((e)=>
      {

        this.setState({
          currentExserciseName : e[0],
          currentExserciseDestininationNumber : e[1],
        })

        if(e[0]==="데드리프트"){
          this.deadliftFunc();
        }
        if(e[0]==="윗몸일으키기"){
          //데드리프트 함수
        }
        if(e[0]==="팔굽혀펴기"){
          //데드리프트 함수
        }
        if(e[0]==="스쿼트"){
          //데드리프트 함수
        }
      })
    }


  render() {
    return (
      <div>
        <div>
         <h1 style={{textAlign:'center'}} >{this.state.currentExerciseSet} Set {this.state.currentExserciseName} 개수:{this.state.currentExserciseNumber} 목표개수:{this.state.currentExserciseDestininationNumber}</h1>
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