export default {
  async afterCreate(event) {
      const { result } = event;

      try {
          await strapi.plugins['email'].services.email.send({
            to: 'artemtsevukh@gmail.com',
            from: 'noreply@thealchemist.de',
            subject: 'The Strapi Email plugin worked successfully',
            text: `THIS IS ${result}`,
          })
        } catch(err) {
          console.log(err);
      }
   }
}
