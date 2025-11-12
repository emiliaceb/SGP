//petisiones o solicitudes
//GET --> devuelve datos
//POST --> crea datos
//PUT o PATH --> actualiza datos
//DELETE --> elimina datos
const URLproveedor = import.meta.env.VITE_API_PROVEEDOR;

//POST
export const crearProveedorAPI = async (nuevoProveedor) => {
  try {
    const respuesta = await fetch(URLproveedor, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProveedor),
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    return false;
  }
};

//GET
export const LeerProveedoresAPI = async () => {
  try {
    const respuesta = await fetch(URLproveedor);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//DELETE
export const borrarProveedorAPI = async (id) => {
  try {
    const respuesta = await fetch(`${URLproveedor}/${id}`, {
      method: "DELETE",
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};
