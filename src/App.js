import React from 'react';

function number() {
  var numbers = ["1","2","3","4","5","6","7","8","9","0",null,null,null,null,null,null]
  var sortedNumbers = numbers.sort(function () { return 0.5 - Math.random() });
  return (sortedNumbers)
}

class NumPad extends React.Component {
  handleClick(item) {
    this.props.parentCallback(item);
}
  render() {
    return(
     <div className="numPad">
       {this.props.dataFromParent.map((value,index) => {
           return (
              <button key={index} className={!!(value)?"numberBox btn rounded":"numberBox btn rounded empty"} disabled={!!(value)? false : true} onClick={() => this.handleClick(value)}>{value}</button>
           )
       })}           
      </div>
    )
  }
}

class InputBox extends React.Component {
  render() {
    return(
      <input type="password" id="inputPsw" className="form-control" readOnly value={this.props.dataFromParent.join("")} />
    )
  }
}

class SaveButton extends React.Component {
  handleClick() {
    alert("Ditt lösenord: " + this.props.dataFromParent.join(""));
}
  render() {
    const enable = this.props.dataFromParent.length;
    return(
      <button type="button" id="saveBtn" className="btn" disabled={!enable} onClick={() => this.handleClick()}>Logga in</button>
    )
  }
}

class CancelButton extends React.Component {
  handleClick() {
    this.props.parentCallback([]);
}
  render() {
    const enable = this.props.dataFromParent.length;
    return(
      <button type="button" id="cancelBtn" className="btn" disabled={!enable} onClick={() => this.handleClick()}>X</button>
    )
  }
}

class App extends React.Component {
  state = { data : [],
            numberArr : number() 
          }

  addNumbers = (childData) => {
  var arr = this.state.data.concat(childData);
  this.setState({ data: arr })
  }

  emptyArray = () => {
    this.setState({ data: [] })
  }

  render() {
    return (
      <>
    <InputBox dataFromParent = {this.state.data} />
    <NumPad parentCallback = {this.addNumbers} dataFromParent = {this.state.numberArr} />
    <SaveButton dataFromParent = {this.state.data} />
    <CancelButton parentCallback = {this.emptyArray} dataFromParent = {this.state.data} />
    </>
    );
  }
}

export default App;