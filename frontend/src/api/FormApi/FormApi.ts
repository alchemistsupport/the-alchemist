import { airshipQuery } from '../airshipQuery';
import { formQuery } from '../baseQuery';
import axios from 'axios'


type FormParams = {
  name?: string;
  email?: string;
  to?: string;
  phone?: string;
  subject?: string;
  vacancy?: string;
  cv?: File | null;
  message?: string;
  first_name?: string;
  last_name?: string;
  dob?: string;
  text?: string;
  from?: string;
  allow_opt_ins?: boolean;
  title?: string;
  contactEmail?: string;
};

const emailUrl = '/api/custom';
const contactUrl = '/api/customApi';
const airshipUrl = '/v1/public/contact';

const sendVacancy = async ({ vacancy, message, email }: FormParams) => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${emailUrl}`, {
    to: 'jobs@thealchemist.de',
    from: 'noreply@thealchemist.de',
    subject: 'subject',
    text: `Thanks for Signing Up! You applied for the ${vacancy} position. Message: ${message}. Email: ${email}`,
  });
};



const sendContacts = async ({
  message,
  name,
  subject,
  email,
  phone,
  title,
  contactEmail
}: FormParams) => {

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${contactUrl}`, {
    to: contactEmail,
    from: 'noreply@thealchemist.de',
    subject: 'subject',
    text: title ? `Contacts: ${name}, email: ${email}, subject: ${subject}, message: ${message}, phone: ${phone}, campaign: ${title}`
      : `Contacts: ${name}, email: ${email}, subject: ${subject}, message: ${message}, phone: ${phone}`,
  });
  console.log(res)

};

//..

const sendUser = async ({
  email,
  first_name,
  last_name,
  dob,
  allow_opt_ins,
}: FormParams) => {
  await airshipQuery.post(airshipUrl, {
    form_id: 1260,
    units: [
      {
        id: 17228,
        groups: [
          {
            id: 177764,
          },
        ],
      },
    ],
    first_name,
    allow_opt_ins: true,
    last_name,
    email,
    dob,
    udfs: [],
  });
};

export const FormApi = {
  sendVacancy,
  sendContacts,
  sendUser,
};
