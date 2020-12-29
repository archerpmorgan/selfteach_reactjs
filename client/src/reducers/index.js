import { combineReducers } from 'redux';

import images from './images';
import bookdata from './bookdata';
import tablesectiondata from "./tablesectiondata";
import sectioncheckedrows from "./sectioncheckedrows";

export const reducers = combineReducers({ images: images, bookdata: bookdata, tablesectiondata: tablesectiondata, sectioncheckedrows: sectioncheckedrows});
