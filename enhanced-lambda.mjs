import https from 'https';
import querystring from 'querystring';

const {
  SF_CLIENT_ID,
  SF_CLIENT_SECRET,
  SF_REFRESH_TOKEN,
  SF_INSTANCE_URL
} = process.env;

export const handler = async (event) => {
  console.log("Incoming event:", JSON.stringify(event, null, 2));

  const body = event.body ? JSON.parse(event.body) : event.detail || {};

  try {
    const accessToken = await getAccessToken();

    const response = await forwardToSalesforceApi(accessToken, body);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully forwarded to Salesforce",
        salesforceResponse: response
      })
    };

  } catch (err) {
    console.error("Error forwarding to Salesforce:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed", error: err.message })
    };
  }
};

async function getAccessToken() {
  const postData = querystring.stringify({
    grant_type: 'refresh_token',
    client_id: SF_CLIENT_ID,
    client_secret: SF_CLIENT_SECRET,
    refresh_token: SF_REFRESH_TOKEN
  });

  const options = {
    hostname: 'login.salesforce.com',
    path: '/services/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const result = JSON.parse(data);
        if (result.access_token) resolve(result.access_token);
        else reject(new Error('Failed to get access token: ' + data));
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function forwardToSalesforceApi(accessToken, payload) {
  const path = `/services/apexrest/LoanApplicationHandler/`;

  const options = {
    hostname: SF_INSTANCE_URL.replace(/^https?:\/\//, ''),
    path,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(payload))
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Salesforce Error (${res.statusCode}): ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(payload));
    req.end();
  });
}
