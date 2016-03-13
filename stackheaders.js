(function ($){
  var _model;

  function stackHeadersGlobal(){
    var _instances = [];

    function init(instance){

    }

    function add(target, opts){
      //default options
      var _opts = {

      };

      var instance = {
          el: target,
          $el: $(target),
          header: $( '.stack-header', target ),
          opts: $.extend( _opts, opts )
      };

      _instances.push(instance);
      init(instance);
    }

    function scroll(evt){
      _instances.forEach(function(item, index){
        var rect = item.el.getBoundingClientRect();

        //is visible
        if( rect.top < 0 && rect.bottom > 0){
          var itemHeight = item.header.height();
          item.header.addClass('fixed');
          item.$el.css('padding-top', itemHeight );

          //if scrolling past the top of the window
          var headerDiff = rect.bottom - itemHeight;
          if( headerDiff < 0 ){
            item.header.css('top', headerDiff );
          }else{
            item.header.css('top', '' );
          }

        }else{
          item.header.removeClass('fixed');
          item.$el.css('padding-top', '' );
          item.header.css('top', '' );
        }
      });
    }

    document.addEventListener("scroll", scroll, false);

    //expose functions
    return {
      add:add,
      refresh:scroll
    }
  }

  var stackHeadersMain = function(userOpts){
    if(_model === undefined){
      _model = stackHeadersGlobal();
    }

    if(userOpts === 'refresh'){
      return _model.refresh();
    }

    if ( this.hasOwnProperty('length') ){
      if(this.length > 0){
        // merge arrays
        for (var i = 0; i < this.length; i++) {
          _model.add(this[i], userOpts);
        }
      }
    } else if (typeof this === "object"){
      _model.add(this, userOpts);
    }

    _model.refresh();
  };


  if($.fn.stackHeaders === undefined){
    $.fn.stackHeaders = stackHeadersMain;
  }
})(jQuery);
