import qs from 'qs';
import request from 'request-promise';

const urlToSearchState = query => qs.parse(query.slice(1));

const getCategory = async location => {
  /*
  const options = {
    method: 'POST',
    uri: 'https://category.sparesbox.com.au/oauth/token',
    body: {
      grant_type: 'client_credentials',
      client_id: '2',
      client_secret: 'qwwOPqldvg27DnTjYehDzM5mpeM3sTELEXWbnKmB'
    },
    json: true // Automatically stringifies the body to JSON
  };
  */

  // const accessToken = await request(options).then(data => data.access_token);

  // @TODO store the access token.
  // A request instance that talks to mint API
  const makeRequest = request.defaults({
    baseUrl: 'https://category.sparesbox.com.au/service/v1/category/getCategory',
    method: 'GET',
    json: true // Automatically stringifies the body to JSON
  });

  // Set the authorized request header
  // const reqHeaders = { Authorization: `Bearer ${accessToken}` };

  // get the current category path to send to mint
  const catPath =
    typeof location.pathname === 'string'
      ? location.pathname.replace(new RegExp(/^\/parts/), '').replace(new RegExp(/^\/brands/), '')
      : '';

  // Get category data from min category service
  const mintData = await makeRequest({
    uri: '/',
    // headers: reqHeaders,
    qs: {
      api_token: 'AezUyw4DMRGplwkBjgeV5yGoDg1wTYt7',
      url_path: catPath.substring(1).replace(/^\/|\/$/g, '')
    }
  });

  // get the category object.
  const catObj = mintData.data;

  const categoryData = {
    ...catObj,
    algoliaQuery: urlToSearchState(location.search),
    urlLocation: location,
    baseUrl: 'http://www.footrightpodiatry.com.au/parts/'
  };

  return categoryData;
};

// Export it to make it available outside
module.exports.getCategory = getCategory;

export default function loadInfo(req) {
  return getCategory(req.body);
}
