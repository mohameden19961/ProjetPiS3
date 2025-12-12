const app = require('./src/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur d'examen démarré sur http://localhost:${PORT}`);
    console.log(`Accessible aux étudiants sur l'IP locale du professeur.`);
});