/**
 * <spinning-numbers> implementation
 *
 * @author      http://mflo.io
 * @version     0.0.1
 */

Polymer({

  is: "spinning-numbers",

  properties: {

    value: {
      type: Number,
      observer: "valueChanged"
    }

  },

  valueChanged: function(value) {
    console.log("VALUE", value);
    // out with the old
    Polymer.dom(this.$.container).innerHTML = "";
    // in with the new
    var str = String(value).replace(/[\D]*/g, "");
    var num = Number(str);
    for (var i = 0; i < str.length; i++) {
      var outer = document.createElement("div");
      var inner = document.createElement("div");
      var style = "top: calc(-${offset}em + 1px);";
      if (num === 0)
        style += " visibility: visible";
      else style += " animation: spinning-number 0.2s linear ${delay}ms 3";
      Polymer.dom(inner).setAttribute("style", _.template(style)({
        delay: ((str.length - 1) - i) * 100,
        offset: Number(str.charAt(i))
      }));
      Polymer.dom(inner).innerHTML = "0 1 2 3 4 5 6 7 8 9";
      Polymer.dom(outer).appendChild(inner);
      Polymer.dom(this.$.container).appendChild(outer);
    }
  }

});
