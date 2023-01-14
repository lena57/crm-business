import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

const CreateJobModal = ({addJob}) => {

  const [job, setJob] = useState('')
  const [price, setPrice] = useState(0)
  const [primeCost, setPrimeCost] = useState(0)
  const [employee, setEmployee] = useState('')

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    setJob('')
    setPrice(0)
    setPrimeCost(0)
    setEmployee('')
  };

  const saveButtonHandler = () => {
    const newJob = {
      job, price, primeCost, employee
    }
    console.log('newJob', newJob)
    addJob(newJob)
    toggle()
  }

  return (
    <div>
      <Button outline color="success" onClick={toggle}>Add Job</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Job</ModalHeader>
        <ModalBody>
          <Input placeholder="job name" value={job} onChange={(e) =>
            setJob(e.target.value)}></Input>
          <br/>
          <Input placeholder="price" value={price}
                 onChange={(e) => setPrice(+e.target.value)}></Input>
          <br/>

          <Input placeholder="prime cost" value={primeCost}
                 onChange={(e) => setPrimeCost(+e.target.value)}></Input>

          <br/>
          <Input placeholder="employee" value={employee}
                 onChange={(e) => setEmployee(e.target.value)}>
          </Input>


        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={saveButtonHandler}>
            Save
          </Button>
          <Button color="warning" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateJobModal;
