import React, { Component } from 'react';
import Styles from './canvas.css'


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state={
      image: null,
      color: '#000000',
      stroke: 10,
      erase: false
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
    this.ctx.lineWidth = 10;
  }

  componentDidUpdate() {
    this.ctx.lineWidth = this.state.stroke;
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
    console.log('offsetX: ',offsetX);
    console.log('offsetY: ',offsetY);
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

    if(this.state.erase === true){
      this.ctx.globalCompositeOperation="destination-out";
    }else{
      this.ctx.globalCompositeOperation="source-over";
    }
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
    this.setState({color: event.target.value})
    this.setState({erase: false})
  }

  handleChange2(event) {
    this.setState({stroke: event.target.value})
  }

  render() {
    console.log(this.state.image)
    return (
      <div className="container-fluid">
        <div className="row">
          <canvas
            className=" col-lg-6 createCanvas"
            id={'myCanvas'}
            ref={(ref) => (this.canvas = ref)}
            style={{ border: "5px solid #d3d3d3", backgroundColor: "red"}}
            onMouseDown={this.onMouseDown}
            onMouseLeave={this.endPaintEvent}
            onMouseUp={this.endPaintEvent}
            onMouseMove={this.onMouseMove}
          />
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
            <input className="editImg" type="file" name="myImage" onChange={this.onImageChange}/>
          </main>
        </div>
      </div>
    );
  }
}
export default Canvas;