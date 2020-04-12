"use strict";

import { Response, Request, NextFunction } from "express";

/**
 * Returns list
 * GET /
 */
export const index = (req: Request, res: Response) => {
    res.json({
        success: true
    });
};

/**
 * Returns single
 * GET /:id
 */
export const get = (req: Request, res: Response) => {
    res.json({
        success: true
    });
};

/**
 * Adds new
 * POST /add
 */
export const add = (req: Request, res: Response) => {
    res.json({
        success: true
    });
};

/**
 * Updates existing
 * PUT /update/:id
 */
export const upd = (req: Request, res: Response) => {
    res.json({
        success: true
    });
};

/**
 * Deletes single
 * DELETE /delete/:id
 */
export const del = (req: Request, res: Response) => {
    res.json({
        success: true
    });
};