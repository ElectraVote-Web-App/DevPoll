const app = require('./app.js');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;


app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
})