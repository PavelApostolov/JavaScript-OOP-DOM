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
	var Course = {
		init: function(title, presentations) {
      presentationValidation(presentations);
      titleValidation(title);

      this._title = title;
      this._presentations = presentations;
      this.students = [];
      this.generateId = getId();

      return this;
		},
		addStudent: function(name) {
      validateStudentName(name);
      var id = this.generateId(),
          names = name.split(' ');

      this.students.push({
        firstname: names[0],
        lastname: names[1],
        id,
        examResult: 0,
        homeworks: 0
      });

      return id;
		},
		getAllStudents: function() {
      var studentsToReturn = [];

      this.students.forEach(function(student) {
        studentsToReturn.push({
          firstname: student.firstname,
          lastname: student.lastname,
          id: student.id
        })
      });

      return studentsToReturn;
		},
		submitHomework: function(studentID, homeworkID) {
      var existStudent = false;
      this.students.forEach(function(student) {
        if (student.id === studentID) {
          existStudent = true;
        }
      });

      if (!existStudent) {
        throw new Error('This student not exist!');
      }
      if (this._presentations.length < homeworkID || homeworkID <= 0) {
        throw new Error('Invalid presentation id!');
      }

      this.students.forEach(function(student) {
        if (studentID === student.id) {
          student.homeworks += 1;
        }
      });

		},
		pushExamResults: function(results) {
      if (!results) {
        throw new Error('Missing results!');
      } else if (!Array.isArray(results)) {
        throw new Error('Results must bew array!');
      }

      var courseStudents = this.students;

      results.forEach(function(student) {
        if (typeof student !== 'object') {
          throw new Error('Student must be object contains id and score!');
        }
        if (!student.StudentID || !student.score) {
          throw new Error('Missing student parameter!');
        } else if (typeof student.StudentID !== 'number' || typeof student.score !== 'number') {
          throw new Error('Invalid studnet parameters type!');
        }

        if (student.StudentID <= 0 || courseStudents.length < student.StudentID) {
          throw new Error('Invalid student id!');
        }

        courseStudents.forEach(function(st) {
          if (st.id === student.StudentID) {
            if (st.examResult !== 0) {
              throw new Error('This student already have exam result!');
            }

            st.examResult = student.score;
          }
        });
      })
		},
		getTopStudents: function() {
		}
	};

  function titleValidation(title) {
    var titleWords = title.split(' ');
    wordValidation(title);
    titleWords.forEach(x => wordValidation(x));
  }

  function wordValidation(word) {
    var len = word.length;
        
    if (len === 0) {
      throw new Error('Title cannot be empty string!');
    } else if (word[0] === ' ' || word[len - 1] === ' ') {
      throw new Error('Title cannot starts or ends with white-space!');
    } 
  }

  function presentationValidation(array) {
    if (!array) {
        throw new Error('Missing presentations!');
    } else if (array.length === 0) {
      throw new Error('Presentations cannot be empty array!');
    } 

    array.forEach(title => titleValidation(title));
  }

  function validateStudentName(studentName) {
    if (!studentName) {
      throw new Error('Missing student name!');
    } else if (typeof studentName !== 'string') {
      throw new Error('Invalid student name type!');
    }

    var names = studentName.split(' ');
    if (names.length !== 2) {
      throw new Error('Invalid student name format!');
    }

    names.forEach(function(name) {
      var char = name.charAt(0);
      if (char == char.toLowerCase()) {
        throw new Error('Student name must begin with capital letter!');
      }

      for (var i = 1; i < name.length; i += 1) {
        char = name.charAt(i);
        if (char == char.toUpperCase()) {
          throw new Error('All letters in student name, without first, must be lower case!');
        }
      }
    });
  }

  function getId() {
    var currentId = 0;

    return function () {
      return ++currentId;
    };
  }

	return Course;
}


module.exports = solve;