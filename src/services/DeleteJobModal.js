import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

const DeleteJobModal = ({deleteJob, row}) => {

  const [job, setJob] = useState('')

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    setJob('')

  };

  const saveButtonHandler = () => {
    deleteJob(row._id)
    toggle()
  }

  return (
    <div>
      <Button outline color="danger" onClick={toggle}>Delete Job</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete Job</ModalHeader>
        <ModalBody>
          <p> This action cannot be undo. This will be permanently delete the {' '}
            <b>{row.job}</b> {' '}</p>
            <p>Please type <b>{row.job}</b> to confirm</p>
          Job name:
          <Input value={job} onChange={(e) =>
            setJob(e.target.value)}></Input>


        </ModalBody>
        <ModalFooter>
          <Button color="success" disabled={row.job!==job} onClick={saveButtonHandler}>
            Yes
          </Button>
          <Button color="warning" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteJobModal;
