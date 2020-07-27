'use strict'

var pool = require('../database/connection');
var moment = require('moment');

async function getPromotions(req, res) {
    try {
        var query = await pool.query('SELECT * FROM promotions ORDER BY updated_at DESC');
        res.status(200).json(query.rows);
    } catch (error) {
        res.status(400).json({error: error});
    }
};

async function getPromotionById(req, res) {
    var id = parseInt(req.params.id);
    try {
        var query = await pool.query('SELECT * FROM promotions WHERE id = $1', [id]);
        var item = query.rows[0]
        if (item) {
            res.status(200).json({data: item});
        } else {
            res.status(404).json({message: 'La promocion no existe !!'});
        }
    } catch (error) {
        res.status(400).json({error: error});
    }
};

async function createPromotion(req, res) {
    var item = {};
    var params = req.body;
   
    item.title = params.title;
    item.price = params.price;
    item.address = params.address;
    item.latitude = params.latitude;
    item.longitude = params.longitude;
    item.updated_at = moment().format('YYYY-MM-DD');

    try {
        var query = await pool.query('INSERT INTO promotions (title, price, address, latitude, longitude, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            item.title,
            item.price,
            item.address,
            item.latitude,
            item.longitude,
            item.updated_at
        ]);
        // console.log(query.rows[0])
        res.status(200).json({data: query.rows[0]});
    } catch (error) {
        res.status(400).json({error: error});
            
    }
};

async function  updatePromotion(req, res) {
    var id = parseInt(req.params.id);
    var item = {};
    var params = req.body;

    item.title = params.title;
    item.price = params.price;
    item.address = params.address;
    item.latitude = params.latitude;
    item.longitude = params.longitude;
    item.updated_at = moment().format('YYYY-MM-DD');

    try {
        var query = await pool.query('UPDATE promotions SET title = $1, price = $2, address = $3, latitude = $4, longitude = $5, updated_at = $6 WHERE id = $7', [
            item.title,
            item.price,
            item.address,
            item.latitude,
            item.longitude,
            item.updated_at,
            id
        ]);
        console.log(query.rows[0])
        res.status(200).json({message: 'La promocion se actulizo con exito !!'});
    } catch (error) {
        res.status(400).json({error: error});
    }
};

async function deletePromotion(req, res) {
    var id = parseInt(req.params.id);
    await pool.query('DELETE FROM promotions where id = $1', [id]);
    res.status(200).json({message: `La promocion ${id} se elemino con exito !!`});
};

module.exports = {
    getPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    deletePromotion
};