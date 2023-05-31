const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:mode', async (req, res) => {
    try {
      const mode = req.params.mode;
      const baseUrl = 'https://api.mapbox.com/directions/v5/mapbox/';
      const params = 'cycling';
      const coordinates = '-84.518641,39.134270;-84.512023,39.102779?geometries=';
      const geometries = 'geojson';
      const accessToken = 'pk.eyJ1Ijoib21heW9zIiwiYSI6ImNsZWZ1OWduMTAwZzkzeXBwM3JuOGt3NHYifQ.S-lEPoSClHUW39vDNBaQgA';
      const response = await fetch(baseUrl + mode + '/' + coordinates + geometries + '&access_token=' + accessToken);
      if (response.status === 200) {
        const data = await response.json();
        res.json(data);
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });

  module.exports = router;
