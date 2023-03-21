import { useStoreActions } from 'easy-peasy';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateUserForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [phNumber, setPhNumber] = useState();

  // const add = useStoreActions((actions) => actions.addUser);
  const postUser = useStoreActions((actions) => actions.postUser);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !age || !phNumber) {
      return toast.warning('Enter all the field');
    }

    //creating product with API
    try {
      await postUser({
        name,
        age,
        phNumber,
      });
      toast.success('User created');
    } catch (error) {
      toast.error('Something went wrong');
    }
    setName('');
    setAge('');
    setPhNumber('');
    navigate('/user');
  }

  return (
    <Form classNameName="container">
      <Form.Group classNameName="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />
      </Form.Group>
      <Form.Group classNameName="mb-3" controlId="formBasicEmail">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
          required
          value={age}
        />
      </Form.Group>
      <Form.Group classNameName="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Pnone Number"
          onChange={(e) => {
            setPhNumber(e.target.value);
          }}
          value={phNumber}
          required
        />
      </Form.Group>
      <Button
        className="mt-3"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Create User
      </Button>
    </Form>
  );
}

export default CreateUserForm;
