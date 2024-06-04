import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { cardElement, useStripe, useElement, CardElement } from "@stripe/react-stripe-js"
import axios from 'axios';
function Checkout() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(4).fill(null)
  const navigate = useNavigate();
  const [selectedOption,setSelectedOption] = useState("");
  const handleBuyChange=(e)=>{

  setSelectedOption(e.target.value)

  }
  console.log(selectedOption);
const [address,setAddress] = useState({
  country:"",
  state:"",
  street:"",
  city:"",
  pincode:""
})
const handleOnChange = (e)=>{
  const { name, value} = e.target

  setAddress((preve)=>{
    return{
      ...preve,
      [name]  : value
    }
  })
}

const initPayment = (data) => {
  console.log("YES");
  const options = {
    key: "rzp_test_Q7DtEmCmUWr3xD",
    amount: data.amount,
    currency: data.currency,
    name: "CAKE ZONE",
    description: "Test Transaction",
    image: "", 
    order_id: data.id,
    handler: async (response) => {
      try {
        const verifyUrl = "http://localhost:8090/api/payment/verify";
        const { data } = await axios.post(verifyUrl, response);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    theme: {
      color: "#3399cc",
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

  const handleBuy = async () => {

if(selectedOption==="Online"){
  try {
    try {
			const orderUrl = "http://localhost:8090/api/payment/orders";
			const {data}  = await axios.post(orderUrl, { amount: 1 });
      
			console.log(data);

			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
  } catch (error) {
    console.log(error);
    toast.error("Netwok probjem....")
    return;
  }

}


    const response = await fetch(SummaryApi.placeOrder.url, {
      method: SummaryApi.placeOrder.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(
        {
          address:address,
          payment:selectedOption
        }
      )
    })
    const responseData = await response.json()
    toast.success("Order Placed")

    
  }

const fetchData = async () => {

  const response = await fetch(SummaryApi.addToCartProductView.url, {
    method: SummaryApi.addToCartProductView.method,
    credentials: 'include',
    headers: {
      "content-type": 'application/json'
    },
  })


  const responseData = await response.json()

  if (responseData.success) {
    setData(responseData.data)
  }


}

const handleLoading = async () => {
  await fetchData()
}

useEffect(() => {
  setLoading(true)
  handleLoading()
  setLoading(false)
}, [])


const increaseQty = async (id, qty) => {
  const response = await fetch(SummaryApi.updateCartProduct.url, {
    method: SummaryApi.updateCartProduct.method,
    credentials: 'include',
    headers: {
      "content-type": 'application/json'
    },
    body: JSON.stringify(
      {
        _id: id,
        quantity: qty + 1
      }
    )
  })

  const responseData = await response.json()


  if (responseData.success) {
    fetchData()
  }
}


const decraseQty = async (id, qty) => {
  if (qty >= 2) {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(
        {
          _id: id,
          quantity: qty - 1
        }
      )
    })

    const responseData = await response.json()


    if (responseData.success) {
      fetchData()
    }
  }
}

const deleteCartProduct = async (id) => {
  const response = await fetch(SummaryApi.deleteCartProduct.url, {
    method: SummaryApi.deleteCartProduct.method,
    credentials: 'include',
    headers: {
      "content-type": 'application/json'
    },
    body: JSON.stringify(
      {
        _id: id,
      }
    )
  })

  const responseData = await response.json()

  if (responseData.success) {
    fetchData()
    context.fetchUserAddToCart()
  }
}

const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)
return (
  <div className='flex-col'>
    <div className='flex h-16 w-full bg-amber-400 items-center text-2xl font-semibold place-content-center'>
      <h1 className=''>Checkout ({totalQty} items)</h1>
    </div>

    <div className='border-b-2 mt-5 px-8'>
      <div className='mb-5'>
        <span className='text-2xl font-semibold'>Delivery Address  </span>
      </div>
      <div className='mb-8'>
        <form className='px-80' onSubmit={(e)=>{e.prevent.default()}}>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive order.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Country
                </label>
                <div className="mt-2">
                  <select
                  onChange={handleOnChange}
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="us">United States</option>
                    <option value="canada">Canada</option>
                    <option value="india">India</option>
                    <option value="nepal">Nepal</option>
                    <option value="mexico">Mexico</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={address.street}
                    onChange={handleOnChange}
                    name="street"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                  value={address.city}
                  onChange={handleOnChange}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                  value={address.pincode}
                  onChange={handleOnChange}
                    type="text"
                    name="incode"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className='border-b-2 mt-5 px-8'>
      <div className='mb-5'>
        <span className='text-2xl font-semibold'>Review items and delivery  </span>
      </div>
      <div className='px-20 mb-8'>
        <div className='w-full ml-60 max-w-3xl'>
          {
            loading ? (
              loadingCart?.map((el, index) => {
                return (
                  <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                  </div>
                )
              })

            ) : (
              data.map((product, index) => {
                return (
                  <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                    <div className='w-32 h-32 bg-slate-200'>
                      <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                    </div>
                    <div className='px-4 py-2 relative'>
                      {/**delete product */}
                      <div className='absolute right-0 text-gray-900 rounded-lg p-2 hover:bg-red-600 hover:text-white cursor-pointer text-lg font-semibold mr-4' onClick={() => deleteCartProduct(product?._id)}>
                        <span>Remove from cart</span>
                      </div>

                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                      <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                      <div className='flex items-center justify-between'>
                        <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                        <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>

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
    <div className='border-b-slate-400 mt-5 px-8'>
      <div className='mb-5'>
        <span className='text-2xl font-semibold'>Payment Method </span>
      </div>
      <div className='px-80 mb-12'>
        <form>
          <div className='mt-8'><span className=' text-lg font-bold'>Order Total <span className='text-red-600 font-bold'>{totalPrice}</span></span></div>
          <div style={{width:"100%"}} className='mt-8 d-flex justify-between'><span className=' text-lg font-bold'><input type="radio" value="COD" selected checked={selectedOption === 'COD'} onChange={handleBuyChange} /> Cash On Delivery</span><span className='text-lg font-bold'><input type="radio" value="Online" checked={selectedOption === 'Online'} onChange={handleBuyChange} />Online</span></div>
          <button className='mt-10 bg-amber-600 hover:bg-amber-700 h-12 w-full font-semibold text-white px-3 py-0.5 text-xl rounded-lg ' onClick={handleBuy}>Buy now</button>
        </form>
      </div>
    </div>
  </div>
)
}

export default Checkout
