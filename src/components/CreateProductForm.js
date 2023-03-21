import { useStoreActions } from 'easy-peasy';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  // const add = useStoreActions((actions) => actions.addProduct);
  const postProduct = useStoreActions((actions) => actions.postProduct);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price) {
      return toast.warning('Enter all the field');
    }

    //creating user with API
    try {
      await postProduct({
        name,
        description,
        price,
      });
      toast.success('Product created');
    } catch (error) {
      toast.error('Something went wrong');
    }

    setName('');
    setDescription('');
    setPrice('');
    navigate('/product');
  }

  return (
    <Form classNameName="container">
      <Form.Group classNameName="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Product Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />
      </Form.Group>
      <Form.Group classNameName="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Product Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          required
        />
      </Form.Group>{' '}
      <Form.Group classNameName="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Product Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          required
          value={price}
        />
      </Form.Group>
      <Button
        className="mt-3"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Create Product
      </Button>
    </Form>
  );
}

export default CreateProductForm;
