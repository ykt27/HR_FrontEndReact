import {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';
import {Search} from './Search';

import React, {useState , useEffect}  from 'react';
export function Department() {
  // Declare a new state variable, which we'll call "count"
  
  const [deps, setdeps] = useState([]);
  const [currentDepatmentName, setcurrentDepatmentName] = useState();
  const [employeeListShow, setemployeeListShow] = useState(false);
  const [editModalShow, seteditModalShow] = useState(false);
  const [addModalShow, setaddModalShow] = useState(false);
  
  //let att ={status:'',date:''}


            function getAllDepartment(){
                fetch(process.env.REACT_APP_API+'department')
                .then(response=>response.json())
                .then(data=>{
                    setdeps(data);
                    setemployeeListShow(false)
                    console.log(data)
                    
                });
            }
            useEffect(()=>{
                getAllDepartment()
            }
            ,[])


            let addModalClose=()=> {
                setaddModalShow(false) 
                getAllDepartment()
            };
            let editModalClose=()=>seteditModalShow(false);
            
            function deleteDep(depid){
                if(window.confirm('Are you sure?')){
                    fetch(process.env.REACT_APP_API+'department/'+depid,{
                        method:'DELETE',
                        header:{'Accept':'application/json',
                    'Content-Type':'application/json'}
                    }).then(res=> getAllDepartment())
                    .catch(err => {console.log(err)})
                }
            } 

            
            function getDepartmentEmployeelist(event){
                let id = event.target.id
                fetch(process.env.REACT_APP_API+'viewDepartmentEmployeeList/'+id+'/',{
                    method:'GET',
                    header:{'Accept':'application/json',
                    'Content-Type':'application/json'}
                }).then(response=>response.json())
                .then(data=>{
                    setdeps(data);
                    setemployeeListShow(true)
                    setcurrentDepatmentName(event.target.name)
                    //this.employeeListShows = true
                    //console.log(data,employeeListShow,"=================")
                });
            }
return (
    <div >
        
    {employeeListShow ===  true && <h5>Department Name: {currentDepatmentName}</h5>}
    <Table className="mt-4" striped bordered hover size="sm">
        <thead>
            <tr>
            <th>{employeeListShow ==  false ? "DepartmentId" : "EmployeeId"}</th>
            <th>{employeeListShow ==  false ? "DepartmentName" : "EmployeeName"}</th>
            <th>Options</th>
            </tr>
        </thead>
        <tbody>
            {deps && deps.map(dep=>
                <tr key={dep.DepartmentId}>
                    <td>{employeeListShow ===  false ? dep.DepartmentId : dep.id}</td>
                    <td>{employeeListShow ===  false ? dep.DepartmentName : dep.EmployeeName}</td>
                    <td>
           {employeeListShow ===  false ? <ButtonToolbar>
            <Button className="mr-2" variant="warning"
            onClick={seteditModalShow}>
            Edit
            </Button>

            <Button className="mr-2" variant="danger"
                onClick={()=>deleteDep(dep.DepartmentId)}>
            Delete
            </Button>
            <Button className="mr-2" variant="info" id={dep.DepartmentId} name={dep.DepartmentName}
            onClick={getDepartmentEmployeelist}>
            View Employees List 
            </Button>

            <EditDepModal show={editModalShow}
            onHide={editModalClose}
            depid = {dep.DepartmentId}
            depname = {dep.DepartmentName}
            />
            </ButtonToolbar> : 
            
            <Button className="mr-2" variant="info" id={dep.DepartmentId} 
            onClick={getAllDepartment}>
            Go Back 
            </Button>
            
            }

        </td>

        </tr>)}
    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={setaddModalShow}>
                    Add Department</Button>

                    <AddDepModal show={addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
  );
}


/* import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';
import {Search} from './Search';

export class Department extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false,employeeListShow:false,tt:true}

        this. getDepartmentEmployeelist = this.getDepartmentEmployeelist.bind(this);
    }
    employeeListShows = false
    refreshList(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
            this.setState({employeeListShow:false});
            this.employeeListShows = false
            console.log(data,this.employeeListShows,this.editModalShow,"=================")
            
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        //this.refreshList();
    }

    getDepartmentEmployeelist(){
        fetch(process.env.REACT_APP_API+'viewDepartmentEmployeeList/'+22+'/',{
            method:'GET',
            header:{'Accept':'application/json',
            'Content-Type':'application/json'}
        }).then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
            this.setState({employeeListShow:true});
            this.employeeListShows = true
            console.log(data,this.employeeListShows,"=================")
        });
    }

    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'department/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {deps, depid,depname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        console.log(this.editModalShow)
        return(
            <div >
                <Search/>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>DepartmentId</th>
                        <th>{this.employeeListShows ==  false ? "DepartmentName" : "EmployeeName"}</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps && deps.map(dep=>
                            <tr key={dep.DepartmentId}>
                                <td>{this.employeeListShows ===  false ? dep.DepartmentId : dep.id}</td>
                                <td>{this.employeeListShows ===  false ? dep.DepartmentName : dep.EmployeeName}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        depid:dep.DepartmentId,depname:dep.DepartmentName})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteDep(dep.DepartmentId)}>
            Delete
        </Button>
        <Button className="mr-2" variant="info"
        onClick={this.getDepartmentEmployeelist}>
            View Employees List 
        </Button>

        <EditDepModal show={this.state.editModalShow}
        onHide={editModalClose}
        depid={depid}
        depname={depname}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Department</Button>

                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
} */