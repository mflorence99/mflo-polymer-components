/**
 * <test-case> unit tests
 *
 * @author      https://github.com/mflorence99/mflorence99.github.io
 * @version     0.0.1
 */

var myEl = document.createElement("test-case");

suite("<test-case>", function() {

  test("defines the author property", function() {
    assert.equal(myEl.author.name, "Mark Florence");
    assert.equal(myEl.author.image, "https://avatars2.githubusercontent.com/u/429424?v=3&s=40");
  });

  test("says hello", function() {
    assert.equal(myEl.sayHello(), "test-case says, Hello World!");
    var greetings = myEl.sayHello("greetings Earthlings");
    assert.equal(greetings, "test-case says, greetings Earthlings");
  });

  test("fires lasers", function(done) {
    myEl.addEventListener("test-case-lasers", function(event) {
      assert.equal(event.detail.sound, "Pew pew!");
      done();
    });
    myEl.fireLasers();
  });

});