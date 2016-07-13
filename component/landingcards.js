// landingcards
(function( $ ){
  "use strict"
  var scripts = document.getElementsByTagName("script");
  var urlBase = scripts[scripts.length-1].src;
  urlBase = urlBase.replace('landingcards.js', '');

  // some glocal vars
  let cards;
  let card_index = 0;
  let element_index = 0;

  // Public methods
  let api = {
    init : function(options) {
      const $el = $(this);
      $el.attr('class','landingcards');
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
      // get card elements
      console.log("cards: ", cards);
      cards.forEach(function(card){
        methods.setCard($el, card, options)
      })
      // reset card count
      card_index = 0;
    },
    setCard: function($el, card){
      // get card template
      let cardTmpl = _.template('<div class="card" data-id="<%- id %>"></div>');

      console.info("new card");
      let card_id = 'card-' + card_index;
      $el.append( cardTmpl({id: card_id}) );
      card_index += 1;

      // set card elements
      let elements = _.keys(card);
      methods.setElements($el, card, elements, card_id);
    },
    setElements: function($el, card, elements, card_id){
      // get element template
      let $card = $el.find('.card[data-id="' + card_id + '"]');
      let eleTmpl;

      // reset element counter
      element_index = 0;

      for(let value of elements){
        console.log("elements size: ", _.size(elements) );
        // paint element with id
        let element_id = 'element-' + element_index;
        let elementTmpl = _.template('<div class="element" data-id="<%- id %>"></div>');
        $card.append( elementTmpl({id: element_id }) );

        let $element = $card.find('.element[data-id="' + element_id + '"]');

        switch(value) {
          case 'img':
            eleTmpl = methods.getTemplate('img.html');
            eleTmpl.then((res) => {
              if($card){
                $element.append( res({
                  file: card[value].file,
                  size: card[value].size,
                  url: card[value].url,
                }) ).addClass('image');
              }
            })
            break;
          case 'video':
            eleTmpl = methods.getTemplate('video.html');
            eleTmpl.then((res) => {
              if($card){
                $element.append( res({
                  origin: card[value].origin,
                  title: card[value].title,
                  file: card[value].file,
                  poster: card[value].poster
                }) ).addClass('video');
              }
            }).then(() => {
              // start events with this video element
              switch(card[value].origin){
                case 'vimeo':
                  events.startVideoVimeo($element);
                  break;
                case 'youtube':
                  console.log("TODO: support youtube video");
                  break;
                default:
                  console.error("specified video origin - local, vimeo or youtube");
              }
            })
            break;
          case 'description':
            eleTmpl = methods.getTemplate('description.html');
            eleTmpl.then((res) => {
              if($card){
                $element.append( res({
                  type: card[value].type,
                  text: card[value].text
                }) ).addClass('description');
              }
            })
            break;
          case 'title':
            eleTmpl = methods.getTemplate('title.html');
            eleTmpl.then((res) => {
              if($card){
                $element.append( res({
                  type: card[value].type,
                  text: card[value].text
                }) ).addClass('title');
              }
            })
            break;
          case 'accordeon':
            eleTmpl = methods.getTemplate('accordeon.html');
            eleTmpl.then((res) => {
              if($card){
                $element.append( res({
                  id: element_id,
                  title: card[value].title,
                  cards: card[value].cards
                }) ).addClass('accordeon');
              }
            })
            break;
          // case 'footer':
          //   eleTmpl = methods.getTemplate('footer.html');
          //   break;
          default:
            // console.error('card element not exist please change ' + value + ' by img, video, description, title, accordeon or footer');
            break;
        }
        // add 1 to next element in current card
        console.log("element index: ", element_index);
        element_index += 1;
      }
    },
    getTemplate: function(name){

      return new Promise(function(resolve, reject){
          $.get(urlBase + "templates/" + name, function( result ) {
            resolve(_.template(result));
          }).fail(function() {
            reject('no template')
          });
        }
      );
    }
  }

  // Events
  var events = {
    startVideoVimeo: function($element){
      let poster = $element.find('.video-poster');
      poster.click(function(){
        events.showVideoVimeo($element);
      })
    },
    showVideoVimeo: function($element){
      let iframe = $element.find('.video-modal iframe')[0];
      let player = $f(iframe);

      // show modal
      $element.find('.video-modal').show();

      // play video
      player.api('play')
      console.log("player: ", player);

      let back = $element.find('.back');
      back.click(function(){
        $element.find('.video-modal').hide();
        player.api('pause')
      })

    }
  };

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
