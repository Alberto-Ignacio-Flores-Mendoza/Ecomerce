import React from 'react'
import '../Styles/CartPage.css'
import { useSelector } from 'react-redux'
import { Alert, Container,Row, Col, Table } from 'react-bootstrap'
import { useIncreaseCartProductMutation , useDecreaseCartProductMutation, useRemoveFromCartMutation} from '../services/appApi'
import { Elements } from "@stripe/react-stripe-js";
import CheackoutForm from '../Components/CheackoutForm'
import { loadStripe } from "@stripe/stripe-js";

const stripePromise= loadStripe('pk_test_51NznlCDNZ3P1VsfqNc3kvfXYqFH2lDOgpmqSaSAPVxmGcScw4lFcdnuGIXtSE8gbNfJgrfl3lsg19tEogBefPUKA00vCev11l4')

const CartPage = () => {
    const user = useSelector((state)=>state.user)
    const products = useSelector((state)=> state.products)
    const userCartObj = user.cart // coming from our user/ redux

    let cart = products.filter((product)=> userCartObj[product._id] != null)
    const [increaseCart] = useIncreaseCartProductMutation()
    const [decreaseCart] = useDecreaseCartProductMutation()
    const [removeFromCart, {isLoading}] = useRemoveFromCartMutation()

    const handleDecrease=(count, product)=>{
      const quantity = count;
      if(quantity <= 1 ) return alert("Can't proceed")
      decreaseCart(product)
    }
    


  return (
    <Container style={{minHeight: '95vh'}} className='cart-container'>
        <Row>
          <Col md={7}>
            <h1 className='pt-2 h3'>Shopping cart</h1>
            {cart.length == 0 ? (
                <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert>
            ) : 
            
            (
              <Elements stripe={stripePromise}>
                <CheackoutForm></CheackoutForm>
              </Elements>
            )}   
          
          </Col>

          <Col md={5}>
              {
                cart.length > 0 && (
                  <>
                  <Table responsive="sm" className="cart-table">
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {/*Loop through cart products*/}
                      {cart.map((item)=>(
                        <tr>
                          <td>&nbsp;</td>
                          <td>
                            {!isLoading &&
                            <i className='fa fa-times' style={{marginRight: 10, marginLeft: 10, cursor: "pointer"}}onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                            }
                            <img src={item.pictures[0].url} style={{width: 100, height: 100, objectFit: "cover"}}></img>
                          </td>
                          
                          <td>{item.price}</td>

                          <td>
                            <span className='quantity-indicator'>
                              <i className="fa fa-minus-circle" onClick={() => handleDecrease(user.cart[item._id],{ productId: item._id, price: item.price, userId: user._id })}></i>
                              <span>{user.cart[item._id]}</span>
                              <i className="fa fa-plus-circle" onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                            </span>
                          </td>

                          <td>
                            ${item.price * user.cart[item._id]}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </Table>
                  <div>
                    <h3 className='h4 pt-4'>Total: ${user.cart.total}</h3>
                  </div>
                  </>
                )
              }
          </Col>
          
                    
        </Row>
    </Container>
  )
}

export default CartPage