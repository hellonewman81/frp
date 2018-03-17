import request from 'request-promise';

/*

 Generate Token

 Endpoint : https://category.sparesbox.com.au/oauth/token

 Method: POST

 content-type: application/json


 paylod:

 {
 "grant_type":"client_credentials",
 "client_id": "2",
 "client_secret": "qwwOPqldvg27DnTjYehDzM5mpeM3sTELEXWbnKmB"
 }

 */
const authHook = async hook => {
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

  request(options).then(parsedBody => {
    // POST succeeded...

    console.log(parsedBody);
  });

  hook.params.headers = Object.assign(
    {},
    {
      Authorization: 'Bearer '
    },
    hook.params.headers
  );
};

const categoryHooks = {
  before: {
    all: authHook,
    get: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default categoryHooks;
