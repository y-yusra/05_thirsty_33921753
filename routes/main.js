// Create a new router
const express = require("express");
const router = express.Router();

// Define our data
const shopData = {
    shopName: "The Thirsty Student",
    productCategories: ["Beer", "Wine", "Soft Drinks", "Hot Drinks", "Energy Drinks"],
    shops: [
        {
            id: 1,
            manager: "Sarah Johnson",
            address: "123 Campus Road, Goldsmiths University, London SE14 6NW",
            phone: "020 7919 7777"
        },
        {
            id: 2,
            manager: "Mike Chen", 
            address: "45 Student Union Building, Goldsmiths University, London SE14 6AW",
            phone: "020 7919 7778"
        },
        {
            id: 3,
            manager: "Emma Davis",
            address: "78 New Cross Road, London SE14 5EX", 
            phone: "020 7919 7779"
        }
    ]
};

// Handle the main routes
router.get("/", (req, res) => {
    res.render("index.ejs", { shopData });
});

router.get("/about", (req, res) => {
    res.render("about.ejs", { shopData });
});

router.get("/search", (req, res) => {
    res.render("search.ejs", { shopData });
});

// Search results route
router.get('/search_result', function (req, res) {
    const searchText = req.query.search_text || "";
    const category = req.query.category || "";
    
    res.send("You searched for: '" + searchText + "' in category: " + category);
});

// Registration routes
router.get("/register", (req, res) => {
    res.render("register.ejs", { shopData });
});

router.post("/registered", (req, res) => {
    const { first, last, email } = req.body;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.send(`
            <div class="container">
                <h1>Registration Error</h1>
                <p style="color: red;">Please enter a valid email address</p>
                <a href="/register">Go back to registration</a>
            </div>
        `);
    }
    
    res.render("registered.ejs", { 
        shopData, 
        first, 
        last, 
        email 
    });
});

// Survey routes
router.get("/survey", (req, res) => {
    res.render("survey.ejs", { shopData });
});

router.post("/survey-submit", (req, res) => {
    const { firstName, surname, email, age, drinkCategory, isStudent } = req.body;
    
    res.render("survey-result.ejs", { 
        shopData, 
        surveyData: {
            firstName,
            surname, 
            email: email || "Not provided",
            age,
            drinkCategory: drinkCategory || "Not specified",
            isStudent: isStudent ? "Yes" : "No",
            submissionDate: new Date().toLocaleDateString('en-GB')
        }
    });
});

// Export the router object so index.js can access it
module.exports = router;