# Online shop application

This is a minimal online shopping solution with usage of TypeScript, React and Redux. Application uses mock data to get available items. Each item has its options (with settable different variants) and defined quantity.

There are three views:

1. List - displays names and products. User also sees how many of each product are added to cart.
2. Details view - opens when user click on product in List view. User sees more details of product and variants of products. If product is available (available flag) and there are option items in storage (quantity > 0), user can add product to cart. When he does it, short success message appear for 1s.
3. Checkout view - opens when user clicks on the checkout button. In this view user sees how many items of each product and variant has in cart. By clicking plus or minus, he can increase or decrease amount if items (until quantity in storage allows for that). User can remove product by pressing trash icon (also will remove all quantity of product from cart).

## How to run app?

1. Clone repository.

2. Install dependencies:

   > `$ npm i`

3. Run application:

   > `$ npm start`
   > App will be run on port `3000` -> `http://localhost:3000/`.

   > To build prod version:
   > `$ npm build`

   > To run tests:
   > `$ npm test`

## Additional information

1. Data is imported from mocked json file.
2. Store & project structure is created in `ducks` pattern. It means each feature has its own directory inside `src/features` - each of them has its own store and components.
3. Stores are combined in `app` directory.
4. Store structure for `cart` is split into two maps:

- cartItems - to access actual data in Cart. Each key is combination of product id, color, power and storage
- totalQty - to access quantity per product. Each key is product id. This is to access faster quantity of product in List view.

5. Basic tests are done for redux slices/ducks and utils.
6. Project was started with `create-react-app`.

## Screenshots

### List view

![List view](https://github.com/kamilsmolen/online-shopping/blob/master/media/list.png?raw=true)

### Details view

![Details view](https://github.com/kamilsmolen/online-shopping/blob/master/media/details.png?raw=true)

### Checkout view

![Checkout view](https://github.com/kamilsmolen/online-shopping/blob/master/media/checkout.png?raw=true)

### Store

![Store] (https://github.com/kamilsmolen/online-shopping/blob/master/media/store.png?raw=true)

### Tests

![Tests](https://github.com/kamilsmolen/online-shopping/blob/master/media/tests.png?raw=true)
