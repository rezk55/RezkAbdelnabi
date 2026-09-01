const portfolio = [
    {
        title: "New version for info sender",
        image: "images/thumb/project-27.png",
        category: ["category-frontend"],
        previewLink: "https://dashboard.v2.info-sender.com",
        codeLink: ""
    },
    {
        title: "Info Sender",
        image: "images/thumb/project-23.png",
        category: ["category-frontend"],
        previewLink: "https://dashboard.info-sender.com/",
        codeLink: ""
    },
    {
        title: "Info Sender api docs",
        image: "images/thumb/project-26.png",
        category: ["category-frontend"],
        previewLink: "https://infofronttest.nasatechnology.net/docs/",
        codeLink: ""
    },
    {
        title: "عون المعلم",
        image: "images/thumb/project-24.png",
        category: ["category-frontend"],
        previewLink: "https://aboda7m01-001-site3.rtempurl.com/home/subscriptions",
        codeLink: ""
    },
    {
        title: "Growth Academy",
        image: "images/thumb/project-14.png",
        category: ["category-frontend"],
        previewLink: "https://growthsacademy.com/",
        codeLink: ""
    },
    {
        title: "Hansalhalk Medical Academy",
        image: "images/thumb/project-25.png",
        category: ["category-frontend"],
        previewLink: "https://hansalhalkmedacademy.com/",
        codeLink: ""
    },
    {
        title: "Mealify, Delicious",
        image: "images/thumb/project-1.png",
        category: ["category-frontend"],
        previewLink: "https://rezk55.github.io/R-Mealify/",
        codeLink: ""
    },
    {
        title: "shop car",
        image: "images/thumb/project-2.png",
        category: ["category-frontend"],
        previewLink: "https://rezk55.github.io/TheGarage/",
        codeLink: ""
    },
    {
        title: "choose your Furniture",
        image: "images/thumb/project-3.png",
        category: ["category-frontend"],
        previewLink: "https://rezk55.github.io/Furniture/",
        codeLink: ""
    },
    {
        title: "DeFolio",
        image: "images/thumb/project-4.png",
        category: ["category-frontend"],
        previewLink: "https://rezk55.github.io/DeFolio/",
        codeLink: ""
    },
    {
        title: "Daniels",
        image: "images/thumb/project-9.png",
        category: ["category-frontend"],
        previewLink: "https://rezk55.github.io/daniels/",
        codeLink: ""
    },
    {
        title: "MY Portfolio",
        image: "images/thumb/project-8.png",
        category: ["category-frontend"],
        previewLink: "#",
        codeLink: "#"
    },
    {
        title: "TodoList",
        image: "images/thumb/project-5.png",
        category: ["category-apis"],
        previewLink: "https://rezk55.github.io/TodoAndBlog/",
        codeLink: ""
    },
    {
        title: "Blog",
        image: "images/thumb/project-6.png",
        category: ["category-apis"],
        previewLink: "https://rezk55.github.io/TodoAndBlog/",
        codeLink: ""
    },
    {
        title: "My List(Vue and Laravel)",
        image: "images/thumb/project-7.png",
        category: ["category-backend", "category-apis"],
        previewLink: "https://rezk55.github.io/TodoApp/",
        codeLink: ""
    },
    {
        title: "Your Weather",
        image: "images/thumb/project-10.png",
        category: ["category-apis"],
        previewLink: "https://rezk55.github.io/weather/",
        codeLink: ""
    },
    {
        title: "yummy",
        image: "images/thumb/project-12.png",
        category: ["category-apis"],
        previewLink: "https://rezk55.github.io/yummy/",
        codeLink: ""
    },
    {
        title: "Binary Search in behind the scenes",
        image: "images/thumb/project-11.png",
        category: [], // لم يكن له تصنيف محدد في الكود الأصلي
        previewLink: "https://rezk55.github.io/binarySearchJS/",
        codeLink: ""
    }
];

const portfolioContainer = document.querySelector(".portfolio-items");

function displayPortfolio(items) {
    let displayData = items.map((item) => {
        return `
        <div class="mix ${item.category.join(' ')} card outer-shadow hover-in-shadow col-md-6 col-lg-4">
            <img src="${item.image}" class="card-img-top" alt="${item.title}">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <a href="${item.previewLink}" target="_blank" class="btn outer-shadow hover-in-shadow">preview site</a>
                <a href="${item.codeLink}" target="_blank" class="btn outer-shadow hover-in-shadow">view code</a>
            </div>
        </div>`;
    });
    
    portfolioContainer.innerHTML = displayData.join("");
}

// استدعاء الفانكشن عند تحميل الصفحة
displayPortfolio(portfolio);

//copyright
const copyrightElement = document.getElementById("copyright");
const currentYear = new Date().getFullYear();

// تحديث النص بالكامل
copyrightElement.innerHTML = `&copy;${currentYear} RezCoder`;

