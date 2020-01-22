const students = [ 
    new Student('Student 1', [10,9,8,0,10]),
    new Student('Student 12', [10,0,8,0,3,4])
];
students.forEach(student => {
    console.log(`Student name: ${student.name}`);
    console.log(`Average mark: ${student.averageMark()}`);
    console.log(`Min mark: ${student.minMark()}`);
    console.log(`Max mark: ${student.maxMark()}`);
});

const groupAverageMark = averageMark(students);
console.log(`Average mark in group: ${groupAverageMark}`);


function Student(name, marks) {
    this.name = name;

    this.averageMark = function() {
        return marks.reduce((accumulator, mark) => accumulator + mark)/marks.length;
    };
    this.minMark = function() {
        return Math.min.apply(null, marks);
    };
    this.maxMark = function() {
        return Math.max.apply(null, marks);
    };
}
function averageMark(students) {
    var sum = students.reduce((accumulator, student) => accumulator + student.averageMark(), 0);
    
    return sum/students.length;
}