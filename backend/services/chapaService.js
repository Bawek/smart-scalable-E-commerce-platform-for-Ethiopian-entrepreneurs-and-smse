const https = require('https');

async function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(new Error("Invalid JSON response"));
        }
      });
    });

    req.on('error', reject);

    if (postData) req.write(postData);
    req.end();
  });
}

exports.initializePayment = async (paymentData) => {
  const postData = JSON.stringify(paymentData);

  const options = {
    hostname: 'api.chapa.co',
    path: '/v1/transaction/initialize',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  return makeRequest(options, postData);
};

exports.verifyPayment = async (tx_ref) => {
  const options = {
    hostname: 'api.chapa.co',
    path: `/v1/transaction/verify/${tx_ref}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`,
    },
  };

  return makeRequest(options);
};