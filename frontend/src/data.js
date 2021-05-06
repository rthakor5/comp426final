import bcrypt from "bcryptjs";

// STATIC DATA USED BEFORE IMPLEMENTING MONGODB AND MONGOOSE

const data = {
    users: [
        {
            name: "Rushi",
            email: "rushithakor3@gmail.com",
            password: bcrypt.hashSync("1234", 8),
            isAdmin: true,
        },
        {
            name: "User",
            email: "user@email.com", 
            password: bcrypt.hashSync("12345", 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: "Third Edition Intro to Econometrics",
            category: "Textbooks",
            image: "/images/p1.jpg",
            price: 100,
            countInStock: 10,
            author: "",
            rating: 4.5,
            numReviews: 10,
            description: "High quality product"
        },
        {
            name: "Manufacturing Processes Fourth Edition",
            category: "textbooks",
            image: "/images/p2.jpg",
            price: 85,
            countInStock: 20,
            author: "",
            rating: 4.0,
            numReviews: 36,
            description: "high quality product"
        },
        {
            name: "Essential of Economics",
            category: "textbooks",
            image: "/images/p3.jpg",
            price: 55,
            countInStock: 0,
            author: "",
            rating: 4.7,
            numReviews: 4,
            description: "high quality product"
        },
        {
            name: "The Hunchback of Notre Dame",
            category: "books",
            image: "/images/p4.jpg",
            price: 20,
            countInStock: 4,
            author: "",
            rating: 3.9,
            numReviews: 17,
            description: "Very good read"
        },
        {
            name: "Strengths Finder 2.0",
            category: "books",
            image: "/images/p5.jpg",
            price: 15,
            countInStock: 17,
            author: "",
            rating: 5.0,
            numReviews: 42,
            description: "even better read"
        },
        {
            name: "The Great Gatsby",
            category: "books",
            image: "/images/p6.jpg",
            price: 25,
            countInStock: 100,
            author: "",
            rating: 4.3,
            numReviews: 19,
            description: "americas favorite"
        },
    ],
};
export default data;