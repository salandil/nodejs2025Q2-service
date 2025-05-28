import * as request from 'supertest';
import 'dotenv/config';
import { PORT } from '../../src/helper';

const port = process.env.PORT || PORT;

const host = `localhost:${port}`;
const _request = request(host);

export default _request;
