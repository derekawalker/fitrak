import React from "react";
import { Form, Label, Input } from "semantic-ui-react";

const TextInput = ({
  input,
  width,
  type,
  step,
  placeholder,
  prefix,
  suffix,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <Input labelPosition="left">
        {prefix && <Label basic>{prefix}</Label>}
        <input {...input} placeholder={placeholder} type={type} step={step} />
      </Input>
      {touched &&
        error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
    </Form.Field>
  );
};

export default TextInput;
