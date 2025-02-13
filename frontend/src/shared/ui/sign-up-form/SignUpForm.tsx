import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import * as yup from 'yup';

import { ApiMenuMenu } from '../../../../schemas';
import { FormApi } from '../../../api/FormApi/FormApi';
import { Checkbox } from '../checkbox/Checkbox';
import { Button, Input, Text } from '../index';

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  allow_opt_ins: boolean;
};

type SignUpFormProps = {
  type?: 'light' | 'dark';
  data: ApiMenuMenu['attributes']['sign_up'];
};

const validationSchema = yup.object({
  first_name: yup.string().required('Name is required'),
  last_name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required'),
  allow_opt_ins: yup.boolean().oneOf([true], 'Signing up is required'),
});

export const SignUpForm: FC<SignUpFormProps> = ({ type = 'dark', data }) => {
  const [isLoading, setLoading] = useState(false);
  
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    const { email, first_name, last_name, dob, allow_opt_ins } = values;

    const yearOfBirth = dob.slice(-4);
    const monthOfBirth = dob.substring(3, dob.length - 5);
    const dayOfBirth = dob.substring(0, 2)

    const formattedDob = `${yearOfBirth}-${monthOfBirth}-${dayOfBirth}`;
    console.log(formattedDob)

    try {
      const res = await FormApi.sendUser({
        email,
        first_name,
        last_name,
        dob: formattedDob,
        allow_opt_ins,
      });

      
      router.push('/confirmation?type=signup');

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const inputVariant = type === 'light' ? 'primary' : 'dark';
  const checkboxVariant = type === 'light' ? 'primary' : 'dark';
  const textColor = type === 'light' ? 'dark' : 'beige';
  const btnColor = type === 'light' ? 'primary' : 'beige';

  const { handleChange, handleSubmit, values, errors, touched } =
    useFormik<FormValues>({
      initialValues: {
        first_name: '',
        last_name: '',
        email: '',
        dob: '',
        allow_opt_ins: false,
      },
      validationSchema: validationSchema,
      onSubmit,
    });

  return (
    <div className="px-5 py-64 text-center flex flex-col items-center">
      <Slide triggerOnce direction="up">
        <Text as="h2" textColor={textColor} textVariant="stroke-xl">
          {data.title}
        </Text>
      </Slide>

      <Slide triggerOnce direction="up">
        <Text
          as="p"
          textColor={textColor}
          textVariant="base"
          className="py-12 max-w-md"
        >
          {data.description}
        </Text>
      </Slide>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col justify-center items-center gap-5">
          <Input
            id="first_name"
            onChange={handleChange}
            value={values.first_name}
            name="first_name"
            placeholder={data.body}
            variant={inputVariant}
            isError={!!errors.first_name && !!touched.first_name}
            error={errors.first_name}
          />

          <Input
            id="last_name"
            onChange={handleChange}
            value={values.last_name}
            name="last_name"
            placeholder={data.sign_up}
            variant={inputVariant}
            isError={!!errors.last_name && !!touched.last_name}
            error={errors.last_name}
          />

          <Input
            id="email"
            onChange={handleChange}
            value={values.email}
            name="email"
            placeholder={data.email}
            variant={inputVariant}
            isError={!!errors.email && !!touched.email}
            error={errors.email}
          />

          <Input
            id="dob"
            onChange={handleChange}
            value={values.dob}
            name="dob"
            placeholder={data.birthday}
            variant={inputVariant}
            type="mask"
            isError={!!errors.dob && !!touched.dob}
            error={errors.dob}
          />

          <Checkbox
            className="accent-black h-5 w-5 "
            name="allow_opt_ins"
            label={data.label}
            variant={checkboxVariant}
            value={values.allow_opt_ins}
            checked={values.allow_opt_ins}
            onChange={handleChange}
            error={errors.allow_opt_ins}
            isError={!!errors.allow_opt_ins && !!touched.allow_opt_ins}
          />

          {/* {!!errors.allow_opt_ins && !!touched.allow_opt_ins && (
            <div className="text-red text-left text-sm font-goodSans">
              {errors.allow_opt_ins}
            </div>
          )} */}

          <Button
            type="submit"
            name={isLoading ? data.loading : data.submit}
            variant={btnColor}
          />
        </div>
      </form>
    </div>
  );
};
