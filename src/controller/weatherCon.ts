import express, {Request, Response} from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import axios from 'axios'

const prisma = new PrismaClient()

export const getWeather = async(req:Request, res:Response)=>{
    const {city} = req.body

    const apiKey = process.env.WAPI
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    try {
        const getTemp = await axios.get(url);
        const temp = Math.ceil(getTemp.data.main.temp);

        const weather = await prisma.weather.create({
            data:{
                city: city,
                value: `${temp}°C`
            }
        });
        res.json(weather)
        console.log(`${city} temperature added to database successfully.`);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: "Erro in internal server."})
        
    }
}


export const updateWeather = async(req:Request, res:Response)=>{
    const {city, id } = req.body

    const apiKey = process.env.WAPI
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    try {
        const getTemp = await axios.get(url);
        const temp = Math.ceil(getTemp.data.main.temp);

        const weather = await prisma.weather.update({
            where:{id: id},
            data:{
                value: `${temp}°C`
            }
        });
        res.json(weather)
        console.log(`${city} temperature added to database successfully.`);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: "Erro in internal server."})
        
    }
}




export const deleteAll = async(req:Request, res:Response)=>{
    try {
        const del = await prisma.weather.deleteMany({
        
        });
        res.json(del)
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: "Erro in internal server."})
    }
};