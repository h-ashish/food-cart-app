import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delCart, addCart } from "../redux/actions/index";

function Cart() {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  let total = 0;
  let discount = 0;

  console.log(state);
  const handleAddButton = (item) => {
    dispatch(addCart(item));
  };

  const handleRemoveButton = (item) => {
    dispatch(delCart(item));
  };

  const CheckoutItems = (item) => {
    total = total + item.qty * item.price - discount;
    if (total > 101 && total <= 500) {
      discount = 10;
      total = total - total * (discount / 100);
      console.log(total);
    } else if (total > 500) {
      discount = 20;
      total = total - total * (discount / 100);
    }

    return (
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">{item.item_name}</h6>
        </div>
        <span className="text-muted">₹ {item.qty * item.price}</span>
      </li>
    );
  };

  const cartItems = (cartItem) => {
    return (
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4"></div>
        <div className="col-md-8 order-md-1"></div>
        <div className="px-4 my-4 bg-light rounded-3" key={cartItem.id}>
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <img
                  src={cartItem.image}
                  alt={cartItem.item_name}
                  height="200px"
                  width="180px"
                />
              </div>
              <div className="col-md-5">
                <h3>{cartItem.item_name}</h3>
                <p className="lead fw-bold">
                  {cartItem.qty} X ₹{cartItem.price} = ₹{" "}
                  {cartItem.qty * cartItem.price}
                </p>
                <div className="w-25 d-flex justify-content-between align-items-center text-center">
                  <button
                    className="btn btn-outline-dark me-3 "
                    onClick={() => handleRemoveButton(cartItem)}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <span className="fw-bolder">{cartItem.qty}</span>
                  <button
                    className="btn btn-outline-dark ms-3"
                    onClick={() => handleAddButton(cartItem)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-4 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="row">
        <div className="col-md-8 order-md-1">
          {state.length === 0 && emptyCart()}
          {state.length !== 0 && state.map(cartItems)}
        </div>
        <div className="col-md-4 order-md-2 mb-4">
          <div className="m-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge bg-secondary badge-pill">
                {state.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {state.map(CheckoutItems)}
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Discount</h6>
                  {/* <small>EXAMPLECODE</small> */}
                </div>
                <span className="text-success">%{discount}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>₹{total.toFixed(2)}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
