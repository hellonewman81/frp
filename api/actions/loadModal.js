import request from 'request-promise';

const getModalContent = async path => {
  // const accessToken = await request(options).then(data => data.access_token);
  // @TODO store the access token.
  // A request instance that talks to mint API
  const makeRequest = request.defaults({
    baseUrl: 'http://www.footrightpodiatry.com.au/jaxxer/guide/',
    method: 'GET',
    json: true // Automatically stringifies the body to JSON
  });

  // Get category data from min category service
  const modalData = await makeRequest({
    uri: '/',
    // headers: reqHeaders,
    qs: {
      path: path.body.id
      // path: 'brake-pads'
    }
  });

  // get the category object.
  const { description } = modalData;

  const guideData = { description };

  return guideData;
};

// Export it to make it available outside
module.exports.getModalContent = getModalContent;

export default function loadModal(req) {
  return getModalContent(req);
}
