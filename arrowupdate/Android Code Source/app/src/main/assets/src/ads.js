var integration = {}
integration.showBanner = function() {
    if (!integration.ads) {
        try {
            Android.showAndroidBanner()
        } catch (e) {
            console.log(e)
        }
    } else {}
}
integration.showInterstitial = function() {
    if (!integration.ads) {
        try {
            Android.showAd()
        } catch (e) {
            console.log(e)
        }
    } else {}
}
integration.showRewardedAd = function() {
    if (!integration.ads) {
        try {
            Android.showRewardedAd();
        } catch (e) {
            // Android bridge unavailable (e.g. browser preview) — give reward directly
            integration.rewarded();
        }
    } else {
        integration.rewarded();
    }
}
integration.rewarded = function() {
    window.pendingReward = true;
};
integration.adClosed = function() {
    console.log("pendingReward:", window.pendingReward);
    console.log("pendingSkill:", window.pendingSkill);
    console.log("mainLayer:", window.mainLayer);
}
integration.noRewardedAdAvailable = function() {
    // Called by Java when no rewarded ad is loaded or no internet connection.
    // No reward is granted. Show a message to the player if needed.
    console.log("No rewarded ad available");
    if (typeof window.onNoRewardedAd === "function") {
        window.onNoRewardedAd();
    }
}

integration.landscape = function (){
    try{
        Android.landscape()
    }catch(e){
        console.log(e)
    }
}

integration.portrait = function (){
    try{
        Android.portrait()
    }catch(e){
        console.log(e)
    }
}


integration.removeAds = function(){
    try{
        Android.removeAds()
    }catch(e){
        console.log(e)
    }
}

integration.ads = false
integration.itsads = function(n){
    if(n == 1){
        integration.hideBanner()
        integration.ads = true
    }else{
        integration.ads = false
    }
}