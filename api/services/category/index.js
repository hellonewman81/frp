import request from 'request-promise';
import hooks from './hooks';

// A request instance that talks to the API
const makeRequest = request.defaults({
  baseUrl: 'https://category.sparesbox.com.au/api/v1/category/getCategory',
  method: 'GET'
});

const todoService = {
  find(params) {
    return makeRequest({
      uri: '/?url_path=brakes',
      headers: params.headers
    });
  }
  /*
  get(id, params) {
    console.log('AA 2');
    return makeRequest(`/${id}`);
  },
  create(data, params) {
    return makeRequest({
      uri: '/',
      method: 'POST',
      body: data
    });
  }
  */
};

export default function categoryService() {
  const app = this;
  app.use('/category', todoService);
  app.service('category').hooks(hooks);
}
