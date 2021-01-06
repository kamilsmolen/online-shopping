import reducer, { addToCart, changeIsCartView, removeFromCart, removeItem } from './cartSlice';

describe("test cart slice actions", () => {
  it("should create an action with cart/addToCart type", () => {
    const value = {
      id: 1,
      name: "test",
      price: 1,
      weight: 1,
      quantity: 1,
      power: 1,
      color: "red",
      storage: "1",
      optionId: 1,
    };
    const expectation = {
      type: "cart/addToCart",
      payload: value,
    };

    expect(addToCart(value)).toEqual(expectation);
  });

  it("should create an action with cart/removeFromCart type", () => {
    const value = {
      id: 1,
      name: "test",
      price: 1,
      weight: 1,
      quantity: 1,
      power: 1,
      color: "red",
      storage: "1",
      optionId: 1,
    };
    const expectation = {
      type: "cart/removeFromCart",
      payload: value,
    };

    expect(removeFromCart(value)).toEqual(expectation);
  });

  it("should create an action with cart/removeItem type", () => {
    const value = {
      id: 1,
      name: "test",
      price: 1,
      weight: 1,
      quantity: 1,
      power: 1,
      color: "red",
      storage: "1",
      optionId: 1,
    };
    const expectation = {
      type: "cart/removeItem",
      payload: value,
    };

    expect(removeItem(value)).toEqual(expectation);
  });

  it("should create an action with cart/changeIsCartView type", () => {
    const value = true;
    const expectation = {
      type: "cart/changeIsCartView",
      payload: value,
    };

    expect(changeIsCartView(value)).toEqual(expectation);
  });
});

describe("test cart slice reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      cartItems: {},
      totalQty: {},
      isCartView: false,
    });
  });

  it("should handle cart/changeIsCartView", () => {
    const action = {
      type: "cart/changeIsCartView",
      payload: true,
    };

    const initState = {
      cartItems: {},
      totalQty: {},
      isCartView: false,
    };

    const expectation = {
      cartItems: {},
      totalQty: {},
      isCartView: true,
    };

    expect(reducer(initState, action)).toEqual(expectation);
  });

  it("should handle cart/addToCart", () => {
    const action = {
      type: "cart/addToCart",
      payload: {
        id: 1,
        name: "test",
        price: 1,
        weight: 1,
        quantity: 1,
        power: 1,
        color: "red",
        storage: "storagetest",
        optionId: 1,
      },
    };

    const initState = {
      cartItems: {},
      totalQty: {},
      isCartView: false,
    };

    const expectation = {
      cartItems: {
        "1_red_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 1,
          power: 1,
          color: "red",
          storage: "storagetest",
          optionId: 1,
        },
      },
      totalQty: { "1": 1 },
      isCartView: false,
    };

    expect(reducer(initState, action)).toEqual(expectation);
  });

  it("should handle cart/addToCart when item there", () => {
    const action = {
      type: "cart/addToCart",
      payload: {
        id: 1,
        name: "test",
        price: 1,
        weight: 1,
        quantity: 1,
        power: 1,
        color: "red",
        storage: "storagetest",
        optionId: 1,
      },
    };

    const initState = {
      cartItems: {
        "1_red_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 1,
          power: 1,
          color: "red",
          storage: "storagetest",
          optionId: 1,
        },
        "1_blue_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 2,
          power: 1,
          color: "blue",
          storage: "storagetest",
          optionId: 1,
        },

        "1_blue_storagetest2_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 1,
          power: 1,
          color: "blue",
          storage: "storagetest2",
          optionId: 2,
        },
      },
      totalQty: { "1": 4 },
      isCartView: false,
    };

    const expectation = {
      cartItems: {
        "1_red_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 2,
          power: 1,
          color: "red",
          storage: "storagetest",
          optionId: 1,
        },
        "1_blue_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 2,
          power: 1,
          color: "blue",
          storage: "storagetest",
          optionId: 1,
        },

        "1_blue_storagetest2_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 1,
          power: 1,
          color: "blue",
          storage: "storagetest2",
          optionId: 2,
        },
      },
      totalQty: { "1": 5 },
      isCartView: false,
    };

    expect(reducer(initState, action)).toEqual(expectation);
  });

  it("should handle cart/removeFromCart", () => {
    const action = {
      type: "cart/removeFromCart",
      payload: {
        id: 1,
        name: "test",
        price: 1,
        weight: 1,
        quantity: 1,
        power: 1,
        color: "red",
        storage: "storagetest",
        optionId: 1,
      },
    };

    const initState = {
      cartItems: {
        "1_red_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 1,
          power: 1,
          color: "red",
          storage: "storagetest",
          optionId: 1,
        },
        "1_blue_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 2,
          power: 1,
          color: "blue",
          storage: "storagetest",
          optionId: 1,
        },

        "1_blue_storagetest2_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 1,
          power: 1,
          color: "blue",
          storage: "storagetest2",
          optionId: 2,
        },
      },
      totalQty: { "1": 4 },
      isCartView: false,
    };

    const expectation = {
      cartItems: {
        "1_red_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 0,
          power: 1,
          color: "red",
          storage: "storagetest",
          optionId: 1,
        },
        "1_blue_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 2,
          power: 1,
          color: "blue",
          storage: "storagetest",
          optionId: 1,
        },

        "1_blue_storagetest2_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 1,
          power: 1,
          color: "blue",
          storage: "storagetest2",
          optionId: 2,
        },
      },
      totalQty: { "1": 3 },
      isCartView: false,
    };

    expect(reducer(initState, action)).toEqual(expectation);
  });

  it("should handle cart/removeItem", () => {
    const action = {
      type: "cart/removeItem",
      payload: {
        id: 1,
        name: "test",
        price: 1,
        weight: 1,
        quantity: 1,
        power: 1,
        color: "red",
        storage: "storagetest",
        optionId: 1,
      },
    };

    const initState = {
      cartItems: {
        "1_red_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 1,
          power: 1,
          color: "red",
          storage: "storagetest",
          optionId: 1,
        },
        "1_blue_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 2,
          power: 1,
          color: "blue",
          storage: "storagetest",
          optionId: 1,
        },

        "1_blue_storagetest2_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 1,
          power: 1,
          color: "blue",
          storage: "storagetest2",
          optionId: 2,
        },
      },
      totalQty: { "1": 4 },
      isCartView: false,
    };

    const expectation = {
      cartItems: {
        "1_blue_storagetest_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 2,
          power: 1,
          color: "blue",
          storage: "storagetest",
          optionId: 1,
        },

        "1_blue_storagetest2_1": {
          id: 1,
          name: "test",
          price: 1,
          weight: 1,
          quantity: 1,
          power: 1,
          color: "blue",
          storage: "storagetest2",
          optionId: 2,
        },
      },
      totalQty: { "1": 4 },
      isCartView: false,
    };

    expect(reducer(initState, action)).toEqual(expectation);
  });
});
