/* 
    jlStyleSheet - jQuery plugin
    ==================================================================
    ©2010 JasonLau.biz - Version 1.0.4
    ==================================================================
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

$.fn.jlstylesheet = function(settings){
	var options = jQuery.extend({
	   cookieName: 'jlstylesheet',
       cookieOptions: {expires:365},
       defaultTheme: '',
       directory: '',
       extension: '.css',
       onHover: function(){},
       onSelect: function(){},
       onSwitch: function(){},
       themePreview: true
       }, settings);    
    
    if(!$.cookie(options.cookieName) || $.cookie(options.cookieName) == ''){
        if(options.defaultTheme != ''){
           switchTheme(options.defaultTheme, false);  
        }      
    } else if($.cookie(options.cookieName) != ''){       
       switchTheme($.cookie(options.cookieName), false);
    }
    
    if(options.themePreview){
        $('.jlstylesheet-option').hover(function(){
            switchTheme($(this).attr('rel'), true);
            try{
            options.onHover();
        } catch(e){}        
        },function(){
            if($.cookie(options.cookieName) == '' || !$.cookie(options.cookieName)){
                // no default theme set - remove the stylesheet
                $("link.jlstylesheet-theme").remove();    
            } else {
                switchTheme($.cookie(options.cookieName), true);
            }                    
        });       
    }
    
    $('.jlstylesheet-option').click(function(){
        switchTheme($(this).attr('rel'), false);
        try{
            options.onSelect();
        } catch(e){}
    });
             
    function switchTheme(theme, preview){
        if(preview){
          $("head").append('<link href="' + options.directory + theme + options.extension + '" type="text/css" rel="Stylesheet" class="jlstylesheet-theme" />');				
		  if( $("link.jlstylesheet-theme").size() > 3){
		      $("link.jlstylesheet-theme:first").remove();
        }  
        } else {
         $.cookie(options.cookieName, theme, options.cookieOptions);
		$("head").append('<link href="' + options.directory + theme + options.extension + '" type="text/css" rel="Stylesheet" class="jlstylesheet-theme" />');				
		if( $("link.jlstylesheet-theme").size() > 3){
			$("link.jlstylesheet-theme:first").remove();
		}
        try{
            options.onSwitch();
        } catch(e){}   
        }
        	
	}         
};

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};