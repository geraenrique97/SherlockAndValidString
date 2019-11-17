import React from 'react';

import './App.css';

function Alert(props) {
  return (
    <div id="Result" className={ props.valid? 'shadow alert alert-success': 'shadow alert alert-danger'} role="alert">
      {props.valid? 'Valid string!': 'Invalid string!'}
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

  countOccurrences(values) {
    let occurrences = {}
    values.forEach( element => {
      occurrences[element] != undefined? occurrences[element] = occurrences[element] + 1: occurrences[element] = 1
    });
    return occurrences
  }

  validateString(){
    let valid
    let string = this.state.valueString;
    let charOccurrences = this.countOccurrences(string.split(""));
    console.log(charOccurrences)
    let occurrencesCounter = this.countOccurrences(Object.values(charOccurrences)) //count the chars with the same occurrences
    console.log((occurrencesCounter));
    valid = false;
    switch (Object.values(occurrencesCounter).length ) {
      case 1: {
        valid = true;
        break
      };
      case 2: { 
        //because could to remove one char only
        // if (Object.values(occurrencesCounter)[0] == 1 || Object.values(occurrencesCounter)[1]==1) {
        //   //char with unique occurrence
        //   if ( Object.keys(occurrencesCounter)[0] == 1 || Object.keys(occurrencesCounter)[1] == 1) {
        //     valid = true;
        //   } else {
        //     let toRemove
        //     if (Object.keys(occurrencesCounter)[0] < Object.keys(occurrencesCounter)[1] ) {  }
        //     let diff = Math.abs(Object.keys(occurrencesCounter)[0] - Object.keys(occurrencesCounter)[1]);
        //     // console.log(Object.keys(occurrencesCounter)[0], Object.keys(occurrencesCounter)[1]);
        //     if ( diff == 1) valid = true;
        //   }
        // }
        // break
        let toRemove
        let equalOccurrenceValue 
        if (Object.values(occurrencesCounter)[0] == 1) { 
          toRemove = Object.keys(occurrencesCounter)[0]; 
          equalOccurrenceValue = Object.keys(occurrencesCounter)[1];}
        else {
          if (Object.values(occurrencesCounter)[1] == 1) { 
            toRemove = Object.keys(occurrencesCounter)[1];
            equalOccurrenceValue = Object.keys(occurrencesCounter)[0];
          }
          else break
        }
        if (toRemove == 1 || toRemove - 1 == equalOccurrenceValue) {
          valid = true;
        }
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
        <div className="jumbotron shadow">
          <h5>Sherlock and the valid string</h5>
          <p>The string is valid if chars occurs same quantity or removing one char it has the same occurrences.</p>
          <form className="form-inline d-flex justify-content-center mt-5" onSubmit={(e) => e.preventDefault()}>
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
