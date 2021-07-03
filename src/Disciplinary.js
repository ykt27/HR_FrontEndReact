import {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Modal,Button, Row, Col, Form,Image,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';
import {Search} from './Search';
import React, {useState , useEffect}  from 'react';
import axios from 'axios';

export function Disciplinary(props) {
  // Declare a new state variable, which we'll call "const"
  const [Disciplinary_History, setDisciplinary_History] = useState([]);
  const [disciplinaryHistoryShow, setdisciplinaryHistoryShow] = useState(false);
  let att ={warning:'',Disciplinary_Description:''}



        function getValue(event){
            if(event.target.name === "warning"){
                    att = {...att,warning:event.target.value}
            }else if(event.target.name === "Disciplinary"){
                    att = {...att,Disciplinary_Description:event.target.value}
            }

            console.log(att)
        }
        function getEmployee(){
            fetch(process.env.REACT_APP_API+'api/employees/')
                .then(response=>response.json())
                .then(data=>{
                    console.log(data)
                    setdisciplinaryHistoryShow(false)
                    setDisciplinary_History(data)
                    
                    
                });
        }    


        function deleteRecored(event){
            console.log(event.target.id,event.target.name,"------idddddddd")
            let id = event.target.id 
            if(window.confirm('Are you sure ?')){
                fetch(process.env.REACT_APP_API+'recordeDelete/'+id+'/',{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                    'Content-Type':'application/json'}
                })
                .then(data=>{
                    setdisciplinaryHistoryShow(true)
                }).catch(err => {console.log(err)});
            }
        
        }

        function send(){
            props.history.push("/Attendance")
            }
            useEffect(() =>{
                getEmployee()
                
            }
            ,[])
            function getRecoreds(event){
                let id = event.target.name
                fetch(process.env.REACT_APP_API+'getrcordes/'+id+'/',{
                    method:'GET'})
                    .then(response=>response.json())
                    .then(data=>{
                        setDisciplinary_History(data)
                        setdisciplinaryHistoryShow(true)
                    });
            }
            
            function updateRecodes(event){
                let id = event.target.name
                const form_data = new FormData();
                form_data.append('warning', att.warning);
                form_data.append('Disciplinary_Description', att.Disciplinary_Description);
                form_data.append('employees', event.target.name);

                axios.post(process.env.REACT_APP_API+'recordeUpdate/'+id+'/', form_data, {
                    headers: {
                      'content-type': 'multipart/form-data',
                    }
                  })
                  .then((result)=>{
                      alert("Updated Succesfully");
                  },
                  (error)=>{
                      alert('Failed');
                  })
               
            }

            function setRecored(event){
                console.log(event.target.name,"att.status")
                const form_data = new FormData();
                form_data.append('warning', att.warning);
                form_data.append('Disciplinary_Description', att.Disciplinary_Description);
                form_data.append('employees', event.target.name);

                axios.post(process.env.REACT_APP_API+'createrecordes', form_data, {
                    headers: {
                      'content-type': 'multipart/form-data',
                    }
                  })
                  .then((result)=>{
                      alert("Succesfully Added");
                  },
                  (error)=>{
                      alert('Failed');
                  })
               
            }

            function searchEmp(event){
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
                        setDisciplinary_History(result)
                        //alert(result[0]);
                    }
                },
                (error)=>{
                    alert('Failed to search');
                })
            }


            function resetValue(event){
                if(event.target.value === ""){
                    getEmployee()
                }
            }

return (
    <div >
    <div className="top">
        <Form  onSubmit={searchEmp}>
            <Form.Group controlId="SearchEmployeeName">
                        <Form.Label>Search Bar</Form.Label>
                        <Form.Control onChange={resetValue} type="text" name="EmployeeName" required 
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
    <div className="Title top">
    <h4 >Employee Disciplinary List</h4>
    <Button variant='dark'
                    onClick={send}>
                    Go Back To Attendance</Button>

    </div>
    <Table className="mt-4" striped bordered hover size="sm">
        <thead>
            <tr>
            <th>Employee Name</th>
            <th>Number Of Warnings</th>
            <th>Disciplinary Description</th>
            <th>Options</th>
            </tr>
        </thead>
        <tbody>
            {Disciplinary_History && Disciplinary_History.map(emp=>
            
                <tr key={emp.id}>
                    {console.log(emp)}
                    <td>{disciplinaryHistoryShow == false ? emp.EmployeeName : emp.employees.EmployeeName}</td>
                    <td>    <select className="form-control" name="warning" onChange={getValue} defaultValue={emp.warning}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="2">5</option>
                                <option value="3">6</option>
                            </select>
                    </td>
                    
                    <td> <Form.Group controlId="Disciplinary">
                         <Form.Control rows="3" type="textarea" name="Disciplinary" required
                         onChange ={getValue}
                        defaultValue={emp.Disciplinary_Description} 
                        placeholder="Disciplinary Description"/>
                    </Form.Group></td>
                   
                    <td>
                    {disciplinaryHistoryShow == false && <Button variant='warning sidepad' name={emp.id}
                    onClick={setRecored}>
                    Add Recored</Button> }
                    {disciplinaryHistoryShow === false && <Button variant='info sidepad' name={emp.id}
                    onClick={getRecoreds}>
                    show Recored History</Button> }
                   {disciplinaryHistoryShow !== false && <input className='btn btn-warning sidepad' id={emp.id} name={emp.employees.id} type="submit" value="Update"
                        onClick={updateRecodes} /> }
                   {disciplinaryHistoryShow !== false && <input className="btn btn-danger sidepad" id={emp.id} type="submit" value="Delete"
                        onClick={deleteRecored} /> }
                    {disciplinaryHistoryShow !== false && <input className="btn btn-info sidepad" id={emp.id} type="submit" value="Go Back"
                        onClick={getEmployee} /> }
                                                    
                    </td>
                    

                </tr>)}
        </tbody>

    </Table>
    
   
</div>
  );
}


