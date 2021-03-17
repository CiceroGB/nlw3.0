import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanages from '../models/Orphanage';
import orphanagesView from '../views/orphanages_view';

export default {

    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanages);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });
        return res.json(orphanagesView.renderMany(orphanages));

    },

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const orphanagesRepository = getRepository(Orphanages);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return res.json(orphanagesView.render(orphanage));

    },

    async create(req: Request, res: Response) {
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
        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return {
                path: image.filename,
            }
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                })
            ).required().min(1),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage);

        return res.status(201)
            .json(orphanagesView.render(orphanage));
    }
}