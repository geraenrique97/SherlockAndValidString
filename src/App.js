import React from 'react';

import './App.css';

function Alert(props) {
  return (
    <div id="Result" className={props.valid? 'alert alert-success': 'alert alert-danger'} role="alert">
      {props.valid? 'Valid string': 'Invalid string'}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {valueString: "", valid: null};
    this.handlerChange = this.handlerChange.bind(this);
    this.validateString = this.validateString.bind(this)

  }


  validateString(){
    let valid
    let string = this.state.valueString;
    let occurrences = [];
    let char
    while (string) {
      char = string[0];
      occurrences[char] = string.match( RegExp(char, 'gi')).length;
      string = string.replace(RegExp(char, 'gi'), '');
    }
    console.log(occurrences);
    let count = {}
    Object.values(occurrences).forEach( element => {
      count[element] != undefined? count[element] = count[element] + 1: count[element] = 1
    });
    console.log((count));
    valid = false;
    switch (Object.values(count).length ) {
      case 1: {
        valid = true;
        break
      };
      case 2: {
        if (Object.values(count)[0] == 1 || Object.values(count)[1]==1) {
          let diff = Math.abs(Object.keys(count)[0] - Object.keys(count)[1]);
          console.log(Object.keys(count)[0], Object.keys(count)[1]);
          if ( diff == 1 ) {
            valid = true
          }
        }
        break
      }

    }

    this.setState({valid: valid})
  }

  handlerChange(e) {
    const text = e.target.value;
    this.setState({valueString: text});
  };

  
  render() {
    return (
      <div className="App d-flex justify-content-center align-items-center">
        <div className="jumbotron">
          <h5>Sherlock and the valid string</h5>
          <p>Se verificara que la cadena sea valida</p>
          <form className="form-inline d-flex justify-content-center">
            <div className="form-group mb-2">

              <input className="form-control" id="value" placeholder="Enter string..." onChange={this.handlerChange} ></input>
              <button type="button" className="btn btn-primary ml-2" onClick={this.validateString}>Validate</button>
            </div>
          </form>
        </div>
        {this.state.valid != undefined? <Alert valid={this.state.valid}/>: null}
      </div>
      
    );
  }
}

export default App;
