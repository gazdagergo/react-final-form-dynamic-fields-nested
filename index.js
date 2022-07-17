import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <div>
        <Form
          mutators={{
            ...arrayMutators,
          }}
          onSubmit={(newValues) => {
            console.log(newValues);
          }}
          initialValues={{
            shifts: [
              {
                startTime: '09:00',
                workers: [
                  {
                    firstName: '',
                    lastName: '',
                  },
                ],
              },
            ],
          }}
        >
          {(formProps) => (
            <>
              <h1>Shifts</h1>
              <button
                onClick={() =>
                  formProps.form.mutators.push('shifts', {
                    startTime: '08:00',
                    endTime: '16:00',
                  })
                }
              >
                Add shift
              </button>
              <FieldArray name="shifts">
                {(fieldArrayProps) =>
                  fieldArrayProps.fields.map((name, index) => (
                    <div
                      key={name}
                      style={{
                        border: '1px solid gray',
                        padding: 5,
                        margin: 5,
                      }}
                    >
                      <h3>Shift {index + 1}</h3>
                      <Field name={`${name}.startTime`} component="input" />
                      <Field name={`${name}.endTime`} component="input" />
                      <button
                        onClick={() => fieldArrayProps.fields.remove(index)}
                      >
                        &times;
                      </button>
                      <div>
                        <h5>Workers</h5>
                        <button
                          onClick={() =>
                            formProps.form.mutators.push(
                              `shifts.${index}.workers`,
                              {
                                firstName: '',
                                lastName: '',
                              }
                            )
                          }
                        >
                          Add worker
                        </button>
                        <FieldArray name={`shifts.${index}.workers`}>
                          {({ fields }) =>
                            fields.map((name, index) => (
                              <div key={name}>
                                <Field
                                  name={`${name}.firstName`}
                                  component="input"
                                  validate={(value) =>
                                    value ? undefined : 'Required!'
                                  }
                                />
                                <Field
                                  name={`${name}.lastName`}
                                  component="input"
                                />
                                <button onClick={() => fields.remove(index)}>
                                  &times;
                                </button>
                              </div>
                            ))
                          }
                        </FieldArray>
                      </div>
                    </div>
                  ))
                }
              </FieldArray>
              <pre>{JSON.stringify(formProps, null, 2)}</pre>
            </>
          )}
        </Form>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
