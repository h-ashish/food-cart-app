import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import foodimg from "../assets/foodimg.jpg";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { delCart, addCart } from "../redux/actions/index";

function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await axios
        .get("https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7")
        .then((res) => res.data);
      const fullData = await response.map((val) => {
        const obj = {
          ...val,
          image: foodimg,
          qty: 0,
        };
        return obj;
      });
      // console.log(fullData);
      if (componentMounted) {
        setData(await fullData);
        setFilter(await fullData);
        setLoading(false);
        console.log(filter);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div class="spinner-border m-5" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </>
    );
  };

  const filterProduct = (e) => {
    const searchWord = e.target.value;
    console.log(searchWord);
    if (searchWord === "") {
      setFilter([]);
    } else {
      const newData = data.filter((item) => {
        const opening = item.item_name;
        return opening.toLowerCase().search(searchWord.toLowerCase()) !== -1;
      });
      newData.length > 0 ? setFilter(newData) : setFilter([]);
    }
    const updatedList = data.filter((x) => x.item_name === e.target.value);
    setFilter(updatedList);
  };

  const ShowItems = () => {
    const state = useSelector((state) => state.handleCart);
    const dispatch = useDispatch();

    const handleQuantity = (id) => {
      let qty = 0;
      if (state.length !== 0) {
        const foundItemInCart = state.find((item) => item.id === id);
        if (foundItemInCart) {
          qty = foundItemInCart.qty;
        }
      }
      return qty;
    };

    const handleAddButton = (item) => {
      dispatch(addCart(item));
    };

    const handleRemoveButton = (item) => {
      dispatch(delCart(item));
    };
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <div class="input-group rounded">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              // aria-describedby="search-addon"
              onChange={filterProduct}
            />
            <span class="input-group-text border-0" id="search-addon">
              <i class="fa fa-search"></i>
            </span>
          </div>
        </div>
        {filter.map((item) => {
          return (
            <>
              <div className="col-md-3 mb-4" key={item.id}>
                <div className="card h-100 text-center p-4">
                  <img
                    src={foodimg}
                    className="card-img-top"
                    alt="food image"
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{item.item_name}</h5>
                    <p className="card-text fw-bold">₹ {item.price}</p>

                    {handleQuantity(item.id) !== 0 ? (
                      <div>
                        <div className="d-flex justify-content-between align-items-center text-center">
                          <button
                            className="btn btn-outline-dark "
                            onClick={() => handleRemoveButton(item)}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <span className="fw-bolder">
                            {handleQuantity(item.id)}
                          </span>
                          <button
                            className="btn btn-outline-dark "
                            onClick={() => handleAddButton(item)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                        <NavLink
                          to="/cart"
                          className="btn btn-dark ms-2 mt-3 px-3 py-2"
                        >
                          Go To Cart
                        </NavLink>
                      </div>
                    ) : (
                      <button
                        className="btn btn-outline-dark mt-2"
                        onClick={() => handleAddButton(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Menu Items</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowItems />}
        </div>
      </div>
    </div>
  );
}

export default Products;
