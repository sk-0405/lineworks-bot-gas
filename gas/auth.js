function getAccessToken() {
  const jwt = createJWT();
  const clientId = getProp('CLIENT_ID');
  const clientSecret = getProp('CLIENT_SECRET');

  const res = UrlFetchApp.fetch('https://auth.worksmobile.com/oauth2/v2.0/token', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    payload: {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'bot'
    }
  });

  return JSON.parse(res.getContentText()).access_token;
}

function createJWT() {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const clientId = getProp('CLIENT_ID');
  const serviceAccount = getProp('SERVICE_ACCOUNT');

  const payload = {
    iss: clientId,
    sub: serviceAccount,
    iat: now,
    exp: now + 60 * 60
  };

  const base64Encode = obj =>
    Utilities.base64EncodeWebSafe(JSON.stringify(obj)).replace(/=+$/, '');
  const signingInput = `${base64Encode(header)}.${base64Encode(payload)}`;

  const rawKey = getProp('BOT_PRIVATE_KEY').replace(/\\n/g, '\n');
  const signatureBytes = Utilities.computeRsaSha256Signature(signingInput, rawKey);
  const encodedSignature = Utilities.base64EncodeWebSafe(signatureBytes).replace(/=+$/, '');

  return `${signingInput}.${encodedSignature}`;
}
