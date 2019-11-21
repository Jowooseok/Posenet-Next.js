import React, {useState, useEffect} from 'react'
import Camera from '../components/Camera.js'
import Link from 'next/link';


const index = () => {
const[count, setCount] = useState(0);

useEffect(()=>{
    document.title = `You clicked ${count} time`;
});

    return(
        <div style = {{margin:'10%'}}>
            <p>You clicked {count} times</p>
            <button onClick={()=> setCount(count+1)}>
                Click me
            </button>
        </div>
    )
}

export default index;
