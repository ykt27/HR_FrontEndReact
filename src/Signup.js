import React, { Component } from "react";
import "./App.css";
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import axios from 'axios';

export default function SignUp (){
    
        function signup(event){
            event.preventDefault();
            const firstname= event.target.firstname.value
            const lastname= event.target.lastname.value
            const username= event.target.username.value
            const email= event.target.email.value
            const password= event.target.password.value
            const password1= event.target.password1.value
            
           

        fetch(process.env.REACT_APP_API+'createUser',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:username,
                email:email,
                first_name:firstname,
                last_name:lastname,
                password:password,
                is_active: true,
                is_staff: true,
            })
        })
        .then(res=>res.json())
        .then(res => {
            alert("Employee Created Succefully")
        })
        .catch(err => console.log(err))

        }

        

        /**
         * 
         * <label>First name</label>
                    <input type="text" controlId="firstname" className="form-control" placeholder="First name" />
                    
         */

        return (
            <Form onSubmit={signup}>
                <h3>Sign Up</h3>

                    <Form.Group controlId="firstname">
                        <Form.Label>First name</Form.Label>
                            <Form.Control 
                                type="text"
                                name="firstname"
                                required
                                placeholder="firstname"
                            />
                    </Form.Group>


                    <Form.Group controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text"
                                name="lastname"
                                required
                                placeholder="lastname"
                            />
                    </Form.Group>


                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text"
                                name="username"
                                required
                                placeholder="username"
                            />
                    </Form.Group>


                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email"
                                name="email"
                                required
                                placeholder="email"
                            />
                    </Form.Group>



                    <Form.Group controlId="password">
                        <Form.Label>Enter Password</Form.Label>
                            <Form.Control 
                                type="password"
                                name="password"
                                required
                                placeholder="password"
                            />
                    </Form.Group>


                    <Form.Group controlId="password1">
                        <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password"
                                name="password1"
                                required
                                placeholder="password"
                            />
                    </Form.Group>
                
                

                <button  type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>

                
            </Form>
        );
    }
