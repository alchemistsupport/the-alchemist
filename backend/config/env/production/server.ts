export default ({ env }) => ({
  proxy: true,
  url: env('https://aqueous-woodland-11995.herokuapp.com/'), // Sets the public URL of the application.
  app: {
    keys: env.array('APP_KEYS')
  },
});
