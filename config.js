export default {
  clientId: 'ce6f6a5e-9a97-4ed3-9027-536ccfdae0fb',
  redirectUrl: 'io.identityserver.demo:/oauthredirect',
  scopes: [
    'user/Patient.write',
    'user/Patient.read',
    'user/Observation.write',
    'user/Observation.read',
    'user/Practitioner.read',
    'online_access',
    'profile',
  ],
  additionalParameters: {
    aud: 'https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d',
  },
  serviceConfiguration: {
    authorizationEndpoint:
      'https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/personas/provider/authorize',
    tokenEndpoint:
      'https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/token',
  },
};
