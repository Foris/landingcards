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
    },
    setCard: function($el, card){
      // get card template
      let cardTmpl = methods.getTemplate('card.html');

      // paint card template
      cardTmpl.then((res) => {
        console.info("new card");
        let card_id = 'card-' + card_index;
        $el.append( res({id: card_id}) );
        card_index += 1;

        // set card elements
        let elements = _.keys(card);
        methods.setElements($el, card, elements, card_id);
      })
    },
    setElements: function($el, card, elements, card_id){
      // get element template
      let $card = $el.find('.card[data-id="' + card_id + '"]');
      let eleTmpl;
      let element_id = 'element-' + element_index;

      for(let value of elements){
        switch(value) {
          case 'img':
            eleTmpl = methods.getTemplate('img.html');
            eleTmpl.then((res) => {
              if($card){
                $card.append( res({
                  id: element_id,
                  file: card[value].file,
                  size: card[value].size,
                  url: card[value].url,
                }) );
              }
            })
            break;
          case 'video':
            eleTmpl = methods.getTemplate('video.html');
            eleTmpl.then((res) => {
              if($card){
                $card.append( res({
                  id: element_id,
                  origin: card[value].origin,
                  title: card[value].title,
                  file: card[value].file,
                  poster: card[value].poster
                }) );
              }
            }).then(() => {
              // start events with this video element
              let $element = $card.find('.element[data-id="' + element_id + '"]')
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
          // case 'description':
          //   eleTmpl = methods.getTemplate('description.html');
          //   break;
          // case 'title':
          //   eleTmpl = methods.getTemplate('title.html');
          //   break;
          // case 'accordeon':
          //   eleTmpl = methods.getTemplate('accordeon.html');
          //   break;
          // case 'footer':
          //   eleTmpl = methods.getTemplate('footer.html');
          //   break;
          default:
            // console.error('card element not exist please change ' + value + ' by img, video, description, title, accordeon or footer');
            break;
        }

        // console.log("k: ", value);
        // console.log("k: ", card[value]);
      }

      element_index =+ 1
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
