import express, {Router} from 'express'
import { deleteAll, getWeather, updateWeather } from '../controller/weatherCon'

const router = express.Router()

router.post('/addCity',getWeather )
router.delete(`/delete`, deleteAll)
router.put(`/update`, updateWeather)









export default router