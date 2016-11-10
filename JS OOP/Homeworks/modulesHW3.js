function solve() {
var Course = (function () {

    function validateTitle(titles) {
        if (!Array.isArray(titles)) {
            validateTitle([titles]);
            return;
        }

        for (let title of titles) {
            if (title.length < 1) {
                throw new Error('Title must contain at least one symbol!');
            }

            let hasStartOrEndSpace = title != title.trim();
            if (hasStartOrEndSpace) {
                throw new Error('Title cannot have start or end spaces!');
            }

            let hasConsecutiveSpaces = title != title.replace(/\s\s+/g, ' ');
            if (hasConsecutiveSpaces) {
                throw new Error('Title cannot contain consecutive spaces!');
            }
        }
    }

    function init(title, presentations) {
        if (!presentations || presentations.length === 0) {
            throw new Error('Course must have at least one presentation!');
        }

        validateTitle(title);
        validateTitle(presentations);

        this.title = title;
        this.presentations = presentations;
        this.students = [];
        this.studentHomeworks = [];
        this.examResults = [];
        this.studentsCount = 0;

        return this;
    }

    function validateStudentName(name) {
        for (let index in name) {
            if (index == 0 && name[index] != name[index].toUpperCase()) {
                throw new Error('Name should start with an uppercase letter!');

            }
            if (index != 0 && name[index] != name[index].toLowerCase()) {
                throw new Error('All remaining letters of the name should be lowerCased!');
            }
        }
    }

    function addStudent(name) {
        let studentNames = name.split(' '),
            student = {};

        if (studentNames.length != 2) {
            throw new Error('Names were not in the correct format!');
        }

        validateStudentName(studentNames[0]);
        validateStudentName(studentNames[1]);

        this.studentsCount += 1;
        student.firstname = studentNames[0];
        student.lastname = studentNames[1];
        student.id = this.studentsCount;

        this.students.push(student);
        return student.id;
    }

    function getAllStudents() {
        return this.students;
    }

    function submitHomework(studentID, homeworkID) {
        let isStudentIDValid = 0 < studentID && studentID <= this.studentsCount && studentID % 1 === 0;
        let isHomeworkIDValid = 0 < homeworkID && homeworkID <= this.presentations.length;

        if (!isStudentIDValid || !isHomeworkIDValid) {
            throw new Error('Input IDs are not valid!');
        }

        if (!this.studentHomeworks[studentID]) {
            this.studentHomeworks[studentID] = 0;
        } else {
            this.studentHomeworks[studentID] += 1;
        }
    }

    function validateExamResults(results, studentsCount) {
        let examIDs = results.map(x => x.StudentID),
            uniqueStudents = new Set(examIDs);

        if (examIDs.length !== uniqueStudents.size) {
            throw new Error('Someone is trying to cheat on the exam!');
        }

        for (let result of results) {
            let isScoreANumber = typeof result.score === 'number';
            let isStudentIDValid = 0 < result.StudentID && result.StudentID <= studentsCount;

            if (!isScoreANumber || !isStudentIDValid) {
                throw new Error('Invalid exam data ( StudentID/score )');
            }
        }
    }

    function pushExamResults(results) {
        validateExamResults(results, this.studentsCount);

        this.examResults.push(...results);
    }

    function assignFinalScore(id, examResult, studentHomeworks, presentationCount) {
        let homeworkResult = studentHomeworks[id] / presentationCount || 0,
            examProcentResult = 0.75 * examResult.score || 0,
            finalResult = examProcentResult + (0.25 * homeworkResult);

        return finalResult;
    }

    function getStudentByID(studentID, students) {
        let student = students.filter(x => x.id === studentID)[0];

        return student;
    }

    function assignFinalScores(examResults, presentationsCount, students, studentHomeworks){
        for (let result of examResults) {
            let student = getStudentByID(result.StudentID, students);

            student.finalScore = assignFinalScore(student.id, result, studentHomeworks, presentationsCount);
        }

        let studentsWithNoExamPoints = students.filter(x => x.finalScore === undefined);

        for (let student of studentsWithNoExamPoints) {
            student.finalScore = 0;
        }

        return students;
    }

    function getTopStudents() {
        this.examResults = this.examResults.sort((a, b) => a.StudentID - b.StudentID);
        let presentationsCount = this.presentations.length,
        topStudents = [];

        let studentsWithResults = assignFinalScores(this.examResults, presentationsCount, this.students, this.studentHomeworks);

        studentsWithResults = studentsWithResults.sort((a, b) => b.finalScore - a.finalScore);

        let len = this.studentsCount >= 10 ? 10 : this.studentsCount;

        for(var i = 0; i < len; i += 1) {
            topStudents.push(studentsWithResults[i]);
        }

        return topStudents;
    }
    return {
        init,
        addStudent,
        getAllStudents,
        submitHomework,
        pushExamResults,
        getTopStudents
    };
} ());

    return Course;
}
module.exports = solve;