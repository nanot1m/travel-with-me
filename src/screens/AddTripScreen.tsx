import React from "react";
import { NavLink } from "react-router-dom";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Formik,
  Form,
  FormikActions
} from "formik";
import uuid from "uuid";

import { StoreConsumer } from "../StoreProvider";

interface AddTripFormValues {
  name: string;
}

const initialValues: AddTripFormValues = {
  name: ""
};

function validate(fields: AddTripFormValues) {
  const errors: Partial<AddTripFormValues> = {};

  if (fields.name.trim() === "") {
    errors.name = "Trip name is required";
  }

  return errors;
}

export function AddTripScreen() {
  return (
    <StoreConsumer>
      {store => {
        function handleSubmit(
          values: AddTripFormValues,
          actions: FormikActions<AddTripFormValues>
        ) {
          store.addTrip(uuid.v4(), values.name);
          actions.resetForm();
        }

        return (
          <div>
            <div>
              <NavLink to="/">Back</NavLink>
            </div>
            <h1>Add Trip</h1>
            <Formik<AddTripFormValues>
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              <Form>
                <div>
                  <Field
                    name="name"
                    render={({ field }: FieldProps<AddTripFormValues>) => (
                      <input type="text" {...field} placeholder="Trip Name" />
                    )}
                  />
                  <ErrorMessage name="name" />
                </div>
                <div>
                  <button type="submit">Add</button>
                </div>
              </Form>
            </Formik>
          </div>
        );
      }}
    </StoreConsumer>
  );
}
