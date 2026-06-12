const { model } = require("mongoose");

const students =
    [{
        id: 1, name: "Ravi", skills: ["HTML", "CSS", "React"],
        company: { name: "TCS" }
    }, {
        id: 2, name: "Priya", skills: ["JavaScript", "Node"],
        company: {}
    }];


    module.exports = students