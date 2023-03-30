import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( () =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data =>setProducts(data))
    }, []);

    useEffect( ()=>{
        const storedCard = getShoppingCart();
        const savedCart = [];
        // step 1 : get id
        for(const id in storedCard){
        // step 2: get the product by using id
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
            // step 3: get quantity of the product
            const quantity = storedCard[id];
            addedProduct.quantity = quantity;
            // step 4: add thr added product to the save cart
            savedCart.push(addedProduct);
            }
            // console.log(addedProduct);
        }
        // step 5: set the cart
        setCart(savedCart);
    } , [products])

    const handelAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product = {product}
                        handelAddToCart={handelAddToCart}
                    ></Product>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;