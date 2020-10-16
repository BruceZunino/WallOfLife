import React, { Component } from 'react';
import Styles from './ViewImg.css';
import $ from "jquery"

class ViewImg extends Component {
  constructor(props) {
    super(props);
    this.state={
      data: []
    }
  }


// We call the fetch here to get the data from the database
  componentDidMount() {  
    fetch('http://localhost:5050/data')
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data });
    })
    .catch(console.log)
}  


spiral(n) {
  // given n an index in the squared spiral
  // p the sum of point in inner square
  // a the position on the current square
  // n = p + a

  var r = Math.floor((Math.sqrt(n + 0) - 1) / 2) + 1;

  // compute radius : inverse arithmetic sum of 8+16+24+...=
  var p = (8 * r * (r - 1)) / 2;
  // compute total point on radius -1 : arithmetic sum of 8+16+24+...

  var en = r * 2;
  // points by face

  var a = (1 + n - p) % (r * 8);
  // compute de position and shift it so the first is (-r,-r) but (-r+1,-r)
  // so square can connect

  var pos = [0, 0, r];
      switch (Math.floor(a / (r * 2))) {
          // find the face : 0 top, 1 right, 2, bottom, 3 left
          case 0:
              {
                  pos[0] = a - r;
                  pos[1] = -r;
              }
              break;
          case 1:
              {
                  pos[0] = r;
                  pos[1] = (a % en) - r;

              }
              break;
          case 2:
              {
                  pos[0] = r - (a % en);
                  pos[1] = r;
              }
              break;
          case 3:
              {
                  pos[0] = -r;
                  pos[1] = r - (a % en);
              }
              break;
      }
      return pos;
    }

  Looping(){
    this.state.data.forEach(element => {
      console.log("Dateeee", element)
          var elt = $(document.createElement('div'));
          elt.text(element.id);
          elt.addClass('point');
          var pos = this.spiral(element.id);
          var DOM_img = document.createElement("img");
          DOM_img.style = "height: 100px"
          DOM_img.src = element.img;
          elt.append(DOM_img);
          var grey = 256 - pos[2] * 16;
          elt.css({
              left: 900 + 120 * pos[0],
              // right: (900 + 120 * pos[0])/2,
              top: 400 + 120 * pos[1],
                  "background-color": "rgba(" + grey * (1 + pos[2] % 3) + "," + grey * (1 + pos[2] % 2) + "," + grey * (1 + pos[2] % 4) + "," + 255 + ")"
          });
        $('#container').append(elt);
    });
  }

  render() {
      this.Looping()
    return (
      <div id="container">
      </div>
    );
  }
}
export default ViewImg;