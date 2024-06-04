import React, { useContext, useEffect, useState } from 'react'
  import SummaryApi from '../common'
  import Context from '../context'
  import displayINRCurrency from '../helpers/displayCurrency'
  import { MdDelete } from "react-icons/md";
  import { useNavigate } from 'react-router-dom';
  import BannerProduct from '../components/BannerProduct';
  
  
  const Orders = () => {
      const [data,setData] = useState([])
      const [loading,setLoading] = useState(false)
      const context = useContext(Context)
      const loadingCart = new Array(4).fill(null)
      const navigate = useNavigate();
  
  console.log(context);
      const fetchData = async() =>{
          
        const response = await fetch(SummaryApi.getOrder.url,{
            method : SummaryApi.getOrder.method,
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
      },[])
  
  
    
    
  
      
  
      console.log(data);
    return (
      <div className=' container mx-auto'>
          
          <div className='text-center text-lg my-3'>  
              {
                  data.length === 0 && !loading && (
                      <p className='bg-white py-5 font-semibold text-xl'>Your Cart is Empty</p>
                  )
              }
          </div>
          <BannerProduct/>
  
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
                                     
                                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                      <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                      <div className='flex items-center justify-between'>
                                              <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                              <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
                                      </div>
                                      <div className='flex items-center gap-3 mt-1 justify-between'>
                                          <span><b>Quantity:</b>{product?.quantity}</span>
                                          
                                          <span><b>Status: </b>{product?.status}</span>
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
  
 

export default Orders
