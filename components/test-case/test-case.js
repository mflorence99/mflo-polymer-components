/**
 * <test-case> implementation
 *
 * <p>Testing unit test tooling</p>
 *
 * @author      http://mflo.io
 * @version     0.0.1
 */

Polymer({

  is: "test-case",

  properties: {

    /**
     * `fancy` indicates that the element should don a monocle and tophat,
     * while checking its pocket watch.
     */
    fancy: Boolean,

    /**
     * Describes the author of the element, but is really just an excuse to
     * show off JSDoc annotations.
     *
     * @type {{name: string, image: string}}
     */
    author: {
      type: Object,
      value: function() {
        return {
          name:  "Mark Florence",
          image: "https://avatars2.githubusercontent.com/u/429424?v=3&s=40"
        };
      }
    }

  },

  // Element Lifecycle

  ready: function() { },

  attached: function() { },

  detached: function() { },

  // Element Behavior

  /**
   * The `test-case-lasers` event is fired whenever `fireLasers` is called.
   *
   * @event test-case-lasers
   * @detail {{sound: String}}
   */

  /**
   * Sometimes it's just nice to say hi.
   *
   * @param {string} greeting A positive greeting.
   * @return {string} The full greeting.
   */
  sayHello: function(greeting) {
    var response = greeting || "Hello World!";
    return "test-case says, " + response;
  },

  /**
   * Attempts to destroy this element's enemies with an any beam of light!
   *
   * Or, at least, dispatches an event in the vain hope that someone else will
   * do the zapping.
   */
  fireLasers: function() {
    this.fire("test-case-lasers", {sound: "Pew pew!"});
  }

});
