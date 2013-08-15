define(
  [ 'underscore'
  , 'backbone'

  , './views/page.view'

  , 'backbone.iobind'
  , 'backbone.iosync'
  , 'jquery.transit'
  ]
, function(
    _
  , Backbone

  , PageView
) {

  var exports = {}

  /**************************************************************************/

  exports.init = function(options) {
    // Connect up!
    Backbone.socket = io.connect();
    // Initialize
    var page = new PageView( {
      el: $('body')
    });
    page.render();
  }

  /*************************************************************************/

  return exports;

});
