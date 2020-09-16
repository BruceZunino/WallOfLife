import React, { Component } from 'react';
import Styles from './canvas.css'
import $ from 'jquery'
import Webcam from 'react-webcam';


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state={
      image: null,
      color: '#000000',
      stroke: 10,
      erase: false,
      webcamEnabled: false
    }

    // Binding this functions, we let them work
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  componentDidMount() {
    // Here we set up the properties of the canvas element.
    this.canvas.width = 700;
    this.canvas.height = 700;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 10;

    // This is how canvas takes the text
    this.ctx.font = "30px Arial";
    this.ctx.fillText("Hello World", 10, 50);
  }

  componentDidUpdate() {
    // When the lineWidth changes, we update the stroke
    this.ctx.lineWidth = this.state.stroke;
  }

  // We define global parameters that are used in certains functions
  cameraStream = null;
  isPainting = false;
  line = [];
  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    const offSetData = { offsetX, offsetY}
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
    this.paint(this.prevPos, offSetData, this.state.color);
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      // Add the position to the line array
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.state.color);
    }
  }
  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
    }
  }

  paint(prevPos, currPos, strokeStyle) {
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

  createImg(){
    var d = new Date();
    var n = d.toString();
    var canvas = document.getElementById('myCanvas');
    var dataURL = canvas.toDataURL('image/png');

    // Generate the body request
    var datos = {
      "user": "Bruce",
      "img": dataURL,
      "created_at": n
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

    // We call this component to refresh the canvas
    this.componentDidMount()
  }

  onImageChange = event  => {
    // When we upload an image we do this process
    var ctx = document.getElementById('myCanvas').getContext('2d')
    let img = new Image()
    let f = event.target.files[0]
    let url = window.URL || window.webkitURL
    let src = url.createObjectURL(f);

    img.src = src;

    img.onload = function(){
      ctx.drawImage(img,0,0);
      url.revokeObjectURL(src);
    }
  }

  erase(){
    this.setState({ erase:  true })
  }

  handleChange(event) {
    // This function is to change the color from the color picker
    this.setState({color: event.target.value})
    this.setState({erase: false})
  }

  handleChange2(event) {
    // This function is to change the color from the lineWidth
    this.setState({stroke: event.target.value})
  }

  // Here we set the ref for the Webcam component. Without this it doesnt work.
  setRef = webcam => {
    this.webcam = webcam;
  };

  // We take the Webcam picture and upload it to the canvas
  capture = () => {
    const capturedImage = this.webcam.getScreenshot();
    var ctx = document.getElementById('myCanvas').getContext('2d')
    let img = new Image()

    img.src = capturedImage;

    img.onload = function(){
      ctx.drawImage(img,0,0);
    }
  };

  enableWebcam = () => this.setState({ webcamEnabled: true });

  render() {
    console.log(this.state.cap)
    return (
      <div className="container-fluid">
        <div className="row canvas">
          <canvas
            id={'myCanvas'}
            ref={(ref) => (this.canvas = ref)}
            style={{ border: "5px solid #d3d3d3", backgroundColor: "white"}}
            onMouseDown={this.onMouseDown}
            onMouseLeave={this.endPaintEvent}
            onMouseUp={this.endPaintEvent}
            onMouseMove={this.onMouseMove}
          />
          { this.state.webcamEnabled ?
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
        }
        </div>
        <div className="row">
          <main>
            <section class="colors">
              <input className="color-picker" type="color" id="color" value={this.state.color} onChange={this.handleChange.bind(this)}/>
            </section>
            <section class="thickness">
              <input type="number" class="stroke-weight" value={this.state.stroke} onChange={this.handleChange2.bind(this)}/>
            </section>
            <button class="clear" onClick={ () => this.setState({ image: null },  this.componentDidMount())}>X</button>
            <button  className="editSend" onClick={ () => this.createImg()}>Send</button>
            <button  className="editSend" onClick={ () => this.erase()}>Borrar</button>
            <input className="editImg" type="file" name="myImage" onClick={ () => this.setState({ erase: false })} onChange={this.onImageChange}/>
        </main>
        </div>
      </div>
    );
  }
}
export default Canvas;