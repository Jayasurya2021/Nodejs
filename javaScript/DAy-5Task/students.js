const { model } = require("mongoose");

const students =
    [{
        id: 1, name: "Ravi", skills: ["HTML", "CSS", "React"],
        company: { name: "TCS" }
    }, {
        id: 2, name: "Priya", skills: ["JavaScript", "Node"],
        company: {}
    }];

    function totalMarks(...marks) {
    return marks.reduce((acc, curr) => acc + curr, 0)
}

module.exports = totalMarks


    module.exports = {
        students,
        totalMarks
    }