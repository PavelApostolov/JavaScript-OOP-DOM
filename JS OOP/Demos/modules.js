var controls = (function () {
  function formatResult(name, value) {
    return name + ' says the result is ' + value;
  }

  class Calculator {
    constructor(name) {
      this.name = name;
      this.result = 0;
    };

    add(x) {
      x = +x;
      this.result += x;
      return this;
    };

    subtract(x) {
      x = +x;
      this.result -= x;
      return this;
    };

    showResult() {
      console.log(formatResult(this.name, this.result));
      return this;
    };
  };

  return { getCalculator: (name) => new Calculator(name) };
} ());

var calc = controls.getCalculator('First');
calc.add(7);
calc.showResult();
calc.subtract(2);
calc.showResult();

///////////
var people = (function(){
    var people = ['Will', 'Steve'];

    _render();

    function _render() { // private function
        //console.clear();
        console.log(people);
    }

    function addPerson(name) {
        people.push(name);
        _render();
    }

    function deletePerson(i) {
        people.splice(i, 1);
        _render();
    }

    return {
        addPerson: addPerson,
        deletePerson: deletePerson
    };
})();

people.addPerson("Jake");
people.deletePerson(0);