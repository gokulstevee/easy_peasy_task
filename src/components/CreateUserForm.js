import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';

const CreateUserForm = () => {
  // const add = useStoreActions((actions) => actions.addUser);
  const postUser = useStoreActions((actions) => actions.postUser);

  const navigate = useNavigate();

  //Validation Schema
  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    age: Yup.string().max(2, 'in-valid age').required('Required'),
    phNumber: Yup.string()
      .max(10, 'in-valid phone number')
      .min(10, 'in-valid phone number')
      .required('Required'),
  });
  return (
    <Formik
      initialValues={{
        name: '',
        age: '',
        phNumber: '',
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log(values);
        try {
          await postUser({
            name: values.name,
            age: values.age,
            phNumber: values.phNumber,
          });
          toast.success('User created');
        } catch (error) {
          toast.error('Something went wrong');
        }

        //redirect to users page
        navigate('/user');
      }}
    >
      {(formik) => (
        <div className="form_center">
          <Form>
            <h1 className="my-4 text-center font-weight-bold ">Create User</h1>
            <TextField label="Name" name="name" type="text" />
            <TextField label="Age" name="age" type="number" />
            <TextField label="Phone Number" name="phNumber" type="number" />
            <button className="btn btn-dark mt-3" type="submit">
              Create
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CreateUserForm;

// import { useStoreActions } from 'easy-peasy';
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function CreateUserForm() {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState();
//   const [phNumber, setPhNumber] = useState();

//   // const add = useStoreActions((actions) => actions.addUser);
//   const postUser = useStoreActions((actions) => actions.postUser);

//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!name || !age || !phNumber) {
//       return toast.warning('Enter all the field');
//     }

//     //creating product with API
//     try {
//       await postUser({
//         name,
//         age,
//         phNumber,
//       });
//       toast.success('User created');
//     } catch (error) {
//       toast.error('Something went wrong');
//     }
//     setName('');
//     setAge('');
//     setPhNumber('');
//     navigate('/user');
//   }

//   return (
//     <Form className="form_center">
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Name</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter Name"
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//           value={name}
//           required
//         />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Age</Form.Label>
//         <Form.Control
//           type="number"
//           placeholder="Enter Age"
//           onChange={(e) => {
//             setAge(e.target.value);
//           }}
//           required
//           value={age}
//         />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Phone Number</Form.Label>
//         <Form.Control
//           type="number"
//           placeholder="Enter Pnone Number"
//           onChange={(e) => {
//             setPhNumber(e.target.value);
//           }}
//           value={phNumber}
//           required
//         />
//       </Form.Group>
//       <Button
//         className="mt-3"
//         variant="primary"
//         type="submit"
//         onClick={handleSubmit}
//       >
//         Create User
//       </Button>
//     </Form>
//   );
// }

// export default CreateUserForm;
