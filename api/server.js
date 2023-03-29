import Constants from './constants/Constants.js';
import app from './express.js';

app.listen(Constants.PORT, (err) => {
    if (err) console.log(err);
    console.info(`Server started on port ${Constants.PORT}.`);
});
