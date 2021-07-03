import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="p-3 bg-dark text-white" to="/home">
                    Home
                </NavLink>
                <NavLink className="p-3 bg-dark text-white" to="/department">
                    Department
                </NavLink>
                <NavLink className="p-3 bg-dark text-white" to="/employee">
                    Employee Managment
                </NavLink>

                <NavLink className="p-3 bg-dark text-white" to="/attendance">
                    Employee Recordes
                </NavLink>

                
                </Nav>
                <Nav className="float-right justify-content-end">
                <NavLink className="float-right p-3 bg-dark text-white" to="/">
                    Logout
                </NavLink>

                <NavLink className="float-right p-3 bg-dark text-white" to="/signup">
                    Sign Up
                </NavLink>
                
                </Nav>
                
                </Navbar.Collapse>
            </Navbar>
        )
    }
}