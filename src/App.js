import React from 'react';

import './App.css';

function Alert(props) {
  

  return (
    <div className={+ props.valid? 'alert alert-success': 'alert alert-danger'} role="alert">
      {props.valid? 'Cadena valida': 'Cadena invalida'}
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

  validateString() {
    let string = this.state.valueString;
    let occurs = string.match( RegExp(string[0], 'gi')).length;
    let counter = occurs;
    string = string.replace(RegExp(string[0], 'gi'), '');
    let valid = true;
    let removable = true;
    console.log(string);
    while (string && valid) {
      console.log(string);
      if (string.match( RegExp(string[0], 'gi')).length == counter) {
        string = string.replace(RegExp(string[0], 'gi'), '');
      } else {
        if (removable) {
          string = string.replace(RegExp(string[0], 'gi'), '');
          removable = false
        } else {
          valid = false
        }
      }
    }

    this.setState({valid: valid})
    
  }

  handlerChange(e) {
    const text = e.target.value;
    this.setState({valueString: text})
  }
  
  render() {
    return (
      <div className="App">
        <div className="jumbotron">
          <h5>Sheerlock Strings</h5>
          <p>Se verificara que la cadena sea valida</p>
          
          <input id="value" placeholder="Ingrese texto..." onChange={this.handlerChange} ></input>
          <button onClick={this.validateString}>Verificar</button>
        </div>
        {this.state.valid != undefined? <Alert valid={this.state.valid}/>: null}
      </div>
      
    );
  }
}



export default App;
