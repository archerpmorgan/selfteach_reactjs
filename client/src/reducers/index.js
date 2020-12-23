import { combineReducers } from 'redux';

import images from './images';
import bookdata from './bookdata';

export const reducers = combineReducers({ images: images, bookdata: bookdata });
