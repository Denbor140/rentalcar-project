'use client';

import css from './LeaseForm.module.css';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookingRequest } from '@/lib/api/api';
import { OrderRequest } from '@/app/types/orderRequest';
import toast from 'react-hot-toast';

interface LeaseFormProps {
  carId: string;
}

interface FormValues {
  name: string;
  email: string;
  comment: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  comment: '',
};

const LeaseFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  comment: Yup.string().max(500, 'Comment is too long'),
});

export default function LeaseForm({ carId }: LeaseFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (order: OrderRequest) => createBookingRequest(carId, order),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Booking your car sent successfully!');
    },
    onError() {
      toast.error('Something went wrong. Try again.');
    },
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const order: OrderRequest = {
      name: values.name,
      email: values.email,
      comment: values.comment,
    };

    mutate(order, {
      onSuccess: () => actions.resetForm(),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LeaseFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <h3 className={css.form_title}>Book your car now</h3>
        <p className={css.form_subtitle}>
          Stay connected! We are always ready to help you.
        </p>

        <div className={css.field_wrapper}>
          <Field
            className={css.form_input_name}
            type="text"
            name="name"
            id={`${fieldId}-username`}
            placeholder="Name*"
          />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>

        <div className={css.field_wrapper}>
          <Field
            className={css.form_input_email}
            type="email"
            name="email"
            id={`${fieldId}-email`}
            placeholder="Email*"
          />
          <ErrorMessage name="email" component="span" className={css.error} />
        </div>

        <Field
          className={css.form_textarea}
          as="textarea"
          name="comment"
          id={`${fieldId}-comment`}
          placeholder="Comment"
        />

        <button type="submit" className={css.form_btn}>
          {isPending ? 'Sending....' : 'Send'}
        </button>
      </Form>
    </Formik>
  );
}
