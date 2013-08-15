define(
  [
    'underscore'
  , 'backbone'

  , 'models/item.model'
  , 'templates'
  ]

, function (
  _
, Backbone

, ItemModel

, Templates
){

  var view = {};

  /* ======================================================================= *
   *  ATTRIBUTES                                                             *
   * ======================================================================= */
  view.className = 'row'

  /* ======================================================================= *
   *  EVENTS                                                                 *
   * ======================================================================= */

  view.events = {
    'click .delete' : 'onDeleteItem'
  , 'click .update' : 'onUpdateItem'
  }

  /* ======================================================================= *
   *  EVENT HANDLERS                                                         *
   * ======================================================================= */  
  view.onDeleteItem = function() {
    console.log('button delete')
    this.model.destroy();
    this.remove();
  }

  view.onUpdateItem = function() {
    console.log('save')
    this.model.set('text', this.$('.text').val());
    this.model.save();
  }

  /* ======================================================================= *
   *  PRIVATE CLASS METHODS                                                  *
   * ======================================================================= */
  view.ioUpdate = function(attributes) {
    console.log('ioupdate')
    this.model.set(attributes, {silent: true});
    this.render();
  }

  view.ioDelete = function() {
    console.log('ioDelete')
    this.remove();
    this.model.trigger('destroy')
  }

  /* ======================================================================= *
   *  PUBLIC CLASS METHODS                                                   *
   * ======================================================================= */
  view.render = function() {
    console.log('render')
    this.$el.html(jade.render('item.view', { model: this.model.attributes }));
    return this;
  }

  /* ======================================================================= *
   *  VIEW CONSTRUCTOR & INITIALIZATION                                      *
   * ======================================================================= */
  view.initialize = function(options) {
    var that = this;
    _.bindAll(this);

    this.model = options.model;
    console.log('model', this.model.id)
    if(!this.model.isNew()) {
      console.log('bound ', this.model.id)
      this.model.ioBind('update', that.ioUpdate);
      this.model.ioBind('patch', that.ioUpdate);
      this.model.ioBind('delete', that.ioDelete)      
    }
    else {
      this.model.once('sync', function() {
        console.log('OH BOUND')
        that.model.ioBind('update', that.ioUpdate);
        that.model.ioBind('patch', that.ioUpdate);
        that.model.ioBind('delete', that.ioDelete)      
      })
    }
    
  }

  /* ======================================================================= */
  /* ======================================================================= */

  return Backbone.View.extend(view);
});
