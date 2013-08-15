define(
  [
    'underscore'
  , 'backbone'
  ]
, function(_, Backbone) {
  
  var model = {};
  
  /* ======================================================================= *
   *  MODEL ATTRIBUTES                                                       *
   * ======================================================================= */
  
  /* ======================================================================= *
   *  PUBLIC CLASS METHODS                                                   *
   * ======================================================================= */

  model.url = function() {
    if(this.get('id'))
      return 'item/' + this.get('id');
    else
      return 'item';
  }

  /* ======================================================================= *
   *  CONSTRUCTOR & INITIALIZATION                                           *
   * ======================================================================= */
  
  model.initialize = function () {
    _.bindAll(this);
  };
  
  /* ======================================================================= */
  /* ======================================================================= */
  
  return Backbone.Model.extend(model);
});