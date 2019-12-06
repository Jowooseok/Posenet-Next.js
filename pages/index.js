import React, {useState, useEffect} from 'react'
import Camera from '../components/Camera.js'
import Link from 'next/link';
import {Carousel} from 'antd';
import { useSelector, useDispatch } from 'react-redux';


const index = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
 
    }, []);

    return(
        <div>
              <Carousel autoplay>
                <div>
                    <img src="../static/캡처1.png" style={{width : "100%",marginTop:"5%" ,textAlign:"center"}}></img>
                </div>
                <div>
                     <img src="../static/캡처2.png" style={{width: "100%", marginTop:"5%",textAlign:"center"}}></img>
                </div>
            </Carousel>

        </div>
    )
}

export default index;
