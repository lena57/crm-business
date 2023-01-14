import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import {connect} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {addOrderInActions, getClientsInActions, getJobsInActions} from "../redux/actions";
import {getDataFunction} from "../GetData";

const CreateOrderModal = (props) => {
  useEffect(() => {
    props.getClients()
    props.getJobs()
  }, [props.orders])

  const clientNameArray = props.clients.map(el => el.name)
  const jobsArray = props.services.map(el => el.job)

  const [clientName, setClientName] = useState(clientNameArray[0])
  const [job, setJob] = useState(jobsArray[0])
  const [prepaid, setPrepaid] = useState(0)

  console.log('clientNameArray', clientNameArray)

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    setClientName(clientNameArray[0])
    setJob(jobsArray[0])
    setPrepaid(0)
  };

  const saveButtonHandler = () => {
    const service = props.services.filter((service) => service.job === job)
    console.log('service', service)
    const newOrder = {
     "_id": uuidv4(),
      "orderNumber": props.orders.length + 1,
      clientName,
      "service": {
        ...service,
        "createAt": getDataFunction()
      },
      "sentToDo": {
        "date": "",
        "status": false
      },
      "completed": {
        "date": "",
        "status": false
      },
      "sayToClient": {
        "date": "",
        "status": false
      },
      "clientReceived": {
        "date": "",
        "status": false
      },
      "paid": {
        "payment": prepaid,
        "debt": service[0].price - prepaid,
        "primeCost": service[0].primeCost,
        "date": service[0].price <= prepaid ? getDataFunction() : '',
        "status": (service[0].price <= prepaid)
      }
    }
    console.log('newOrder', newOrder)
    props.addOrder(newOrder)
    toggle()

  }


  return (
    <div>
      <Button outline color="success" onClick={toggle}>Add Order</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Order</ModalHeader>
        <ModalBody>

          <label>Choose client name:</label>
          <select className="form-select" aria-label="Default select example"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}>
            {clientNameArray.map((el, i) =>
              <option key={i} value={el}>{el}</option>
            )}

          </select>


          <br/>
          <label>Choose job:</label>
          <select className="form-select" aria-label="Default select example"
                  value={job}
                  onChange={e => setJob(e.target.value)}>
            {jobsArray.map((el, i) => <option key={i} value={el}>{el}</option>
            )}
          </select>

          <br/>
          Price($):
          {/*<span>Price($): {props.services.filter((el)=>el.job===job)[0].price}</span>*/}
          <br/>
          <br/>
          <label>Prepaid:</label>
          <Input type="number" placeholder="prepaid" value={prepaid}
                 onChange={(e) => setPrepaid(+e.target.value)}></Input>

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

const mapStateToProps = (state) => ({
  orders: state.orders,
  clients: state.clients,
  services: state.services

})
const mapDispatchToProps = (dispatch) => ({
  addOrder: (newOrder) => dispatch(addOrderInActions(newOrder)),
  getClients: () => dispatch(getClientsInActions()),
  getJobs: () => dispatch(getJobsInActions())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderModal);