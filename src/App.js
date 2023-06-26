import { useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";

const App = () => {

  const [result, setResult] = useState("");

  const [calculated, setCalculated] = useState(false);

  const clear = () => {

    if(calculated){
      setCalculated(false);
    }
    setResult("");
  };

  const cancel = () => {
    if(calculated){
      clear();
      return;
    }
    setResult(result.slice(0,-3));
  }

  function isOperator(char) {
    return /[+\-*/]/.test(char);
  }

  const clickHandler = (e) => {

    if(calculated){

      setCalculated(false);

      if(!isOperator(e.target.value.trim())){
        setResult(e.target.value);    
        return;
      }

    }
    
    setResult(result.concat(e.target.value));
  };

  function precedence(operator) {
    if (operator === '+' || operator === '-') {
      return 1;
    } else if (operator === '*' || operator === '/') {
      return 2;
    }
    return 0;
  }

  function convertToPostfix(tokens) {

    let postfix = '';
    const stack = [];
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
  
      if (isOperator(token)) {
        while (
          stack.length > 0 &&
          isOperator(stack[stack.length - 1]) &&
          precedence(stack[stack.length - 1]) >= precedence(token)
        ) {
          postfix += stack.pop() + ' ';
        }
        stack.push(token);
      } else {
        postfix += token + ' ';
      }
    }
  
    while (stack.length > 0) {
      postfix += stack.pop() + ' ';
    }
  
    return postfix.trim();
  }

  function evaluatePostfix(postfix) {
    const stack = [];
  
    const tokens = postfix.split(' ');
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
  
      if (isOperator(token)) {
        const operand2 = stack.pop();
        const operand1 = stack.pop();
  
        switch (token) {
          case '+':
                    stack.push(operand1 + operand2);
                    break;
          case '-':
                    stack.push(operand1 - operand2);
                    break;
          case '*':
                    stack.push(operand1 * operand2);
                    break;
          case '/':
                    stack.push(operand1 / operand2);
                    break;
          default:  break;
        }
        
      } else {
        stack.push(parseFloat(token));
      }
    }
  
    return stack.pop();
  }

  const calculate = () => {

    const arr = result.trim().split(" ");

    if(arr.length < 3){
      return;
    }

    const postfixExpression = convertToPostfix(arr);

    const ans = evaluatePostfix(postfixExpression);

    setResult(ans.toString());

    setCalculated(true);

  };

  return (
    <Row style={{marginTop: "4rem"}}>
      <Col />

      <Col style={{backgroundColor: "black"}} xs ={10} sm={8} md={5}>

        <Container>
          
          <Row>
            <Col className="m-3 me-1" 
              style={{
                backgroundColor: "white", 
                borderRadius: "7px", 
                overflow: "scroll",
                overflowX: "auto",
                overflowY: "auto",
                height: "3.5rem",
                fontSize: "2rem",
                textAlign: "right",
              }}>
                {result}
            </Col>
          </Row>
          
          <Row>
            <Col xs={6}>
              <Button onClick={clear} variant="info" value="CLEAR" className="m-2" size="lg" style={{width:"100%"}}>CLEAR</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={cancel} variant="info" value="C" className="m-2" size="lg" style={{width:"100%"}}>C</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="info" value=" / " className="m-2" size="lg" style={{width:"100%"}}>/</Button>
            </Col>
          </Row>

          <Row>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="7" className="m-2" size="lg" style={{width:"100%"}}>7</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="8" className="m-2" size="lg" style={{width:"100%"}}>8</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="9" className="m-2" size="lg" style={{width:"100%"}}>9</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="info" value=" * " className="m-2" size="lg" style={{width:"100%"}}>*</Button>
            </Col>
          </Row>

          <Row>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="4" className="m-2" size="lg" style={{width:"100%"}}>4</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="5" className="m-2" size="lg" style={{width:"100%"}}>5</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="6" className="m-2" size="lg" style={{width:"100%"}}>6</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="info" value=" - " className="m-2" size="lg" style={{width:"100%"}}>-</Button>
            </Col>
          </Row>

          <Row>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="1" className="m-2" size="lg" style={{width:"100%"}}>1</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="2" className="m-2" size="lg" style={{width:"100%"}}>2</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="3" className="m-2" size="lg" style={{width:"100%"}}>3</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="info" value=" + " className="m-2" size="lg" style={{width:"100%"}}>+</Button>
            </Col>
          </Row>
          
          <Row>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="0" className="m-2" size="lg" style={{width:"100%"}}>0</Button>
            </Col>
            <Col xs={3}>
              <Button onClick={clickHandler} variant="light" value="." className="m-2" size="lg" style={{width:"100%"}}>.</Button>
            </Col>
            <Col xs={6}>
              <Button onClick={calculate} variant="info" value="=" className="m-2" size="lg" style={{width:"100%"}}>=</Button>
            </Col>
          </Row>

        </Container>

      </Col>

      <Col />
    </Row>
    
  )
}

export default App