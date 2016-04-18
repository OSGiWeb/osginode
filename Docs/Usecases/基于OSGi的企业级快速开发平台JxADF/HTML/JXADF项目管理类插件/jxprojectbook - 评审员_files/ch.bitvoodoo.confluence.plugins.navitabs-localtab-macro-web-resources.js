try {
/* module-key = 'ch.bitvoodoo.confluence.plugins.navitabs:localtab-macro-web-resources', location = 'ch/bitvoodoo/confluence/plugins/navitabs/scripts/localtab-macro.js' */
AJS.toInit(function(b){var c=b("html, body");if(window.location.hash.length>0){a(window.location.hash)}b("a[href^='#']").not("li.menu-item > a").click(function(f){var d=b(this).attr("href");window.location.hash=d;a(d);f.preventDefault()});function a(d){var e=b("ul.tabs-menu a[href="+d+"]");if(e.length>0){AJS.tabs.change(e);c.animate({scrollTop:e.closest("div.localtabs-macro").offset().top},500)}}});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


