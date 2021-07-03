import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";

export default function Login({props,setShow}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function send(){
    props.history.push("/home")
  }
  function handleSubmit(event) {
    event.preventDefault();
    let email = event.target.email.value
    let password = event.target.password.value
    console.log(email,password)
        fetch(process.env.REACT_APP_API+'loginUser',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              username:email,
              email:email,
              password:password,
          })
      })
      .then(res=>res.json())
      .then((result)=>{
            
            if(result === "Faild Login"){
              alert(result);
            }else{
              setShow(true)
              send()
            }
            
        })
      .catch(err => alert(err))
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}