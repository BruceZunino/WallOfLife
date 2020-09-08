import React, { Component } from 'react';
import { v4 } from 'uuid';
class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state={
      image: null,
      color: '#000000'
    }
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  isPainting = false;
  // Different stroke styles to be used for user and guest
  line = [];
  // v4 creates a unique id for each user. We used this since there's no auth to tell users apart
  userId = v4();
  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
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

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    this.ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.ctx.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStyle
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  componentDidMount() {
    // Here we set up the properties of the canvas element.  
    this.canvas.width = 1000;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
  }

  createImg(){
    var d = new Date();
    var n = d.toString();
    var canvas = document.getElementById('myCanvas');
    var dataURL = canvas.toDataURL("image/png");

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
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
  };

  render() {
    console.log(this.state.color)
    console.log(this.state.image)
    return (
      <div>
        <canvas
        // We use the ref attribute to get direct access to the canvas element. 
          id={'myCanvas'}
          ref={(ref) => (this.canvas = ref)}
          style={{ background: 'white', border: "10px solid #d3d3d3" }}
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.endPaintEvent}
          onMouseUp={this.endPaintEvent}
          onMouseMove={this.onMouseMove}
        />
        <img src={this.state.image}/>
        <button onClick={ () => this.createImg()}> Send </button>
        <input type="text" id="hex" />
        <input type="color" id="color"/>
        <input type="file" name="myImage" onChange={this.onImageChange} />
      </div>
    );
  }
} 
export default Canvas;