import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/products') // JSON server
          .then(res => res.json())
          .then(data => setProducts(data));
      }, []);

  return <div>
    <h2> Product List </h2>
    
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Description</th>
            <th>Type</th>
            <th>Import Date</th>
            <th>Export Date</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price} VND</td>
              <td>{product.description}</td>
              <td>{product.type}</td>
              <td>{product.importDate}</td>
              <td>{product.exportDate} </td>
              <td>{product.supplier}</td>
              <td>{product.status}</td>
              <td>{product.location}</td>

            </tr>
          ))}
        </tbody>
      </Table>

  </div>;
};

export default ProductList;
