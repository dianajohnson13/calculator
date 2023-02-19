import { Component } from 'react';
import './Calculator.css';

const OPERATORS = ["/", "*", "+", "-"];

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operand: null,
      prevOperand: null,
      operator: null,
      lastSelected: null
    }
  }

  clickButton = (event) => {
    const value = event.target.value;

    if (!isNaN(value)) {
        this.handleNumber(value);
    } else if (OPERATORS.includes(value)) {
        this.handleOperator(value)
    } else if (value === "=") {
        this.handleEquals();
    } else if (value === "AC") {
        this.clearAll();
    } else if (value === "+/-") {
        this.handlePlusMinus();
    } else if (value === ".") {
        this.handleDecimal();
    }

    this.setState({lastSelected: value});
  }

  handleNumber = (value) => {
    const { operand, operator, prevOperand, lastSelected } = this.state;

    if (!operand || lastSelected === "=") {
      this.setState({ operand: value })
    } else if (!operator || prevOperand) {
      this.setState({ operand: operand.concat(value) });
    } else {
      this.setState({
        prevOperand: operand,
        operand: value
      });
    }
  }

  handleOperator = (newOperator) => {
    const { operand, prevOperand} = this.state;
    if (operand && prevOperand) {
      this.calculate()
    } else {
      this.setState({
        operator: newOperator
      })
    }
  }

  handleEquals = () => {
    if (this.canCalculate()) this.calculate();
  }

  clearAll = () => {
    this.setState({
      operand: null,
      prevOperand: null,
      operator: null
    });
  }

  handleDecimal = () => {
    const { operand, lastSelected } = this.state;
    let newOperand;
    if (!operand || lastSelected === "=") {
      newOperand = "0."
    } else if (!operand.includes(".")) {
      newOperand = operand.concat(".");
    }
    this.setState({ operand: newOperand });
  }

  handlePlusMinus = () => {
    const { operand } = this.state;
    let newOperand;
    if (!operand || operand === "0") {
      newOperand = "-0";
    } else if (operand > 0) {
      newOperand = "-".concat(String(operand));
    } else {
      newOperand = String(Math.abs(operand));
    }
    this.setState({ operand: newOperand });
  }

  canCalculate = () => {
    const { operand, prevOperand, operator } = this.state;
    return !isNaN(operand) && !isNaN(prevOperand) && operator;
  }

  calculate = () => {
    const {
      operand,
      prevOperand,
      operator
    } = this.state;
    let result;

    switch (operator) {
      case "/":
        result = Number(prevOperand) / Number(operand);
        break;
      case "*":
        result = Number(prevOperand) * Number(operand);
        break;
      case "+":
        result = Number(prevOperand) + Number(operand);
        break;
      case "-":
        result = Number(prevOperand) - Number(operand);
        break;
    }
    this.setState({
      operand: String(result),
      prevOperand: null,
      operator: null,
    });
  }

  render() {
    const {operand, operator} = this.state;
    return (
      <div className="container">
        <div className="screen" aria-label="result">
          {operand || "0"}
        </div>
        <div className="buttonBox">
            <input type="button" onClick={this.clickButton} value="AC"/>
            <input type="button" onClick={this.clickButton} value="/" data-selected={operator === "/"} aria-label="divide"/>
            <input type="button" onClick={this.clickButton} value="*" data-selected={operator === "*"} aria-label="multiply"/>
            <input type="button" onClick={this.clickButton} value="+" data-selected={operator === "+"} aria-label="plus"/>
            <input type="button" onClick={this.clickButton} value="7"/>
            <input type="button" onClick={this.clickButton} value="8"/>
            <input type="button" onClick={this.clickButton} value="9"/>
            <input type="button" onClick={this.clickButton} value="-" data-selected={operator === "-"} aria-label="minus"/>
            <input type="button" onClick={this.clickButton} value="4"/>
            <input type="button" onClick={this.clickButton} value="5"/>
            <input type="button" onClick={this.clickButton} value="6"/>
            <input type="button" onClick={this.clickButton} value="=" className="doubleButton" aria-label="equals"/>
            <input type="button" onClick={this.clickButton} value="1"/>
            <input type="button" onClick={this.clickButton} value="2"/>
            <input type="button" onClick={this.clickButton} value="3"/>
            <input type="button" onClick={this.clickButton} value="."/>
            <input type="button" onClick={this.clickButton} value="0"/>
            <input type="button" onClick={this.clickButton} value="+/-"/>
        </div>
      </div>
  );
  }
}

export default Calculator;