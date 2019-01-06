import React from "react";
import { observer } from "mobx-react";
import { withStore, WithStoreProps } from "../StoreProvider";
import { Formik, Form, Field, FieldProps } from "formik";
import { NavLink, Redirect } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: ""
};

export const LoginScreen = withStore(({ store }) => {
  function handleSubmit(values: LoginFormValues) {
    return store.user.signInByEmailAndPassword(values.email, values.password);
  }

  function handleGoogleSignIn() {
    return store.user.signInByGoogle();
  }

  if (store.user.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Formik<LoginFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <Field
            name="email"
            render={({ field, form }: FieldProps<LoginFormValues>) => (
              <input
                type="email"
                {...field}
                disabled={form.isSubmitting}
                placeholder="Email"
              />
            )}
          />
        </div>
        <div>
          <Field
            name="password"
            render={({ field, form }: FieldProps<LoginFormValues>) => (
              <input
                type="password"
                {...field}
                disabled={form.isSubmitting}
                placeholder="Password"
              />
            )}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <button type="button" onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>
          <NavLink to="/register">Register</NavLink>
        </div>
      </Form>
    </Formik>
  );
});
