import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import {deleteOrderInActions} from "../redux/actions";
import {connect} from "react-redux";

const DeleteOrderModal = (props) => {
  const {row} = props
  const [name, setName] = useState('')
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    setName('')
  };

  const saveButtonHandler = () => {
    props.deleteOrder(row._id)
    toggle()
  }

  return (
    <div>
      <Button outline color="danger" onClick={toggle}>Delete Order</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete Order</ModalHeader>
        <ModalBody>
          <p> This action cannot be undo. This will be permanently delete the order for {' '}
            <b>{row.clientName}</b> {' '}</p>
          <p>Please type <b>{row.clientName}</b> to confirm the order deleting</p>
          Client name:
          <Input value={name} onChange={(e) =>
            setName(e.target.value)}></Input>


        </ModalBody>
        <ModalFooter>
          <Button color="success" disabled={row.clientName !== name} onClick={saveButtonHandler}>
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

const mapDispatchToProps = (dispatch) => ({
  deleteOrder: (id) => dispatch(deleteOrderInActions(id)),
})

export default connect(null, mapDispatchToProps)(DeleteOrderModal);
