import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemDetail from './components/ItemDetail/ItemDetail'
import { useContext } from 'react'
import { CarritoProvider } from './components/context/CarritoContext'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'


function App() {
  return (
    <CarritoProvider>
        <BrowserRouter>
      <NavBar/>
      <Container>
      <Routes>
        <Route exact path={"/"} element={<ItemListContainer />}></Route>
        <Route path={"/categoria/:categoriaId"} element={<ItemListContainer />}></Route> 
        <Route path={"/detalle/:id"} element={<ItemDetail></ItemDetail>}></Route>
        <Route path={'/cart'} element = { <Cart /> } />
        <Route path={'/checkout'} element = { <Checkout /> } />
        <Route path={'*'} element={<div>Sitio en construccion</div>}></Route>
      </Routes>  
      </Container>
    </BrowserRouter>
    </CarritoProvider>
  
  )
}

export default App
