import React from 'react'
import axios from '../axios'
import "../Styles/AdminDashboard.css"
import { Nav, Row, Tab, Container, Col } from 'react-bootstrap'
import DashboardProducts from '../Components/DashboardProducts'
import OrdersAdminPage from '../Components/OrdersAdminPage'
import ClientsAdminPage from '../Components/ClientsAdminPage'

const AdminDashboard = () => {
  return (
    <Container>
        <Tab.Container defaultActiveKey="products">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className='flex-column'>
                        <Nav.Item>
                            <Nav.Link eventKey="products">Products</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="orders">Orders</Nav.Link>
                        </Nav.Item>{" "}

                        <Nav.Item>
                            <Nav.Link eventKey="clients">Clients</Nav.Link>
                        </Nav.Item>

                    </Nav>
                </Col>

                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="products">
                            <DashboardProducts></DashboardProducts>
                        </Tab.Pane>
                        <Tab.Pane eventKey="orders">
                            <OrdersAdminPage></OrdersAdminPage>
                        </Tab.Pane>
                        <Tab.Pane eventKey="clients">
                            <ClientsAdminPage></ClientsAdminPage>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>


            </Row>
        </Tab.Container>
    </Container>
    )
}

export default AdminDashboard