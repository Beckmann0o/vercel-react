import { useState, useContext } from "react"
import { CarritoContext } from '../context/CarritoContext';
import { db } from "../../services/config"
import { collection, addDoc } from "firebase/firestore"

const Checkout = () => {
    const { carrito, vaciarCarrito } = useContext(CarritoContext); //traigo el contexto de carritocontext el carrito
    const [nombre, setNombre] = useState(""); //estado para guardar el nombre del form
    const [apellido, setApellido] = useState(""); //estado para guardar el mail del form
    const [telefono, setTelefono] = useState(""); //estado para guardar telefono del form
    const [email, setEmail] = useState(""); //estado para guardar el email del form
    const [emailConfimarcion, setEmailConfirmacion] = useState(""); //estado para guardar la confirmacion del mail y comparar
    const [error, setError] = useState(""); //estado por si surge un error cuando cargo el doc
    const [ordenId, setOrdenId] = useState(""); //estado para guardar el id que genere firebase para la orden y poder mostrarla
    const [finalizado, setFinalizado] = useState(false);


    //MANEJADOR DE ERRORES DEL FORMULARIO
    const manejadorSubmit = (event) => {
        event.preventDefault();

        //SI ALGUNOS DE ESTOS IMPUT NO SE COMPLETO SETEO EL ERROR
        if (!nombre || !apellido || !telefono || !email || !emailConfimarcion) {
            setError("Por favor complete los campos");
            return;
        }

        //VERIFICAR SI COINCIDEN LOS MAIL INGRESADOS
        if (email !== emailConfimarcion) {
            setError("Los campos del email no coinciden");
            return;
        }
        //LA ORDEN ESTA COMPUESTA POR TODOS LOS DATOS DEL FORM MAS LA INFORMACION DE LA COMPRA, ASIQUE MAPEAMOS EL CARRITO
        const orden = {
            items: carrito.map(producto => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad,
            })),
            total: carrito.reduce((total, producto) => total + producto.item.precio * producto.cantidad, 0),
            nombre,
            apellido,
            telefono,
            email
        };

        //AGREGAMOS LA ORDEN YA CONFECCIONADA A LA BASE DE DATOS
        addDoc(collection(db, "ordenes"), orden)
            .then((docRef) => {
                //SETEO EN EL USESTATE DE ORDER ID LA REFERENCIA DEL DOC
                setOrdenId(docRef.id);
                //VACIAMOS EL CARRITO YA QUE UNA VEZ QUE SE GENERO LA ORDEN, SE TERMINO LA COMPRA ENTONCES HAY QUE VACIAR EL CARRITO
                vaciarCarrito();
                setFinalizado(true);
            })
            .catch((error) => {
                console.log("Error al crear la orden", error);
                setError("Se produjo un error al crear la orden, vuelva más tarde");
            })

    }
    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={manejadorSubmit} className="formulario">

                {/*PRIMERO HAGO UN PEQUEÑO DETALLE DE LA COMPRA*/}
                {carrito.map(producto => (
                    <div key={producto.item.id}>
                        <p> {producto.item.nombre} x {producto.cantidad} </p>
                        <p>Precio: $ {producto.item.precio} </p>
                        <hr />
                    </div>
                ))}
                <hr />
                {/*RENDERIZAMOS EL FORMULARIO*/}
                <div className="form-group">
                    <label htmlFor=""> Nombre </label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Apellido </label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Telefono</label>
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email Confirmación </label>
                    <input type="email" value={emailConfimarcion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
                </div>

                {
                    //SI EXISTE UN ERROR, SE VA A SETEAR EN EL ESTADO, Y LO VOY A RENDERIZAR ABAJO DEL FORMULARIO
                    error && <p style={{ color: "red" }}> {error} </p>
                }

                <button hidden={finalizado} className="miBtn" type="submit"> Finalizar Orden </button>

                {/*SI YA HAY SETEADA UN ID EN EL ESTADO ORDERID ENTONCES RENDERIZO EL CARTEL DEL AGRADECIMIENTO Y NUMERO DE ORDEN*/}
                {
                    ordenId && (
                        <strong className="orderId">¡Gracias por tu compra! Tu número de orden es: {ordenId} </strong>
                    )
                }
            </form>
        </div>
    )
}

export default Checkout