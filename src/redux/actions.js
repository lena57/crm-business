import axios from "axios";
import {getDataFunction} from "../GetData";

export const getClientsInActions = () => {
  return (dispatch) => axios.get('https://expressjs-server.up.railway.app/clients')
    .then((res) => dispatch({type: 'GET_CLIENTS', payload: res.data}))
    .catch(err => console.log(err))
}

export const addClientInActions = (newClient) => {
  return (dispatch) => axios.post('https://expressjs-server.up.railway.app/clients', {
    "name": newClient.name,
    "address": newClient.address,
    "phoneNumber": newClient.phoneNumber,
    "createAt": getDataFunction(),

  })
    .then((res) => dispatch(getClientsInActions(res.data)))
    .catch((err) => console.log(err))
}
export const updateClientInActions = (id, newClient) => {
  console.log('newClient', newClient)
  return (dispatch) => axios.patch(`https://expressjs-server.up.railway.app/clients/${id}`, {
    "name": newClient.name,
    "address": newClient.address,
    "phoneNumber": newClient.phoneNumber,
    "createAt": newClient.createAt,
  })
    .then((res) => dispatch(getClientsInActions()))
    .catch((err) => console.log(err))
}

export const deleteClientInActions = (id) => {
  return (dispatch) => axios.delete(`https://expressjs-server.up.railway.app/clients/${id}`)
    .then((res) => dispatch(getClientsInActions()))
    .catch((err) => console.log(err))

}

export const getJobsInActions = () => {
  return (dispatch) => axios.get('https://expressjs-server.up.railway.app/services')
    .then((res) => dispatch({type: 'GET_SERVICES', payload: res.data}))
    .catch((err) => console.log(err))
}
export const addJobInActions = (newJob) => {
  return (dispatch) => axios.post('https://expressjs-server.up.railway.app/services', {
    "job": newJob.job,
    "price": newJob.price,
    "primeCost": newJob.primeCost,
    "employee": newJob.employee,
  })
    .then((res) => dispatch(getJobsInActions()))
    .catch((err) => console.log(err))
}

export const updateJobInActions = (id, newJob) => {
  return (dispatch) => axios.patch(`https://expressjs-server.up.railway.app/services/${id}`, {
    "job": newJob.job,
    "price": newJob.price,
    "primeCost": newJob.primeCost,
    "employee": newJob.employee,
  })
    .then((res) => dispatch(getJobsInActions()))
    .catch((err) => console.log(err))
}

export const deleteJobInActions = (id) => {
  return (dispatch) => axios.delete(`https://expressjs-server.up.railway.app/services/${id}`)
    .then((res) => dispatch(getJobsInActions()))
    .catch((err) => console.log(err))
}

export const getOrdersInActions = () => {
  return (dispatch) => axios.get('https://expressjs-server.up.railway.app/orders')
    .then((res) => dispatch({type: 'GET_ORDERS', payload: res.data}))
    .catch(err => console.log(err))
}

export const addOrderInActions = (newOrder) => {
  return (dispatch) => axios.post('https://expressjs-server.up.railway.app/orders',
    {
      ...newOrder
    }
  )
    .then((res) => dispatch(getOrdersInActions()))
    .catch(err => console.log(err))
}


