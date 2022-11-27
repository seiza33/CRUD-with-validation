const express = require('express');
const { sviStudenti, kreiranjeStudenta, samoJedanStudent, brisanjeStudenta, azuriranjeStudenta } = require('../controlers/studenti.js');

const router = express.Router();


router.get('/', sviStudenti);

router.post('/',kreiranjeStudenta);

router.get('/:id',samoJedanStudent);

router.delete('/:id',brisanjeStudenta);


router.patch('/:id',azuriranjeStudenta);
















module.exports = router;