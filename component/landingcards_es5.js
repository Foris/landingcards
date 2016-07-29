"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};!function(e){var t=document.getElementsByTagName("script"),a=t[t.length-1].src;a=a.replace("landingcards_es5.js",""),a=a.replace("landingcards.js","");var n=void 0,i=void 0,o=0,r=0,d=0,c={init:function(t){var a=e(this);a.attr("class","landingcards"),s.getCards(a,t)},destroy:function(){}},s={getCards:function(t,a){var o="./"+a.data;e.getJSON(o,function(e){n=e.cards,i=e.settings,s.initCards(t,a),s.settings(t,a)})},initCards:function(e,t){n.forEach(function(a){s.setCard(e,a,t)}),o=0},setCard:function(e,t){var a=_.template('<div class="card" data-id="<%- id %>"></div>');console.info("new card");var n="card-"+o;e.append(a({id:n})),o+=1;var i=_.keys(t);s.setElements(e,t,i,n)},setElements:function(e,t,n,i){var o=e.find('.card[data-id="'+i+'"]'),c=void 0;r=0;var p=!0,f=!1,m=void 0;try{for(var u,v=function(){var e=u.value,i="element-"+r,p=_.template('<div class="element" data-id="<%- id %>"></div>');o.append(p({id:i}));var f=o.find('.element[data-id="'+i+'"]');switch(e){case"form":c=s.getTemplate("form_inputs.html");var m=(t.settings.action,"form_"+d);f.append('<form name="'+m+'" action="#"></form>'),t[e].forEach(function(e){c.then(function(t){f.find("form").append(t({type:e.type,name:e.name,text:e.text,required:e.required})),f.addClass("form")}).then(function(){"submit"==e.type&&l.startForm(m,t.settings)})}),d+=1;break;case"slide":c=s.getTemplate("slide.html"),c.then(function(n){o&&f.append(n({hideNav:t[e].hideNav,direction:t[e].direction,urlBase:a})).addClass("slide")}).then(function(){console.log("card[value].data: ",t[e].data);var a=f.find(".slide_box .content");a.landingcards({data:t[e].data}),l.startSlide(f,t)});break;case"background":/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?o.css({background:"url("+t[e].file_mobile+") no-repeat center center fixed"}):o.css({background:"url("+t[e].file+") no-repeat center center fixed"}),o.css({"-webkit-background-size":"cover"}),o.css({"-moz-background-size":"cover"}),o.css({"-o-background-size":"cover"}),o.css({"background-size":"cover"}),f.remove();break;case"topnav":c=s.getTemplate("topnav.html"),c.then(function(n){o&&f.append(n({type:t[e].type,urlBase:a})).addClass("topnav")}).then(function(){l.startTopnav(f,t)});break;case"img":c=s.getTemplate("img.html"),c.then(function(a){o&&f.append(a({file:t[e].file,size:t[e].size,url:t[e].url})).addClass("image")});break;case"video":c=s.getTemplate("video.html"),c.then(function(a){o&&f.append(a({origin:t[e].origin,title:t[e].title,file:t[e].file,poster:t[e].poster,poster_mobile:t[e].poster_mobile})).addClass("video")}).then(function(){switch(t[e].origin){case"vimeo":l.startVideoVimeo(f);break;case"youtube":console.info("TODO: support youtube video");break;default:console.error("specified video origin - local, vimeo or youtube")}});break;case"description":c=s.getTemplate("description.html"),c.then(function(a){o&&f.append(a({type:t[e].type,text:t[e].text})).addClass("description")});break;case"title":c=s.getTemplate("title.html"),c.then(function(a){o&&f.append(a({type:t[e].type,text:t[e].text})).addClass("title")});break;case"accordeon":c=s.getTemplate("accordeon.html"),c.then(function(a){o&&f.append(a({title:t[e].title})).addClass("accordeon")}).then(function(){var a=f.find(".accordeon-box .content");a.landingcards({data:t[e].data}),l.startAccordeon(f)});break;case"footer":c=s.getTemplate("footer.html"),c.then(function(a){o&&f.append(a({logo:t[e].logo,address_img:t[e].address_img,address:t[e].address,phone_img:t[e].phone_img,phone:t[e].phone,email_img:t[e].email_img,email:t[e].email})).addClass("footer")});break;case"mockup":f.append('<div class="mockups_container"></div>');var v=f.find(".mockups_container");v.mockups({type:t[e].type,img:t[e].file,adjust:!1,reflection:!0});break;default:console.error("card element not exist please change "+e+" by img, video, description, title, accordeon or footer")}r+=1,s.cardTemplateRules(t,o,n)},g=n[Symbol.iterator]();!(p=(u=g.next()).done);p=!0)v()}catch(h){f=!0,m=h}finally{try{!p&&g["return"]&&g["return"]()}finally{if(f)throw m}}},cardTemplateRules:function(e,t,a){var n=a.toString();switch(n){case"img":t.attr("data-tmpl","image-main");break;case"video":t.attr("data-tmpl","video-main");break;case"description":t.attr("data-tmpl","description-main");break;case"title":t.attr("data-tmpl","title-news");break;case"accordeon":t.attr("data-tmpl","accordeon-main");break;case"title,description,mockup":t.attr("data-tmpl","title-description-mockup");break;case"img,title,description":t.attr("data-tmpl","img-title-description");break;case"img,title,description,background":t.attr("data-tmpl","img-title-description-background");break;case"title,description":t.attr("data-tmpl","title-description");break;case"footer":t.attr("data-tmpl","footer")}},settings:function(e,t){s.cardsTemplate(e)},cardsTemplate:function(e){e.attr("data-template",i.template)},getTemplate:function(t){return new Promise(function(n,i){e.get(a+"templates/"+t,function(e){n(_.template(e))}).fail(function(){i("no template")})})},getFormData:function(t){return new Promise(function(a,n){var i={},o=t.find("input");o.each(function(){var t=e(this),a=t.attr("type"),n=t.attr("name"),o=t.val();"submit"!=a&&(i[n]=o,console.log("data_obj: ",i))}),a(i)})}},l={startForm:function(t,a){var n=e('[name="'+t+'"]'),i=a.type,o=a.action;switch(i){case"php":n.click(function(t){if(console.log("ok?: ",this.checkValidity()),this.checkValidity()){t.preventDefault();var a=s.getFormData(n);a.then(function(a){e.ajax({data:a,type:"POST",dataType:"html",url:o}).done(function(a,n,i){console.log("data: ",a),e(t.target).closest(".slide").find(".next").click()}).fail(function(e,t,a){console&&console.log&&console.log("La solicitud a fallado: "+t)})})}else{var i=navigator.userAgent.toLowerCase();i.indexOf("safari")!=-1&&(i.indexOf("chrome")>-1||(t.preventDefault(),alert("Existe un error en algún campo.")))}});break;default:console.error("the "+i+" type is not supported yet.")}},startSlide:function(e,t){var a=(t.slide.data,0),n=e.find(".next"),i=e.find(".prev");i.click(function(){l.slidePrev(e,a,t),a-=1}),n.click(function(){l.slideNext(e,a,t),a+=1})},slidePrev:function(e,t,a){e.find(".card").fadeOut(600),e.find('[data-id="card-'+parseInt(t-1)+'"]').delay(800).fadeIn(),l.checkNav(e,t-1,a)},slideNext:function(e,t,a){e.find(".card").fadeOut(600),e.find('[data-id="card-'+parseInt(t+1)+'"]').delay(800).fadeIn(),l.checkNav(e,t+1,a)},checkNav:function(e,t,a){var n=a.slide.hideNav,i=e.find(".next"),o=e.find(".prev"),r=parseInt(e.find(".card").size()-1);0==t?(o.addClass("hide"),n?i.addClass("hide"):(i.addClass("hide"),i.removeClass("hide"))):t==r?(o.removeClass("hide"),i.addClass("hide")):(o.removeClass("hide"),n?i.addClass("hide"):i.removeClass("hide"))},startTopnav:function(e,t){var a=t.topnav.type,n=t.topnav.legend,i=t.topnav.url;switch(a){case"prev":e.find(".legend_left").html(n),e.find("a").attr("href",i);break;default:console.error("type not support!")}},startAccordeon:function(e){var t=e.find(".accordeon-title"),a=e.find(".accordeon-box"),n=t.find(".toggle-arrow");t.click(function(){a.toggleClass("hide"),n.toggleClass("close")})},startVideoVimeo:function(e){var t=e.find(".video-poster");t.click(function(){l.showVideoVimeo(e)})},showVideoVimeo:function(e){var t=e.find(".video-modal iframe"),a=new Vimeo.Player(t);a.ready().then(function(){e.find(".video-modal").show(),a.play();var t=e.find(".back");t.click(function(){e.find(".video-modal").hide(),a.pause()})})}};e.fn.landingcards=function(t){return c[t]?c[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!==("undefined"==typeof t?"undefined":_typeof(t))&&t?void e.error("Method "+t+" does not exist on jQuery.landingcards"):c.init.apply(this,arguments)}}(jQuery);