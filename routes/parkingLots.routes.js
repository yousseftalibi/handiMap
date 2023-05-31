const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  try {
    const url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=stationnement-en-ouvrage&q=&rows=1000&refine.gratuit=0&refine.tarif_pmr=tarif_special";
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      res.json(data);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;