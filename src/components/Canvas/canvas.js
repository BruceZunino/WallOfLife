import React, { Component } from 'react';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state={
      image: 'http://localhost:3000/c6a34f78-aa3f-4940-8e09-457066609c99',
      color: '#000000',
      lineWidth: 1
    }
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
    this.ctx.lineWidth = this.state.lineWidth;
  } 

  isPainting = false;
  line = [];
  // v4 creates a unique id for each user. We used this since there's no auth to tell users apart
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

    this.componentDidMount()
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
    var ctx = document.getElementById('myCanvas').getContext('2d');
      var img = new Image();
      img.onload = function(){
        ctx.drawImage(img,0,0);
      };
      img.src = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fsearchengineland.com%2Ffigz%2Fwp-content%2Fseloads%2F2015%2F12%2Fgoogle-amp-fast-speed-travel-ss-1920-800x450.jpg&imgrefurl=https%3A%2F%2Fsearchengineland.com%2Fgoogle-dropped-google-instant-search-279674&tbnid=OHRy5bbkAcn8vM&vet=12ahUKEwjWkcWP39zrAhU6ALkGHQHPBVQQMygIegUIARDbAQ..i&docid=jZo3IQfO3ipiXM&w=800&h=450&q=google%20images&ved=2ahUKEwjWkcWP39zrAhU6ALkGHQHPBVQQMygIegUIARDbAQ';
  }

  handleChange(event) {
    this.setState({color: event.target.value})
  }

  render() {
    console.log(this.state.image)
    return (
      <div>
        <canvas
          id={'myCanvas'}
          ref={(ref) => (this.canvas = ref)}
          style={{ border: "5px solid #d3d3d3",  backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.endPaintEvent}
          onMouseUp={this.endPaintEvent}
          onMouseMove={this.onMouseMove}
        />
        <button onClick={ () => this.createImg()}> Send </button>
        <button  onClick={ () => this.setState({ image: null },  this.componentDidMount())}>Clear</button>
        <button  value={10} onClick={ () => this.setState({ lineWidth: 10}, this.componentDidMount())}></button>
        <input type="color" id="color" value={this.state.color} onChange={this.handleChange.bind(this)}/>
        <input type="file" name="myImage" onChange={this.onImageChange}/>
      </div>
    );
  }
} 
export default Canvas;