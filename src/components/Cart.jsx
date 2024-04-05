import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Trash2 } from "lucide-react"
import { incrementQuantity,decrementQuantity,removeItem } from '../Redux/Slices/addtoCart';

const Cart = () => {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.counter);
  const [deleteItemId, setDeleteItemId] = useState(null);


  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id, quantity: 1 }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id, quantity: -1 }));
  };
  const handleDelete = (id) =>{
    setDeleteItemId(id);
  }
  const handleDeleteConfirmation = (id) => {
    dispatch(removeItem({ id }));
    setDeleteItemId(null); // Close the modal after deletion
  }
  // Calculate subtotal
  let subtotal = 0;

  carts.map((user) => {
    subtotal += user.price * user.quantity;
  });
  return (
    <div>
      <div className='flex justify-end p-2'>
        <Link to={"/"}>
          <button type="button" className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Go Back</button>
        </Link>
      </div>

      <div className="h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-lg  p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold w-[42%]">Products</th>
                      <th className="text-left font-semibold w-1/4">Price</th>
                      <th className="text-left relative left-8 font-semibold w-1/4">Quantity</th>
                      <th className="text-left font-semibold w-1/4">Total</th>
                    </tr>
                  </thead>
                  {carts.length===0 ? (
                 <div className='relative left-[100%] top-2'>
                 <p className="text-center text-gray-600">Nothing to display</p>
               </div>
            ): (
                  <tbody>
                    {carts?.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td className="py-4">
                            <div className="flex items-center">
                              <img className="h-16 w-16 mr-4" src={user.image} alt={user.title} />
                              <span className="font-semibold mr-5">{user.title}</span>
                            </div>
                          </td>
                          <td className="py-4 ">${user.price}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button onClick={() => handleDecrement(user.id)} className="border rounded-md py-2 px-4 mr-2">-</button>
                              <span className="text-center w-8">{user.quantity}</span>
                              <button onClick={() => handleIncrement(user.id)} className="border rounded-md py-2 px-4 ml-2">+</button>
                            </div>
                          </td>
                          <td className="py-4">${user.price * user.quantity}</td>
                          <td><Trash2 className='text-red-600 hover:text-red-700 hover:cursor-pointer' size={20} onClick={()=>{handleDelete(user.id)}} /></td>
                          <div id="popup-modal" className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-zinc-800 bg-opacity-50 ${deleteItemId ? 'block' : 'hidden'}`}>
  <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
    <div className="absolute top-3 right-2">
      <button type="button" className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 inline-flex justify-center items-center" onClick={() => setDeleteItemId(null)}>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
    </div>
    <div className="p-4 md:p-5 text-center">
      <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
      <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this product?</h3>
      <button type="button" className="text-white bg-red-600 hover:bg-red-800 rounded-lg inline-flex items-center px-5 py-2.5" onClick={() => { handleDeleteConfirmation(deleteItemId) }}>
        Yes, I'm sure
      </button>
      <button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"onClick={() => setDeleteItemId(null)} >No, cancel</button>
    </div>
  </div>
                          </div>

                        </tr>
                      )
                 })}
                  </tbody>
                  )}
                </table>
              </div>
            </div>

            

            {/* subtotal  */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
