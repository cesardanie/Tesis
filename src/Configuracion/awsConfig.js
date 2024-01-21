import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'tu-access-key-id',
  secretAccessKey: 'tu-secret-access-key',
  region: 'tu-región',
});

export default AWS;