import { FormApi } from '@ab/api';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Slide, Zoom } from 'react-awesome-reveal';
import * as yup from 'yup';

import { ApiContactContact, ApiCampaignCampaign } from '../../../../schemas';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { Text } from '../text/Text';
import { TextArea } from '../textarea/Textarea';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  subject: yup.string().required('Subject is required'),
});

type Props = {
  contact: ApiContactContact;
  campaign?: ApiCampaignCampaign;
};

export const ContactUsForm = ({ contact, campaign }: Props) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const title = campaign ? campaign.title : undefined;

  const contactEmail = campaign ? campaign.campaignEmail : contact.contactEmail;

  const { errors, touched, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      setLoading(true);

      const { email, name, phone, subject, message } = values;

      try {
        await FormApi.sendContacts({
          email,
          name,
          phone,
          subject,
          message,
          title,
          contactEmail,
        });

        setLoading(false);

        router.push('/confirmation?type=contact');
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="text-center mt-6">
        <Slide triggerOnce direction="up">
          <Text as="h1" textVariant="heading" textColor="beige">
            {contact.title}{' '}
          </Text>
        </Slide>

        <Slide triggerOnce direction="up">
          <Text as="p" textVariant="base" textColor="beige" className="mt-4">
            {campaign?.contactFormHeader
              ? campaign.contactFormHeader
              : contact.body}{' '}
          </Text>
        </Slide>
      </div>

      <Zoom triggerOnce>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 w-full sm:w-96 m-auto py-24">
            <Input
              id="name"
              onChange={handleChange}
              value={values.name}
              name="name"
              variant="dark"
              placeholder={contact.name}
              isError={!!errors.name && !!touched.name}
              error={errors.name}
            />

            <Input
              id="email"
              onChange={handleChange}
              value={values.email}
              name="email"
              placeholder={contact.email}
              variant="dark"
              isError={!!errors.email && !!touched.email}
              error={errors.email}
            />

            <Input
              id="phone"
              onChange={handleChange}
              value={values.phone}
              name="phone"
              placeholder={contact.phone}
              variant="dark"
              isError={!!errors.phone && !!touched.phone}
              error={errors.phone}
            />

            <Input
              id="subject"
              onChange={handleChange}
              value={values.subject}
              name="subject"
              placeholder={contact.enquiry}
              variant="dark"
              isError={!!errors.subject && !!touched.subject}
              error={errors.subject}
            />

            <TextArea
              id="message"
              onChange={handleChange}
              value={values.message}
              name="message"
              placeholder={contact.message}
            />

            <Button
              type="submit"
              name={
                isLoading
                  ? contact.loading
                  : contact.submit
              }
              variant="beige"
            />
          </div>
        </form>
      </Zoom>
    </>
  );
};
