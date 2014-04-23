/************************************************************************************************/
/********************************intégration iframe 30px****************************************/
/**********************************************************************************************/

 <iframe id="iframe_header_min" scrolling="no" src="" style="width:100%;height:100px;border:none;"></iframe>

<script type="text/javascript">
    var URLFR = encodeURIComponent("http://www.someUrl.com/fr");
    var URLDE = encodeURIComponent("http://www.someUrl.com/de");
    var URLEN = encodeURIComponent("http://www.someUrl.com/en");
    var URLParent = encodeURIComponent(document.location);
    var galaxy = "creative";
    var currentLang = "fr";
    var socialButtons = "true";
    var compact = "true";

    var finalUrl = "http://php4.arte.tv/iframizeds/header_arte_iframe/header_30px/index.php?langFR=" + URLFR + "&langDE=" + URLDE + "&langEN=" + URLEN + "&currentLang=" + currentLang + "&socialButtons=" + socialButtons + "&galaxy=" + galaxy + "&compact=" + compact+ "&URLParent=" + URLParent;
    $("#iframe_header_min").attr('src', finalUrl);
</script>


/*******************************************************************************************************/
/********************************intégration iframe classique*******************************************/
/*******************************************************************************************************/

<iframe id="iframe_header_min" scrolling="no" src="" style="width:100%;height:100px;border:none;"></iframe>

<script type="text/javascript">
    var URLFR = encodeURIComponent("http://www.someUrl.com/fr");
    var URLDE = encodeURIComponent("http://www.someUrl.com/de");
    var URLEN = encodeURIComponent("http://www.someUrl.com/en");
    var URLParent = encodeURIComponent(document.location);
    var galaxy = "creative";
    var currentLang = "fr";
    var socialButtons = "true";
    var compact = "true";

    var finalUrl = "http://php4.arte.tv/iframizeds/header_arte_iframe/header_arteV2_iframe/index.php?langFR=" + URLFR + "&langDE=" + URLDE + "&langEN=" + URLEN + "&currentLang=" + currentLang + "&galaxy=" + galaxy + "&socialButtons=" + socialButtons+ "&URLParent=" + URLParent;
    $("#iframe_header_min").attr('src', finalUrl);
</script>