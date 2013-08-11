//http://debuggable.com/posts/how-to-write-jquery-plugins:4f72ab2e-7310-4a74-817a-0a04cbdd56cb
;(function($, doc, win) {
  "use strict";

  var name = 'js-widget';

  function Widget(el, opts) {
    this.$el      = $(el);
    this.$el.data(name, this);

    this.defaults = {};

    var meta      = this.$el.data(name + '-opts');
    this.opts     = $.extend(this.defaults, opts, meta);

    this.init();
  }

  Widget.prototype.init = function() {
  };

  Widget.prototype.destroy = function() {
    this.$el.off('.' + name);
    this.$el.find('*').off('.' + name);
    this.$el.removeData(name);
    this.$el = null;
  };

  $.fn.widget = function(opts) {
    return this.each(function() {
      new Widget(this, opts);
    });
  };

  $(doc).on('dom_loaded ajax_loaded', function(e, nodes) {
    var $nodes = $(nodes);
    var $elements = $nodes.find('.' + name);
    $elements = $elements.add($nodes.filter('.' + name));

    $elements.widget();
  });
})(jQuery, document, window);
