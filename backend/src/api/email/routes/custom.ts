module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/custom',
      handler: 'email.customAction',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/customApi',
      handler: 'email.contactAction',
      config: {
        auth: false,
      },
    }
  ]
}
