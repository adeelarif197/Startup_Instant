import axios from "axios";
import * as timeago from 'timeago.js';
import {nanoid} from "@reduxjs/toolkit";
import * as mime from 'react-native-mime-types';
import {API_LINK_PREVIEW} from "./constants";
import _ from 'lodash';

export const getURLPreview = (url) => {
    return axios.get(API_LINK_PREVIEW.replace('%URL', url))
        .then(res => res.data || null)
        .catch(err => null)
}

export const mapOrder = (order, key) => (a, b) => order.indexOf(a[key]) > order.indexOf(b[key]) ? 1 : -1;

export const getShortTimeAgo = (time) => {
    return timeago.format(time + ' UTC', 'my-locale');
}

export const getFileExtention = (uri) => uri.substring(uri.lastIndexOf('.') + 1, uri.length) || uri;

export const getFileFromURI = (uri) => {
    if(!_.isString(uri)) throw new DOMException("File uri must be string.");
    const name = nanoid() + nanoid() + '.' +getFileExtention(uri);
    const type = mime.lookup(name)
    return {name, type, uri}
}