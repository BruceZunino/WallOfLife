import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import Styles from './canvas.css'
import $ from 'jquery'
// import Webcam from 'react-webcam';
// import Cropper from 'react-cropper';

// import { Stage, Layer, Text, Rect } from "react-konva";

import { fabric } from "fabric";

import Tabletop from "tabletop";

function Canvas() {

    const [image, setImage] = useState([]);
    const [color, setColor] = useState('#000000');
    const [stroke, setStroke] = useState(10);
    const [erase, setErase] = useState(false);
    const [srcImage, setSrcImage] = useState('');
    let [id, setId] = useState(0);
    const [data, setData] = useState([]);
    const [drawMode, setDrawMode] = useState(false);


  useEffect(() => {

    let canvas = new fabric.Canvas("myCanvas", {
      isDrawingMode: drawMode
    });
    
    let textbox = new fabric.Textbox("Double click to write", {
      fontSize: 20,
      left: 50,
      top: 100,
      width: 200
    });
    canvas.add(textbox);

    changeId();

    // function Addtext() {
    //   var text = new fabric.IText("Tap & type", {
    //     fontSize: 30,
    //     top: 10,
    //     left: 10,
    //     width: 200,
    //     height: 200,
    //     textAlign: "center"
    //   });
    //   canvas.add(text);
    //   canvas.setActiveObject(text);
    //   text.enterEditing();
    //   text.selectAll();
    //   canvas.renderAll();  // or canvas.renderAll();
    //   canvas.isDrawingMode = false;
    // }

  },[])

    


  
  // We define global parameters that are used in certains functions
  // cameraStream = null;
  let isPainting = false;
  let line = [];
  let prevPos = { offsetX: 0, offsetY: 0 };


   function onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    const offSetData = { offsetX, offsetY}
    isPainting = true;
    prevPos = { offsetX, offsetY };
    paint(prevPos, offSetData, color);
  }
 
   function onMouseMove({ nativeEvent }) {
    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      // Add the position to the line array
      line = line.concat(positionData);
      paint(prevPos, offSetData, color);
    }
  }
  function endPaintEvent() {
    if (isPainting) {
      isPainting = false;
    }
  }

  function paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    if(this.state.erase === true){
      this.ctx.globalCompositeOperation="destination-out";
    }else{
      this.ctx.globalCompositeOperation="source-over";
    }

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  function changeId(){
    fetch('http://localhost:5050/data')
    .then(res => res.json())
    .then((data) => {
      setData(data)
      const lastItem = data[data.length - 1]
      setId(lastItem.id + 1);
      console.log("last Id: ", lastItem);
    })
    .catch(console.log)
  }

  function createImg(){
    var d = new Date();
    var n = d.toString();
    var canvas = document.getElementById('myCanvas');
    var dataURL = canvas.toDataURL('image/png');

    // Generate the body request
    var datos = {
      "user": "Bruce",
      "img": dataURL,
      "created_at": n,
      "id": id
    }

    fetch('http://localhost:5050/data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    setId( id += 1);
    // We call this component to refresh the canvas
  }

  // onImageChange = event  => {
  //   // When we upload an image we do this process
  //   var ctx = document.getElementById('myCanvas').getContext('2d')
  //   let img = new Image()
  //   let f = event.target.files[0]
  //   let url = window.URL || window.webkitURL
  //   let src = url.createObjectURL(f);

  //   img.src = src;
  //   this.setState({ cropImage: true })
  //   this.setState({ srcImage: src })

  //   img.onload = function(){
  //     ctx.drawImage(img,0,0);
  //     url.revokeObjectURL(src);
  //   }
  // }

  // function erase(){
  //   setErase(true)
  //   endPaintEvent();
  // }

  function handleChange(event) {
    // This function is to change the color from the color picker
    this.setState({color: event.target.value})
    this.setState({erase: false});
    endPaintEvent()
  }

  function handleChange2(event) {
    // This function is to change the color from the lineWidth
    this.setState({stroke: event.target.value});
    this.endPaintEvent()
  }


  // Here we set the ref for the Webcam component. Without this it doesnt work.

  // setRef = webcam => {
  //   this.webcam = webcam;
  // };

  // We take the Webcam picture and upload it to the canvas

  // capture = () => {
  //   const capturedImage = this.webcam.getScreenshot();
  //   var ctx = document.getElementById('myCanvas').getContext('2d')
  //   let img = new Image()

  //   img.src = capturedImage;

  //   img.onload = function(){
  //     ctx.drawImage(img,0,0);
  //   }
  // };

  // enableWebcam = () => this.setState({ webcamEnabled: true });

  function setMode(canvas){
    canvas.isDrawingMode = true
    console.log(canvas)
  }

    return (
      <div className="container-fluid">
        <div className="row canvas">
          <canvas
            id='myCanvas'
            // ref={(ref) => (this.canvas = ref)}
            style={{ border: "5px solid #d3d3d3",}}
            width="700"
            height="800"
            // onMouseDown={this.onMouseDown}
            // onMouseUp={this.endPaintEvent}
            // onMouseMove={this.onMouseMove}
          />

          {/* { this.state.webcamEnabled ?
          <div>
            <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/png"
            width={350}
            />
            <button onClick={this.capture}>Capture photo</button>
          </div>
          : 
          <button type="button" onClick={this.enableWebcam}>
            Enable webcam
          </button>
        } */}
        </div>
        <div className="row">
          <main>
            <section className="colors">
              <input className="color-picker" type="color" id="color" defaultValue={color}/>
            </section>
            <section>
              <input type="range" min="1" max="100" step="10" className="stroke-weight" defaultValue={stroke}/>
            </section>
            {/* <button  onClick={ () =>componentDidMount()}>X</button> */}
            <button  className="editSend" onClick={() => {createImg()}}>Send</button>
            <button  className="editSend" onClick={() => {setMode()}}>Text</button>
            {/* <input  type="file" name="myImage" onClick={ () => this.setState({ erase: false })} onChange={this.onImageChange}/> */}
        </main>
        </div>
      </div>
    );
}

export default Canvas;