(function(){

  'use strict';

  window.BX24 = {};

  var customBitrixEndPont  =  "/wp-admin/admin-ajax.php" ;

  BX24.callMethod = function(Method, params, callback){

        /*Basic Param check*/
        if(typeof Method !== 'string'){
              throw new Error("BX24 Method must be a string");
              return;
        }

        if(typeof params !== 'object'){
              throw new Error("BX24 Params must be an object");
              return;
        }

        if(typeof callback !== 'function'){
              throw new Error("BX24 Callback must be a callable function");
              return;
        }
        /*end Param check*/



        /*the response object*/
        var response = {

            bx24_error:   false,
            bx24_data:    false,
            bx24_more:    false,
            bx24_next:    false,


            setError:function(error)    { this.bx24_error =  error },
            setData:function(data)      { this.bx24_data = data },

            error:function()  { return this.bx24_error; },
            data:function()   { return this.bx24_data; },
            more:function()   { return this.bx24_more; },
            next:function()   { return this.bx24_next; },


        };
        /*end response object*/



      /*the ajax call*/
      $.ajax({
        url: customBitrixEndPont,
        method:"POST",
        data: {'action':'custom_bx24_call', 'method':Method, 'params':JSON.stringify(params)},
        success: function(data){

                if(data.hasOwnProperty('error')){
                    response.setError( data.error_description );
                }
                else{
                    response.setData( data );
                }

                callback(response)
                return;


        },///end of success

        error: function (request, status, error) {
          response.setError( "Error making the request "+ request +" " + status + " "+ error);
          callback(response)
          return;
        }
      });///end of ajax


  };///end of BX24.callMethod


})();
