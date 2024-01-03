import React from 'react';
import './Products.css'

import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Products = ({product, handleAddYoCart}) => {
    const { img, name, price, seller, ratings } = product;
    
    // console.log(handleAddYoCart)
   
    return (
        <div className='products'>
            <div className='product'>
                <img src={img} alt="" />
                <h6>{name}</h6>
                <h4>Price:- ${price}</h4>
                <p>Manufacturer:- {seller}</p>
                <p>Rating:- {ratings} Stares</p>
            </div>
            <button onClick={() => handleAddYoCart(product)} className='add-cart-btn'>
                Add to Cart  <FontAwesomeIcon icon={faShoppingCart} />

            </button>
        </div>
    );
};

export default Products;