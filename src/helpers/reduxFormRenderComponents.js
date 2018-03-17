import React from 'react';
// import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { fieldPropTypes } from 'redux-form';
import inputValid from './reduxFormRenderHelpers';

function FieldSelect({
  input, label, selectOptions, smallText, meta: { touched, error }
}) {
  return (
    <FormGroup>
      <Label for={input.name}>{label}</Label>
      <Input {...input} type="select" valid={inputValid(touched, error)}>
        {selectOptions.map(elem => {
          if (elem.optgroup) {
            return (
              <optgroup key={elem.label} label={elem.label}>
                {elem.options.map(groupOption => (
                  <option key={groupOption.id || groupOption.label} value={groupOption.value}>
                    {groupOption.label}
                  </option>
                ))}
              </optgroup>
            );
          }
          return (
            <option key={elem.id || elem.label} value={elem.value}>
              {elem.label}
            </option>
          );
        })}
      </Input>
      {smallText && <FormText color="muted">{smallText}</FormText>}
      {error && touched && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
}
FieldSelect.propTypes = fieldPropTypes;
// FieldSelect.propTypes.selectOptions = PropTypes.array.isRequired
// FieldSelect.propTypes.smallText = PropTypes.string

// image type validation bug in bootstrap needs form-control class to display correctly
function FieldInput({
  input, label, smallText, type, placeholder, meta: { touched, error }
}) {
  return (
    <FormGroup>
      <Label for={input.name}>{label}</Label>
      <Input
        {...input}
        type={type}
        value={type === 'file' ? undefined : input.value}
        valid={inputValid(touched, error)}
        className="form-control"
        placeholder={placeholder}
      />
      {smallText && <FormText color="muted">{smallText}</FormText>}
      {error && touched && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
}
FieldInput.propTypes = fieldPropTypes;

function FieldCheck({
  input, label, smallText, type, disabled, meta: { touched, error }
}) {
  return (
    <FormGroup check disabled={disabled || undefined}>
      <Label check>
        <Input {...input} type={type} value={input.value} /> {label}
      </Label>
      {smallText && <FormText color="muted">{smallText}</FormText>}
      {error && touched && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
}
FieldCheck.propTypes = fieldPropTypes;

function FieldInputHidden({ input, className }) {
  return <Input type="hidden" className={className} {...input} />;
}
FieldInputHidden.propTypes = fieldPropTypes;

export { FieldSelect, FieldInput, FieldInputHidden, FieldCheck };
