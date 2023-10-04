import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { addDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../services/config';
import CountProduct from '../CountProduct/CountProduct.jsx';

const ItemDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  let categoriaId = id;
 
  useEffect(() => {
    const misProductosRef = collection(db, "productos");
  
    getDocs(misProductosRef)
      .then((res) => {
        const productos = res.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        const productoEncontrado = productos[id-1];
        setProduct(productoEncontrado);
      })
      .catch((error) => console.log(error));
  }, []);
  

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product?.imagen} alt={product?.nombre} />
      <Card.Body>
        <Card.Title>{product?.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product?.precio}</Card.Subtitle>
        <Card.Text>{product?.descripcion}</Card.Text>
        <CountProduct id={product}/>
      </Card.Body>
    </Card>
    </div>
  );
};
export default ItemDetail;
