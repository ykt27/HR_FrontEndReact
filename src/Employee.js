import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';
import {Button,ButtonToolbar,Form} from 'react-bootstrap';
import {Search} from './Search';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false,dp:''}
        this.searchEmp = this.searchEmp.bind(this);
        this.resetValue = this.resetValue.bind(this);
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'api/employees/')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.setState([{emps:data}]);
            this.setState({dp:data});
        })
        .catch(err => {console.log(err)});
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        // this.refreshList();
    }

    viewSearch(data){
       //console.log("hellllllllllllllllllloo")
       this.setState([{emps:data}]);
        this.setState({dp:data});
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

                //console.log(result[0])
                this.setState([{emps:[result[0]]}]);
                this.setState({dp:[result[0]]});
                //alert(result[0]);
            }
        },
        (error)=>{
            alert('Failed to search');
        })
    }

    resetValue(event){
        if(event.target.value === ""){
            this.refreshList()
        }
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'api/employees/delete/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            }).then(res=> this.refreshList())
            .catch(err => {console.log(err)})
        }
    }
    render(){
        const {emps,empid
            ,empname,depmt,photofilename,doj,dp,Status
            ,Salary
            ,Contact
            ,Email
            ,DateOfBirth
            ,Gender
            ,Race
            ,EmergencyContactName
            ,EmergencyPhone
            ,Citizenship
            ,Education
            ,Shift
            ,Address
            ,StatusDescription
            ,EmployeeType
            ,employee_file
            ,Work_Location}=this.state;
        let addModalClose=()=>{
            this.setState({addModalShow:false});
            this.refreshList()
        }
        let editModalClose=()=>this.setState({editModalShow:false});
        
        return(
            <div >
                <div className="top">
                <Form onSubmit={this.searchEmp}>
                <Form.Group controlId="SearchEmployeeName">
                        <Form.Label>Search Bar</Form.Label>
                        <Form.Control onChange={this.resetValue} type="text" name="EmployeeName" required 
                        placeholder="Enter EmployeeName to search"/>
                </Form.Group>
                <Form.Group controlId="searchType">
                                        <Form.Control as="select" defaultValue="Employee">
                                        <option value="Employee">Employee Name</option>
                                        <option value="dep">Employee Id</option>
                                        </Form.Control>
                                </Form.Group>
                <ButtonToolbar>
                    <Button variant='secondary'
                        type='submit'>
                        Search</Button>
                </ButtonToolbar>
                </Form>
            </div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>DOJ</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dp && dp.map(emp=>
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.department.DepartmentName}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        empid:emp.id,
        empname:emp.EmployeeName,
        depmt:emp.department,
        photofilename:emp.PhotoFileName,
        doj:emp.DateOfJoining,
        Status:emp.Status,
        Salary:emp.Salary,
        Contact:emp.Contact,
        Email:emp.Email,
        DateOfBirth:emp.DateOfBirth,
        Gender:emp.Gender,
        EmergencyContactName:emp.EmergencyContactName,
        EmergencyPhone:emp.EmergencyPhone,
        Citizenship:emp.Citizenship,
        Education:emp.Education,
        Shift:emp.Shift,
        Address:emp.Address,
        Race:emp.Race,
        StatusDescription:emp.StatusDescription,
        EmployeeType:emp.EmployeeType,
        employee_file:emp.employee_file,
        Work_Location:emp.Work_Location})}>
            Edit
        </Button>
{

}        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.id)}>
            Delete
        </Button>
        
        <EditEmpModal show={this.state.editModalShow}
        onHide={editModalClose}
        empid={empid}
        empname={empname}
        depmt={depmt}
        photofilename={photofilename}
        doj={doj}
        Contact={Contact}
        Email={Email}
        DateOfBirth={DateOfBirth}
        Gender={Gender}
        Race={Race}
        Salary = {Salary}
        Status = {Status}
        EmergencyContactName = {EmergencyContactName}
        EmergencyPhone = {EmergencyPhone}
        Citizenship = {Citizenship}
        Education = {Education}
        Shift = {Shift}
        Address = {Address}
        StatusDescription = {StatusDescription}
        EmployeeType = {EmployeeType}
        employee_file = {employee_file}
        Work_Location = {Work_Location}
        />
        
    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee</Button>
                    <AddEmpModal show={this.state.addModalShow}
                    onClose={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}