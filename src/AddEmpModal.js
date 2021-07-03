import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import axios from 'axios';

export class AddEmpModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            deps:[],
            employee_id: null,
            image: null,
            UploadCVFile: null,
            workexperienceUpload: null,
            otherUpload: null,
            file: null,
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
        this.getFile=this.getFile.bind(this);

        this.savefile=this.savefile.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            // console.log(data)
            this.setState({deps:data});
        });
    }
    ff = {}
    UploadCVFile = {}
    workexperienceUpload = {}
    otherUpload = {}
            
    handleSubmit(event){
        event.preventDefault();
        console.log('here......')
        // console.log(event.target.EmployeeName.value,event.target.DateOfJoining.value)
        const form_data = new FormData();
        form_data.append('id', this.state.employee_id);
        form_data.append('EmployeeName', event.target.EmployeeName.value);
        //form_data.append('department', event.target.DepartmentName.value);
        form_data.append('department_id', event.target.DepartmentName.value);
        form_data.append('DateOfJoining', event.target.DateOfJoining.value);
        form_data.append('Status', event.target.Status.value);
        form_data.append('StatusDescription', event.target.StatusDescription.value);
        form_data.append('Contact', event.target.Contact.value);
        form_data.append('Email', event.target.Email.value);
        form_data.append('DateOfBirth', event.target.DateOfBirth.value);
        form_data.append('Gender', event.target.Gender.value);
        form_data.append('EmergencyContactName', event.target.EmergencyContactName.value);
        form_data.append('EmergencyPhone', event.target.EmergencyPhone.value);
        form_data.append('Citizenship', event.target.Citizenship.value);
        form_data.append('Race', event.target.Race.value);
        form_data.append('Education', event.target.Education.value);
        form_data.append('Salary', event.target.Salary.value);
        form_data.append('EmployeeType', event.target.EmployeeType.value);
        form_data.append('Shift', event.target.Shift.value);
        if(this.state.image)
            form_data.append('PhotoFileName', this.state.image, this.state.image.name);
        form_data.append('Work_Location', event.target.Work_Location.value);
        form_data.append('Address', event.target.Address.value);

        //axios.defaults.xsrfCookieName = 'csrftoken'
        //axios.defaults.xsrfHeaderName = 'X-CSRFToken' 

        const form_data_upload = new FormData();

        let ff = {}
        //if(this.state.image)
            //form_data.append('PhotoFileName', this.state.image, this.state.image.name);
            form_data_upload.append('EmployeeName', event.target.EmployeeName.value);
            form_data_upload.append('uploaded_at', event.target.DateOfJoining.value);
            if(this.UploadCVFile)
            form_data_upload.append('CVUpload', this.UploadCVFile,this.UploadCVFile.name);
            if(this.workexperienceUpload)
            form_data_upload.append('workexperienceUpload', this.workexperienceUpload,this.workexperienceUpload.name);
            if(this.otherUpload)
            form_data_upload.append('otherUpload', this.otherUpload,this.otherUpload.name);

        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'

        axios.post('http://127.0.0.1:8000/upload', form_data_upload, {
            headers: {
              'content-type': 'multipart/form-data',
            }
          })
        .then(res => {
            console.log(res.data,res.data.id,"----------------------")
            form_data.append('employee_file_id', res.data.id);
            axios.post(process.env.REACT_APP_API+'create/', form_data, {
                headers: {
                  'content-type': 'multipart/form-data',
                }
              })
            .then(res => {
                console.log(res.data);
                alert("Employee Added Succefully",res.data.id)
            })
            .catch(err => console.log(err))
    
            
            //alert("file uploaded",res.data)
        })
        .catch(err => console.log(err)) 
        
    }
    getFile(event){
        event.preventDefault();
        // this.photofilename=event.target.files[0].name;
        if(event.target.name === "UploadCVFile"){
            console.log(event.target.files[0],event.target.name)
            this.UploadCVFile = event.target.files[0]
                
        }else if(event.target.name === "workexperienceUpload"){
            console.log(event.target.files[0],event.target.name)
            this.workexperienceUpload = event.target.files[0]
                
        }else if(event.target.name === "otherUpload"){
            console.log(event.target.files[0],event.target.name)
                this.otherUpload = event.target.files[0]
            }
        /* console.log(event.target.files[0])
        //let img = event.target.files[0]
        this.setState({
            file: event.target.files[0]
        }) */   

        this.ff = event.target.files[0]
    }
    savefile(event){
            
    }
    handleFileSelected(event){
        event.preventDefault();
        // this.photofilename=event.target.files[0].name;
        //console.log(event.target.files[0])
        this.setState({
            image: event.target.files[0]
        })
    }

    render(){
        const deptOptions = this.state.deps.map((dept) =>
            <option value={dept.DepartmentId} >{dept.DepartmentName}</option>
        );

        return (
            <div className="container">

                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>EmployeeName</Form.Label>
                                        <Form.Control type="text" name="EmployeeName" required 
                                        placeholder="EmployeeName"/>
                                    </Form.Group>

                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select" name="DepartmentName">
                                            {deptOptions}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>Joining Date</Form.Label>
                                        <Form.Control 
                                        type="date"
                                        name="DateOfJoining"
                                        required
                                        placeholder="DateOfJoining"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="DateOfBirth">
                                        <Form.Label>Date Of Birth</Form.Label>
                                        <Form.Control 
                                        type="date"
                                        name="DateOfBirth"
                                        required
                                        placeholder="DateOfBirth"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="Salary">
                                        <Form.Label>Salary</Form.Label>
                                        <Form.Control 
                                        type="number"
                                        name="Salary"
                                        required
                                        placeholder="Salary"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="Education">
                                        <Form.Label>Education</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="Education"
                                        required
                                        placeholder="Education"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="Email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                        type="email"
                                        name="Email"
                                        required
                                        placeholder="Email"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="Contact">
                                        <Form.Label>Contact</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="Contact"
                                        required
                                        placeholder="Contact"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="Status">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select"
                                        name="Status"
                                        required
                                        placeholder="Status"
                                        >
                                        <option value="active" >ACTIVE</option>
                                        <option value="vacation" >VACATION</option>
                                        <option value="sick_leave" >SICK_LEAVE</option>
                                        <option value="fired" >FIRED</option>
                                        <option value="layoff" >LAYOFF</option>
                                        <option value="resign" >RESIGN</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="StatusDescription">
                                        <Form.Label>Status Description</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="StatusDescription"
                                        required
                                        placeholder="StatusDescription"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="Gender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" 
                                        name="Gender"
                                        required
                                        placeholder="Gender"
                                        >
                                        <option value="male" >MALE</option>
                                        <option value="female" >FEMALE</option>
                                        <option value="other" >OTHER</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="EmergencyContactName">
                                        <Form.Label>Emergency Contact Name</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="EmergencyContactName"
                                        required
                                        placeholder="EmergencyContactName"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="EmergencyPhone">
                                        <Form.Label>Emergency Phone</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="EmergencyPhone"
                                        required
                                        placeholder="EmergencyPhone"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="Citizenship">
                                        <Form.Label>Citizenship</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="Citizenship"
                                        required
                                        placeholder="Citizenship"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="Race">
                                        <Form.Label>Race</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="Race"
                                        required
                                        placeholder="Race"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="EmployeeType">
                                        <Form.Label>Employee Type</Form.Label>
                                        <Form.Control as="select" 
                                        name="EmployeeType"
                                        required
                                        placeholder="EmployeeType"
                                        >
                                        <option value="full_time" >FULL_TIME</option>
                                        <option value="part_time" >PART_TIME</option>
                                        <option value="contract" >CONTRACT</option>
                                        <option value="intern" >INTERN</option>
                                        </Form.Control>
                                        
                                    </Form.Group>

                                    <Form.Group controlId="Shift">
                                        <Form.Label>Shift</Form.Label>
                                        <Form.Control as="select" 
                                       name="Shift"
                                       required
                                       placeholder="Shift"
                                        >
                                        <option value="morning_shift" >MORNING_SHIFT</option>
                                        <option value="night_shift" >NIGHT_SHIFT</option>
                                        <option value="afternoon_shift" >AFTERNOON_SHIFT</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="Work_Location">
                                        <Form.Label>Work Location</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="Work_Location"
                                        required
                                        placeholder="Work_Location"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="Address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="Address"
                                        required
                                        placeholder="Address"
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group onChange={this.getFile} controlId="UploadCVFile">
                                        <Form.Label>Upload CV</Form.Label>
                                        <Form.Control 
                                        type="file"
                                        name="UploadCVFile"
                                        required
                                        placeholder="file"
                                        />
                                    </Form.Group>

                                    <Form.Group onChange={this.getFile}  controlId="workexperienceUpload">
                                        <Form.Label>Work Experience Upload</Form.Label>
                                        <Form.Control 
                                        type="file"
                                        name="workexperienceUpload"
                                        required
                                        placeholder="workexperienceUpload"
                                        />
                                    </Form.Group>

                                    <Form.Group onChange={this.getFile}  controlId="otherUpload">
                                        <Form.Label>Other Upload</Form.Label>
                                        <Form.Control 
                                        type="file"
                                        name="otherUpload"
                                        required
                                        placeholder="otherUpload"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.imagesrc}/>
                                <input onChange={this.handleFileSelected} type="File" accept="image/png, image/jpeg"/>
                            </Col>
                        </Row>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}

export default AddEmpModal;
