/**
 * <mflo-spinning-numbers> implementation
 *
 * @author      http://mflo.io
 * @version     0.0.1
 */

Polymer({

  is: "mflo-spinning-numbers",

  /**
   * @property {number} value Value displayed. Initially undefined. Non-digits stripped.
   */

  properties: {
    value: {
      type: Number,
      observer: "valueChanged"
    }

  },

  // private methods

  valueChanged: function(value) {
    // out with the old
    Polymer.dom(this.$.container).innerHTML = "";
    // in with the new
    if (typeof value !== "undefined") {
      var str = String(value).replace(/[\D]*/g, "");
      var num = Number(str);
      for (var i = 0; i < str.length; i++) {
        var outer = document.createElement("div");
        var inner = document.createElement("div");
        // offset of top shows correct number
        var offset = Number(str.charAt(i));
        // spin index delays visibility of number by position
        var spinx = Math.min(9, Math.max(0, (str.length - 1) - i));
        var style = "top: calc(-" + offset + "em + 1px);";
        if (num === 0)
          style += " visibility: visible";
        else Polymer.dom(inner).setAttribute("class", "spin spin" + spinx);
        Polymer.dom(inner).setAttribute("style", style);
        Polymer.dom(inner).innerHTML = "0 1 2 3 4 5 6 7 8 9";
        Polymer.dom(outer).appendChild(inner);
        Polymer.dom(this.$.container).appendChild(outer);
      }
      // make sure internal value reflects the number we used
      this.value = num;
    }
    else Polymer.dom(this.$.container).innerHTML = "&nbsp;";

  }

});
