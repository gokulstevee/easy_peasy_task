import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';

const CreateProductForm = () => {
  // const add = useStoreActions((actions) => actions.addUser);
  const postProduct = useStoreActions((actions) => actions.postProduct);

  const navigate = useNavigate();

  //Validation Schema
  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    description: Yup.string()
      .max(30, 'provide within 30 characters')
      .required('Required'),
    price: Yup.string()
      .max(4, 'price should be below 9999$')
      .required('Required'),
  });
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        price: '',
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log(values);
        try {
          await postProduct({
            name: values.name,
            description: values.description,
            price: values.price,
          });
          toast.success('Product created');
        } catch (error) {
          toast.error('Something went wrong');
        }

        //redirect to products page
        navigate('/product');
      }}
    >
      {(formik) => (
        <div className="form_center">
          <Form>
            <h1 className="my-4 text-center font-weight-bold ">
              Create Product
            </h1>
            <TextField label="Name" name="name" type="text" />
            <TextField label="Description" name="description" type="text" />
            <TextField label="Price" name="price" type="number" />
            <button className="btn btn-dark mt-3" type="submit">
              Create
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CreateProductForm;

// import { useStoreActions } from 'easy-peasy';
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function CreateProductForm() {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState();
//   const [price, setPrice] = useState();

//   // const add = useStoreActions((actions) => actions.addProduct);
//   const postProduct = useStoreActions((actions) => actions.postProduct);

//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!name || !description || !price) {
//       return toast.warning('Enter all the field');
//     }

//     //creating user with API
//     try {
//       await postProduct({
//         name,
//         description,
//         price,
//       });
//       toast.success('Product created');
//     } catch (error) {
//       toast.error('Something went wrong');
//     }

//     setName('');
//     setDescription('');
//     setPrice('');
//     navigate('/product');
//   }

//   return (
//     <Form className="form_center">
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Product Name</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter Product Name"
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//           value={name}
//           required
//         />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Product Description</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter Product Description"
//           onChange={(e) => {
//             setDescription(e.target.value);
//           }}
//           value={description}
//           required
//         />
//       </Form.Group>{' '}
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Product Price</Form.Label>
//         <Form.Control
//           type="number"
//           placeholder="Enter Product Price"
//           onChange={(e) => {
//             setPrice(e.target.value);
//           }}
//           required
//           value={price}
//         />
//       </Form.Group>
//       <Button
//         className="mt-3"
//         variant="primary"
//         type="submit"
//         onClick={handleSubmit}
//       >
//         Create Product
//       </Button>
//     </Form>
//   );
// }

// export default CreateProductForm;
