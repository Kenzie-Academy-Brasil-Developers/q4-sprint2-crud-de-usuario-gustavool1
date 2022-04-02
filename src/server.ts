import "reflect-metadata";
import app from "./app";
import { createConnection } from 'typeorm';
import dbOptions from "./database/typeormconfig";


createConnection(dbOptions).then(() => {

    app.listen(3000, () => console.log('runing on 3000'))    

}).catch(error => console.log(error));
