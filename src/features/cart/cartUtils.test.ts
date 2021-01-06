import {
    countTotalPrice, countTotalWeight, createUniqueId, createUniqueOptionId
} from './cartUtils';

describe("test cart utils", () => {
  it("should createUniqueId", () => {
    const cartItem = {
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
    const expectation = "1_red_1_1";

    expect(createUniqueId(cartItem)).toEqual(expectation);
  });

  it("should createUniqueId when power undefined", () => {
    const cartItem = {
      id: 1,
      name: "test",
      price: 1,
      weight: 1,
      quantity: 1,
      color: "red",
      storage: "1",
      optionId: 1,
    };
    const expectation = "1_red_1_undefined";

    expect(createUniqueId(cartItem)).toEqual(expectation);
  });

  it("should createUniqueOptionId", () => {
    const cartItem = {
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
    const expectation = "1_1";

    expect(createUniqueOptionId(cartItem)).toEqual(expectation);
  });

  it("should countTotalPrice", () => {
    const cartItems = [
      {
        id: 1,
        name: "test",
        price: 1,
        weight: 1,
        quantity: 1,
        power: 1,
        color: "red",
        storage: "1",
        optionId: 1,
      },
      {
        id: 1,
        name: "test",
        price: 2,
        weight: 1,
        quantity: 2,
        power: 1,
        color: "red",
        storage: "1",
        optionId: 1,
      },
    ];
    const expectation = "5.00";

    expect(countTotalPrice(cartItems)).toEqual(expectation);
  });

  it("should countTotalWeight", () => {
    const cartItems = [
      {
        id: 1,
        name: "test",
        price: 1,
        weight: 12,
        quantity: 1,
        power: 1,
        color: "red",
        storage: "1",
        optionId: 1,
      },
      {
        id: 1,
        name: "test",
        price: 2,
        weight: 11,
        quantity: 2,
        power: 1,
        color: "red",
        storage: "1",
        optionId: 1,
      },
    ];
    const expectation = "34.00";

    expect(countTotalWeight(cartItems)).toEqual(expectation);
  });
});
