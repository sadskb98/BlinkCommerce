import React,{Component,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux' 
import { useEffect } from 'react'

import {Modal} from 'react-bootstrap'

import { getAllOrdersSup,logoutSup,ShippingAOrder } from '../../actions/supplierAction';

import "./SupplierPage.css"
export default function SupplierPage() {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [UIDPass,setUIDPass]=useState("")
  
    const handleClose = () => setShow(false);
    const handleClose_withConfirm = (order) => { 
  
      if(UIDPass !="111"){
        // console.log(currentAdmin[0].password," vs You vs ",UIDPass);
        alert("Suppliers's Credential Doesn't Match")
        setUIDPass("")
        setShow(false);
        return;
      }
      console.log('Accpeted'+order._id); 
      dispatch(ShippingAOrder({orderid:order._id}))
      alert("Product Supplied for OrderID- "+order._id)
      setUIDPass("")
      setShow(false);
  
    }
    const handleShow = () => setShow(true);
  
    const orderstate = useSelector(state=>state.getAllOrdersReducerSup)
    const {orders,error,loading}= orderstate;
  
  
  
    useEffect(() => {
      dispatch(getAllOrdersSup())
    }, [])
    
    return (
      <div className="App">
         {/* <p> HUGE SUCCESS </p> */}
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.css" integrity="sha512-1hsteeq9xTM5CX6NsXiJu3Y/g+tj+IIwtZMtTisemEv3hx+S9ngaW4nryrNcPM4xGzINcKbwUJtojslX2KG+DQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />       <div className='orderScreenHolder'>
         { 
          (
            <div className='row justify-content-center'>
               { loading && <div> Loading... </div>}
               { error && <div> Something went wrong... </div>}
               { orders && orders.map( order=>{
  
                    return ( order.isDelivered!=0 && <div className='col-md-8 pp  shadow-lg p-3 mb-1 bg-white rounded '>
                      
                      { 
                       <div className='flex-container'>
                        <i class="fa-duotone fa-truck-clock"></i>
  
                        
                       <div className="text-left d-flex w-50 m-1 pp2">
                          
                       
                           <ch1> Transaction Id: { order.transactionId}            </ch1>
                           <br></br>
                            <ch1> Payment: { order.orderAmount} </ch1>
                            <br></br>
                            <ch1> Date : { order.createdAt.slice(0,10)} </ch1>
                            <br></br>
                            <br></br>
                            
  
                            {/* <h1> Order Id :{ order._id}</h1> */}
                            </div>  
                           {/*  */}
  
                            {/* <div className="text-left w-100 m-1 "> 
                             <h2 style={{fontSize:'25px'}} >Address</h2>
                             <h1> Street : {order.shippingAddress.street}</h1>
                             <h1> City : {order.shippingAddress.city}</h1>
                             {/* <h1> Country : {order.shippingAddress.country}</h1>
                             <h1> Pincode : {order.shippingAddress.pincode}</h1> 
                            </div > */}
                            
                            {/*  */}
                            {/* <div className="text-left w-100 m-1 pp2">
                            <h2 style={{fontSize:'25px'}} >Order Info</h2>
                            <ch1> Order Amount : { order.orderAmount}</ch1>
                            <br></br>
                            <ch1> Date : { order.createdAt.slice(0,10)} </ch1>
                            <br></br>
                            <ch1> Transaction Id :{ order.transactionId.slice(12)}</ch1>
                            <br></br>
                            <br></br>
                            <br></br>
                            
  
                            {/* <h1> Order Id :{ order._id}</h1> }
                            </div>   */}
                            <div className="ExtendedOrder">
                         
                            {order.isDelivered===1 &&
                             <div /*class="circle small"*/>
                            {/* <h3>GFDA / No. 65</h3> */}
                            <button className="nw1" onClick={handleShow}>Check Order</button>
                            {/*-----------------M--O--D--A--L------------------------*/}
                            <Modal show={show} className='modal modal_window' >
                              <Modal.Header closeButton onClick={handleClose}>
                                <Modal.Title className="pTname ">{"Trx Id. : "+order.transactionId}</Modal.Title>
                              </Modal.Header>
  
                              <Modal.Body>

                                <div className="itemfix">
                                {order.orderItems.map(item=>{
  
                                  return <div >
                                    <h1 id="spfont"> {item.name} {item.varient} x {item.quantity} Unit= {item.price}</h1>
                                    </div>
                                  })}
                                  </div>
                                  <hr></hr>

                                  <p className="pAmount ">{" Received Amount : "+order.orderAmount}</p>

                                <p className="pMsg ">{" Confirm supplying these Product?"}</p>
                          
                               <div class="center">
                                <div class="float-input">
                                  <input type="password" placeholder="Enter Supply Password" 
                                  value={UIDPass}  onChange={(e)=>setUIDPass(e.target.value)} required
                                  />
                                </div>
                              </div>
                              </Modal.Body>
  
                              <Modal.Footer>
                                  <div className="btn-white accpet clshov" onClick={ handleClose}>CLOSE</div>
                                  <div className="btn  nclshov" onClick={ ()=>handleClose_withConfirm(order) }>Accept</div>
  
                              </Modal.Footer>
                            </Modal>
                          </div>
                            }
                           { /*-------------------*/}
                            {
                             order.isDelivered===2 &&
                            <div className='fixarea'>
                            <p id="fixit">Supplied</p> 
                            </div>
                            }
                           
  
                            </div>
                      </div>}
                      </div>)
  
                })  
               }
            </div>) 
      }                  <i class="fa fa-sign-out dxdx"  onClick={ ()=>dispatch(logoutSup()) }> <gg>Log Out</gg></i>

       
      </div>
      </div>
    );
  }
  
