import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateProduct() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const products = useStoreState((state) => state.products);
  const putProduct = useStoreActions((actions) => actions.putProduct);

  const navigate = useNavigate();

  function getProductById(id) {
    return products.find((user) => user.id == id);
  }

  useEffect(() => {
    let product = getProductById(id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price) {
      return toast.warning('Enter all the field');
    }

    try {
      await putProduct({ id, name, description, price });
      toast.success('Updated');
    } catch (error) {
      toast.error('Something went wrong');
    }

    setName('');
    setDescription('');
    setPrice('');
    navigate('/product');
  }
  return (
    <Form className="form_center">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Update Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name..."
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Update Product Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Update Product Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Price..."
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
          required
        />
      </Form.Group>
      <Button
        className="mt-3"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Update Product
      </Button>
    </Form>
  );
}

export default UpdateProduct;
