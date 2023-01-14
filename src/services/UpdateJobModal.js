import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

const UpdateJobModal = ({updateJob, row}) => {

  const [job, setJob] = useState(row.job)
  const [price, setPrice] = useState(row.price)
  const [primeCost, setPrimeCost] = useState(row.primeCost)
  const [employee, setEmployee] = useState(row.employee)

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    setJob(row.job)
    setPrice(row.price)
    setPrimeCost(row.primeCost)
    setEmployee(row.employee)

  };

  const saveButtonHandler = () => {
    const newJob = {
      job, price, primeCost, employee
    }
    updateJob(row._id, newJob)
    toggle()
  }

  return (
    <div>
      <Button outline color="primary" onClick={toggle}>Update Job</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Job</ModalHeader>
        <ModalBody>
          Job name:
          <Input value={job} onChange={(e) =>
            setJob(e.target.value)}></Input>
          <br/>
          Price($):
          <Input value={price}
                 onChange={(e) => setPrice(+e.target.value)}></Input>
          <br/>
          Prime Cost:
          <Input value={primeCost}
                 onChange={(e) => setPrimeCost(+e.target.value)}></Input>

          <br/>
          Employee's name:
          <Input value={employee}
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

export default UpdateJobModal;
