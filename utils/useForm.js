import {useState} from 'react';

const useForm = (initialState, callback) => {

  const [values, setValues] = useState(initialState);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
      callback();
  };

  const handleChange = (name, value) => {
    setValues(values => ({ ...values, [name]: value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  }
};

export default useForm;
