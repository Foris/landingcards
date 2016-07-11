// dwFilter
(function( $ ){
  "use strict"
  var scripts = document.getElementsByTagName("script");
  var urlBase = scripts[scripts.length-1].src;
  urlBase = urlBase.replace('landingcards.js', '');

  // some glocal vars
  let cards;

  // Public methods
  let api = {
    init : function(options) {
      const $el = $(this);
      methods.getCards($el, options);
    },
    destroy: function(){
      // const $el = $(this);
      // $el.empty();
      // $el.removeClass('landingcards');
    }
  }

  // Private methods
  let methods = {
    getCards: function($el, options){
      let jsonUri = './' + options.data;
      // get cards data
      fetch(jsonUri).then(function(response) {
      	// Convert to JSON
      	return response.json();
      }).then(function(response) {
        cards = response.cards
        methods.initCards($el, options)
      }).catch(function(err) {
        console.error(err)
      });
    },
    initCards: function($el, options){
      console.log("cards: ", cards);
    }
  }

  // Events
  var events = {};

  // jquery component stuff
  $.fn.landingcards = function(methodOrOptions) {
      if ( api[methodOrOptions] ) {
          return api[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ))
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
          // Default to "init"
          return api.init.apply( this, arguments )
      } else {
          $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.landingcards' )
      }
  };


})( jQuery )
