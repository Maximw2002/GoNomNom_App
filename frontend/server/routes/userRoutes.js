const express = require('express');
const { db } = require('../../firebase');
const {
  collection, query, doc, getDocs, getDoc, updateDoc, where
} = require('firebase/firestore');

const router = express.Router();
const userReference = collection(db, 'users');

// Utility to transform Firestore query snapshot to plain array
const extractDocs = async (reference) => {
  const snapshot = await getDocs(reference);
  const results = [];
  for (const doc of snapshot.docs) {
    results.push(doc.data());
  }
  return results;
};


// Get all users
router.get('/users/test', async (req, res) => {
  try {
    const q = query(userReference);
    const users = await extractDocs(q);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(400).json({ message: 'Failed to retrieve users.' });
  }
});

// Add favorite
router.post('/users/addFavorite', async (req, res) => {
  const { uid, restaurantID } = req.body;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userDocRef);
    const favorites = snapshot.data()?.favorites || [];
    if (!favorites.includes(restaurantID)) {
      favorites.push(restaurantID);
      await updateDoc(userDocRef, { favorites });
    }
    res.sendStatus(201);
  } catch (err) {
    console.error('Error adding favorite:', err);
    res.status(400).json({ message: 'Failed to add favorite.' });
  }
});

// Delete favorite
router.delete('/users/deleteFavorite', async (req, res) => {
  const { uid, restaurantID } = req.query;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userDocRef);
    const currentFavorites = snapshot.data()?.favorites || [];
    const updatedFavorites = currentFavorites.filter(id => id !== Number(restaurantID));
    await updateDoc(userDocRef, { favorites: updatedFavorites });
    res.sendStatus(200);
  } catch (err) {
    console.error('Error deleting favorite:', err);
    res.status(400).json({ message: 'Failed to delete from favorites' });
  }
});

// Get user's favorites
router.get('/users/getFavorites/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userDocRef);
    const favorites = snapshot.data()?.favorites || [];
    res.json(favorites);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(400).json({ message: 'Could not fetch favorites' });
  }
});

// Add preferences
router.post('/users/addPreferences', async (req, res) => {
  const { uid, cuisine, price } = req.body;
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      cuisinePref: cuisine,
      priceRange: price,
    });
    res.sendStatus(201);
  } catch (err) {
    console.error('Error adding preferences:', err);
    res.status(400).json({ message: 'Failed to add preferences' });
  }
});

// Get single user info
router.get('/users/getSingleUserInfo/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    res.json(userDoc.data());
  } catch (err) {
    console.error('Error retrieving user info:', err);
    res.status(400).json({ message: 'Failed to retrieve user info.' });
  }
});

module.exports = router;