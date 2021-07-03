import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar,Form} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Search extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    searchEmp(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'search',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                searchType:event.target.searchType.value,
                search:event.target.SearchEmployeeName.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            if( event.target.searchType.value == "dep" ){
                alert(result[0].DepartmentName);
            }
            else{
                //console.log(props)
                //props.viewSearch(result[0])
                alert(result[0]);
            }
        },
        (error)=>{
            alert('Failed to search');
        })
    }
    
    render(){
        return(
            <div >
                <Form onSubmit={this.searchEmp}>
                <Form.Group controlId="SearchEmployeeName">
                        <Form.Label>EmployeeName</Form.Label>
                        <Form.Control type="text" name="EmployeeName" required 
                        placeholder="Enter EmployeeName to search"/>
                </Form.Group>
                <Form.Group controlId="searchType">
                                        <Form.Control as="select" defaultValue="Employee">
                                        <option value="Employee">Employee</option>
                                        <option value="dep">Department</option>
                                        </Form.Control>
                                </Form.Group>
                <ButtonToolbar>
                    <Button variant='secondary'
                        type='submit'>
                        Search</Button>
                </ButtonToolbar>
                </Form>
            </div>
        )
    }
}