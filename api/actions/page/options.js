import request from 'request-promise';

const labels = {
  model: 'Model',
  year: 'Year',
  series: 'Series',
  body: 'Body',
  engine: 'Engine'
};

const vehicleOptions = async postBody => {
  const makeRequest = request.defaults({
    baseUrl: 'http://www.footrightpodiatry.com.au/service/filters/page',
    method: 'GET',
    json: true
  });

  const { step } = postBody;
  const queryParams = postBody.params || {};
  // queryParams.api_token = 'AezUyw4DMRGplwkBjgeV5yGoDg1wTYt7'

  const vehicleData = await makeRequest({
    uri: '/',
    qs: queryParams
  });

  let data;

  // parse shitty old responses
  if (step === 'make') {
    data = [
      {
        label: 'Vehicle Make',
        value: ''
      },
      {
        optgroup: true,
        label: 'Popular Vehicles',
        options: []
      },
      {
        optgroup: true,
        label: 'Vehicles',
        options: []
      }
    ];

    let processedPopular = false;

    vehicleData.options_html.forEach(elem => {
      if (!elem.value) {
        processedPopular = true;
      } else {
        const idx = processedPopular ? 2 : 1;
        const copy = { ...elem, id: `${String(idx) + elem.label}` };
        data[idx].options.push(copy);
      }
    });
  } else if (step === 'vid') {
    data = vehicleData.v_id.join(',');
  } else {
    data = [...vehicleData.options_html];
    data.unshift({
      label: `Vehicle ${labels[step]}`,
      value: ''
    });
  }

  return {
    step,
    data
  };
};

// Export it to make it available outside
module.exports.vehicleOptions = vehicleOptions;

export default function options(req) {
  return vehicleOptions(req.body);
}
