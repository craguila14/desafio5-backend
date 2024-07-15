import express from 'express';
import { 
    getAllJewelleryHateoasController, jewelleryFilterController

} from '../controllers/controller.js';

const router = express.Router()

router.get('/joyas', getAllJewelleryHateoasController)

router.get('/joyas/filtros', jewelleryFilterController)

export default router