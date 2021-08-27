import { IterableCommerceItem } from '@iterable/react-native-sdk';

export interface CommerceItemCollection {
    listView: IterableCommerceItem[];
    addToCart: IterableCommerceItem[];
    removeFromCart: IterableCommerceItem[];
    purchase: IterableCommerceItem[];
}

export class CommerceItems implements CommerceItemCollection {

    listView: IterableCommerceItem[];
    addToCart: IterableCommerceItem[];
    removeFromCart: IterableCommerceItem[];
    purchase: IterableCommerceItem[];

    constructor() {
        this.listView = [
            new IterableCommerceItem("item1", "Item 1", 2.99, 1),
            new IterableCommerceItem("item2", "Item 2", 5.99, 1),
            new IterableCommerceItem("item3", "Item 3", 8.99, 1),
            new IterableCommerceItem("item4", "Item 4", 1.99, 1),
            new IterableCommerceItem("item5", "Item 5", 7.99, 1),
            new IterableCommerceItem("item6", "Item 6", 9.99, 1),
            new IterableCommerceItem("item7", "Item 7", 6.99, 1)
        ]
        this.addToCart = [
            new IterableCommerceItem("item1", "Item 1", 2.99, 2),
            new IterableCommerceItem("item2", "Item 2", 5.99, 1),
            new IterableCommerceItem("item3", "Item 3", 8.99, 1)
        ]
        this.removeFromCart = [
            new IterableCommerceItem("item3", "Item 3", 8.99, 1)
        ]
        this.purchase = [
            new IterableCommerceItem("item1", "Item 1", 2.99, 2),
            new IterableCommerceItem("item2", "Item 2", 5.99, 1),
        ]
    } 

  }