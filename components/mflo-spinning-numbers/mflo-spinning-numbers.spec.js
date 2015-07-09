/**
 * <mflo-spinning-numbers> unit tests
 *
 * @author      http://mflo.io
 * @version     0.0.2
 */

var spinner = document.createElement("mflo-spinning-numbers");

suite("<mflo-spinning-numbers>", function() {

  test("value property is initially undefined", function() {
    assert.equal(spinner.value, undefined);
  });

  test("value property is r/w", function() {
    spinner.value = 123;
    assert.equal(spinner.value, 123);
  });

  test("value property accepts only numbers", function() {
    spinner.value = "$123.45";
    assert.equal(spinner.value, 12345);
  });

});
