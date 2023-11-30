//  const http = require('http')

// const option = {
//     hostname:'fakestoreapi.com',
//     path: '/product/1',
//     method: 'GET'
// }


// const apiReq = http.request(option , (apiReq) => {
//     apiReq.on("data", (data) => {
//         console.log(data.toString())
//     })
// })

// apiReq.on("error", (error) => {
//     console.log(error)
// // })

// apiReq.end()

const http = require('http');

// Request options
const options = {
  hostname: 'fakestoreapi.com',
  path: '/products/1', // Corrected the path to '/products/1'
  method: 'GET'
};

// Create the request
const req = http.request(options, (res) => {
  let data = '';

  // A chunk of data has been received
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received
  res.on('end', () => {
    console.log(data); // Log the received data to the console
  });
});

// Handle errors
req.on('error', (error) => {
  console.error('Error:', error);
});

// End the request
req.end();
