// Ajax Methods
// Weirdie, 2010
// Robin, 2011

function pauseJS(timeInMilliS)
{
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < timeInMilliS);
}

var mAjax = {
  isDebug: 0,
  ajaxSwitchCurrent: 1,
  ajaxSwitchMax: mSettings.ajaxServer.length,
  userId: null,
  logTimeData: 
  {
    CNT: 0, DTC: 0, CTY: 0, HTL: 0, STR: 0, MLS: 0, OPR: 0
  },
  currentFunction: '',
  
  logTime: function (from)
  {
//    return 0; // not needed anymore
    if (mSettings.debugVersion == false) return;
    var time = new Date().getTime();
	var s = mSettings.ajaxServer[mAjax.ajaxSwitchCurrent-1], t;
    switch(from)
	{
	  case 'CNT':
	  if (mAjax.logTimeData.CNT!=0) { t='Countries: ' + (time - mAjax.logTimeData.CNT) + ' ms [ ' + s + ' ]';
	  mAjax.dictLog(10, time - mAjax.logTimeData.CNT, mAjax.logTimeData.CNT);
	  mAjax.logTimeData.CNT=0; $('#sm_log_CNT').text(t);  }
	  else { mAjax.logTimeData.CNT = time; mAjax.dictLog(10,-1,time); pauseJS(1); }
	  break;
	  
	  case 'DTC':
	  if (mAjax.logTimeData.DTC!=0) { t='Dep. cities: ' + (time - mAjax.logTimeData.DTC) + ' ms [ ' + s + ' ]';
	  mAjax.dictLog(13, time - mAjax.logTimeData.DTC, mAjax.logTimeData.DTC);
	  mAjax.logTimeData.DTC=0; $('#sm_log_DTC').text(t); }
	  else { mAjax.logTimeData.DTC = time; mAjax.dictLog(13,-1,time); pauseJS(1); }
	  break;
	  
	  case 'CTY':
	  if (mAjax.logTimeData.CTY!=0) { t='Cities: ' + (time - mAjax.logTimeData.CTY) + ' ms [ ' + s + ' ]';
	  mAjax.dictLog(11, time - mAjax.logTimeData.CTY, mAjax.logTimeData.CTY);
	  mAjax.logTimeData.CTY=0; $('#sm_log_CTY').text(t); }
	  else { mAjax.logTimeData.CTY = time; mAjax.dictLog(11,-1,time); pauseJS(1); }
	  break;
	  
	  case 'HTL':
	  if (mAjax.logTimeData.HTL!=0) { t='Hotels: ' + (time - mAjax.logTimeData.HTL) + ' ms [ ' + s + ' ]';
	  mAjax.dictLog(4, time - mAjax.logTimeData.HTL, mAjax.logTimeData.HTL);
	  mAjax.logTimeData.HTL=0; $('#sm_log_HTL').text(t);  }
	  else { mAjax.logTimeData.HTL = time; mAjax.dictLog(4,-1,time); pauseJS(1); }
	  break;
	  
	  case 'STR':
	  if (mAjax.logTimeData.STR!=0) { t='Stars: ' + (time - mAjax.logTimeData.STR) + ' ms [ ' + s + ' ]';
	  mAjax.dictLog(3, time - mAjax.logTimeData.STR, mAjax.logTimeData.STR);
	  mAjax.logTimeData.STR=0; $('#sm_log_STR').text(t);  }
	  else { mAjax.logTimeData.STR = time; mAjax.dictLog(3,-1,time); pauseJS(1); }
	  break;
	  
	  case 'MLS':
	  if (mAjax.logTimeData.MLS!=0) { t='Meals: ' + (time - mAjax.logTimeData.MLS) + ' ms [ ' + s + ' ]';
	  mAjax.dictLog(7, time - mAjax.logTimeData.MLS, mAjax.logTimeData.MLS);
	  mAjax.logTimeData.MLS=0; $('#sm_log_MLS').text(t);  }
	  else { mAjax.logTimeData.MLS = time; mAjax.dictLog(7,-1,time); pauseJS(1); }
	  break;
	  
	  case 'OPR':
	  if (mAjax.logTimeData.OPR!=0) {t='Operators: ' + (time - mAjax.logTimeData.OPR) + ' ms [ ' + s + ' ]';
	  mAjax.dictLog(1, time - mAjax.logTimeData.OPR, mAjax.logTimeData.OPR);
	  mAjax.logTimeData.OPR=0; $('#sm_log_OPR').text(t);  }
	  else { mAjax.logTimeData.OPR = time; mAjax.dictLog(1,-1,time); pauseJS(1); }
	  break;
	}
  },
  getCountries: function (templateName, showcase, townFromId, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'getCountries';
//    if(templateName=='') templateName=null;
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	if (!townFromId) townFromId = 0;
//	if(showcase==1) 
/*	var aaaShowcase=0;
	if(typeof _sc != 'undefined') aaaShowcase=1;*/
	mAjax.logTime('CNT');

    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxSwitchTimeout,
      url: mSettings.ajaxServer[mAjax.ajaxSwitchCurrent-1] + 'Main.svc/GetCountries',
      success: function (data) { mAjax.logTime('CNT'); if (data.GetCountriesResult.IsError) { errorCallback(data.GetCountriesResult.ErrorMessage); } else { successCallback(data.GetCountriesResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      callbackParameter: "callback",
      data: { templateName:templateName, debug: mAjax.isDebug, townFromId: townFromId, showcase: showcase, userId: mAjax.userId }
    });
  },
  getDepartCities: function (templateName, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'getDepartCities';
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	var aaaShowcase=0;
	if(typeof _sc != 'undefined') aaaShowcase=1;
	mAjax.logTime('DTC');
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxSwitchTimeout,
      url: mSettings.ajaxServer[mAjax.ajaxSwitchCurrent-1] + 'Main.svc/GetDepartCities',
      success: function (data) { mAjax.logTime('DTC'); if (data.GetDepartCitiesResult.IsError) { errorCallback(data.GetDepartCitiesResult.ErrorMessage); } else { successCallback(data.GetDepartCitiesResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      callbackParameter: "callback",
	  data: { templateName:templateName, debug: mAjax.isDebug, showcase: aaaShowcase, userId: mAjax.userId }
    });
  },
  getGeoTree: function (countryId, successCallback, errorCallback, ajaxErrorCallback, context)		// NOTA BENE
  {
    mAjax.currentFunction = 'getGeoTree';
    if (!countryId) { throw "getGeoTree(): countryId parameter should be specified."; }
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; } if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxSwitchTimeout,
      url: mSettings.ajaxServer[mAjax.ajaxSwitchCurrent-1] + 'Main.svc/GetGeoTree',
      success: function (data) { if (data.GetGeoTreeResult.IsError) { errorCallback(data.GetGeoTreeResult.ErrorMessage); } else { successCallback(data.GetGeoTreeResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      callbackParameter: "callback",
      data: { countryId: countryId }
    });
  },
  getCities: function (countryId, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'getCities';
    if (!countryId) { throw "getCities(): countryId parameter should be specified."; }
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; } if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	mAjax.logTime('CTY');
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxSwitchTimeout,
      url: mSettings.ajaxServer[mAjax.ajaxSwitchCurrent-1] + 'Main.svc/GetCities',
      success: function (data) { mAjax.logTime('CTY'); if (data.GetCitiesResult.IsError) { errorCallback(data.GetCitiesResult.ErrorMessage); } else { successCallback(data.GetCitiesResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      callbackParameter: "callback",
      data: { debug: mAjax.isDebug, countryId: countryId }
    });
  },
  getHotels: function (countryId, cityIds, starIds, filter, successCallback, errorCallback, ajaxErrorCallback, context, all)
  {
    mAjax.currentFunction = 'getHotels';
    if (!countryId) { throw "getHotels(): countryId parameter should be specified."; }
    if (!cityIds) { cityIds = ''; }
    if (!starIds) { starIds = ''; }
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	if (!all) all=100;
	mAjax.logTime('HTL');
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxSwitchTimeout,
      callbackParameter: "callback",
      url: mSettings.ajaxServer[mAjax.ajaxSwitchCurrent-1] + 'Main.svc/GetHotels',
      success: function (data) { mAjax.logTime('HTL'); if (data.GetHotelsResult.IsError) { errorCallback(data.GetHotelsResult.ErrorMessage); } else { successCallback(data.GetHotelsResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      data: { debug: mAjax.isDebug, countryId: countryId, towns: cityIds, stars: starIds, filter: filter, all: all }
    });
  },
  getStars: function (countryId, cityIds, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'getStars';
    if (!countryId) { throw "getStars(): countryId parameter should be specified."; }
    if (!cityIds) { cityIds = ''; }
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	mAjax.logTime('STR');
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxSwitchTimeout,
      callbackParameter: "callback",
      url: mSettings.ajaxServer[mAjax.ajaxSwitchCurrent-1] + 'Main.svc/GetHotelStars',
      success: function (data) { mAjax.logTime('STR'); if (data.GetHotelStarsResult.IsError) { errorCallback(data.GetHotelStarsResult.ErrorMessage); } else { successCallback(data.GetHotelStarsResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      data: { debug: mAjax.isDebug, countryId: countryId, towns: cityIds }
    });
  },
  getMeals: function (successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'getMeals';
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	mAjax.logTime('MLS');
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxSwitchTimeout,
      callbackParameter: "callback",
      url: mSettings.ajaxServer[mAjax.ajaxSwitchCurrent-1] + 'Main.svc/GetMeals',
      success: function (data) { mAjax.logTime('MLS'); if (data.GetMealsResult.IsError) { errorCallback(data.GetMealsResult.ErrorMessage); } else { successCallback(data.GetMealsResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context
    });
  },
  getOperators: function (townFromId, countryId, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'getOperators';
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	if (!townFromId) townFromId = 0;
	if (!countryId) countryId = 0;
	mAjax.logTime('OPR');
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxSwitchTimeout,
      url: mSettings.ajaxServer[mAjax.ajaxSwitchCurrent-1] + 'Main.svc/GetTourOperators',
      success: function (data) { mAjax.logTime('OPR'); if (data.GetTourOperatorsResult.IsError) { errorCallback(data.GetTourOperatorsResult.ErrorMessage); } else { successCallback(data.GetTourOperatorsResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      callbackParameter: "callback",
	  data: { debug: mAjax.isDebug, userId: mAjax.userId, townFromId: townFromId, countryId: countryId}
    });
  },
  saveTourOrder: function (searchRequestId, offerId, sourceId, user, email, phone, info, countryName, cityFromName, currency, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'saveTourOrder';
    if (!searchRequestId) { alert( "saveTourOrder(): searchRequestId parameter should be specified."); }
    if (!offerId) { alert( "saveTourOrder(): offerId parameter should be specified."); }
    if (!sourceId) { alert( "saveTourOrder(): sourceId parameter should be specified."); }
    if (!user) { alert( "saveTourOrder(): user parameter should be specified."); }
    if (!email) { alert( "saveTourOrder(): email parameter should be specified."); }
	if (!phone) { alert( "saveTourOrder(): phone parameter should be specified."); }
    if (!currency) { alert("saveTourOrder(): currency parameter should be specified."); }
    if (!countryName) { alert( "saveTourOrder(): countryName parameter should be specified."); }
    if (!cityFromName) { alert( "saveTourOrder(): cityFromName parameter should be specified."); }
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	var vk_group_id;
    if(typeof VK === 'undefined') vk_group_id=0; else
	{
	  if(VK.params.group_id!=0) vk_group_id=VK.params.group_id;
	  else vk_group_id=-2;
	}
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxOperationTimeout,
      callbackParameter: "callback",
      url: mSettings.mainAjaxServer + 'Main.svc/SaveTourOrder',
      success: function (data) { if (data.SaveTourOrderResult.IsError) { errorCallback(data.SaveTourOrderResult.ErrorMessage); } else { successCallback(data.SaveTourOrderResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      data: { debug: mAjax.isDebug, userId: mAjax.userId, searchRequestId: searchRequestId, offerId: offerId, sourceId: sourceId, user: user, email: email, phone: phone, info: info, countryName: countryName, cityFromName: cityFromName, currencyAlias: currency, vk_group_id: vk_group_id }
    });
  },
  getLoadState: function (searchRequestId, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'getLoadState';
    if (!searchRequestId) { searchRequestId = 0; }
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxOperationTimeout,
      callbackParameter: "callback",
      url: mSettings.mainAjaxServer + 'Main.svc/GetLoadState',
      success: function (data) { if (data.GetLoadStateResult.IsError) { errorCallback(data.GetLoadStateResult.ErrorMessage); } else { successCallback(data.GetLoadStateResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      data: { debug: mAjax.isDebug, requestId: searchRequestId }
    });
  },
  getTours: function ( this_is_fake, 
    searchRequestId, pageSize, pageNumber, countryId, countryName, cityFromId, cityFromName, operatorNames, cities, cityNames,
    meals, mealNames, stars, starNames, hotels, hotelNames, s_adults, s_kids, s_nightsMin, s_nightsMax, s_priceMin, s_priceMax,
    currencyAlias, s_departFrom, s_departTo, hotelIsNotInStop, hasTickets, ticketsIncluded, clearCache, waitSeconds, updateResult, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'getTours';
    if (!searchRequestId) { searchRequestId = 0; }
	if (!updateResult) updateResult=0;
    if (!pageSize) { throw "getTours(): pageSize parameter should be specified."; }
    if (!pageNumber && !_sf.doExtendSearch) { throw "getTours(): pageNumber parameter should be specified."; }
    if (!countryId) { throw "getTours(): countryId parameter should be specified."; }
    if (!countryName) { throw "getTours(): countryName parameter should be specified."; }
    if (!cityFromId) { throw "getTours(): cityFromId parameter should be specified."; }
    if (!cityFromName) { throw "getTours(): cityFromName parameter should be specified."; }
    if (!operatorNames) { operatorNames = []; }
    if (!cities) { cities = ''; }
    if (!cityNames) { cityNames = ''; }
    if (!meals) { meals = ''; }
    if (!mealNames) { mealNames = ''; }
    if (!stars) { stars = ''; }
    if (!starNames) { starNames = ''; }
    if (!hotels) { hotels = ''; }
    if (!hotelNames) { hotelNames = ''; }
    if (!clearCache) clearCache = false;
    if (!waitSeconds) waitSeconds = 1;//mSettings.firstRequestTimeout;
    if (!successCallback) { successCallback = function () { }; }
    /*if (!errorCallback) {*/ errorCallback = this.defaultError; //}
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	var extendSearch = 0;
	if (_sf.doExtendSearch && _sf.lastRequestId)
	{
	  extendSearch = 1;
	  searchRequestId = _sf.lastRequestId;
	  pageNumber = parseInt(_sf.extendSearchPN) + 1;
	}
	
    for (var i = 0; i < mSettings.visibleOperators.length; i++)
	{
      var found = false;
      for (var j = 0; j < operatorNames.length; j++) if (operatorNames[j] == mSettings.visibleOperators[i]) { found = true; break; }
      if (found == false) operatorNames.push(mSettings.visibleOperators[i]);
    }
	var vk_group_id;
    if(typeof VK === 'undefined' || !_sf.vkgId) vk_group_id=0; else
	{
	  if(VK.params.group_id!=0) vk_group_id=VK.params.group_id;
	  else vk_group_id=-2;
	}

    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxOperationTimeout,
      callbackParameter: "callback",
      url: mSettings.mainAjaxServer + 'Main.svc/GetTours',
      success: function (data) { if (data.GetToursResult.IsError) { errorCallback(data.GetToursResult.ErrorMessage); } else { successCallback(data.GetToursResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      data: { debug: mAjax.isDebug, filter: _sf.searchFilterType, f_to_id: _sf.searchFilterData,
	    fake: this_is_fake, vk_group_id: vk_group_id, extend: extendSearch,
        requestId: searchRequestId, userId: mAjax.userId,
        pageSize: pageSize, pageNumber: pageNumber, countryId: countryId,
        countryName: countryName, cityFromId: cityFromId, cityFromName: cityFromName, cities: cities, cityNames: '', meals: meals, mealNames: '', stars: stars,
        starNames: '', hotels: hotels, hotelNames: '', s_adults: s_adults, s_kids: s_kids, s_nightsMin: s_nightsMin, s_nightsMax: s_nightsMax, s_priceMin: s_priceMin,
        s_priceMax: s_priceMax, currencyAlias: currencyAlias, s_departFrom: s_departFrom, s_departTo: s_departTo,
        visibleOperators: (operatorNames.length == 0 ? '' : operatorNames.join(',')),
        hiddenOperators: (mSettings.hiddenOperators.length == 0 ? '' : mSettings.hiddenOperators.join(',')),
        requestTimeout: waitSeconds, s_hotelIsNotInStop: hotelIsNotInStop, s_hasTickets: hasTickets,
		s_ticketsIncluded: ticketsIncluded, s_clearCache: clearCache, updateResult: updateResult
      }
    });
  },
  getActualPrice: function (searchRequestId, countryId, isShowcase, sourceId, offerId, currencyAlias, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'getActualPrice';
    if (!searchRequestId) { searchRequestId = 0; }
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	var vk_group_id;
    if(typeof VK === 'undefined') vk_group_id=0; else
	{
	  if(VK.params.group_id!=0) vk_group_id=VK.params.group_id;
	  else vk_group_id=-2;
	}
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxOperationTimeout,
      callbackParameter: "callback",
      url: mSettings.mainAjaxServer + 'Main.svc/ActualizePrice',
      success: function (data) { if (data.ActualizePriceResult.IsError) { errorCallback(data.ActualizePriceResult.ErrorMessage); } else { successCallback(data.ActualizePriceResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      data: { debug: mAjax.isDebug, sourceId: sourceId, offerId: offerId, currencyAlias: currencyAlias,
	  userId: mAjax.userId, showcase: isShowcase, vk_group_id: vk_group_id, countryId: countryId, requestId: searchRequestId }
    });
  },
  
  getShowcase: function (templateName,
    pageSize, countryId, countryName, cityFromId, cityFromName, s_adults, s_kids, s_nightsMin, s_nightsMax, s_priceMin, s_priceMax,
    currencyAlias, s_departFrom, s_departTo, hotelIsNotInStop, hasTickets, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'getShowcase';
//    if(templateName=='') templateName = null;
    if (!pageSize) { throw "getShowcase(): pageSize parameter should be specified."; }
    if (!countryId) { throw "getShowcase(): countryId parameter should be specified."; }
    if (!countryName) { throw "getShowcase(): countryName parameter should be specified."; }
    if (!cityFromId) { throw "getShowcase(): cityFromId parameter should be specified."; }
    if (!cityFromName) { throw "getShowcase(): cityFromName parameter should be specified."; }
    var operatorNames = [];
	
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
    for (var i = 0; i < mSettings.visibleOperators.length; i++)
	{
      var found = false;
      for (var j = 0; j < operatorNames.length; j++) if (operatorNames[j] == mSettings.visibleOperators[i])
	  {
        found = true;
        break;
      }
      if (found == false) operatorNames.push(mSettings.visibleOperators[i]);
    }
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxOperationTimeout,
      callbackParameter: "callback",
      url: mSettings.mainAjaxServer + 'Main.svc/GetTours',
      success: function (data) { if (data.GetToursResult.IsError) { errorCallback(data.GetToursResult.ErrorMessage); } else { successCallback(data.GetToursResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      data: { templateName:templateName, debug: mAjax.isDebug, 
	    userId: mAjax.userId,
        pageSize: pageSize, pageNumber: 1, countryId: countryId,
        countryName: countryName, cityFromId: cityFromId, cityFromName: cityFromName,
        s_adults: s_adults, s_kids: s_kids, s_nightsMin: s_nightsMin, s_nightsMax: s_nightsMax, s_priceMin: s_priceMin,
        s_priceMax: s_priceMax, currencyAlias: currencyAlias, s_departFrom: s_departFrom, s_departTo: s_departTo,
        visibleOperators: (operatorNames.length == 0 ? '' : operatorNames.join(',')),
        hiddenOperators: (mSettings.hiddenOperators.length == 0 ? '' : mSettings.hiddenOperators.join(',')),
        requestTimeout: mSettings.sc.firstRequestTimeout, s_hotelIsNotInStop: hotelIsNotInStop, s_hasTickets: hasTickets, s_showcase: 'true'
      }
    });
  },
  getShowcaseReview: function (templateName,
    cityFromName, s_adults, s_kids, s_nightsMin, s_nightsMax, s_priceMin, s_priceMax,
    currencyAlias, s_departFrom, s_departTo, hotelIsNotInStop, hasTickets, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    if(templateName=='') templateName = null;
    mAjax.currentFunction = 'getShowcaseReview';
    if (!cityFromName) { throw "getShowcaseReview(): cityFromName parameter should be specified."; }
    var operatorNames = [];
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
    for (var i = 0; i < mSettings.visibleOperators.length; i++) {
      var found = false;
      for (var j = 0; j < operatorNames.length; j++) {
        if (operatorNames[j] == mSettings.visibleOperators[i]) {
          found = true;
          break;
        }
      }
      if (found == false) {
        operatorNames.push(mSettings.visibleOperators[i]);
      }
    }
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxOperationTimeout,
      callbackParameter: "callback",
      url: mSettings.mainAjaxServer + 'Main.svc/GetShowcaseReview',
      success: function (data) { if (data.GetShowcaseReviewResult.IsError) { errorCallback(data.GetShowcaseReviewResult.ErrorMessage); } else { successCallback(data.GetShowcaseReviewResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      data: { debug: mAjax.isDebug, templateName: templateName,
	    userId: mAjax.userId,
        cityFromName: cityFromName,
        s_adults: s_adults, s_kids: s_kids, s_nightsMin: s_nightsMin, s_nightsMax: s_nightsMax, s_priceMin: s_priceMin,
        s_priceMax: s_priceMax, currencyAlias: currencyAlias, s_departFrom: s_departFrom, s_departTo: s_departTo,
        visibleOperators: (operatorNames.length == 0 ? '' : operatorNames.join(',')),
        hiddenOperators: (mSettings.hiddenOperators.length == 0 ? '' : mSettings.hiddenOperators.join(',')),
        requestTimeout: mSettings.sc.firstRequestTimeout, s_hotelIsNotInStop: hotelIsNotInStop, s_hasTickets: hasTickets
      }
    });

  },
  reportError: function (countryId, cityFromId, sourceId, offerId, currencyAlias, errorType, errorMessage, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    mAjax.currentFunction = 'reportError';
    var uid;
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
	if (!mAjax.userId) uid='00000000-0000-0000-0000-000000000000';
	else uid=mAjax.userId;
    $.jsonp({
      charset: mSettings.serverCharset,
      timeout: mSettings.ajaxOperationTimeout,
      callbackParameter: "callback",
      url: mSettings.mainAjaxServer + 'Main.svc/ReportError',
      success: function (data) { if (data.ReportErrorResult.IsError) { errorCallback(data.ReportErrorResult.ErrorMessage); } else { successCallback(data.ReportErrorResult.Data, context); } },
      error: ajaxErrorCallback,
      context: context,
      data: { debug: mAjax.isDebug, 
        countryId: countryId, dptCityId: cityFromId, userId: uid, requestId: _sf.lastRequestId,
        currencyAlias: currencyAlias, sourceId: sourceId, offerId: offerId, errorType: errorType, errorMessage: errorMessage
      }
    });
  },
  vkLog: function (vk_user_id, vk_group_id, vk_viewer_id, vk_is_search, successCallback, errorCallback, ajaxErrorCallback, context)
  {
    if (!successCallback) { successCallback = function () { }; }
    if (!errorCallback) { errorCallback = this.defaultError; }
    if (!ajaxErrorCallback) { ajaxErrorCallback = this.defaultAjaxError; }
    $.jsonp({
      charset: "UTF-8",
      timeout: 5000,
      callbackParameter: "callback",
      url: mSettings.mainAjaxServer + 'Main.svc/VkLog',
      success: successCallback,
      error: ajaxErrorCallback,
      context: context,
      data: { vk_user_id: vk_user_id, vk_group_id: vk_group_id, vk_viewer_id: vk_viewer_id, vk_is_search: vk_is_search }
    });
  },
  dictLog: function (dict_id, elapsed, key)
  {
    $.jsonp({
      charset: "UTF-8",
      timeout: 5000,
      callbackParameter: "callback",
      url: 'http://sm2.sletat.ru:81/util_06.php',
      success: function () { },
      error: null,
      context: null,
      data: { dict_id: dict_id, elapsed: elapsed, session_id: key }
    });
  },
  opFilterLogTime: 0,
  opFilterLog: function (op_op)
  {
    // 1 - close; 2 - open; 3 - filter
    var time = new Date().getTime();
    if(time-mAjax.opFilterLogTime<80) return false;
    mAjax.opFilterLogTime = time;
    $.jsonp({
      charset: "UTF-8",
      timeout: 5000,
      callbackParameter: "callback",
      url: 'http://sm2.sletat.ru:81/util_08.php',
      success: function () { },
      error: null,
      context: null,
      data: { op_op: op_op, requestId: _sf.lastRequestId }
    });
  },
  logSourceClick: function(sourceId, countryId)
  {
    $.jsonp({
      charset: "UTF-8",
      timeout: 5000,
      callbackParameter: "callback",
      url: mSettings.mainAjaxServer + 'Main.svc/LogSourceClick',
      success: function () { },
      error: null,
      context: null,
      data: { sourceId:sourceId, countryId:countryId }
    });
  },
  defaultError: function (msg)
  {
    if(_sf.module_style=='generic') $.jsonp(
    {
      charset: "UTF-8",
      timeout: 10000,
      callbackParameter: "callback",
      url: 'http://sm2.sletat.ru:81/util_05.php',
      success: function () { },
      error: null, context: null,
      data: { type: 'general', msg: msg, url: mSettings.ajaxServer[mAjax.ajaxSwitchCurrent-1], caller: mAjax.currentFunction }
    });
    if(typeof _sf != 'undefined')
	{
      _sf.hideLoadingLayer();
	  _sf.toggleOpHint(2);
      alert(msg);
	}
    $('#sm_popup_error').html(msg);
    $('#sm_popup_error').fadeIn().delay(4000).fadeOut();
  },
  defaultAjaxError: function (request, text, error)
  {
    $('#sm_popup_error').html("Не удалось выполнить запрос '" + request.url + "'<br>Вероятно, сервер занят. Пожалуйста, подождите.");
	$('#sm_popup_error').fadeIn().delay(3500).fadeOut();
  }
}

function reportOp(a,b,c) // operatorUrl, operatorId, countryId
{
  mAjax.logSourceClick(b,c);
  window.open(a,"_blank");
  alert(a);
}

