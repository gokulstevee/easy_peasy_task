import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { toast } from 'react-toastify';

const Product = () => {
  const products = useStoreState((state) => state.products);

  const productLoad = useStoreState((state) => state.productLoad);
  const setProductLoad = useStoreActions((actions) => actions.setProductLoad);

  const deleteProduct = useStoreActions((actions) => actions.deleteProduct);
  const getProducts = useStoreActions((actions) => actions.getProducts);

  useEffect(() => {
    if (productLoad) {
      getProducts();
      setProductLoad(false);
    }
  }, []);

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Click below to add Product</h1>

      <Link
        className="btn btn-primary"
        type="button"
        style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}
        to={'/product/create'}
      >
        Create Product
      </Link>

      {/* <!-- DataTales Example --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Users</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price} $</td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        type="button"
                        s
                        style={{ marginRight: '1rem' }}
                        to={`/product/update/${product.id}`}
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={async () => {
                          try {
                            await deleteProduct(product.id);
                            toast.success('Deleted');
                          } catch (error) {
                            toast.error('Something went wrong');
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
