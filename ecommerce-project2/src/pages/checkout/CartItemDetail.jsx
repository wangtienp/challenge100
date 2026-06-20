import { Fragment, useEffect, useRef, useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";

export function CartItemDetail({ cartItem, loadCart }) {
    const inputRef = useRef(null)
    const [show, setShow] = useState(false)
    const [quantity, setQuantity] = useState(cartItem.quantity)

    useEffect(() => {
    if (show && inputRef.current) {
        inputRef.current.focus();
    }
}, [show]); 
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`)
        await loadCart()
    }
    function updateInput(event) {
        setQuantity(event.target.value)
    }
    async function updateQuantity() {
        if (!show) {
            setShow(true)
        }
        if (show) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity)
            })
            await loadCart()
            setShow(false)
        }
    }
    async function handleKeyDown(event) {
        if (event.key === 'Enter') {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity)
            })
            await loadCart()
            setShow(false)
        }
        if (event.key === 'Escape') {
            setQuantity(cartItem.quantity)
            setShow(false)
        }
    }
    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {show ? <input type="text" className="quantity-input" value={quantity} onChange={updateInput} onKeyDown={handleKeyDown} ref={inputRef} /> :
                            <span className="quantity-label">{cartItem.quantity}</span>}
                    </span>
                    <span className="update-quantity-link link-primary" onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}