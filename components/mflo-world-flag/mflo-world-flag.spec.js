/**
 * <mflo-world-flag> unit tests
 *
 * @author      http://mflo.io
 * @version     0.0.1
 */

var flag = document.createElement("mflo-world-flag");

suite("<mflo-world-flag>", function() {

  test("iso2 property is by default 'us'", function() {
    assert.equal(flag.iso2, "us");
  });

  test("src property is directly derived from iso2 property", function() {
    flag.iso2 = "gb";
    assert(flag.src.indexOf("resources/gb.png") !== -1, "src contains image");
  });

  test("iso2 property is case-insensitive", function() {
    flag.iso2 = "Gb";
    assert(flag.src.indexOf("resources/gb.png") !== -1, "iso2 folds case");
  });

  test("iso2 property is directly derived from iso3 property", function() {
    flag.iso3 = "DEU";
    assert(flag.src.indexOf("resources/de.png") !== -1, "iso3 maps to iso2");
  });

});
