const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

let studenti = [];

// GET ALL 
const sviStudenti =  (req, res) => {
    res.send(studenti);
}

// POST
const kreiranjeStudenta = (req, res) => {

    const schema = Joi.object({
        ime: Joi.string().alphanum().min(3).max(15).required(),
        prezime: Joi.string().alphanum().min(3).max(15).required(),
        godiste: Joi.number().integer().min(1900).max(2022).required(),
        ocena: Joi.number().integer().min(5).max(10).required()
    });

   const result = Joi.validate(req.body, schema);
   if (result.error){
    res.status(400).send(result.error.details[0].message);
    return;
   }
   
   const noviStudent = req.body;
    studenti.push({...noviStudent, id: uuidv4()}); 
    res.status(200).send('Dodat je novi student');
}

// GET BY ID
const samoJedanStudent =  (req, res) =>{
    const { id } = req.params;
   
    const jedanStudent = studenti.find((noviStudent) => noviStudent.id === id);
    
    if(!jedanStudent)
        return res.status(404).send('Ne postoji student sa ovim ID-jem')
    

    res.send(jedanStudent);
}



//PATCH
const azuriranjeStudenta =  (req, res) =>{
    const schema = Joi.object({
        ime: Joi.string().alphanum().min(3).max(15).required(),
        prezime: Joi.string().alphanum().min(3).max(15).required(),
        godiste: Joi.number().integer().min(1900).max(2022).required(),
        ocena: Joi.number().integer().min(5).max(10).required()
    });

   const result = Joi.validate(req.body, schema);
   if (result.error){
    res.status(400).send(result.error.details[0].message);
    return;
   }

   const { id } = req.params;

   const { ime, prezime, godiste, ocena } = req.body;

   const noviStudent = studenti.find((noviStudent) => noviStudent.id === id);

   if(ime) noviStudent.ime = ime;
   if(prezime) noviStudent.prezime = prezime;
   if(godiste) noviStudent.godiste = godiste;
   if(ocena) noviStudent.ocena= ocena;

   res.send('Student je azuriran')


}

// DELETE
const brisanjeStudenta =  (req, res) => {
    const { id } = req.params;
    
    studenti = studenti.filter((noviStudent) => noviStudent.id != id);
    
    res.send(`Korisnik ciji je ID ${id} je obrisan! `)

}

module.exports = {
    sviStudenti,
    kreiranjeStudenta,
    samoJedanStudent,
    azuriranjeStudenta,
    brisanjeStudenta
};