const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        throw err;
    }

    console.warn(`server listening on ${port}`);
});
