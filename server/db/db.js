export class db{
    constructor(){

    }

    getItems() {
        return items;
    }

    getItemsById(id) {
        return items.find((item) => {
            return item.id === id;
        })
    }
};

const items = [
    {
        id: "1",
        name: "Reebok Track Jacket",
        bundleInfo: {},
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        price: "100$",
        sizes: ["S", "M", "L"],
        colors: ["#4287f5", "#f54242", "#400a2d"],
        images: ["https://i.imgur.com/mt7NO4o.png"],
        sale: {},
        rating: "5",
        categories: [],
        brand: "",
        creationDate: new Date("Tue Oct 22 2019"),
    },
    {
        id: "2",
        name: "Reebok Track Jacket",
        bundleInfo: {},
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        price: "100$",
        sizes: ["S", "M", "L"],
        colors: ["#4287f5", "#f54242", "#400a2d"],
        images: ["https://i.imgur.com/w5WzErc.png"],
        sale: {},
        rating: "5",
        categories: [],
        brand: "",
        creationDate: new Date("Tue Oct 22 2019"),
    },
    {
        id: "3",
        name: "Reebok Track Jacket",
        bundleInfo: {},
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        price: "100$",
        sizes: ["S", "M", "L"],
        colors: ["#4287f5", "#f54242", "#400a2d"],
        images: ["https://i.imgur.com/4Q9MQg4.png"],
        sale: {},
        rating: "5",
        categories: [],
        brand: "",
        creationDate: new Date("Tue Oct 22 2019"),
    },
    {
        id: "4",
        name: "Reebok Track Jacket",
        bundleInfo: {},
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        price: "100$",
        sizes: ["S", "M", "L"],
        colors: ["#4287f5", "#f54242", "#400a2d"],
        images: ["https://i.imgur.com/wXSAlap.png"],
        sale: {},
        rating: "5",
        categories: [],
        brand: "",
        creationDate: new Date("Tue Oct 22 2019"),
    },

];
