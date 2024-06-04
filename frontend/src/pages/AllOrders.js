




import React, { useContext, useEffect, useRef, useState } from 'react'
  import SummaryApi from '../common'
  import Context from '../context'
  import displayINRCurrency from '../helpers/displayCurrency'
  import { MdDelete } from "react-icons/md";
  import { useNavigate } from 'react-router-dom';
  import BannerProduct from '../components/BannerProduct';
import { toast } from 'react-toastify';
  
  
  const AllOrders = () => {
    
      const [data,setData] = useState([])
      const [loading,setLoading] = useState(false)
      const context = useContext(Context)
      const loadingCart = new Array(4).fill(null)
      const navigate = useNavigate();
  const [reload,setReload] =useState(true);
  console.log(context);

      const fetchData = async() =>{
          
        const response = await fetch(SummaryApi.getAllOrder.url,{
            method : SummaryApi.getAllOrder.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
        })
         
  
          const responseData = await response.json()
  
          if(responseData.success){
              setData(responseData.data)
          }
  
  
      }
  
      const handleLoading = async() =>{
          await fetchData()
      }
  
      useEffect(()=>{
          setLoading(true)
          handleLoading()
           setLoading(false)
      },[reload])
  
  
    const updatebtn = useRef(null);
    const [update,setUpdate] = useState({id:"",status:""})
  
      const updatePost =async ()=>{
        const dataResponse = await fetch(SummaryApi.updateStatus.url, {
            method: SummaryApi.updateStatus.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(update)
        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            
         
        }

        if (dataApi.error) {
            toast.error(dataApi.message)
        }
        setUpdate({id:"",status:""})
        setReload(!reload);
        updatebtn.current.classList.add("remove");
      }
      const handleChange=(e)=>{
        setUpdate({id:update.id,status:e.target.value})
      }
  
      console.log(data);
    return (
      <div className=' container mx-auto'>
        <div className="order-change remove"ref={updatebtn}>
<div className="bg-order">
    <p>Update Status</p>
    <input type="text" required placeholder="set new status"onChange={handleChange} value={update.state}/>
    <button  onClick={updatePost}>Update</button>
</div>
        </div>
          
          <div className='text-center text-lg my-3'>  
              {
                  data.length === 0 && !loading && (
                      <p className='bg-white py-5 font-semibold text-xl'>Your Cart is Empty</p>
                  )
              }
          </div>
          {/* <BannerProduct/> */}
  
          <div className='flex flex-col mt-5 mb-5 lg:flex-row gap-10 lg:justify-between p-4'>   
                  {/***view product */}
                  <div className='w-full max-w-5xl m-auto'>
                      {
                          loading ? (
                              loadingCart?.map((el,index) => {
                                  return(
                                      <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                      </div>
                                  )
                              })
                               
                          ) : (
                            data.map((product,index)=>{
                             return(
                              <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                  <div className='w-32 h-32 bg-slate-200'>
                                      <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                  </div>
                                  <div className='px-4 py-2 relative'>
                                     <div className='flex items-center justify-between'>
                                        <div>
                                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                      <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                      </div>
                                      <div>
                                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.userId?.name}</h2>
                                      <p className='capitalize text-slate-500'>{product?.userId.email}</p>
                                      </div>
                                      </div>
                                      <div className='flex items-center justify-between'>
                                             <div> <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p></div>
                                             <div> 
                                                 {/* <p>{product.address.street}</p> */}
                                             <p className='text-slate-600 font-semibold text-lg'>Total amount:{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
                                            </div>
                                      </div>
                                      <div className='flex items-center gap-3 mt-1 justify-between'>
                                          <span><b>Quantity:</b>{product?.quantity}<span style={{"width":"10px"}}></span> <b>Payment Mode:</b>{product?.payment}</span>
                                          <span className="updatebutton"><b>Status: </b>{product?.status} <button onClick={()=>{setUpdate({id:product._id,status:product.status}); updatebtn.current.classList.remove("remove")}}>Update Status</button></span>
                                      </div>
                                  </div>    
                              </div>
                             )
                            })
                          )
                      }
                  </div>
  
  
                 
          </div>
      </div>
    )
  }
  
 

export default AllOrders

