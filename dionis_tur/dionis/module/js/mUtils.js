// Utils
// Weirdie, 2010

// Filtered input jQuery plugin.
(function ($) {
  $.fn.extend({
    filter_input: function (options) {
      var defaults = {
        regex: ".*",
        live: false
      }
      var options = $.extend(defaults, options);
      var regex = new RegExp(options.regex);
      function filter_input_function(event) {
        var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
        if (key == 13 || key == 8 || key == 37 || key == 39 || key == 46 || key == 35 || key == 36) return true;
        var string = String.fromCharCode(key);
        if (regex.test(string)) {
          return true;
        }
        return false;
      }
      if (options.live) {
        $(this).live('keypress', filter_input_function);
      } else {
        return this.each(function () {
          var input = $(this);
          input.unbind('keypress').keypress(filter_input_function);
        });
      }
    }
  });
})(jQuery);

// Preload images function.
function _preloadImages() {
  var d = document;
  if (d.images) {
    if (!d._p) {
      d._p = new Array();
    }
    var i, j = d._p.length, a = _preloadImages.arguments;
    for (i = 0; i < a.length; i++) {
      if (a[i].indexOf('#') != 0) {
        d._p[j] = new Image;
        d._p[j++].src = a[i];
      }
    }
  }
}

// Gets URL parameters and values.
$.extend({
  getUrlVars: function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = unescape(hash[1]);
    }
    return vars;
  },
  getUrlVar: function (name) {
    var value = $.getUrlVars()[name];
    if (!value) return '';
    else return value;
  }
});

// Result table column mapping.
var rt_ColumnMapping = {
  array: [
    { index: 0, name: 'id', internal: true },
    { index: 1, name: 'operatorId', internal: true },
    { index: 2, name: 'hotelUrl', internal: true },
    { index: 3, name: 'hotelId', internal: true },
    { index: 4, name: 'townUrl', internal: true },
    { index: 5, name: 'townId', internal: true },
    { index: 6, name: 'tourName', internal: false },
    { index: 7, name: 'hotelName', internal: false },
    { index: 8, name: 'starName', internal: false },
    { index: 9, name: 'roomName', internal: false },
    { index: 10, name: 'mealName', internal: false },
    { index: 11, name: 'htPlaceName', internal: false },
    { index: 12, name: 'checkIn', internal: false },
    { index: 13, name: 'checkOut', internal: false },
    { index: 14, name: 'nights', internal: false },
    { index: 15, name: 'price', internal: false },
    { index: 16, name: 'adults', internal: false },
    { index: 17, name: 'kids', internal: false },
    { index: 18, name: 'operator', internal: false },
    { index: 19, name: 'resortName', internal: false },
    { index: 20, name: 'operatorUrl', internal: true },
    { index: 21, name: 'hotelIsInStop', internal: false },
    { index: 22, name: 'ticketsIsIncluded', internal: false },
    { index: 23, name: 'hasEconomTicketsDpt', internal: false },
    { index: 24, name: 'hasEconomTicketsRtn', internal: false },
    { index: 25, name: 'hasBusinessTicketsDpt', internal: false },
    { index: 26, name: 'hasBusinessTicketsRtn', internal: false },
    { index: 27, name: 'checkInDay', internal: false },
    { index: 28, name: 'checkOutShort', internal: false }
  ],
  getInternalColumns: function () {
    return $.grep(this.array, function (i) { return i.internal == true; });
  },
  getColumn: function (columnName) {
    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].name == columnName) {
        return this.array[i];
      }
    }
    return null;
  }
}

// Replace SRC $module_path$ in HTML templates.
function setSrcInHtml(html) {
  return html.replace(/\$module_path\$/g, mSettings.modulePath.substr(0, mSettings.modulePath.length - 1));
}