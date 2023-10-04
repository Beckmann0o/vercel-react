import { useState, createContext } from "react";
export const CarritoContext = createContext({ 
    carrito: [],
    total: 0,
    cantidadTotal: 0
});

//Proveo para usar en todo los componentes de carito el array de carrito, total y la cantidad total
export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);

    
    const agregarProducto = (item, cantidad) => {
    
        //me fijo si el producto que quiero agregar existe
        const productoExistente = carrito.find(prod => prod.item.id === item.id);

        //Si no existe:
        //1)Lo seteo en el estado: todo lo que tenia y le agrego el nuevo item
        //2)Sumo a la cantidad total del carrito
        //3)Y seteo el total, que va a ser todo lo previo + lo que agregue * la cantidad
        if (!productoExistente) {
            setCarrito(prev => [...prev, { item, cantidad }]);
            setCantidadTotal( prev => prev + cantidad);
            setTotal(prev => prev + (item.precio * cantidad));
        } else {
            //En cambio si el item que quiero agregar ya existe
            //Actualizo la cantidad del producto existente

            //itero sobre el carrito, si ya esta en carrito, copio la info
            //pero modifico la cantidad (linea 36)
            const carritoActualizado = carrito.map(prod => {
                //
                if (prod.item.id === item.id) {
                    return { ...prod, cantidad: prod.cantidad + cantidad };
                } else {
                    //si no coincide devuelvo el producto sin realizar modificaicones
                    //lo haciamos asi para mantener los otros productos del carrito sin cambios
                    return prod;
                }
            });
            setCarrito(carritoActualizado);
            setCantidadTotal( prev => prev + cantidad);
            setTotal(prev => prev + (item.precio * cantidad));

        }
    }


    const eliminarProducto = (id) => {
        //busco el producto que quiero eliminar buscando el elemento cuyo propiedad
        //item.id sea igual al pasado por parametro
        const productoEliminado = carrito.find(prod => prod.item.id === id);
        
        //el carrito actualizado va a tener todos los que no sean el id que estoy pasando
        //por parametro
        const carritoActualizado = carrito.filter(prod => prod.item.id !== id);
        //seteo carrito ya actualizado al estado
        setCarrito(carritoActualizado);
        
        //seteo la cantidad que va a ser lo que habia antes menos la cantidad del
        //producto eliminado
        setCantidadTotal(prev => prev - productoEliminado.cantidad);
        
        //seteo el total que va ser lo que habia antes menos la cantidad * el precio del
        //producto eliminado
        setTotal(prev => prev - (productoEliminado.item.precio * productoEliminado.cantidad));
    }

    
    //vaciar carrito setea en el estado un array vacio, y pone la cantidad y total en 0
    const vaciarCarrito = () => {
        setCarrito([]);
        setCantidadTotal(0);
        setTotal(0);
    }

    
    return (
       //uso carritoContext.Provider para envolver a los componentes hijos y proporcionarles
       //el acceso al estado y las funciones del carrito de compras
       <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito, total, cantidadTotal }}>
            {children}

        </CarritoContext.Provider>
    )
}
