const qs = require('qs');

function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:1337'}${path}`;
}

async function fetchAPI(
  path,
  urlParamsObject = {},
  options = {},
) {
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`,
  )}`;


  const response = await fetch(requestUrl, mergedOptions);
  console.log(requestUrl)


  if (!response.ok) {
    console.error(response.statusText);
    console.log(await response.json())
    throw new Error('An error occurred please try again');
  }

  const data = await response.json();
  return data;
}

module.exports = fetchAPI
