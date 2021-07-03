import {Component} from 'react';
import {Table,NavLink} from 'react-bootstrap';
import {Modal,Button, Row, Col, Form,Image,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';
import {Search} from './Search';
import {Disciplinary} from './Disciplinary';
import React, {useState , useEffect}  from 'react';
import axios from 'axios';

  // Declare a new state variable, which we'll call "const"
  //if we want to rerender we set a variable using use state 
  //const [attendances, setattendances] = useState({});
export function Attendance(props) {
  
  const [employes, setemployes] = useState([]);
  const [attendanceHistoryShow, setattendanceHistoryShow] = useState(false);

  // We use a normal variable cuz we dont need to rerender
  let att = {status:'',date:''}

            function getEmployee(){
                fetch(process.env.REACT_APP_API+'api/employees/')
                    .then(response=>response.json())
                    .then(data=>{
                        setattendanceHistoryShow(false)
                        setemployes(data)
                        
                    });
            }
            
            //How many times we want to run the code insde 
            useEffect(() =>{
                getEmployee()
            }
            ,[])

            //get data for the front end from the browther 
            function setAttendance(event){
                if(event.target.name === "status"){
                        att = {...att,status:event.target.value}
                }else if(event.target.name === "AttendanceDate"){
                        att = {...att,date:event.target.value}
                }
            }
            //Get data from the backend
            function getAttendanceHistory(id){
                fetch(process.env.REACT_APP_API+'attendanceHistory/'+id+'/',{
                    method:'GET',
                    header:{'Accept':'application/json',
                    'Content-Type':'application/json'}

                // convert the data to a json format then set the data
                }).then(response=>response.json())
                .then(data=>{
                    setemployes(data)
                    setattendanceHistoryShow(true)

                    //att.status = data[0].status
                    //att.date = data[0].date
                    //setattendances(att)
                    //console.log(data,"=================")
                });

                // make an event for getAttendanceHistory 
            }
            function getDepartmentEmployeelist(event){
                //console.log(event.target.id,"------idddddddd")
                let id = event.target.id
                getAttendanceHistory(id)
            }


            function deleteAttendance(event){

                //console.log(event.target.id,event.target.name,"------idddddddd")
                let id = event.target.id 
                let attendanceId = event.target.name
                if(window.confirm('Are you sure ?')){
                    fetch(process.env.REACT_APP_API+'attendanceDelete/'+id+'/',{
                        method:'DELETE',
                        header:{'Accept':'application/json',
                        'Content-Type':'application/json'}
                    })
                    .then(data=>{
                        setattendanceHistoryShow(true)
                        getAttendanceHistory(attendanceId)
                    })
                    
                    .catch(err => {console.log(err)});
                }
            
            }
            function searchEmp(event){
                event.preventDefault();
                fetch(process.env.REACT_APP_API+'search',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'

                    // send searchTYpe and search for the back end 
                    },
                    body:JSON.stringify({
                        searchType:event.target.searchType.value,
                        search:event.target.SearchEmployeeName.value,
                    })
                })
                .then(res=>res.json())
                .then((result)=>{
                        
                    //console.log(result)
                    setemployes(result)
                },
                (error)=>{
                    alert('Failed to search');
                })
            }
            function updateAttendance(event){
                let id = event.target.id 
                const form_data = new FormData();
                form_data.append('status', att.status);
                form_data.append('date', att.date);
                //console.log(id,form_data,att,"------idddddddd")

                axios.defaults.xsrfCookieName = 'csrftoken'
                axios.defaults.xsrfHeaderName = 'X-CSRFToken' 

                axios.post(process.env.REACT_APP_API+'attendanceUpdate/'+id+'/',form_data,{
                        headers: {
                        'content-type': 'multipart/form-data',
                        }
                    })
                    .then(data=>{
                        alert("Attendance updated Succeffully!!")
                        //setattendanceHistoryShow(true)
                        //getAttendanceHistory(id) 
                    }).catch(err => {console.log(err)}); 
            
            }

            function resetValue(event){
                if(event.target.value === ""){
                    getEmployee()
                }
            }

            function send(){
                props.history.push("/disciplinary")
            }
            function setAttendanceValues(event){

                //console.log(event.target.name,att.status,att.date,event.target.name)
                const form_data = new FormData();
                form_data.append('status', att.status);
                form_data.append('employees', event.target.name);
                form_data.append('date', att.date);

                //form_data.append('employees_id', event.target.name);
                
                axios.defaults.xsrfCookieName = 'csrftoken'
                axios.defaults.xsrfHeaderName = 'X-CSRFToken' 

                axios.post(process.env.REACT_APP_API+'attendaceCreate/', form_data, {
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
            let v =0
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
    <h4>Employee Attendance List</h4>
    <Button variant='dark'
                    onClick={send}>
                    Go To Disciplinary List</Button>
    </div>
    <Table className="mt-4" striped bordered hover size="sm">
        <thead>
            <tr>
            <th>EmployeeName</th>
            <th>Status</th>
            <th>Date</th>
            <th>Save</th>
            </tr>
        
        </thead>
        <tbody>
            {employes && employes.map(emp=>
            
                <tr key={emp.EmployeeId}>
                    <td>{attendanceHistoryShow === false ? emp.EmployeeName: emp.employees.EmployeeName}</td>
                    {console.log(attendanceHistoryShow,emp) }
                    <td>
                            
                            <select className="form-control" name="status" onChange={setAttendance} value={emp.status}>
                            <option value="PRESENT">PRESENT</option>
                            <option value="ABSENT">ABSENT</option>
                            <option value="LATE_COME">LATE_COME</option>
                            <option value="EARLY_LEAVE">EARLY_LEAVE</option>
                            </select>

                    </td>
                    
                    
                    <td>
                    <input className="form-control" onChange={setAttendance} type="date" defaultValue={emp.date} name="AttendanceDate"
                        required    placeholder="AttendanceDate"
                        />
                    </td>
                    <td>
                    <input className="btn btn-primary sidepad" id={attendanceHistoryShow === false ? emp.id: emp.AttendanceId} name={emp.id} type="submit" value={attendanceHistoryShow === false ? "Save Attendance": "Update Attendance"}
                        onClick={attendanceHistoryShow === false ? setAttendanceValues : updateAttendance} />
                    <input className={attendanceHistoryShow === false ? "btn btn-info sidepad" : "btn btn-danger sidepad"} id={attendanceHistoryShow === false ?
                     emp.id: emp.AttendanceId} name={attendanceHistoryShow !== false && emp.employees.id} type="submit" value={attendanceHistoryShow === false ? "Show History" :"Delete"}
                        onClick={attendanceHistoryShow === false ? getDepartmentEmployeelist : deleteAttendance} />

                    { attendanceHistoryShow !== false &&<input className="btn btn-info sidepad" id={emp.id} type="submit" value="Go Back"
                        onClick={getEmployee} /> }
                    
                    </td>     

                </tr>)}
        </tbody>

    </Table>
    
</div>
  );
}


