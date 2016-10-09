
$().ready(function(){

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    // Spinner
    var opts = {
        lines: 13 // The number of lines to draw
        , length: 24 // The length of each line
        , width: 14 // The line thickness
        , radius: 40 // The radius of the inner circle
        , scale: 0.5 // Scales overall size of the spinner
        , corners: 0.5 // Corner roundness (0..1)
        , color: '#000' // #rgb or #rrggbb or array of colors
        , opacity: 0.4 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 33 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '48%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
        }

    var target = document.getElementById('spinner');
    var spinner = new Spinner(opts).spin(target);

    
    $(document).ajaxComplete(function (event, xhr, settings) {
        
        if(xhr.status == 500){
            toastr.error("Erro "+ xhr.responseText);
        };  

        $(target).hide();      
    });

    $.ajaxSetup({
        beforeSend: function(){
            $(target).show();
        },
        success: function(){
            $(target).hide();
        }
    });
    

    window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
        
        var mensagem = errorMsg.split("Uncaught");
        
        if(mensagem.length > 1)
            errorMsg = mensagem[1];

        toastr.error(errorMsg);
        return false;
    }

        

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    Handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });

    Handlebars.registerHelper("ifCond",function(v1,operator,v2,options) {
        switch (operator)
        {
            case "==":
                return (v1==v2)?options.fn(this):options.inverse(this);

            case "!=":
                return (v1!=v2)?options.fn(this):options.inverse(this);

            case "===":
                return (v1===v2)?options.fn(this):options.inverse(this);

            case "!==":
                return (v1!==v2)?options.fn(this):options.inverse(this);

            case "&&":
                return (v1&&v2)?options.fn(this):options.inverse(this);

            case "||":
                return (v1||v2)?options.fn(this):options.inverse(this);

            case "<":
                return (v1<v2)?options.fn(this):options.inverse(this);

            case "<=":
                return (v1<=v2)?options.fn(this):options.inverse(this);

            case ">":
                return (v1>v2)?options.fn(this):options.inverse(this);

            case ">=":
            return (v1>=v2)?options.fn(this):options.inverse(this);

            default:
                return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
        }
    });    

});




