import React, { Component } from 'react';
import Styles from './ViewImg.css';

class ViewImg extends Component {
  constructor(props) {
    super(props);
    this.state={
      data: []
    }
  }


// IF WE WANT TO MAKE THE REQUEST WHEN THE COMPONENT IS MOUNT: 
//   componentDidMount() {  
//     fetch('http://localhost:5050/data')
//     .then(res => res.json())
//     .then((data) => {
//       this.setState({ data: data })
//     })
//     .catch(console.log)
//   }

  showData(){
    fetch('http://localhost:5050/data')
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data })
    })
    .catch(console.log)
  }

  render() {
      console.log(this.state.data);
    return (
      <div>
          {this.state.data.map(x => {
                return (
                <div>
                    <p className="renderUser"> {x.user} </p>
                    <img className="renderImg" src={x.img}/>
                    <p className="renderDate"> {x.created_at} </p>
                </div>  
                )
              })}
          <button onClick={() => this.showData()}> Click HERE</button>
      </div>
    );
  }
}
export default ViewImg;