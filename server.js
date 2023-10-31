const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generare-doc', (req, res) => {
    const nume = req.body.nume;

    // Încarcă șablonul pentru document Word
    const templatePath = path.join(__dirname, 'Invitatie.docx');
    const content = fs.readFileSync(templatePath, 'binary');

    const zip = new JSZip(content);
    const doc = new Docxtemplater();
    doc.loadZip(zip);

    // Înlocuiește marcatorul "name" cu numele introdus de utilizator
    doc.setData({
        name: nume
    });

    try {
        doc.render();
        const generatedDoc = doc.getZip().generate({ type: 'nodebuffer' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=Invitatie.docx');
        res.send(generatedDoc);
    } catch (error) {
        res.status(500).send('Eroare la generarea documentului.');
    }
});

app.listen(3000, () => {
    console.log('Serverul rulează pe portul 3000. Accesează http://localhost:3000 în browser.');
});
