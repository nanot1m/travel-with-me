import React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
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

type AddTripPointScreenProps = RouteComponentProps<{
  tripId: string;
}>;

interface AddTripPointFormValues {
  name: string;
}

const initialValues: AddTripPointFormValues = {
  name: ""
};

function validate(fields: AddTripPointFormValues) {
  const errors: Partial<AddTripPointFormValues> = {};

  if (fields.name.trim() === "") {
    errors.name = "Trip Point name is required";
  }

  return errors;
}

const AddTripPointScreenBase = function(props: AddTripPointScreenProps) {
  const { tripId } = props.match.params;
  return (
    <StoreConsumer>
      {store => {
        const trip = store.trips.get(tripId);
        function handleSubmit(
          values: AddTripPointFormValues,
          actions: FormikActions<AddTripPointFormValues>
        ) {
          if (!trip) return;
          trip.addPoint(uuid.v4(), values.name);
          actions.resetForm();
        }

        if (!trip)
          return (
            <div>
              <div>
                <NavLink to="/">Main Page</NavLink>
              </div>
              <h1>we don't know about this trip yet</h1>
            </div>
          );

        return (
          <div>
            <div>
              <NavLink to={`/trip/${trip.id}`}>Back to trip</NavLink>
            </div>
            <h1>Add Trip Point</h1>
            <Formik<AddTripPointFormValues>
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              <Form>
                <div>
                  <Field
                    name="name"
                    render={({ field }: FieldProps<AddTripPointFormValues>) => (
                      <input
                        type="text"
                        {...field}
                        placeholder="Trip Point Name"
                      />
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
};
const AddTripPointScreen = withRouter(AddTripPointScreenBase);
export { AddTripPointScreen };
