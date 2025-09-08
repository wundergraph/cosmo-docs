(function () {
    function updateFromOsano() {
        var m = !!(window.Osano && Osano.cm && Osano.cm.marketing);
        var a = !!(window.Osano && Osano.cm && Osano.cm.analytics);
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('consent', 'update', {
            ad_storage: m ? 'granted' : 'denied',
            ad_user_data: m ? 'granted' : 'denied',
            ad_personalization: m ? 'granted' : 'denied',
            analytics_storage: a ? 'granted' : 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted'
        });
    }
    if (window.Osano && Osano.cm) {
        updateFromOsano();
        Osano.cm.addEventListener('osano-cm-consent-changed', updateFromOsano);
        Osano.cm.addEventListener('osano-cm-marketing', updateFromOsano);
        Osano.cm.addEventListener('osano-cm-analytics', updateFromOsano);
    } else {
        window.addEventListener('osano-cm-initialized', updateFromOsano, { once: true });
    }
})();