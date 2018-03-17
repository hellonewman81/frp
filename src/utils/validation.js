/* eslint-disable  consistent-return */
import entries from 'object.entries';
import includes from 'array-includes';

const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data, params) =>
  rules.map(rule => rule(value, data, params)).filter(error => !!error)[0];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!isEmpty(value) && !Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!enumeration.includes(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

/*
  This utility conditionally requires a field if
  the value set in the conditions is matched in the form value state

  valueConditions should be in the format:
  {
    field_name: {
      test: 'equal' : 'not-equal',
      value: value
    },
    ...
  }
*/
export function requiredConditionally(valueConditions) {
  return (value, data) => {
    let isRequired = true;
    entries(valueConditions).forEach(condition => {
      if (condition[1].test === 'equal') {
        if (data[condition[0]] !== condition[1].value) {
          isRequired = false;
        }
      } else if (data[condition[0]] === condition[1].value) {
        isRequired = false;
      }
    });

    if (isRequired) {
      return required(value);
    }
  };
}

export function weekdays(value) {
  const date = new Date(value);

  if (date.toString() === 'Invalid Date') {
    return 'Not a valid date format';
  }

  const day = date.getDay();
  if (day < 1 || day > 5) {
    return 'Please select a weekday (Monday - Friday)';
  }
}

export function workhours(value) {
  if (typeof value === 'string') {
    // this test is for IE as no time picker is available
    const splitValue = value.split(':');
    if (
      splitValue.length !== 2 ||
      Number.isNaN(splitValue[0]) ||
      Number.isNaN(splitValue[1]) ||
      splitValue[0].length !== 2 ||
      splitValue[1].length !== 2 ||
      Number(splitValue[0]) > 23 ||
      Number(splitValue[1]) > 59
    ) {
      return 'Number is not in the correct format. i.e. 13:30';
    }

    // eslint is to blame for minutes
    let minutes = 0;
    minutes += Number(splitValue[0]);
    minutes *= 60;
    minutes += Number(splitValue[1]);

    if (minutes < 9 * 60 || minutes > 17 * 60) {
      return 'We are available between the hours of 9AM and 5PM';
    }
  }
}

export function image(validMIMEs, validSizeMB) {
  return value => {
    if (value && value.length) {
      const { type, size } = value[0];
      if (!includes(validMIMEs, type)) {
        return 'Valid file types are JPEG / PNG / GIF / BMP';
      }

      if (size > validSizeMB * 1000000) {
        return `File size cannot be more than ${validSizeMB} MB`;
      }
    }
  };
}

export function createValidator(rules, params) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      // concat enables both functions and arrays of functions
      const rule = join([].concat(rules[key]));
      const error = rule(data[key], data, { key, ...params });
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
