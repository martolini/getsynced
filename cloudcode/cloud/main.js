
const SLACK_CLIENT_ID = '2511924088.13178093524';
const SLACK_CLIENT_SECRET = '6d5cee754b7a7db01ddd679f57a127eb';

Parse.Cloud.define("slackAuth", function(request, response) {
  console.log(request);
  return Parse.Cloud.httpRequest({
    url: 'https://slack.com/api/oauth.access',
    params: {
      client_id: SLACK_CLIENT_ID,
      client_secret: SLACK_CLIENT_SECRET,
      code: request.params.code,
      redirect_uri: request.params.redirectUri
    }
  }).then(function(res) {
    // var Slacker = new Parse.Object.extend('Slacker');
    // var slacker = new Slacker();
    // slacker.set('access_token')
    response.success(res);
  }, function(res) {
    response.error(res);
  });
});
