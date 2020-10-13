(function () {
    var emitEvent = function (state) {
            window.dispatchEvent(new CustomEvent('dtEvent', {
                detail: {o: state}
            }));
        },
        delay = 1000;

    window.addEventListener('dtEvent', function (e) {
        console.log('is DevTools open?', e.detail.o);
        window.location.href = 'https://google.com';
    });

    var withGetter = function () {
        var el = new Image,
            d = false;

        if (el.__defineGetter__) {
            el.__defineGetter__("id", function() {
                d = true;
            });

            setInterval(function() {
                d = false;
                console.log(el); //don't remove
                d && emitEvent(true);
            }, delay);
        }
    };

    var withDDetector = function () {
        var d = {
                o: false,
                or: null
            },
            th = 160;

        setInterval(function () {
            var wTh = window.outerWidth - window.innerWidth > th,
                hTh = window.outerHeight - window.innerHeight > th,
                or = wTh ? 'v' : 'h';

            if (!(hTh && wTh) &&
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || wTh || hTh)) {
                if (!d.o || d.or !== or) {
                    emitEvent(true, or);
                }

                d.o = true;
                d.or = or;
            } else {
                if (d.o) {
                    emitEvent(false, null);
                }

                d.o = false;
                d.or = null;
            }
        }, delay);
    };

    withGetter();
    withDDetector();
})();
