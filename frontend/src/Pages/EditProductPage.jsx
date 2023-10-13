import React, { useEffect, useState } from 'react'
import '../Styles/NewProduct.css'
import {useNavigate, useParams} from "react-router-dom"
import { useCreateProductMutation, useUpdateProductMutation } from '../services/appApi'
import { Col, Container, Form, Row, Button, Alert } from 'react-bootstrap'
import axios from '../axios'


const EditProductPage = () => {
  const {id} = useParams()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [imgToRemove, setImgToRemove] = useState(null)
  const [images, setImages] = useState([])
  const navigate = useNavigate()
  const [updateProduct, {isError, error, isLoading, isSuccess}] =useUpdateProductMutation()


  function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "ddwymvr6k",
                uploadPreset: "jrt7qena",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    useEffect(()=>{
        axios.get('/products/'+id).then(({data})=>{
            const product = data.product;
            setName(product.name)
            setDescription(product.description)
            setCategory(product.category)
            setImages(product.pictures)
            setPrice(product.price)

        }).catch((error)=> console.log(error))
    },[id])

  const handleRemoveImg=(imgObj)=>{
       setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
  }

  const handleSubmit=(e)=>{
      e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        updateProduct({ id, name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    alert('product updated')
                    navigate("/");
                }, 1500);
            }
        });  }

  return (
    <Container>
      <Row className='mt-4 mb-4'>
        <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    <h1>Update product</h1>
                    {isSuccess && <Alert variant="success">Product updated successfully</Alert>}
                    {isError && <Alert variant="danger">{error.data}</Alert>}

                    <Form.Group className='mb-3'>
                        <Form.Label>Product name</Form.Label>
                        <Form.Control onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter product name" value={name} required></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control onChange={(e)=>setDescription(e.target.value)} as="textarea" style={{height: "100px" }} placeholder="Enter product description" value={description} required></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Price ($) </Form.Label>
                        <Form.Control onChange={(e)=>setPrice(e.target.value)} type="number" placeholder="Enter product price" value={price} required></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={category}>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="technology">technology</option>
                                <option value="tablets">tablets</option>
                                <option value="phones">phones</option>
                                <option value="laptops">laptops</option>
                            </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>   
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {/*were inporting font awesome in our index.html */}
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Button type="submit" disabled={isLoading ||isSuccess} > Update Product</Button>
                    </Form.Group>


                </Form>
        </Col>
        
        <Col md={6} className="new-product__image--container"></Col>

      </Row>
    </Container>
    )
}

export default EditProductPage