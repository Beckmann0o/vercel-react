import React, { useEffect } from 'react';
import { useState } from 'react';
import ItemProduct from '../ItemProduct/ItemProduct';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { addDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../services/config';
import { useParams } from 'react-router-dom';
import { CATEGORIAS } from '../../constants';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const { categoriaId } = useParams();

  useEffect(() => {
    const misProductos = categoriaId
      ? query(collection(db, 'productos'), where('categoriaId', '==', categoriaId))
      : collection(db, 'productos');
    getDocs(misProductos)
      .then(res => {
        const nuevosProductos = res.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProductos(nuevosProductos);
      })
      .catch(error => console.log(error));
  }, [categoriaId]);

  return (
    <>
      <Container className="mt-4">
        <Row>
          {productos.map(producto => {
            return (
              <Col key={producto.id}>
                <ItemProduct product={producto}></ItemProduct>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default ItemListContainer;
