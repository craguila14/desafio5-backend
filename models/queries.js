import { pool } from '../config/db.js';
import format from 'pg-format';

export const getAllJewelleryHateoasModel = async (
    order_by = 'id_DESC',
    limits = 10,
    page = 0
) => {

    try {
        const [attribute, direction] = order_by.split('_')
        const offset = page * limits
        const allJewellery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s offset %s', attribute, direction, limits, offset)
        console.log('query', allJewellery)
        const response = await pool.query(allJewellery)
        return response.rows
    } catch (error) {
        throw new Error(`Error in getAllJewelleryHateoasModel: ${error.message}`);
    }
}


export const jewelleryFilterModel = async ({ precio_max, precio_min, categoria, metal }) => {
    try {
    let filtros = [];
    const values = [];

    const agregarFiltro = (campo, comparador, valor) => {
        values.push(valor);
        const { length } = filtros;
        filtros.push(`${campo} ${comparador} $${length + 1}`);
    };

    if (precio_max) agregarFiltro('precio', '<=', precio_max);
    if (precio_min) agregarFiltro('precio', '>=', precio_min);
    if (categoria) agregarFiltro('categoria', '=', categoria);
    if (metal) agregarFiltro('metal', '=', metal);

    let consulta = 'SELECT * FROM inventario';

    if (filtros.length > 0) {
        consulta += ` WHERE ${filtros.join(" AND ")}`;
    }

    const response = await pool.query(consulta, values);
    return response.rows;
} catch (error) {
    throw new Error(`Error in jewelleryFilterModel: ${error.message}`);
}
};