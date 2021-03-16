import express from 'express';

import { getRepository } from 'typeorm';
import Orphanages from './models/Orphanage';

import './database/connection';


const app = express();

app.use(express.json());

 app.post('/orphanages', async (req, res) => {
    const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanages);

    const orphanages = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
    })

    await orphanagesRepository.save(orphanages);

    return res.json({ msg: 'HI' })
})



app.listen(3333);

