/**
 * email controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::email.email', ({strapi}) => ({

  async customAction(ctx) {
    const { to, from, subject, text} = ctx.request.body as {to: string; from: string; subject: string; text: string};

    try {
     const res = await strapi.plugins['email'].service('email').send({
        to,
        from,
        subject,
        text,
        cc: 'alii403304@gmail.com',
      });
      ctx.send({ message: 'Email sent successfully' });
      console.log(res)
    }
      catch(err) {
      ctx.body = err;
      console.log(err)
    }
  }, async contactAction(ctx) {
    const { to, from, subject, text } = ctx.request.body as {to: string; from: string; subject: string; text: string};

    try {
      const res = await strapi.plugins['email'].service('email').send({
        to,
        from,
        subject,
        text,
        cc: 'alii403304@gmail.com',
      });
      ctx.send({ message: 'Email sent successfully' });
      console.log(res)

    }
      catch(err) {
      ctx.body = err;
      console.log(err)

    }
  }
}));
