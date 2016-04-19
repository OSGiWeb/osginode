/**
 * Created by pc on 2016/4/18.
 */
import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from '../constants';

polyfill();

export function togglePrivateRepositoryMode() {
  return { type: types.TOGGLE_PRIVATE_REPOSITORY_MODE };
}