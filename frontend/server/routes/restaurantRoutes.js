const express = require('express');
const { db } = require('../../firebase');
const { collection, query, getDocs, where } = require('firebase/firestore');

const router = express.Router();
const restaurantReference = collection(db, 'restaurants');

// Utility to transform Firestore query snapshot to plain array
const extractDocs = async (reference) => {
    const snapshot = await getDocs(reference);
    const results = [];
    for (const doc of snapshot.docs) {
        results.push(doc.data());
    }
    return results;
};

// Get all restaurants
router.get('/all', async (req, res) => {
    try {
        const q = query(restaurantReference);
        const restaurants = await extractDocs(q);
        res.json(restaurants);
    } catch (err) {
        console.error('Error fetching restaurants:', err);
        res.status(400).json({ message: 'Failed to retrieve restaurant data.' });
    }
});

// Get single restaurant by name
router.get('/restaurant', async (req, res) => {
    try {
        const { restaurant } = req.query;
        const q = query(restaurantReference, where("restaurantName", "==", restaurant));
        const result = await extractDocs(q);
        res.json(result);
    } catch (err) {
        console.error('Error fetching single restaurant:', err);
        res.status(400).json({ message: 'Failed to retrieve restaurant.' });
    }
});

module.exports = router;