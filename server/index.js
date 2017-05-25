import 'ignore-styles';
import babelRegister from 'babel-register';

babelRegister({ ignore: /\/(build|node_modules)\//, presets: ['react-app'] });

import express from 'express';
import path from 'path';

import {universalRenderer} from './middlewares';

const app = express();

app.use('^/$', universalRenderer);
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/', universalRenderer);

app.listen(3001, () => {
	console.log(`App listening on port 3001!`)
});