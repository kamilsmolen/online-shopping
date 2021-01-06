import itemsJSON from '../../data/items.json';
import reducer, {
    addItemToStorage, changeIsDetailsView, changeIsListView, removeItemFromStorage, selectItem
} from './shopSlice';

describe("test shop slice actions", () => {
  it("should create an action with shop/changeIsListView type", () => {
    const value = true;
    const expectation = {
      type: "shop/changeIsListView",
      payload: value,
    };

    expect(changeIsListView(value)).toEqual(expectation);
  });

  it("should create an action with shop/changeIsDetailsView type", () => {
    const value = true;
    const expectation = {
      type: "shop/changeIsDetailsView",
      payload: value,
    };

    expect(changeIsDetailsView(value)).toEqual(expectation);
  });

  it("should create an action with shop/selectItem type", () => {
    const value = 1;
    const expectation = {
      type: "shop/selectItem",
      payload: value,
    };

    expect(selectItem(value)).toEqual(expectation);
  });

  it("should create an action with shop/addItemToStorage type", () => {
    const value = { id: 1, option: 1, quantity: 1 };
    const expectation = {
      type: "shop/addItemToStorage",
      payload: value,
    };

    expect(addItemToStorage(value)).toEqual(expectation);
  });

  it("should create an action with shop/removeItemFromStorage type", () => {
    const value = { id: 1, option: 1, quantity: 1 };
    const expectation = {
      type: "shop/removeItemFromStorage",
      payload: value,
    };

    expect(removeItemFromStorage(value)).toEqual(expectation);
  });
});

describe("test shop slice reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      items: itemsJSON.items,
      selectedItemId: undefined,
      isListView: true,
      isDetailsView: false,
    });
  });

  it("should handle shop/changeIsListView", () => {
    const action = {
      type: "shop/changeIsListView",
      payload: false,
    };
    const items = [
      {
        id: 1,
        name: "testName",
        brand: "brandName",
        price: "1",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "white",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "red",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },

      {
        id: 2,
        name: "testName2",
        brand: "brandName2",
        price: "2",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "blue",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "orange",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },
    ];
    const initState = {
      items: items,
      selectedItemId: undefined,
      isListView: true,
      isDetailsView: false,
    };

    const expectation = {
      items: items,
      selectedItemId: undefined,
      isListView: false,
      isDetailsView: false,
    };
    expect(reducer(initState, action)).toEqual(expectation);
  });

  it("should handle shop/changeIsDetailsView", () => {
    const action = {
      type: "shop/changeIsDetailsView",
      payload: true,
    };
    const items = [
      {
        id: 1,
        name: "testName",
        brand: "brandName",
        price: "1",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "white",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "red",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },

      {
        id: 2,
        name: "testName2",
        brand: "brandName2",
        price: "2",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "blue",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "orange",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },
    ];
    const initState = {
      items: items,
      selectedItemId: undefined,
      isListView: true,
      isDetailsView: false,
    };

    const expectation = {
      items: items,
      selectedItemId: undefined,
      isListView: true,
      isDetailsView: true,
    };
    expect(reducer(initState, action)).toEqual(expectation);
  });

  it("should handle shop/selectItem", () => {
    const action = {
      type: "shop/selectItem",
      payload: 1,
    };
    const items = [
      {
        id: 1,
        name: "testName",
        brand: "brandName",
        price: "1",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "white",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "red",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },

      {
        id: 2,
        name: "testName2",
        brand: "brandName2",
        price: "2",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "blue",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "orange",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },
    ];
    const initState = {
      items: items,
      selectedItemId: undefined,
      isListView: true,
      isDetailsView: false,
    };

    const expectation = {
      items: items,
      selectedItemId: 1,
      isListView: true,
      isDetailsView: false,
    };
    expect(reducer(initState, action)).toEqual(expectation);
  });

  it("should handle shop/addItemToStorage", () => {
    const action = {
      type: "shop/addItemToStorage",
      payload: { id: 1, option: 1, quantity: 1 },
    };
    const items = [
      {
        id: 1,
        name: "testName",
        brand: "brandName",
        price: "1",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "white",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "red",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },

      {
        id: 2,
        name: "testName2",
        brand: "brandName2",
        price: "2",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "blue",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "orange",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },
    ];

    const initState = {
      items: items,
      selectedItemId: undefined,
      isListView: true,
      isDetailsView: false,
    };

    const expectedItems = [
      {
        id: 1,
        name: "testName",
        brand: "brandName",
        price: "1",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "white",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "red",
            power: [6.5, 9.5],
            quantity: 8,
          },
        ],
      },

      {
        id: 2,
        name: "testName2",
        brand: "brandName2",
        price: "2",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "blue",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "orange",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },
    ];

    const expectation = {
      items: expectedItems,
      selectedItemId: undefined,
      isListView: true,
      isDetailsView: false,
    };
    expect(reducer(initState, action)).toEqual(expectation);
  });

  it("should handle shop/removeItemFromStorage", () => {
    const action = {
      type: "shop/removeItemFromStorage",
      payload: { id: 1, option: 1, quantity: 1 },
    };
    const items = [
      {
        id: 1,
        name: "testName",
        brand: "brandName",
        price: "1",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "white",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "red",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },

      {
        id: 2,
        name: "testName2",
        brand: "brandName2",
        price: "2",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "blue",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "orange",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },
    ];

    const initState = {
      items: items,
      selectedItemId: undefined,
      isListView: true,
      isDetailsView: false,
    };

    const expectedItems = [
      {
        id: 1,
        name: "testName",
        brand: "brandName",
        price: "1",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "white",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "red",
            power: [6.5, 9.5],
            quantity: 6,
          },
        ],
      },

      {
        id: 2,
        name: "testName2",
        brand: "brandName2",
        price: "2",
        available: true,
        weight: 0.2,
        options: [
          {
            color: "blue",
            power: [6.5, 9.5],
            quantity: 3,
          },
          {
            color: "orange",
            power: [6.5, 9.5],
            quantity: 7,
          },
        ],
      },
    ];

    const expectation = {
      items: expectedItems,
      selectedItemId: undefined,
      isListView: true,
      isDetailsView: false,
    };
    expect(reducer(initState, action)).toEqual(expectation);
  });
});
