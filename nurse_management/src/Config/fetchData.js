import {api} from './api';

const api_name = 'api/';

export default {
  add_data: data => {
    let url = api_name + 'add_data';
    return api.postMethod(url, data);
  },
  list_data: data => {
    let url = api_name + 'list_data';
    return api.getMethod(url, data);
  },
  update_data: data => {
    let url = api_name + 'update_data';
    return api.postMethod(url, data);
  },
  delete_data: data => {
    let url = api_name + 'delete_data';
    return api.postMethod(url, data);
  },
};
