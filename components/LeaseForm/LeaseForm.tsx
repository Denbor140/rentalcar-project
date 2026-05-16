import css from './LeaseForm.module.css';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';

interface OrderFormValues {
  username: string;
  email: string;
}

const initialValues: OrderFormValues = {
  username: '',
  email: '',
};

const LeaseFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

export default function LeaseForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    actions.resetForm();
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
            name="username"
            id={`${fieldId}-username`}
            placeholder="Name*"
          />
          <ErrorMessage
            name="username"
            component="span"
            className={css.error}
          />
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
          Send
        </button>
      </Form>
    </Formik>
  );
}
