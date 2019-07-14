import { useState } from 'react';

const useForm = (initialState, callback) => {

  const [values, setValues] = useState(initialState);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
      callback();
  };

  const handleChange = (event, data) => {
    // event.persist();
    setValues(values => ({ ...values, [data.name]: data.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  }
};

export default useForm;