"use strict";

import { Response, Request } from "express";
import Event, { EventDocument } from "../models/Event";
import { validate } from "../services/events";

/**
 * Returns list
 * GET /
 */
export const index = async (req: Request, res: Response) => {
    const events = await Event.find({});
    res.json(events);
};

/**
 * Returns single
 * GET /:id
 */
export const get = async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id);
    res.json(event);
};

/**
 * Adds new
 * POST /
 */
export const add = async (req: Request, res: Response) => {
    const errors = await validate(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json(errors.array());
    }
    
    const event = new Event(req.body as EventDocument);
    await event.save();
    res.json(event);
};

/**
 * Updates existing
 * PUT /:id
 */
export const upd = async (req: Request, res: Response) => {
    const errors = await validate(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json(errors.array());
    }
    const event = await Event.findByIdAndUpdate(
        req.params.id, req.body as EventDocument, { new: true }
    );
    res.json(event);
};

/**
 * Deletes single
 * DELETE /:id
 */
export const del = async (req: Request, res: Response) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({
        deleted: true
    });
};