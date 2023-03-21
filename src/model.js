import { action, thunk } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';

let model = {
  userLoad: true,
  setUserLoad: action((state, flag) => {
    state.userLoad = flag;
  }),

  productLoad: true,
  setProductLoad: action((state, flag) => {
    state.productLoad = flag;
  }),

  /************ User Actions************/
  users: [],

  //set users
  setUsers: action((state, users) => {
    state.users = [];
    state.users = users;
  }),

  //get user with API
  getUser: thunk(async (actions, payload) => {
    let response = await fetch(
      'https://64189a7175be53f451e36fbd.mockapi.io/user',
      {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }
    );

    const data = await response.json();
    actions.setUsers(data);
  }),

  //post user with API
  postUser: thunk(async (actions, payload) => {
    await fetch('https://64189a7175be53f451e36fbd.mockapi.io/api/v1/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    actions.getUser();
  }),

  //update user with API
  putUser: thunk(async (actions, { id, name, phNumber }) => {
    await fetch(
      `https://64189a7175be53f451e36fbd.mockapi.io/api/v1/user/${id}`,
      {
        method: 'PUT', // or PATCH
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, phNumber }),
      }
    );
    actions.getUser();
  }),

  //delete user with APi
  deleteUser: thunk(async (actions, id) => {
    await fetch(
      `https://64189a7175be53f451e36fbd.mockapi.io/api/v1/user/${id}`,
      {
        method: 'DELETE',
      }
    );
    actions.getUser();
  }),

  /************ Product Actions************/
  products: [],

  //set users
  setProducts: action((state, products) => {
    state.products = [];
    state.products = products;
  }),

  //get user with API
  getProducts: thunk(async (actions, payload) => {
    let response = await fetch(
      'https://64189a7175be53f451e36fbd.mockapi.io/product',
      {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }
    );

    const data = await response.json();
    actions.setProducts(data);
  }),

  //post user with API
  postProduct: thunk(async (actions, payload) => {
    await fetch('https://64189a7175be53f451e36fbd.mockapi.io/api/v1/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    actions.getProducts();
  }),

  //update user with API
  putProduct: thunk(async (actions, { id, name, description, price }) => {
    await fetch(
      `https://64189a7175be53f451e36fbd.mockapi.io/api/v1/product/${id}`,
      {
        method: 'PUT', // or PATCH
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, description, price }),
      }
    );
    actions.getProducts();
  }),

  //delete user with APi
  deleteProduct: thunk(async (actions, id) => {
    await fetch(
      `https://64189a7175be53f451e36fbd.mockapi.io/api/v1/product/${id}`,
      {
        method: 'DELETE',
      }
    );
    actions.getProducts();
  }),

  /***************** User: State Management***************/

  //adding user
  addUser: action((state, users) => {
    users.map((user) => {
      state.users = [...state.users, user];
    });
  }),

  // deleting the user
  // deleteUser: action((state, id) => {
  //   state.users = state.users.filter((user) => user.id !== id);
  // }),

  //updating user
  updateUser: action((state, newData) => {
    state.users = state.users.map((user) => {
      if (user.id == newData.id) {
        user.name = newData.name;
        user.phNumber = newData.phNumber;
      }
      return user;
    });
  }),

  /************ Product: Sate management************/

  //adding product
  addProduct: action((state, product) => {
    product.id = uuidv4();
    state.products = [...state.products, product];
  }),

  //delete product
  // deleteProduct: action((state, id) => {
  //   state.products = state.products.filter((product) => product.id !== id);
  // }),

  //update product
  updateProduct: action((state, newData) => {
    state.products = state.products.map((product) => {
      console.log(typeof product.id);
      console.log(typeof newData.id);
      if (product.id === Number(newData.id)) {
        product.name = newData.name;
        product.description = newData.description;
        product.price = newData.price;
      }
      return product;
    });
  }),
};

export default model;
