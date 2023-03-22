import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [phNumber, setPhNumber] = useState();

  const users = useStoreState((state) => state.users);
  const putUser = useStoreActions((actions) => actions.putUser);

  const navigate = useNavigate();

  function getUserById(id) {
    return users.find((user) => user.id == id);
  }

  useEffect(() => {
    let user = getUserById(id);
    setName(user.name);
    setPhNumber(user.phNumber);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !phNumber) {
      return toast.warning('Enter all the field');
    }

    try {
      await putUser({ id, name, phNumber });
      toast.success('Updated');
    } catch (error) {
      toast.error('Something went wrong');
    }

    setName('');
    setPhNumber('');
    navigate('/user');
  }

  return (
    <Form className="form_center">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Update Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          value={name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> Update Phone Number</Form.Label>
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
        Update User
      </Button>
    </Form>
  );
}

export default UpdateUser;
