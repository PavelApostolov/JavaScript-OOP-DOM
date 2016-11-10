/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {

  function checkTitle(title) {
    if (title.trim().length !== title.length) {
      throw Error('Title must do not start with spaces!');
    }
    if (title.indexOf('  ') >= 0) {
      throw Error('Titles must do not have consecutive spaces!');
    }
    if (title.length < 1) {
      throw Error('Titles must have at least one character!');
    }
  }

  function checkStudentName(names) {

    function checkCurrentName(currentName) {

      if (currentName[0] !== currentName[0].toUpperCase()) {
        throw Error('Names must start with an upper case letter!');
      }

      let subName = currentName.substring(1, currentName.length);

      if (subName !== subName.toLowerCase()) {
        throw Error('All other symbols in the name must are lowercase letters!');
      }
    }

    names = names.split(' ');

    if (names.length != 2) {
      throw Error('Student name must contain exactly 2 words - firstname and lastname!');
    }

    names.forEach(n => checkCurrentName(n));
  }

  function createStudent(firstName, lastName, studentID) {
    var student = {
      firstname: firstName,
      lastname: lastName,
      id: studentID,
      homeworks: 0,
      grades: [],
      toString: function () {
        return {
          firstname: this.firstname,
          lastname: this.lastname,
          id: this.id
        };
      }
    };

    return student;
  }

  var Course = {
    init: function (title, presentations) {
      this._initCurseTitle(title);
      this._initPresentations(presentations);
      this._studentsIDs = 0;
      this._students = [];
      this._exams = 0;
      this._homeworks = this._presentations.length;
    },

    _initCurseTitle: function (title) {
      checkTitle(title);
      this._title = title;
    },

    _initPresentations: function (presentations) {
      presentations = presentations || [];
      if (presentations.length === 0) {
        throw Error();
      }
      presentations.forEach(p => checkTitle(p));
      this._presentations = presentations;
    },

    addStudent: function (name) {
      checkStudentName(name);
      let names = name.split(' ');
      let currentId = ++this._studentsIDs;
      this._students.push(createStudent(names[0], names[1], currentId));
      return currentId;
    },

    getAllStudents: function () {
      let allStudents = [];
      this._students.forEach(s => allStudents.push(s.toString()));
      return allStudents;
    },

    submitHomework: function (studentID, homeworkID) {
      if (studentID < 1 || studentID > this._studentsIDs) {
        throw Error('studentID are invalid!');
      }
      if (homeworkID < 1 || homeworkID > this._presentations.length) {
        throw Error('homeworkID are invalid!');
      }

      this._students.find(st => st.id === studentID).homeworks += 1;
    },

    pushExamResults: function (results) {
      this._exams += 1;
      let uniqueIDs = [];

      for (let result of results) {

        if (uniqueIDs.indexOf(result.StudentID) >= 0) {
          throw Error('Same StudentID is given more than once!');
        }
        uniqueIDs.push(result.StudentID);

        var currentStudent = this._students.find(st => st.id === result.StudentID);

        if (currentStudent) {
          if (isNaN(+result.score)) {
            throw Error('Score is not a number!');
          }
          currentStudent.grades.push(result.score);
        }
        else {
          throw Error('StudentID are invalid!');
        }
      }

      for (let student of this._students) {
        if (student.grades.length < this._exams) {
          student.grades.push(0);
        }
      }
    },

    _getStudentAllScore: function (student) {
      let pointsFromGrades = student.grades.reduce((a, b) => a + b, 0);
      let pointsFromHomework = student.homeworks / this._homeworks;
      return (75 * (pointsFromGrades / (this._exams * 10)) + (25 * pointsFromHomework));
    },

    getTopStudents: function () {
      let bestStudents = [];

      for (let student of this._students) {
        currentSt = student.toString();
        currentSt.scores = this._getStudentAllScore(student);
        bestStudents.push(currentSt);
      }

      bestStudents = bestStudents.sort((st1, st2) => st2.scores - st1.scores);
      if (bestStudents.length > 10) {
        bestStudents = bestStudents.slice(0, 10);
      }

      return bestStudents;
    }
  };

  return Course;
}

var curse = solve();
curse.init('JS OOP', ['Modules-and-Patterns']);

curse.addStudent('Pesho 1');
curse.addStudent('Pesho 2');
curse.addStudent('Pesho 3');
curse.addStudent('Pesho 4');
curse.addStudent('Pesho 5');
curse.addStudent('Pesho 6');
curse.addStudent('Pesho 7');
curse.addStudent('Pesho 8');
curse.addStudent('Pesho 9');
curse.addStudent('Pesho 10');
curse.addStudent('Pesho 11');

curse.pushExamResults([
  { StudentID: 1, score: 1 },
  { StudentID: 2, score: 2 },
  { StudentID: 3, score: 3 },
  { StudentID: 4, score: 4 },
  { StudentID: 5, score: 5 },
  { StudentID: 6, score: 6 },
  { StudentID: 7, score: 7 },
  { StudentID: 8, score: 8 },
  { StudentID: 9, score: 9 },
  { StudentID: 10, score: 10 },
  { StudentID: 11, score: 10 },
]);
curse.submitHomework(10, 1);
curse.submitHomework(8, 1);

console.log(curse.getTopStudents());

module.exports = solve;