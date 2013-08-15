define(
  [
    'underscore'
  , 'backbone'

  , 'templates'
  ]

, function (
  _
, Backbone

, Templates
){

  var view = {};

  /* ======================================================================= *
   *  ATTRIBUTES                                                             *
   * ======================================================================= */

  /* ======================================================================= *
   *  EVENTS                                                                 *
   * ======================================================================= */

  view.events = {
    'click .increment-counter' : 'onIncrementCounter'
  }

  /* ======================================================================= *
   *  EVENT HANDLERS                                                         *
   * ======================================================================= */  
  view.onIncrementCounter = function(e) {
    this.counter++;
    this.render();
  }

  /* ======================================================================= *
   *  PRIVATE CLASS METHODS                                                  *
   * ======================================================================= */

  /* ======================================================================= *
   *  PUBLIC CLASS METHODS                                                   *
   * ======================================================================= */
  view.render = function() {
    this.$el.html(jade.render('page.view', { counter: this.counter }));
    return this;
  }

  /* ======================================================================= *
   *  VIEW CONSTRUCTOR & INITIALIZATION                                      *
   * ======================================================================= */
  view.initialize = function(options) {
    var that = this;
    _.bindAll(this);
    this.counter = 0;
    
    /* EXAMPLE CODE FOR BINDING COLLECTIONS AND MODELS TO IOBIND */
    /*
    // Fetch the frames collection.
    this.collection = new YYYCollection([], {id: '1234'});
    this.collection.fetch({success: function() {

      // Once we've fetched the collection, ioBind the 'create'
      // method, so that we hear about any new frames that get created.
      that.collection.ioBind('create', that.ioCreatedItem);
    }});

    // Add an itemView for every item added to the collection.
    this.collection.on('add', this.addItemView);

    // Load up our album.
    that.itemId = options.itemId;
    this.item = new Item({id: options.itemId});
    this.item.fetch({success: function() {
      // the album as well is realtime, so bind up the update functions.
      that.item.ioBind('update', that.ioItemUpdate);
      that.item.ioBind('patch', that.ioItemUpdate);
    }});
*/
  }

  /* ======================================================================= */
  /* ======================================================================= */

  return Backbone.View.extend(view);
});
