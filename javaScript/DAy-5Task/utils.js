function totalMarks(...marks) {
    return marks.reduce((acc, curr) => acc + curr, 0)
}

module.exports = totalMarks