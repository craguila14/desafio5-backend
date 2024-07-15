import HATEOAS from "../helpers/hateoas.js";
import { getAllJewelleryHateoasModel, jewelleryFilterModel, } from "../models/queries.js";

export const getAllJewelleryHateoasController = async (req, res) => {
    try {
        const {order_by, limit, page} = req.query
        const allJewellery = await getAllJewelleryHateoasModel(order_by, limit, page)
        const allJewelleryWithHateoas = await HATEOAS('inventory', allJewellery)
        res.status(200).json({jewellery: allJewelleryWithHateoas})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


export const jewelleryFilterController = async (req, res) => {
    try {
        const {precio_max, precio_min, categoria, metal} = req.query;
        const result = await jewelleryFilterModel({ precio_max, precio_min, categoria, metal });
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};