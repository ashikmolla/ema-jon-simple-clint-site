import React, { useEffect, useState } from 'react';
import './Shop.css'
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    /// pageination
    const { totalProducts } = useLoaderData();
    const numberOfPages = Math.ceil(totalProducts / itemsPerPage);

    //  ranarel system

    // const pageNumbers =[];
    // for(let i =1; i<= numberOfPages; i++){
    //     pageNumbers.push(i)
    // }


    // const pageNumbers = [...Array(totalPages).keys()];
    const pageNumbers = [...Array(numberOfPages).keys()];






    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data);
        }
        fetchData();

    }, [currentPage, itemsPerPage])




    useEffect(() => {
        const storedCart = getShoppingCart();

        const ids = Object.keys(storedCart)
        fetch(`http://localhost:5000/productsByIds`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProduct => {

                const saveCart = []
                for (const id in storedCart) {
                    const addedProduct = cartProduct.find(product => product._id === id)
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        saveCart.push(addedProduct);
                    }
                }
                setCart(saveCart);
            })

    }, [])
    // props produce eventHendeler 
    const handleAddYoCart = (product) => {
        const chackProduct = cart.find(pd => pd._id === product._id)
        if (chackProduct) {
            toast('you have already added product')
        } else {

            const newCrat = [...cart, product]
            setCart(newCrat)
            addToDb(product._id)
        }
    }



    const handelClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    const options = [5, 10, 20];
    function handleItemsPerPageChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0); // Reset to the first page when changing items per page
    };

    return (
        <>
            <div className='shop-contaneir'>
                <div className='products-container'>
                    {
                        products.map(product => <Products
                            key={product._id}
                            product={product}
                            handleAddYoCart={handleAddYoCart}
                        ></Products>)

                    }
                </div>
                <div className='cart-container'>
                    <Cart cart={cart}
                        handelClearCart={handelClearCart}
                    >


                        <Link className='cart-buttom-btn' to='/orders'>
                            <span className='btn-text'>Reviewo Order </span>
                            <FontAwesomeIcon className='clear-cart-btn-icon' icon={faArrowRight} />
                        </Link>

                    </Cart>

                </div>


            </div>


            {/* pageination */}
            <div className="pageination">
                <p>Current Page:{currentPage}  and Item Perpage{itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'secelcted' : "color-black"}
                        onClick={() => setCurrentPage(number)}
                    >{number+1}</button>)
                }
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }

                </select>
            </div>
        </>
    );
};

export default Shop;