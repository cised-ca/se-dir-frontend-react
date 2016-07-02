(function () {
    "use strict";

    var search_form = document.querySelector( ".js-search-form" ),
        search_results = document.querySelector( ".js-search-results" ),
        intro = document.querySelector( ".intro" );

    search_form.addEventListener( "submit", function( e ) {
        e.preventDefault();

        // TODO: Show loading animation
        // TODO: Get results

        // Hide intro
        intro.classList.add( "slide-up" );

        // TODO: We probably won't need the delay once
        //       we fetch remote results
        window.setTimeout( function() {
            // Show results
            search_results.classList.add( "fade-in" );
        }, 1000 );
    } );

}());

