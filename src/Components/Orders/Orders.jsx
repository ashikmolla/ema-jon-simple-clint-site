import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCreditCardAlt } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    const saveCart=useLoaderData();

    const [cart, setCart]=useState(saveCart)
    // console.log(cart)
    const handleRemoveFromCart = (id)=>{
        const remaining=cart.filter(pd=>pd._id !==id)
        setCart(remaining);
        removeFromDb(id)
    }


    const handelClearCart=()=>{
        setCart([])
        deleteShoppingCart()
    }







    return (
        <div className='shop-contaneir'>

            <div className='review-container'>
                {
                    cart.map(product=> <ReviewItem 
                        key={product._id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                        ></ReviewItem>)
                }
                
            </div>

            <div className='cart-container'>
                <Cart 
                cart={cart}
                handelClearCart={handelClearCart}
                >
                    <Link className='faCreditCardAlt' to='/chackOut'> <span className='btn-text'>Proceed CheckOut </span>
                    <FontAwesomeIcon icon={faCreditCardAlt}/>
                    </Link>
                </Cart>

            </div>
        </div>
    );
};

export default Orders;