import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { toast } from 'react-toastify';

const User = () => {
  const users = useStoreState((state) => state.users);

  const userLoad = useStoreState((state) => state.userLoad);
  const setUserLoad = useStoreActions((actions) => actions.setUserLoad);

  const deleteUser = useStoreActions((actions) => actions.deleteUser);
  const getUser = useStoreActions((actions) => actions.getUser);

  useEffect(() => {
    if (userLoad) {
      getUser();
      setUserLoad(false);
    }
  }, []);

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Click below to add User</h1>

      <Link
        className="btn btn-primary"
        type="button"
        style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}
        to={'/user/create'}
      >
        Create User
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
                  <th>Age</th>
                  <th>Phone No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.phNumber}</td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        type="button"
                        style={{ marginRight: '1rem' }}
                        to={`/user/update/${user.id}`}
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={async () => {
                          try {
                            await deleteUser(user.id);
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

export default User;
