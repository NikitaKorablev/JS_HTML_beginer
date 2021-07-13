function IE_hotel(hUrl){var hWnd=window.open(hUrl,'_blank','width=896,height=820,status=no,menubar=no,location=no,directories=no,toolbar=no,scrollbars=yes');}
function strpos(haystack,needle,offset){var i=(haystack+'').indexOf(needle,(offset||0));return i===-1?false:i;}

var _sf =
{
  module_style: 'generic',
  moduleVersion: "1.09.1",
  module_meals: false,
  hotelsLoadSize: 100,
  
  cCountry: null, cFromCity: null, tCities: null, tHotels: null, tHotel: null, tMeals: null, tStars: null, tOperators: null,
  isFirstRequest: false, lastRequestId: 0,
  isDepartCitiesLoaded: false, isCountriesLoaded: false,
  isResultTableHtmlLoaded: false, isOrderHtmlLoaded: false,
  resultPageLength: 20,
  resultTable: null,
  lastLoadedData: null,
  isUrlHotelSet: false, isUrlCitySet: false, isUrlOperatorSet: false, isUrlMealSet: false, isUrlStarSet: false,
  lastLoadState: null, lastNewLoadState: null, lastLoadStateTimer: null, lastCurrencyAlias: null,
  table: null,
  clearCache: false,
  skipLoadWaiting: false,
  columns: ['checkIn','nights','resortName','hotelName','hotelIsInStop','mealName','htPlaceName','operator','hasEconomTicketsDpt','hasBusinessTicketsDpt','price'],
    
  rt_ColumnMapping:
  {
    array:
    [
      { index: 0, name: 'id', internal: true },
      { index: 1, name: 'operatorId', internal: true },
      { index: 2, name: 'hotelUrl', internal: true },
      { index: 3, name: 'hotelId', internal: true },
      { index: 4, name: 'townUrl', internal: true },
      { index: 5, name: 'townId', internal: true },
      { index: 6, name: 'tourName', internal: false },
      { index: 7, name: 'hotelName', internal: false },
      { index: 8, name: 'starName', internal: false },
      { index: 9, name: 'roomName', internal: false },
      { index: 10, name: 'mealName', internal: false },
      { index: 11, name: 'htPlaceName', internal: false },
      { index: 12, name: 'checkIn', internal: false },
      { index: 13, name: 'checkOut', internal: false },
      { index: 14, name: 'nights', internal: false },
      { index: 15, name: 'price', internal: false },
      { index: 16, name: 'adults', internal: false },
      { index: 17, name: 'kids', internal: false },
      { index: 18, name: 'operator', internal: false },
      { index: 19, name: 'resortName', internal: false },
      { index: 20, name: 'operatorUrl', internal: true },
      { index: 21, name: 'hotelIsInStop', internal: false },
      { index: 22, name: 'ticketsIsIncluded', internal: false },
      { index: 23, name: 'hasEconomTicketsDpt', internal: false },
      { index: 24, name: 'hasEconomTicketsRtn', internal: false },
      { index: 25, name: 'hasBusinessTicketsDpt', internal: false },
      { index: 26, name: 'hasBusinessTicketsRtn', internal: false },
      { index: 27, name: 'checkInDay', internal: false },
      { index: 28, name: 'checkOutShort', internal: false }
    ],
    getInternalColumns: function ()
	{
      return $.grep(this.array, function (i) { return i.internal == true; });
    },
    getColumn: function (columnName)
	{
      for (var i = 0; i < this.array.length; i++) if (this.array[i].name == columnName) return this.array[i];
      return null;
    }
  },

  init: function ()
  {
    if($.browser.webkit||$.browser.opera) $('body').addClass('css-webkit');
    if($.browser.mozilla) $('body').addClass('css-ffox');
    if($.browser.msie) $('body').addClass('css-msie');
    if (mSettings.fm.dateFromExt >= mSettings.fm.dateToExt) alert('Начальные даты для формы поиска заданы неверно (DateFrom >= DateTo).');
    if ($.getUrlVar('STA') == '1') _sf.module_STA=true;
	$.ajax({ url: mSettings.modulePath + 'templates/SearchForm.htm', success: _sf.afterInit });
    $.ajax({ url: mSettings.modulePath + 'templates/SearchResult.htm', success: function (data)
	{
      $('#sm_SearchResult').html(_sf.setSrcInHtml(data));
      _sf.table = $('#sm_result_table');
      $('#sm_stat_close_link').click(function() { $('#sm_stat_info').hide(); return false; });
      $('body').click(function() { $('#sm_stat_info').hide(); });
      $('#sm_stat_info').click(function(e) { e.stopPropagation(); });
      _sf.isResultTableHtmlLoaded = true;
    }
    });
    $.ajax({ url: mSettings.modulePath + 'templates/SearchOrder.htm', success: function (data)
    {
      $('body').append(_sf.setSrcInHtml(data));
      
      $('#sm_close_order_form').click(function () { $.colorbox.close(); $('#sm_dialog').hide(); return false; });
      _sf.isOrderHtmlLoaded = true;
      var form = $('#sm_order_form');
      if (form.length > 0)
	  {
        form.validate(
		{
          rules:
		  {
            sm_user: { required: true },
            sm_email: { required: true, email: true },
            sm_phone: { required: true }
          },
          messages:
		  {
            sm_user: { required: 'Укажите контактное лицо' },
            sm_email: { required: 'Укажите адрес электронной почты', email: 'Адрес электронной почты указан некорректно' },
            sm_phone: { required: 'Укажите контактный телефон' }
          },
          submitHandler: _sf.sendTourOrder,
          errorElement: 'em',
          wrapper: 'li',
          errorLabelContainer: '#sm_tour_order_error'
        });
      }
      $('#sm_send_error').click(function () { _sf.reportError(); return false; });
      if (mAjax.userId)
	  {
        $('#sm_show_report_form').show();
        $('#sm_show_report_form').click(function () { _sf.showReportErrorForm(); return false; });
      }
      else $('#sm_show_report_form').hide();

      $('body').click(function () { $('#sm_report_error').hide(); });
      $('#sm_report_error').click(function (e) { e.stopPropagation(); });
	  $('#sm_HasFlight').click(function(){if(!$('input[name=sm_HasFlight_n]').is(':checked'))$('input[name=sm_HasTickets_n]').attr('checked',false);});
	  $('#sm_HasTickets').click(function(){if($('input[name=sm_HasTickets_n]').is(':checked'))$('input[name=sm_HasFlight_n]').attr('checked',true);});
	  
//	  $('#sm_table_counter').html('<iframe src="http://www.airsoftinfo.ru/mod/count.php" width="0" height="0" scrolling="no" frameborder="0">');
	  $('#sm_mini_error2').hover(function(){$('#sm_mini_error2').stop(true,true).fadeIn(0);},function(){return true;});
	  $('#sm_reperr_text textarea').click(function()
	  {
	    $(this).text('');
	    $(this).css({'color':'#333'});
	    $('#sm_reperr_text textarea').unbind("click");
	  });
	  $('#sm_reperr_close').click(function(){$('#sm_mini_error').fadeOut(0);return false;});
	  $('#sm_reperr_show').click(function(){$('#sm_mini_error2').fadeOut(0);$('#sm_mini_error').fadeIn(0);});
	  
	  $('#sm_reperr_send').click(function()
	  {
        var offerId = $('#sm_mini_error').data('offerId');
        var sourceId = $('#sm_mini_error').data('sourceId');
        var errorType = 0;
		// 0 - unknown; 1 - link; 2 - price; 3 - descr; 4 - price & descr;
		if($('#sm_reperr_descr').is(':checked')) errorType+=3;
		if($('#sm_reperr_price').is(':checked')) errorType+=1;
		
        mAjax.reportError( $('#sm_country').data('uid'), $('#sm_city').data('uid'), sourceId, offerId, $('#sm_currency').text(), errorType, 
		function ()
		{
		  if ($('#sm_reperr_text textarea').val() == 'Есть подробности?') return 'подробности не указаны';
		  else return $('#sm_reperr_text textarea').val();
		},
        function ()
	    {
	      $('#sm_mini_error').hide();
          alert('Сообщение об ошибке отправлено.\nБольшое спасибо!');
	      return false;
        });
	  });
    }
    });
    
  //  _sf.fillTree();
  },

  afterInit: function (data, status, request)
  {
    $('#sm_SearchForm').html(_sf.setSrcInHtml(data));
    _sf.parseExtendedFormUrl();
    _sf.cCountry = $('#sm_country')[0];
    _sf.cFromCity = $('#sm_city')[0];
    _sf.tCities = $('#sm_resort_list')[0];
    _sf.tHotels = $('#sm_hotels_list')[0];
    _sf.tHotel = $('#sm_search_hotels')[0];
    if (_sf.module_meals==true) _sf.tMeals = $('#sm_meal')[0];
	else _sf.tMeals = $('#sm_meals_list')[0];
    _sf.tStars = $('#sm_stars_list')[0];
    if (_sf.module_style == 'generic')
    {
      _sf.tOperators = $('#sm_operators_list')[0];
      _sf.tNightsMin = $('#sm_nights_min_list')[0];
      _sf.tNightsMax = $('#sm_nights_max_list')[0];
    }
    $('#sm_adults,#sm_kids,#sm_nights_min,#sm_nights_max,#sm_price_min,#sm_price_max').filter_input({ regex: '[0-9]' });
    $('#sm_date_from').val(_sf.DateFormat(new Date(), mSettings.fm.dateFromExt)).filter_input({ regex: '[0-9/]' });
    $('#sm_date_to').val(_sf.DateFormat(new Date(), mSettings.fm.dateToExt)).filter_input({ regex: '[0-9/]' });
    var numericUps = $('#sm_nights_min_up,#sm_nights_max_up,#sm_adults_up,#sm_kids_up');
    var numericDns = $('#sm_nights_min_dn,#sm_nights_max_dn,#sm_adults_dn,#sm_kids_dn');
    numericUps.add(numericDns).data("minValue", 0).data("maxValue", 99);
    numericUps.click(function()
	{
      var tb = $('#' + this.id.substring(0, this.id.length - 3));
      var val = parseInt($(tb).val());
      var maxVal = parseInt($(this).data('maxValue'));
      if (isNaN(val)) val = 1;
      if (val < maxVal) $(tb).val(val + 1);
    });
    numericDns.click(function()
	{
      var tb = $('#' + this.id.substring(0, this.id.length - 3));
      var val = parseInt($(tb).val());
      var minVal = parseInt($(this).data('minValue'));
      if (isNaN(val)) val = 1;
      if (val > minVal) $(tb).val(val - 1);
    });
    var cssbug = 1;
    if(_sf.module_style=='generic') cssbug = Array(1,2);
    $('#sm_date_from, #sm_date_to').datepicker(
    {
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      minDate: new Date(),
      numberOfMonths: cssbug,
      nextText: "Далее",
      prevText: "Назад",
      onClose: function (dateText, inst)
	  {
        if (this.id == 'sm_date_from')
		{
          var dateFrom = $.datepicker.parseDate('dd/mm/yy', dateText);
          var dateTo = $.datepicker.parseDate('dd/mm/yy', $('#sm_date_to').val());
          if (dateFrom >= dateTo)
		  {
            $('#sm_date_to').val($.datepicker.formatDate('dd/mm/yy', new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + 1)));
          }
		  $('#sm_date_to').datepicker("option", "minDate", dateFrom);
		  $('#sm_date_to').datepicker("option", "maxDate", new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + 45));
		  $('#sm_date_to').datepicker("show");
        }
        else if (this.id == 'sm_date_to')
		{
          var dateFrom = $.datepicker.parseDate('dd/mm/yy', $('#sm_date_from').val());
          var dateTo = $.datepicker.parseDate('dd/mm/yy', dateText);
          if (dateTo < dateFrom)
		  {
            $('#sm_date_from').val($.datepicker.formatDate('dd/mm/yy', new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate() )));
          }
        }
      }
    });
	$('#sm_date_to').datepicker("option", "maxDate", "+45d");
	
    $('#sm_date_from_cal').click(function ()
	{
      $('#sm_date_from').datepicker('show');
      return false;
    });
    $('#sm_date_to_cal').click(function ()
	{
      $('#sm_date_to').datepicker('show');
      return false;
    });
    var ups = $('#sm_nights_min_up,#sm_nights_max_up,#sm_adults_up,#sm_kids_up');
    var dns = $('#sm_nights_min_dn,#sm_nights_max_dn,#sm_adults_dn,#sm_kids_dn');
    ups.add(dns).dblclick(function () { this.click(); });
    $('#sm_currency,#sm_currency_open').click(function ()
	{
      _sf.closeAllPopups('sm_select_currency');
      $('#sm_select_currency').toggle();
      $('#sm_select_currency').position({ collision: 'none', my: 'right top', at: 'right bottom', of: $('#sm_currency_open'), offset: '1 1' });
      return false;
    });
    _sf.makeListLive('sm_select_currency', null, _sf.currencySelected);
    $(_sf.tHotel).keyup(_sf.loadHotels);
    $(_sf.tHotel).click(function()
	{
//	  _sf.hotelsLoadSize=-1;
	  var s = $('#sm_search_hotels').val();
	  if(s.indexOf("...",0) != -1) { $('#sm_search_hotels').val(''); $(_sf.loadHotels); }
	});
    $('#sm_searching').click(function()
    {
      if(!_sf.validateForm()) return false;
      _sf.biscuitPairs(1);
      _sf.module_STA = false;
      _sf.patch04 = false;
      _sf.findClicked();
      return false;
    });
	$(document).keydown(function(e)
	{
	  if(e.which==17) isCtrl=true;
	  if(e.which==18) isAlt=true;
	  if(e.keyCode=='13' && isCtrl && mSettings.debugVersion) { _sf.clearCache = true; _sf.findClicked(); }
	  if(e.keyCode=='79' && isAlt) { _sf.toggleOpHint(0); }
	  if(e.keyCode=='27')
	  {
	    if($('#sm_ophint').css('left')=="-20px") $('#sm_ophint').animate({"left": "-=180px"}, 400, function()
	    {
          $('#sm_ophint_but').attr('src','/module/styles/images/ophint_but.png');
        });
	  }
	});
	$(document).keyup(function(e) { if(e.which==17) isCtrl=false; });

    _sf.loadDepartCities();
    
/* new DDB controls */

    $('#sm_nights_min, #sm_nights_min_open').click(function ()
	{
      _sf.closeAllPopups('sm_select_nights_min');
      $('#sm_select_nights_min').show();
      $('#sm_select_nights_min').position({ collision:'none', my: 'right top', at: 'right bottom', of: $('#sm_nights_min_open'), offset: '0 1' });
      return false;
    });
    
    $('#sm_nights_max, #sm_nights_max_open').click(function ()
	{
      _sf.closeAllPopups('sm_select_nights_max');
      $('#sm_select_nights_max').show();
      $('#sm_select_nights_max').position({ collision:'none', my: 'right top', at: 'right bottom', of: $('#sm_nights_max_open'), offset: '0 1' });
      return false;
    });
    
    var html = '', s;
    for(var i=1;i<30;i++)
    {
      if(i==7||i==10||i==14) s = "<b>"+i+"</b>"; else s = i;
      html += '<li onclick="_sf.nightsMinSelected(\''+i+'\')">'+s+'</li>';
    }
    $('#sm_select_nights_min_list').html(html);
    var html = '';
    for(var i=1;i<30;i++)
    {
      if(i==7||i==10||i==14) s = "<b>"+i+"</b>"; else s = i;
      html += '<li onclick="_sf.nightsMaxSelected(\''+i+'\')">'+s+'</li>';
    }
    $('#sm_select_nights_max_list').html(html);
    
/* end of new DDB controls */

    $('body').click(function () { _sf.closeAllPopups(); });
    $('#sm_select_city_list, #sm_select_country_list, #sm_select_currency').click(function (e) { e.stopPropagation(); });
	$('#sm_version').text('версия '+_sf.moduleVersion);
	if ($.getUrlVar('debug') == '1') { $('#sm_log_times').show(); mAjax.isDebug = 1; }
	if ($.getUrlVar('adv') == 'show') { $('#sm_antidnep').show(); $('#sm_ophint').hide(); }
	
	$('#AnotherIdiotIdea2 #yes').click(function()
	{
	  _sf.patch04 = 1;
	  _sf.loadToursInit(2);
	  $('#AnotherIdiotIdea, #AnotherIdiotIdea2').hide();
	});
	
	$('#AnotherIdiotIdea2 #no').click(function()
	{
	  $('#AnotherIdiotIdea, #AnotherIdiotIdea2').hide();
	});
	
	_sf.afterInitCustom();
  },
  
  nightsMinSelected: function (e)
  {
    $('#sm_nights_min').data('uid', e);
    $('#sm_nights_min').text(e);
    _sf.closeAllPopups();
  },

  nightsMaxSelected: function (e)
  {
    $('#sm_nights_max').data('uid', e);
    $('#sm_nights_max').text(e);
    _sf.closeAllPopups();
  },

  validateForm: function ()
  {
    var dateFrom = $.datepicker.parseDate('dd/mm/yy', $('#sm_date_from').val());
    var dateTo = $.datepicker.parseDate('dd/mm/yy', $('#sm_date_to').val());
    var nightsMin = parseInt($('#sm_nights_min').val());
    var nightsMax = parseInt($('#sm_nights_max').val());
    var priceMin = parseInt($('#sm_price_min').val());
    var priceMax = parseInt($('#sm_price_max').val());
    var adults = parseInt($('#sm_adults').val());
    var kids = parseInt($('#sm_kids').val());
    
    if(_sf.module_style=='generic')
    {
      nightsMin = parseInt($('#sm_nights_min').text(),10);
      nightsMax = parseInt($('#sm_nights_max').text(),10);
    }
		
    if (dateFrom > dateTo) { alert('Интервал дат вылета указан неверно, поправьте даты и повторите поиск.'); return false; }
    if (isNaN(nightsMin)) { alert('Значение поля "ночей от" указано неверно, поправьте его и повторите поиск.'); return false; }
    if (isNaN(nightsMax)) { alert('Значение поля "ночей до" указано неверно, поправьте его и повторите поиск.'); return false; }
    if (nightsMin > nightsMax){alert('Интервал количества ночей в отеле указан неверно, поправьте значения полей и повторите поиск.');return false;}
    if ($('#sm_price_min').val()>99999999 || $('#sm_price_max').val()>99999999) { alert('Значение поля "цена от" указано неверно, поправьте его и повторите поиск.'); return false; }
    if ($('#sm_price_min').val() != '' && isNaN(priceMin)) { alert('Значение поля "цена от" указано неверно, поправьте его и повторите поиск.'); return false; }
    if ($('#sm_price_max').val() != '' && isNaN(priceMax)) { alert('Значение поля "цена до" указано неверно, поправьте его и повторите поиск.'); return false; }
    if (!isNaN(priceMin) && !isNaN(priceMax) && priceMin > priceMax) { alert('Диапазон стоимости тура указан неверно, поправьте значения полей и повторите поиск.'); return false; }
    if($('#sm_adults').val()!=''&& isNaN(adults)){alert('Значение поля "взрослых" указано неверно, поправьте его и повторите поиск.');return false;}
    if ($('#sm_kids').val() != '' && isNaN(kids)) { alert('Значение поля "детей" указано неверно, поправьте его и повторите поиск.');return false;}
    return true;
  },

  closeAllPopups: function (skipThis)
  {
    var popups = ['sm_select_currency', 'sm_select_country', 'sm_select_city', 'sm_select_nights_min', 'sm_select_nights_max'];
    for (var i = 0; i < popups.length; i++) if (popups[i] != skipThis) $('#' + popups[i]).hide();
	$('#sm_popup_status').hide();
  },

  findClicked: function ()
  {
    if(_sf.resultTable) _sf.resultTable.dataTableSettings[0]._iRecordsTotal = 0;    // awful patch :/
    $('#sm_loaded_count').text(0);
    _sf.lastLoadState = null;
    _sf.lastNewLoadState = null;
    _sf.patch01 = 0;
    _sf.searchFilterType = 0;
	_sf.searchFilterData = 0;
	
    _sf.closeAllPopups();
	$('#sm_ophint').show();
	if (!_sf.doExtendSearch)
	{
	  $("#sm_ophint_td1 img").each(function(i)
	  {
	    $(this).attr('src','/module/styles/images/ld4.gif');
      });
	  _sf.toggleOpHint(1);
	}
    if (!_sf.isCountriesLoaded) { alert('Список стран ещё не загружен. Пожалуйста, подождите.'); return false; }
    if (!_sf.isDepartCitiesLoaded) { alert('Список городов ещё не загружен. Пожалуйста, подождите.'); return false; }
	_sf.fillStat(2);			// temporary
    if (mSettings.fm.showResultOnSamePage)
	{
      _sf.showLoadingLayer();
      _sf.loadToursInit(1);
	  return false;				// first run
    }
    else { _sf.loadToursOnNewPage(); return false; }
  },

  afterInitBack: function ()
  {
    _sf.loadCities();
    _sf.loadHotelsInfo();
  },

  getItem: function (itemName, items)
  {
    for (var i = 0; i < items.length; i++) if (items[i].name == itemName) return items[i].value;
    return null;
  },

  getVisibleColumnIndex: function (column)
  {
    var index = 0;
    for (var i = 0; i < _sf.rt_Columns.length; i++)
	{
      if (_sf.rt_Columns[i] == column) return index;
      if (_sf.rt_Columns[i].internal == false) index++;
    }
    return -1;
  },

  getQueryString: function ()
  {
    var query = '?STA=1';
    var countryId = $('#sm_country').data('uid');
    if (countryId && countryId != '') query += '&country=' + escape(countryId);
    if ($('#sm_country').text() != '') query += '&countryName=' + escape($('#sm_country').text());
    var cityId = $('#sm_city').data('uid');
    if (typeof cityId != 'undefined') if (cityId && cityId != '') query += '&cityFrom=' + escape(cityId);
    if ($('#sm_city').length>0) if ($('#sm_city').text() != '') query += '&cityFromName=' + escape($('#sm_city').text());
    if (_sf.module_style=='generic')
    {
      if(_sf.checkedElements(_sf.tOperators.id)) query+='&operatorNames='+_sf.getCheckedValues(_sf.tOperators.id).join(',');
    }  

    if (typeof _sf.tCities != 'undefined') if (_sf.checkedElements(_sf.tCities.id))
	{
      query += '&cities=' + _sf.getCheckedValues(_sf.tCities.id).join(',');
      query += '&cityNames=' + _sf.getCheckedValues(_sf.tCities.id).join(',');
    }	
    if(_sf.module_meals)
	{
	  if (_sf.checkedElements('sm_select_meal_list'))
      {
        query += '&meals=' + _sf.getCheckedValues('sm_select_meal_list').join(',');
        query += '&mealNames=' + _sf.getCheckedValues('sm_select_meal_list').join(',');
      }
	}
	else
	{
	  var mealId = $('#sm_meal').data('uid');
      if (mealId && mealId != '') query += 'meals=' + escape(mealId);
      if ($('#sm_meal').text() != '') query += '&mealNames=' + escape($('#sm_meal').text());
	}
    if (typeof _sf.tStars != 'undefined') if (_sf.checkedElements(_sf.tStars.id))
	{
      query += '&stars=' + _sf.getCheckedValues(_sf.tStars.id).join(',');
      query += '&starNames=' + _sf.getCheckedValues(_sf.tStars.id).join(',');
    }
    if (typeof _sf.tHotels != 'undefined') if (_sf.checkedElements(_sf.tHotels.id))
	{
      query += '&hotels=' + _sf.getCheckedValues(_sf.tHotels.id).join(',');
      query += '&hotelNames=' + _sf.getCheckedValues(_sf.tHotels.id).join(',');
    }

    if ($('#sm_adults').val() != '') query += '&adults=' + escape($('#sm_adults').val());
    if ($('#sm_kids').val() != '') query += '&kids=' + escape($('#sm_kids').val());
    if ($('#sm_nights_min').length>0) if ($('#sm_nights_min').val() != '') query += '&nightsMin=' + escape($('#sm_nights_min').val());
    if ($('#sm_nights_min').length>0) if ($('#sm_nights_max').val() != '') query += '&nightsMax=' + escape($('#sm_nights_max').val());
    if ($('#sm_date_from').val() != '') query += '&dateFrom=' + escape($('#sm_date_from').val());
    if ($('#sm_date_to').val() != '') query += '&dateTo=' + escape($('#sm_date_to').val());
    if ($('#sm_price_min').val() != '') query += '&priceFrom=' + escape($('#sm_price_min').val());
	
    if ($('#sm_price_max').val() != '') query += '&priceTo=' + escape($('#sm_price_max').val());
    query += '&currency=' + $('#sm_currency').text();
	
	if ($('#sm_HotelIsNotInStop').length>0)
	{
      query += '&hotelIsNotInStop=' + $('#sm_HotelIsNotInStop').attr("checked");
      query += '&hasTickets=' + $('#sm_HasTickets').attr("checked");
      query += '&hasFlight=' + $('#sm_HasFlight').attr("checked");
	}
	else query += '&hotelIsNotInStop=true&hasTickets=true&hasFlight=true';
    return query;
  },

  loadToursInit: function (firstRun)
  {  
    if (_sf.validateForm() || _sf.module_STA)
	{
	  if(firstRun==1) $('#sm_result_table_wrapper').hide();
	  if(firstRun==0)
	  {
	    _sf.updateResult = true;
		_sf.isFirstRequest = false;
	  }
	  if(firstRun==1)
	  {
	    _sf.updateResult = false;
		if(!_sf.doExtendSearch) _sf.lastRequestId = 0;
		_sf.isFirstRequest = true;
	  }
	  if(firstRun==2)
	  {
	    _sf.updateResult = true;
		_sf.isFirstRequest = true;
	  }
      $('#sm_progress').hide();
      $('#sm_stat_info').hide();
      if (_sf.lastLoadStateTimer != null) clearTimeout(_sf.lastLoadStateTimer);
      _sf.lastNewLoadState = null;
      _sf.loadTours((_sf.doExtendSearch)?_sf.extendSearchPN:1);
    }
    else _sf.hideLoadingLayer();
  },

  loadTours: function (page)
  {
    if ($.getUrlVar('STA') == '1' && _sf.module_result) _sf.module_STA=true;
    if (!_sf.isResultTableHtmlLoaded) return;
    if (!_sf.resultTable)
	{
	  if($.getUrlVar('moduleStyle')=='mini') _sf.module_style = 'mini';
	  var miniDateTo = _sf.DateFormat($.datepicker.parseDate('dd/mm/yy', (_sf.module_STA) ? $.getUrlVar('dateFrom') : $('#sm_date_from').val() ), mSettings.sm.dateToExt);
      _sf.resultTable = $(_sf.table).dataTable(
	  {
        'bPaginate': true,
        'bLengthChange': false,
        'bFilter': false,
        'bSort': false,
        'bInfo': true,
        'bAutoWidth': false,
        'bSortClasses': false,
        'bServerSide': true,
        'bProcessing': false,
        'iDisplayLength': _sf.resultPageLength,
        'fnServerData': function (source, data, fnCallback)
		{
          mAjax.getTours(
		    _sf.fake,
            _sf.lastRequestId, _sf.resultPageLength, (_sf.getItem('iDisplayStart', data) / _sf.resultPageLength) + 1, // QQQ			
            (_sf.module_STA) ? $.getUrlVar('country') : $('#sm_country').data('uid'),
			(_sf.module_STA) ? $.getUrlVar('countryName') : $('#sm_country').text(),
            (_sf.module_STA) ? $.getUrlVar('cityFrom') : $('#sm_city').data('uid'),
			(_sf.module_STA) ? $.getUrlVar('cityFromName') : $('#sm_city').text(),
            (_sf.module_style=='generic') ? _sf.getCheckedNames(_sf.tOperators.id) : null,
            (_sf.module_STA) ? $.getUrlVar('cities') : (_sf.module_style=='mini') ? $('#sm_resort').data('uid') : _sf.getCheckedValues(_sf.tCities.id).join(','),
            (_sf.module_STA) ? $.getUrlVar('cityNames') : (_sf.module_style=='mini') ? $('#sm_resort').text() : _sf.getCheckedNames(_sf.tCities.id).join(','),
            (_sf.module_STA) ? $.getUrlVar('meals') : (_sf.module_style=='mini') ? '' : (_sf.module_meals==true) ? _sf.getCheckedValues('sm_select_meal_list').join(',') : _sf.getCheckedValues(_sf.tMeals.id).join(','),
            (_sf.module_STA) ? $.getUrlVar('mealNames') : (_sf.module_style=='mini') ? '' : (_sf.module_meals==true) ? _sf.getCheckedNames('sm_select_meal_list').join(',') : _sf.getCheckedNames(_sf.tMeals.id).join(','),
			
            (_sf.module_STA) ? $.getUrlVar('stars') : (_sf.module_style=='mini') ? '' : _sf.getCheckedValues(_sf.tStars.id).join(','),
            (_sf.module_STA) ? $.getUrlVar('starNames') : (_sf.module_style=='mini') ? '' : _sf.getCheckedNames(_sf.tStars.id).join(','),
            (_sf.module_STA) ? $.getUrlVar('hotels') : (_sf.module_style=='mini') ? $('#sm_hotel').data('uid') : _sf.getCheckedValues(_sf.tHotels.id).join(','),
            (_sf.module_STA) ? $.getUrlVar('hotelNames') : (_sf.module_style=='mini') ? $('#sm_hotel').text() : _sf.getCheckedNames(_sf.tHotels.id).join(','),
            (_sf.module_STA) ? $.getUrlVar('adults') : $('#sm_adults').val(),
			(_sf.module_STA) ? $.getUrlVar('kids') : $('#sm_kids').val(),
            (_sf.module_style=='generic') ? $('#sm_nights_min').text() : (_sf.module_STA) ? $.getUrlVar('nightsMin') : $('#sm_nights_min').val(),
			(_sf.module_style=='generic') ? $('#sm_nights_max').text() : (_sf.module_style=='mini') ? 31 : (_sf.module_STA) ? $.getUrlVar('nightsMax') : $('#sm_nights_max').val(),
            (_sf.doExtendSearch) ? _sf.extendSearchValue : (_sf.module_style=='mini') ? '': (_sf.module_STA) ? $.getUrlVar('priceFrom') : $('#sm_price_min').val(),
			(_sf.module_STA) ? $.getUrlVar('priceTo') : $('#sm_price_max').val(),
            (_sf.module_STA) ? $.getUrlVar('currency') : $('#sm_currency').text(),
            (_sf.module_STA) ? $.getUrlVar('dateFrom') : $('#sm_date_from').val(),
			(_sf.module_style=='mini') ? miniDateTo : (_sf.module_STA) ? $.getUrlVar('dateTo') : $('#sm_date_to').val(),
            (_sf.module_style=='mini') ? true : (_sf.module_STA) ? $.getUrlVar('hotelIsNotInStop') : $('#sm_HotelIsNotInStop')[0].checked,
			(_sf.module_style=='mini') ? true : (_sf.module_STA) ? $.getUrlVar('hasTickets') : $('#sm_HasTickets')[0].checked,
			(_sf.module_style=='mini') ? true : (_sf.module_STA) ? $.getUrlVar('hasFlight') : $('#sm_HasFlight')[0].checked,
			
            _sf.clearCache, _sf.skipLoadWaiting ? 1 : null, (_sf.updateResult==true) ? 1 : null,
            function (data, status, request)
			{
              _sf.lastCurrencyAlias = (_sf.lastCurrencyAlias) ? $('#sm_currency').text() : $.getUrlVar('currency');
              _sf.skipLoadWaiting = false;
              _sf.clearCache = false;
              _sf.lastLoadedData = data.aaData;
              _sf.lastLoadState = data.loadState;
              _sf.showLoadState();
              _sf.lastRequestId = data.requestId;
			  
			  if(_sf.module_style=='generic') setTimeout('_sf.genericTimeout=1;', 4900);	// wait for 5+1 seconds
			  else if (data.iTotalRecords) _sf.hideLoadingLayer();							// if Data & !Glagne then show
			  
              var resultData = [];
              $.each(data.aaData, function (index, value)
			  {
                var resultDataRow = [];
                $.each(_sf.columns, function (rtIndex, rtValue)
				{
                  resultDataRow.push(value[_sf.rt_ColumnMapping.getColumn(rtValue).index]);
                });
                resultData.push(resultDataRow);
              });

              fnCallback({ iTotalRecords: data.iTotalRecords, iTotalDisplayRecords: data.iTotalDisplayRecords, aaData: resultData }, status, request);
            },
            function (msg)
			{
              _sf.skipLoadWaiting = false;
              _sf.clearCache = false;
              _sf.hideLoadingLayer();
              fnCallback({ iTotalRecords: 0, iTotalDisplayRecords: 0, aaData: [] });
            },
            function (request, text)
			{
              _sf.skipLoadWaiting = false;
              _sf.clearCache = false;
//              _sf.hideLoadingLayer();
              _sf.resultTable.fnDraw();
              return; // temp
              fnCallback({ iTotalRecords: 0, iTotalDisplayRecords: 0, aaData: [] });
            }
          );
        },
        'fnRowCallback': function (nRow, aData, iDisplayIndex, iDisplayIndexFull)
		{
		  var rowData = _sf.lastLoadedData[iDisplayIndex],
          tdIndex = 0, tx='',
		  v1 = rowData[_sf.rt_ColumnMapping.getColumn('hasEconomTicketsDpt').index],
		  v2 = rowData[_sf.rt_ColumnMapping.getColumn('hasEconomTicketsRtn').index],
		  v3 = rowData[_sf.rt_ColumnMapping.getColumn('hasBusinessTicketsDpt').index],
		  v4 = rowData[_sf.rt_ColumnMapping.getColumn('hasBusinessTicketsRtn').index],
		  v5 = rowData[_sf.rt_ColumnMapping.getColumn('ticketsIsIncluded').index],
		  
          tdIndex = $.inArray('hasEconomTicketsDpt', _sf.columns),
          tdIndex2 = $.inArray('hasBusinessTicketsDpt', _sf.columns);
		  $('td:eq(' + tdIndex + '), td:eq(' + tdIndex2 + ')', nRow).css({'text-align':'center','padding-left':'0'});
		  
		  var tx1='<img src="'+mSettings.modulePath+'styles/images/blank.gif" alt="" style="width:16px;height:16px;" class="sm_icon ',tx2='" />';
          if(v5==1)
          {
		    switch(v1)
			{
			  case '0': tx+=tx1+'sm_not'+tx2; break;
			  case '1': tx+=tx1+'sm_is'+tx2; break;
			  case '2': tx+=tx1+'sm_req'+tx2; break;
			  default: tx+=tx1+'sm_unk'+tx2; break;
			}
		    switch(v2)
			{
			  case '0': tx+=tx1+'sm_not2'+tx2; break;
			  case '1': tx+=tx1+'sm_is2'+tx2; break;
			  case '2': tx+=tx1+'sm_req2'+tx2; break;
			  default: tx+=tx1+'sm_unk'+tx2; break;
			}
			$('td:eq(' + tdIndex + ')', nRow).html(tx);
			
			tx='';
		    switch(v3)
			{
			  case '0': tx+=tx1+'sm_not'+tx2; break;
			  case '1': tx+=tx1+'sm_is'+tx2; break;
			  case '2': tx+=tx1+'sm_req'+tx2; break;
			  default: tx+=tx1+'sm_unk'+tx2; break;
			}
		    switch(v4)
			{
			  case '0': tx+=tx1+'sm_not2'+tx2; break;
			  case '1': tx+=tx1+'sm_is2'+tx2; break;
			  case '2': tx+=tx1+'sm_req2'+tx2; break;
			  default: tx+=tx1+'sm_unk'+tx2; break;
			}
			$('td:eq(' + tdIndex2 + ')', nRow).html(tx);
          }
          else	
		  {
		    $('td:eq(' + tdIndex + ')', nRow).html('перелёт не включён');
			$('td:eq(' + tdIndex + ')', nRow).attr('colspan', 2);
		    $('td:eq(' + tdIndex2 + ')', nRow).hide();
		  }
		  
          tdIndex = $.inArray('hotelIsInStop', _sf.columns);
		  var tickets;
          switch (rowData[_sf.rt_ColumnMapping.getColumn('hotelIsInStop').index])
		  {
            case '0': tickets='<img src="'+mSettings.modulePath+'/styles/images/hotel_available.png" />'; break;
            case '1': tickets='<img src="'+mSettings.modulePath+'/styles/images/hotel_stop.png" />'; break;
            case '2': tickets='<img src="'+mSettings.modulePath+'/styles/images/hotel_request.png" />'; break;
            default: tickets='<img src="'+mSettings.modulePath+'/styles/images/hotel_request.png" />'; break;
          }
		  $('td:eq(' + tdIndex + ')', nRow).html('<span style="font-size:11px;font-weight:normal;text-transform:none;" title="'+rowData[_sf.rt_ColumnMapping.getColumn('tourName').index]+'">'+tickets+'</span>')
		  .css({'text-align':'center','padding-left':'0'});
		  
          var operatorUrl = rowData[_sf.rt_ColumnMapping.getColumn('operatorUrl').index][0];
          var operatorId = rowData[_sf.rt_ColumnMapping.getColumn('operatorId').index];
          if (operatorUrl != '')
		  {
            tdIndex = $.inArray('operator', _sf.columns);
            $('td:eq(' + tdIndex + ')', nRow).html('').append($('<a rel="nofollow" title="Перейти на сайт оператора" target="_blank" href="#">' + rowData[_sf.rt_ColumnMapping.getColumn('operator').index].replace(' ', '&nbsp;') + '</a>'))
            .click(function()
            {
              mAjax.logSourceClick(operatorId,$('#sm_country').data('uid'));
              window.open(operatorUrl,"_blank");
              return false;
            });
          }
          tdIndex = $.inArray('checkIn', _sf.columns);
          var checkIn = rowData[_sf.rt_ColumnMapping.getColumn('checkIn').index];
          var checkInDay = rowData[_sf.rt_ColumnMapping.getColumn('checkInDay').index];
          $('td:eq(' + tdIndex + ')', nRow).html(checkIn + '<br />' + checkInDay);
          tdIndex = $.inArray('nights', _sf.columns);
          var nights = rowData[_sf.rt_ColumnMapping.getColumn('nights').index];
          var checkOutShort = rowData[_sf.rt_ColumnMapping.getColumn('checkOutShort').index];
          $('td:eq(' + tdIndex + ')', nRow).html(nights + '<br />' + checkOutShort);
          tdIndex = $.inArray('hotelName', _sf.columns);
          var hotelName = rowData[_sf.rt_ColumnMapping.getColumn('hotelName').index];
          var starName = rowData[_sf.rt_ColumnMapping.getColumn('starName').index];
          var roomName = rowData[_sf.rt_ColumnMapping.getColumn('roomName').index];
          var hotelUrl = rowData[_sf.rt_ColumnMapping.getColumn('hotelUrl').index];
          var hotel = hotelName + ' ' + starName;

          if (hotelUrl != '')
		  {
		    if (($.browser.msie && !mSettings.thGateway) || _sf.module_vk) hotel = '<a rel="nofollow" href="#" onClick="IE_hotel(\'' + hotelUrl + '\'); return false;">' + hotel + '</a>';
			else
			{
			  if (mSettings.thGateway) hotel = '<a rel="nofollow" href="'+mSettings.thGateway+'?i=' + hotelUrl + '">' + hotel + '</a>';
			  else hotel = '<a rel="nofollow" href="' + hotelUrl + '">' + hotel + '</a>';
			}
		  }
		  
          hotel += '<br />' + roomName;
          $('td:eq(' + tdIndex + ')', nRow).html(hotel);
          if (!mSettings.showExternalLinksOnBlankPage && (!$.browser.msie || mSettings.thGateway) && !_sf.module_vk)
		  {
            $('td:eq(' + tdIndex + ') a', nRow).colorbox({ width: "70%", height: "80%", speed: 100, transition: 'fade', close: '', iframe: true,onComplete: function ()
			{ 
			  $('#cboxOverlay').html('<div id=sm_hotel_close><img src="'+mSettings.modulePath+'styles/images/close.png" alt="" style="width:16px;height:16px;"/></div>');
			  var p = $('#colorbox').position();
			  $('#sm_hotel_close').css({'position':'fixed','top':p.top-$(window).scrollTop()-20,'left':p.left+$('#colorbox').width()+4});
			  $(window).scroll(function()
			  {
	    	    $('#sm_hotel_close').css({'top':p.top-$(window).scrollTop()-20, 'left':p.left+$('#colorbox').width()+4});
			  });
			}
			});
          }
          tdIndex = $.inArray('htPlaceName', _sf.columns);
          var htPlaceHint =
            rowData[_sf.rt_ColumnMapping.getColumn('htPlaceName').index] + '<br />' +
            rowData[_sf.rt_ColumnMapping.getColumn('adults').index] + '+' +
            rowData[_sf.rt_ColumnMapping.getColumn('kids').index];
          $('td:eq(' + tdIndex + ')', nRow).html(htPlaceHint);
          tdIndex = $.inArray('price', _sf.columns);
          var sourceId = rowData[_sf.rt_ColumnMapping.getColumn('operatorId').index];
          var offerId = rowData[_sf.rt_ColumnMapping.getColumn('id').index];
          var price = rowData[_sf.rt_ColumnMapping.getColumn('price').index];
          $('td:eq(' + tdIndex + ')', nRow).html('').append
		  (
		    $('<a rel="nofollow" href="#"><span class="sm_spo_price">' + price.replace(' ', '&nbsp;') + '</span><span class="sm_spo_curr"></span></a>').click(function ()
			{
              _sf.showTourOrderForm(sourceId, offerId);
              return false;
            }).hover(function()
			{
			  if(_sf.module_style != 'generic' || !mSettings.debugVersion) return false;
			  var p = $(this).position();
			  $('#sm_mini_error').data("sourceId",sourceId);
			  $('#sm_mini_error').data("offerId",offerId);
		      $('#sm_mini_error').css({'top':p.top+20,'left':p.left-70});
			  $('#sm_mini_error2').css({'top':p.top-25,'left':p.left-23});
			  $('#sm_mini_error2').stop(true,true).fadeOut(0).delay(500).fadeIn();
			},
			function()
			{ 
			  if(!$('#sm_mini_error2').is(':visible')) $('#sm_mini_error2').stop(true,true);
			})
		  );
		  
          if ($.getUrlVar('debug') == '1')
		  {
            $('td:eq(' + tdIndex + ')', nRow).append('<br />' + '<label>' + 'SourceId&nbsp;/&nbsp;OfferId: ' + '<br />' + sourceId + '<br />' + offerId + '</label>');
          }
		  
		  tdIndex = 0;
		  $('td:eq('+tdIndex+')', nRow).html($('td:eq('+tdIndex+')', nRow).html() +
		  '<span class="sm_tourname_hint">'+rowData[_sf.rt_ColumnMapping.getColumn('tourName').index]+'</span>');
		  $('td:eq('+tdIndex+')', nRow).parent().hover(function()
		  {
		    var a = $('td:eq('+tdIndex+')', nRow).position();
			$('td:eq('+tdIndex+') .sm_tourname_hint', nRow).css({'top':a.top-10});
			$('td:eq('+tdIndex+') span', nRow).show();
		  },function()
		  {
		    $('td:eq('+tdIndex+') span', nRow).hide();
		  });
          return nRow;
        },
        'fnDrawCallback': function ()
		{
          if (_sf.isFirstRequest)
		  {
            $('#sm_result').show();
            $('#sm_result_table_first').hide();
            $('#sm_result_table_last').hide();
            if ($.browser.msie) _sf.table.show();
			else _sf.table.show("slide", 250);
            _sf.isFirstRequest = false;
          }
          if (mSettings.enableAutoScrollingToResult) $.scrollTo(_sf.table, 250, { axis: 'y' });
        },
        'sPaginationType': 'full_numbers',
        'oLanguage': {
          'sEmptyTable': 'Нет туров по указанному запросу',
          'sInfoEmpty': 'Идёт поиск...',
          'sInfo': 'Всего туров: _TOTAL_ (_START_ - _END_)',
          'sZeroRecords': 'Нет туров по указанному запросу',
          'oPaginate': { 'sFirst': 'первая', 'sLast': 'последняя', 'sNext': 'следующая', 'sPrevious': 'предыдущая' }
        }
      });
	  _sf.module_STA=false;
	  
	  $('#sm_result_table_next').click(function()
	  {
		 var pn=$('.paginate_active').text(), mp=666;
		 $.each($('.paginate_button'), function(i, val)
		 {
           if(!isNaN(parseInt(val.innerHTML))) mp=parseInt(val.innerHTML);
         });
		 if(pn>mp || mp==666)
		 {
		   _sf.extendSearchPN = pn;
		   var xx,yy='';
		   xx=$('#sm_result_table tr:last-child td:last-child').text();
		   for(var i=0;i<xx.length;i++) if(xx[i]>='0' && xx[i]<='9') yy+=xx[i];
           _sf.extendSearchValue=yy;
           _sf.doExtendSearch=true; _sf.findClicked(); _sf.doExtendSearch=false;
		 }
	  });
    }
    else if(_sf.doExtendSearch) {_sf.resultTable.fnPageChange('last');}
	else _sf.resultTable.fnPageChange('first');
  },
  
  getLoadState: function ()
  {
    var callback = function (data)
	{
      if (_sf.lastRequestId > 0)
	  {
        _sf.lastNewLoadState = data;
        _sf.fillStat(1);
        _sf.showLoadState();
      }
    }
    mAjax.getLoadState(_sf.lastRequestId, callback);
  },

  computeOpHint: function (flag, data)
  {
    var wh=$(window).height(), html='', co=0, f_to_id;
	if(data)
	{
      for(var i=0;i<data.length;i++) if (data[i].Enabled)
      {
        html += '<tr style="height:16px !important;overflow:hidden"><td style="width:80%"><span class="sm_operator">'
        + data[i].Name+'</span><span style="display:none" id="sm_invis'+co+'">'
        + data[i].Id+'</span></td><td><img src="/module/styles/images/quest.png"></td></tr>';
        co++;
      }
	  $('#sm_ophint_body').html(html);
	}
	$('#sm_ophint_td2').bind('click',function()
	{
	  _sf.toggleOpHint(0);
	  if($('#sm_ophint').css('left')=='-200px') mAjax.opFilterLog(2);
	  else mAjax.opFilterLog(1);
	});
  },
  
  toggleOpHint: function(showme)
  {
    var o=$('#sm_ophint'), ob=$('#sm_ophint_but');
    if(o.css('left')=="-20px" && showme) return false;
    if(showme==2)
	{
	  o.stop(); o.css({'left':'-200px'});
	  ob.attr('src','/module/styles/images/ophint_but.png');
      return false;
	}
	if(o.css('left')=="-20px") {if(!_sf.patch02) o.animate({"left": "-=180px"}, 400, function()
	{
      ob.attr('src','/module/styles/images/ophint_but.png');
	  _sf.patch03=0;
	}); _sf.patch02=1; }
	else if(o.css('left')=="-200px") {if(!_sf.patch03) o.animate({"left": "+=180px"}, 400, function()
	{
	  ob.attr('src','/module/styles/images/ophint_but2.png');
	  _sf.patch02=0;
	}); _sf.patch03=1; }
  },
  

  showLoadState: function ()
  {
	_sf.fillStat(1);
    $('#sm_progress').show();
    var state = _sf.lastNewLoadState == null ? _sf.lastLoadState : _sf.lastNewLoadState;
    var loaded_count = $.grep(state, function (e) { return e.IsProcessed == true; }).length;
    var all_count = state.length;
    var new_rows_count = 0;
	var table_rows_count = _sf.resultTable.dataTableSettings[0]._iRecordsTotal;
    if (_sf.lastNewLoadState != null)
	{
      for (var i = 0; i < _sf.lastLoadState.length; i++) for (var j = 0; j < _sf.lastNewLoadState.length; j++)
      if (_sf.lastLoadState[i].Id == _sf.lastNewLoadState[j].Id)
      {
        if (_sf.lastLoadState[i].IsProcessed == false) new_rows_count += _sf.lastNewLoadState[j].RowsCount;
        break;
      }
    }

/*alert
(
  "new_rows_count='" + new_rows_count +
  "'\ntable_rows_count=" + table_rows_count +
  "'\nall_count=" + all_count +
  "'\nloaded_count=" + loaded_count +
  "'\n_sf.patch01=" + _sf.patch01
);*/

	if (all_count == loaded_count)				// all TO have responded => show interface & load table
	{
	  if(!_sf.patch04) $('#AnotherIdiotIdea, #AnotherIdiotIdea2').show();
	  if (!table_rows_count && !_sf.patch01)	// 'patch01' for showOnce
	  {
		_sf.skipLoadWaiting=true;
		_sf.patch01=1;
	    _sf.loadToursInit(2);
		$('#sm_popup_status').hide();
	  }
	  $('#sm_result h1').text('Результат: ');
	  _sf.hideLoadingLayer();
	}
	else										// not all TO have responded
	{
	  _sf.patch01 = 0;
	  $('#sm_result h1').text('Идёт поиск: ');
      if(new_rows_count && (_sf.module_style!='generic' || _sf.genericTimeout) )
	  {
        _sf.hideLoadingLayer();
		if(!table_rows_count)
		{
		  _sf.skipLoadWaiting=true;
	      _sf.loadToursInit(2);
		}
	  }
	}  
    if (all_count > 0)
	{
      $('#sm_loaded_count').text(loaded_count);
      $('#sm_all_count').text(all_count);
	  if (loaded_count == all_count) _sf.resultTable.dataTableSettings[0].oLanguage.sInfoEmpty="Ничего не найдено. Уточните параметры поиска.";
	  
      if (new_rows_count)
	  {
        if(all_count>1)
		{
		  if(_sf.module_style == 'generic')
		  {
		   $('#sm_new_rows').html(' <a href="#" id="sm_update_price"><b>(показать ещё ' + new_rows_count + ')</b></a>');
		  }
          else $('#sm_new_rows').html(' <a href="#" id="sm_update_price"><b>(найдено ещё ' + new_rows_count + ' цен)</b></a>');
		}
        $('#sm_update_price').click(function()
		{
		  $('#sm_new_rows').text('');
		  $('#sm_popup_status').hide();
		  _sf.skipLoadWaiting=true;
		  _sf.loadToursInit(0);
		  return false;
		});
      }
	  
/*
================================================================================================
=======================================      bookmark      =====================================
================================================================================================
*/
	  
      if (all_count > loaded_count) setTimeout(_sf.getLoadState, 5000);
    }
	else { $('#sm_loaded_count').text('0'); $('#sm_all_count').text('0'); }
	if(!loaded_count) $('#sm_result_table_wrapper').hide(); 
  },

  showStat: function (el)
  {
    if ($('#sm_stat_info').is(':visible')) $('#sm_stat_info').hide();
    else
	{
      $('#sm_stat_info').show();
      $('#sm_stat_info').position({ my: 'left top', at: 'left bottom', of: el, offset: '3' });
      _sf.fillStat(1);
    }
  },

  fillStat: function (type)
  {
    var state = _sf.lastNewLoadState == null ? _sf.lastLoadState : _sf.lastNewLoadState;
	var status, co=0, opcl='';
    if(_sf.module_style=='generic') if (state != null && type==1)
	{
/*      var html = '';
      for (var i = 0; i < state.length; i++)
	  {
        status = '<span class="sm_loading">ожидание</span>';
        if (state[i].IsError == true)
		{
          if (state[i].IsTimeout == true) status = '<span class="sm_timeout">таймаут</span>';
          else status = '<span class="sm_error">нет доступа</span>';
        }
        else if (state[i].IsProcessed == true) status = '<span class="sm_loaded">загружено</span>';
        html += '<tr><td><span class="sm_operator">' + state[i].Name + '</span></td><td>'
        + (state[i].IsCached ? 'из кеша' : (state[i].ExecutionTimeMs == 0 ? '-' : _sf.formatSeconds(state[i].ExecutionTimeMs / 1000)))
        + '</td><td>' + status + '</td><td>' + (state[i].RowsCount == 0 ? 'нет' : '<span class="sm_hasrows">есть<font color="white">'
        + state[i].RowsCount + '</font></span>') + '</td></tr>';
	  }
      $('#sm_stat_body').html(html);*/
	  
      html = '';
      for(var i=0;i<state.length;i++)
	  {
		opcl='';
		var dis = 'disabled="disabled"';
        if(!state[i].IsError && state[i].IsProcessed)
		{
		 if(state[i].RowsCount)
		 {
		   status = '<img src="/module/styles/images/checked.png">';
		   opcl = 'sm_operator';
		   if(state[i].Id == _sf.searchFilterData) { opcl += ' sm_opsel'; if(state[i].Name.search(/(X)/i)==-1) state[i].Name += ' (X)'; }
           
           if(_sf.opselArray[state[i].Id]==1) dis = 'checked="checked"';
           else if(_sf.opselArray[state[i].Id]==-1) dis = '';
           else
           {
             dis = 'checked="checked"';
             _sf.opselArray[state[i].Id] = 1;
           }
		 }
		 else
		 {
		   status = '<img src="/module/styles/images/checked2.png">';
		   state[i].Id=0;
		 }
         html += '<tr><td width="80%"><input '+ dis +' class="sm_multicb" value="'+state[i].Id+'" type="checkbox" /> <span class="'+opcl+ '">'
         + state[i].Name + '</span><span style="display:none">'
         + state[i].Id + '</span></td><td>' + status + '</td></tr>';
		} 
		// comment this to undo AA-fix
		else
		{
          status = '<img src="/module/styles/images/ld4.gif">';
          if(state[i].IsError == true || state[i].IsTimeout == true) status = '<img src="/module/styles/images/error.png">';
          else if(state[i].IsProcessed == true) continue;
          html += '<tr><td><input disabled="disabled" class="sm_multicb" value="'+state[i].Id+'" type="checkbox" /> <span class="sm_operator">' + state[i].Name + '</span></td><td>' + status + '</td></tr>';
		}
		// end comment
      }
      $('#sm_ophint_body').html(html);
	  $("#sm_ophint .sm_operator").each(function(i)
	  {
        $(this).click(function()
		{
		  var i = $(this).prev('input'), id = $(i).val();
		  if($(i).is(':checked')) { $(i).removeAttr('checked'); _sf.opselArray[id] = -1; }  
		  else { $(i).attr('checked', 'checked'); _sf.opselArray[id] = 1; }
		});
      });	
	  $("#sm_ophint .sm_multicb").each(function(i)
	  {
        $(this).click(function()
		{
		  var i = $(this), id = $(i).val();
		  if($(i).is(':checked')) _sf.opselArray[id] = 1;
		  else _sf.opselArray[id] = -1;
		});
      });	
    }
	if(type==2)
	{
	  var html='', co=0;
	  $('#sm_operators_list li').each(function (i,e)
	  {
	    if($(e).find('input').is(':checked')==true)
		{
		  var opName = $(e).text();
		  var opId = $(e).find('input').val();
          html+='<tr><td width="80%"><span class="sm_operator">'+opName+'</span><span style="display:none;" id="sm_invis'+co+'">'+opId+'</span></td><td><img src="/module/styles/images/quest.png"></td></tr>'; co++;
	    }
      });
	  $('#sm_ophint_body').html(html);
	}
	$('#sm_ophint').css({'top':function() { return ($(window).height()-$('#sm_ophint').height())/2; }});
  },

  formatSeconds: function (value)
  {
    var computed = Math.round(value * Math.pow(10, 1)) / Math.pow(10, 1);
    if (parseInt(computed) == computed) return computed + '.0';
    else return computed;
  },

  countrySelect: function (sender)
  {
    _sf.loadCities();
    _sf.loadHotelsInfo();
  },

  loadDepartCities: function ()
  {
    mAjax.ajaxSwitchCurrent=1;
    $('#sm_select_city_close').click(function ()
	{
      _sf.closeAllPopups();
      return false;
    });
    var callback = function (data)
	{
      var defaultById = false;
      var defaultId = 0;
      if ($.getUrlVar('cityFrom'))
	  {
        defaultId = $.getUrlVar('cityFrom');
        defaultById = true;
      }
      var defaultName = '';
      if (!defaultById) defaultName = $.getUrlVar('cityFromName') || mSettings.defaultCity;

      $('#sm_select_city_list').html('');
      var html = '';
      for (var i = 0; i < data.length; i++)
	  {
        if ((defaultById && data[i].Id == defaultId) || (!defaultById && defaultName == data[i].Name))
		{
          html += '<li class="sm_active" id="city' + data[i].Id + '">' + data[i].Name + '</li>';
          $('#sm_city').text(data[i].Name);
          $('#sm_city').data('uid', data[i].Id);
        }
        else html += '<li id="city' + data[i].Id + '">' + data[i].Name + '</li>';
      }
      $('#sm_select_city_list').html(html);
      _sf.makeListLive('sm_select_city_list', 'city', _sf.cityDptSelected);
      _sf.isDepartCitiesLoaded = true;
      $('#sm_city, #sm_city_open').click(function ()
	  {
        _sf.closeAllPopups('sm_select_city');
        $('#sm_select_city').toggle();
        $('#sm_select_city').position({ collision: 'none', my: 'right top', at: 'right bottom', of: $('#sm_city_open'), offset: '10' });
        return false;
      });
      if (_sf.isCountriesLoaded) { _sf.afterInitBack(); }
      _sf.cookieSettings(false);
	  _sf.loadCountries();
    };
	var mAjax_getDepartCities=function ()
	{
	  mAjax.getDepartCities('',callback, mAjax.defaultError, function ()
	  { 
	    if(mAjax.ajaxSwitchCurrent<mAjax.ajaxSwitchMax) { mAjax.ajaxSwitchCurrent++; $(mAjax_getDepartCities); }
	    else return this.defaultAjaxError;
	  });
	}
	$(mAjax_getDepartCities);
  },

  cityDptSelected: function (e)
  {
//    _sf.biscuitPairs(1); // save to cookies before changing

    if(e.target.id.substring(4)=="1264") $('#sm_antidnep, #sm_small_adv').show();
    else $('#sm_antidnep, #sm_small_adv').hide();
    
    $('#sm_city').data('uid', e.target.id.substring(4));
    $('#sm_city').text($(e.target).text());
    _sf.closeAllPopups();
	_sf.loadCountries();
    _sf.cookieSettings(true);
  },

  loadCountries: function ()
  {
    mAjax.ajaxSwitchCurrent=1;
    var callback = function (data)
	{
      var defaultById = false;
      var defaultId = 0;
      if ($.getUrlVar('country'))
	  {
        defaultId = $.getUrlVar('country');
        defaultById = true;
      }
      var defaultName = '';
      if (!defaultById) defaultName = $.getUrlVar('countryName') || mSettings.defaultCountry;
      $('#sm_select_country_list').html('');
      var html = '';
      var processedItems = 0;
      for (var r=0; r<=2; r++)
	  {
        var list = $.grep(data, function (item) { return item.Rank == r; });
        if (list.length > 0)
		{
          if (processedItems > 0) html += '<li class="sm_none"><div class="sm_line"></div></li>';
          switch (r)
		  {
            case 0: html += '<li><b>Топовые направления:</b></li>'; break;
            case 1: html += '<li><b>Популярные направления:</b></li>'; break;
            default: html += '<li><b>Остальные направления:</b></li>'; break;
          }
        }
        for (var i=0; i<list.length; i++)
		{
          if ((defaultById && list[i].Id == defaultId) || (!defaultById && defaultName == list[i].Name))
		  {
            html += '<li class="sm_active" id="country' + list[i].Id + '">' + list[i].Name + '</li>';
            if( !$('#sm_country').data('uid') )
            {
              $('#sm_country').text(list[i].Name);
              $('#sm_country').data('uid', list[i].Id);
            }
			if(mSettings.allowServerSentFlags==true)
			{
			  $('#sm_HotelIsNotInStop').attr('checked',list[i].HotelIsNotInStop);
			  $('#sm_HasFlight').attr('checked',list[i].TicketsIncluded);
			  $('#sm_HasTickets').attr('checked',list[i].HasTickets);
			}
          }
          else html += '<li id="country' + list[i].Id + '">' + list[i].Name + '</li>';
          processedItems++;
        }
      }
      $('#sm_select_country_list').html(html);
      _sf.makeListLive('sm_select_country_list', 'country', _sf.countrySelected);
      _sf.isCountriesLoaded = true;
      $('#sm_country, #sm_country_open').click(function ()
	  {
        _sf.closeAllPopups('sm_select_country');
        $('#sm_select_country').show();
        $('#sm_select_country').position({ collision:'none', my: 'right top', at: 'right bottom', of: $('#sm_country_open'), offset: '0 1' });
        return false;
      });
      if (_sf.isDepartCitiesLoaded) { _sf.afterInitBack(); }
      if (_sf.module_style == 'generic') _sf.loadOperators();
    };
    var mAjax_getCountries=function ()
	{
	  mAjax.getCountries('',0, $('#sm_city').data('uid'), callback, mAjax.defaultError, function ()
	  { 
	    if(mAjax.ajaxSwitchCurrent<mAjax.ajaxSwitchMax) { mAjax.ajaxSwitchCurrent++; $(mAjax_getCountries); }
	    else return this.defaultAjaxError;
	  });
	}
	$(mAjax_getCountries);
  },

  countrySelected: function (e)
  {
//    _sf.biscuitPairs(1); // save to cookies before changing
    
    $('#sm_country').data('uid', e.target.id.substring(7));
    $('#sm_country').text($(e.target).text());
    _sf.closeAllPopups();
    _sf.countrySelect();
	if (_sf.module_style == 'generic') _sf.loadOperators();
	_sf.cookieSettings(true);
  },

  loadOperators: function ()
  {
    mAjax.ajaxSwitchCurrent=1;
    _sf.setListMsg(_sf.tOperators, 'Загрузка данных...');
    var callback = function (data)
	{
      if (mSettings.showConnectedOperatorsOnly) data = $.grep(data, function (i) { return i.Enabled; });
      if (mSettings.visibleOperators.length > 0) data = $.grep(data, function (i) { return $.inArray(i.Name, mSettings.visibleOperators) >= 0; });
      if (mSettings.hiddenOperators.length > 0) data = $.grep(data, function (i) { return $.inArray(i.Name, mSettings.hiddenOperators) < 0; });

      _sf.fillList(_sf.tOperators, data, '_sf.showCheckedOperators');
      if (!_sf.isUrlOperatorSet && $.getUrlVar('operatorNames'))
	  {
        $.each(_sf.getIdsByNames(data, $.getUrlVar('operatorNames')), function (index, value) { $('#' + _sf.tOperators.id + value).attr('checked', true); });
        _sf.isUrlOperatorSet = true;
      }
	  _sf.postLoadAll();
    };
	var mAjax_getOperators=function ()
	{
	  mAjax.getOperators($('#sm_city').data('uid'), $('#sm_country').data('uid'), callback, mAjax.defaultError, function ()
	  { 
	    if(mAjax.ajaxSwitchCurrent<mAjax.ajaxSwitchMax) { mAjax.ajaxSwitchCurrent++; $(mAjax_getOperators); }
	    else return this.defaultAjaxError;
	  },function ()
	  {
  	    _sf_setListMsg(_sf.tOperators, "Ошибка (<a href='#' rel='nofollow' onclick='_sf.loadOperators(); return false;'>обновить</a>)", 'sm_listError');
	  }
	  );
	}
	$(mAjax_getOperators);
  },

  getIdsByNames: function (data, names)
  {
    var ids = [];
    var namesArr = names.split(',');
    for (var i = 0; i < namesArr.length; i++) for (var j = 0; j < data.length; j++) if (data[j].Name == namesArr[i])
	{
      ids.push(data[j].Id);
      break;
    }
    return ids;
  },

  loadCities: function ()
  {
    mAjax.ajaxSwitchCurrent=1;
    _sf.setListMsg(_sf.tCities, 'Загрузка данных...');
    var callback = function (data)
	{
      _sf.fillList(_sf.tCities, data, '_sf.loadHotelsInfo')
      if (!_sf.isUrlCitySet && $.getUrlVar('cityTo'))
	  {
        $('#' + _sf.tCities.id + $.getUrlVar('cityTo')).attr('checked', true);
        _sf.isUrlCitySet = true;
      }
      if (!_sf.isUrlCitySet && $.getUrlVar('cityToNames'))
	  {
        $.each(_sf.getIdsByNames(data,$.getUrlVar('cityToNames')), function (index, value) { $('#'+_sf.tCities.id+value).attr('checked',true);});
        _sf.isUrlCitySet = true;
      }
    };
	var mAjax_getCities=function ()
	{
	  mAjax.getCities($('#sm_country').data('uid'), callback, mAjax.defaultError, function ()
	  { 
	    if(mAjax.ajaxSwitchCurrent<mAjax.ajaxSwitchMax) { mAjax.ajaxSwitchCurrent++; $(mAjax_getCities); }
	    else return this.defaultAjaxError;
	  },
	  function ()
	  {
	    _sf.setListMsg(_sf.tCities, "Ошибка (<a href='#' rel='nofollow' onclick='_sf.loadCities(); return false;'>обновить</a>)", 'sm_listError')
      }
	  );
	}
	$(mAjax_getCities);
  },

  loadMeals: function ()
  {
    mAjax.ajaxSwitchCurrent=1;
    _sf.setDivListMsg(_sf.tMeals, 'Загрузка данных...');
    var cities = _sf.getCheckedValues(_sf.tCities.id).join(',');
    var callback = function (data)
	{
      _sf.fillListUsingDiv(_sf.tMeals, data);
      if (!_sf.isUrlMealSet && $.getUrlVar('mealNames'))
	  {
        $.each(_sf.getIdsByNames(data, $.getUrlVar('mealNames')), function (index, value) {$('#' + _sf.tMeals.id + value).attr('checked',true);});
        _sf.isUrlMealSet = true;
      }
    };
	
	var mAjax_getMeals=function ()
	{
	  mAjax.getMeals(callback, mAjax.defaultError, function ()
	  { 
	    if(mAjax.ajaxSwitchCurrent<mAjax.ajaxSwitchMax) { mAjax.ajaxSwitchCurrent++; $(mAjax_getMeals); }
	    else return this.defaultAjaxError;
	  },function ()
	  {
  	    _sf.setListMsg(_sf.tMeals, "Ошибка (<a href='#' rel='nofollow' onclick='_sf.loadMeals(); return false;'>обновить</a>)", 'sm_listError');
	  }
	  );
	}
	$(mAjax_getMeals);
  },

  loadStars: function ()
  {
    mAjax.ajaxSwitchCurrent=1;
    _sf.setListMsg(_sf.tStars, 'Загрузка данных...');
    var cities = _sf.getCheckedValues(_sf.tCities.id).join(',');
    var callback = function (data)
	{
      _sf.fillList(_sf.tStars, data, '_sf.loadHotels');
      if (!_sf.isUrlStarSet && $.getUrlVar('starNames'))
	  {
        $.each(_sf.getIdsByNames(data, $.getUrlVar('starNames')), function (index, value) { $('#' + _sf.tStars.id + value).attr('checked', true); });
        _sf.isUrlStarSet = true;
      }
    };
	var mAjax_getStars=function ()
	{
	  mAjax.getStars($('#sm_country').data('uid'), cities, callback, mAjax.defaultError, function ()
	  { 
	    if(mAjax.ajaxSwitchCurrent<mAjax.ajaxSwitchMax) {mAjax.ajaxSwitchCurrent++; $(mAjax_getStars);}
	    else return this.defaultAjaxError;
	  },function ()
	  {
  	    _sf.setListMsg(_sf.tStars, "Ошибка (<a href='#' rel='nofollow' onclick='_sf.loadStars(); return false;'>обновить</a>)", 'sm_listError');
	  }
	  );
	}
	$(mAjax_getStars);
  },

  loadHotelsInfo: function ()	// ololo, delay4eg
  {
    setTimeout('_sf.showCheckedValues(_sf.tCities.id);_sf.loadMeals();_sf.loadStars();_sf.loadHotels();',50);
  },

  loadHotels: function ()
  {
    mAjax.ajaxSwitchCurrent=1;
    _sf.setListMsg(_sf.tHotels, 'Загрузка данных...');
    var cities = _sf.getCheckedValues(_sf.tCities.id).join(',');
    var stars = _sf.getCheckedValues(_sf.tStars.id).join(',');
    var callback = function (data)
	{
      _sf.fillList(_sf.tHotels, data, '_sf.showCheckedHotels');
      if (!_sf.isUrlHotelSet && $.getUrlVar('hotel'))
	  {
        $('#' + _sf.tHotels.id + $.getUrlVar('hotel')).attr('checked', true);
        _sf.isUrlHotelSet = true;
      }
      if (!_sf.isUrlHotelSet && $.getUrlVar('hotelNames'))
	  {
        $.each(_sf.getIdsByNames(data, $.getUrlVar('hotelNames')), function (index, value) { $('#' + _sf.tHotels.id + value).attr('checked', true); });
        _sf.isUrlHotelSet = true;
      }
      _sf.setupDefaults();  // because it's the last loading dictionary
	  if (_sf.module_STA==true) _sf.findClicked();	// it was the last dic
	  _sf.biscuitPairs(0);  // load from cookies
    };
	
	var ho_excl, s=_sf.tHotel.value;
	if (s.indexOf("...",0)==-1) ho_excl = _sf.tHotel.value.toLowerCase();
	else ho_excl='';
	
	var mAjax_getHotels=function ()
	{
	  mAjax.getHotels($('#sm_country').data('uid'), cities, stars, ho_excl, callback, mAjax.defaultError, function ()
	  { 
	    if(mAjax.ajaxSwitchCurrent<mAjax.ajaxSwitchMax) {mAjax.ajaxSwitchCurrent++; $(mAjax_getHotels);}
	    else return this.defaultAjaxError;
	  },function ()
	  {
  	    _sf.setListMsg(_sf.tHotels, "Ошибка (<a href='#' rel='nofollow' onclick='_sf.loadHotels(); return false;'>обновить</a>)", 'sm_listError');
	  },_sf.hotelsLoadSize
	  )
	}
	$(mAjax_getHotels);
  },

  fillList: function (list, data, clickEventName)
  {
    if (data != null && data.length > 0)
	{
      if (list == _sf.tOperators ) _sf.computeOpHint(1,data);
	  $('#' + list.id).html('');
      var html = '';
      for (var i = 0; i < data.length; i++)
	  {
        if (list == _sf.tOperators && data[i].Enabled)
		{
          html += '<li><input ' + (clickEventName ? 'onclick="' + clickEventName + '();" ' : '') + 'type="checkbox" id="' + list.id + data[i].Id + '" value="' + data[i].Id + '" /><label for="' + list.id + data[i].Id + '">' + data[i].Name + '</label></li>';
        }
      }
//	  if (list == _sf.tOperators) html += '<li><label>——————— вылетов нет ———————</label></li>';
      for (var i = 0; i < data.length; i++)
	  {
        if (list == _sf.tOperators && !data[i].Enabled)
		{
          html += '<li><input disabled="disabled" type="checkbox" id="' + list.id + data[i].Id + '" value="' + data[i].Id + '" /><label class="sm_disabled" for="' + list.id + data[i].Id + '">' + data[i].Name + ' (вылетов нет)</label></li>';
        }
		else if(list != _sf.tOperators)
		{
          html += '<li><input ' + (clickEventName ? 'onclick="' + clickEventName + '();" ' : '') + 'type="checkbox" id="' + list.id + data[i].Id + '" value="' + data[i].Id + '" /><label for="' + list.id + data[i].Id + '">' + data[i].Name + '</label></li>';
		}
      }
      $('#' + list.id).html(html);
    }
    else _sf.setListMsg(list, 'Список пуст');
  },

  fillListUsingDiv: function (list, data, clickEventName)
  {
    if (data != null && data.length > 0)
	{

      $('#' + list.id).html('');
      var html = '';
      for (var i = 0; i < data.length; i++)
	  {
        if (list == _sf.tOperators && !data[i].Enabled)
		{
          html += '<div><input disabled="disabled" type="checkbox" id="' + list.id + data[i].Id + '" value="' + data[i].Id + '" /><label class="sm_disabled" for="' + list.id + data[i].Id + '">' + data[i].Name + '</label></div>';
        }
        else
		{
          html += '<div><input ' + (clickEventName ? 'onclick="' + clickEventName + '();" ' : '') + 'type="checkbox" id="' + list.id + data[i].Id + '" value="' + data[i].Id + '" /><label for="' + list.id + data[i].Id + '">' + data[i].Name + '</label></div>';
        }
      }
      $('#' + list.id).html(html);
    }
    else _sf.setDivListMsg(list, 'Список пуст');
  },

  setListMsg: function (list, msg, css)
  {
    if (css == undefined || css == null) { css = 'sm_listComment'; }
    $('#' + list.id).html('<li class="' + css + '">' + msg + '</li>');
  },

  setDivListMsg: function (list, msg, css)
  {
    if (css == undefined || css == null) { css = 'sm_listComment'; }
    $('#' + list.id).html('<span class="' + css + '">' + msg + '</span>');
  },

  showCheckedValues: function (listName)
  {
    var cbs = $('#' + listName).find('input[type="checkbox"]');
    for (var i = 0; i < cbs.length; i++)
	{
      if (!cbs[i].checked) $(cbs[i].parentNode).removeClass('sm_active');
      else $(cbs[i].parentNode).addClass('sm_active');
    }
  },

  makeListLive: function (listName, idTemplate, callback)
  {
    var lis = $('#' + listName + ' li');
    $.each(lis, function (index, li)
	{
      $(li).mouseover(function (e)
	  {
        $.each($('li', e.target.parentNode), function (i, v) { $(v).removeClass('sm_active'); });
        if (!idTemplate || e.target.id.indexOf(idTemplate) >= 0)  $(e.target).addClass('sm_active');
      });
      if (!idTemplate || li.id.indexOf(idTemplate) >= 0) { $(li).click(callback); }
    });
  },

  getCheckedValues: function (listName)
  {
    var list = new Array();
    var cbs = $('#' + listName).find('input[type="checkbox"][checked="true"]');
    for (var i = 0; i < cbs.length; i++) list[i] = cbs[i].value;
    return list;
  },

  getCheckedNames: function (listName)
  {
    var list = new Array();
    var cbs = $('#' + listName).find("input[type='checkbox'][checked='true']");
    for (var i = 0; i < cbs.length; i++)
	{
      var label = $('#' + listName).find('label[for="' + cbs[i].id + '"]')[0];
      list[i] = label.innerHTML;
    }
    return list;
  },

  showTourOrderForm: function (sourceId, offerId)
  {
    if (!_sf.isOrderHtmlLoaded) { alert('Форма заказа ещё не загружена. Подождите, пожалуйста.'); return; }
    $('#sm_dialog').data('offerId', offerId);
    $('#sm_dialog').data('sourceId', sourceId);
    $('#sm_dialog_content').hide();
    $('#sm_dialog_status').text('...актуализация данных...');
    $('#sm_dialog_status').show();

    $.colorbox({ width: (_sf.module_vk) ? '576px':'715px', height: '450px', inline: true, transition: 'fade', speed: 100, close: '', href: '#sm_dialog', onComplete: function () { $('#sm_dialog').show(); }, onCleanup: function () { $('#sm_dialog').hide(); }, onOpen: function () { $('#cboxOverlay').html(''); } });

	_sf.lastCurrencyAlias = $('#sm_currency').text()
	_sf.lastCurrencyAlias = (_sf.lastCurrencyAlias.length>0) ? $('#sm_currency').text() : $.getUrlVar('currency');
	
    mAjax.getActualPrice(_sf.lastRequestId, (_sf.module_STA) ? $.getUrlVar('country') : $('#sm_country').data('uid'), 0, sourceId, offerId, _sf.lastCurrencyAlias, function (result)
	{
      var unknown = '[нет данных]';
      if (result.isError) $('#sm_dialog_status').text('...произошла ошибка, попробуйте повторить операцию позже...');
      else if (result.isFound == false) $('#sm_dialog_status').text('...данное предложение более недействительно...');
      else
	  {
        $('#sm_dialog_status').hide();
        $('#sm_dialog_content').show();
	    if(result.randomNumber>0) $('#sm_wikicode').text('#'+result.randomNumber);

        $('#sm_tour_name').text(result.data[3] == '' ? unknown : result.data[3]);
        var room = result.data[9] == '' ? unknown : result.data[9];
        if (room != unknown && result.data[10] != '' && result.data[9] != result.data[10]) room += ', ' + result.data[10];

        $('#sm_tour_room').text(room);
        $('#sm_tour_country').text(result.data[0] == '' ? unknown : result.data[0]);
        $('#sm_tour_city').text(result.data[2] == '' ? unknown : result.data[2]);
        $('#sm_tour_dptcity').text(result.data[1] == '' ? unknown : result.data[1]);
        $('#sm_tour_checkin').text(result.data[4] == '' ? unknown : result.data[4]);
        $('#sm_tour_nights').text(result.data[5] == '' ? unknown : result.data[5]);
        var hotel = result.data[6] == '' ? unknown : result.data[6];
        var hotelUrlHere = false;
        if (hotel != unknown)
		{
          if (result.data[8] != '') hotel += ' (' + result.data[8] + ')';
          if (result.data[7] != '')
		  {
            hotel = '<a target="_blank" href="' + result.data[7] + '">' + hotel + '</a>';
            hotelUrlHere = true;
          }
        }
        if (hotelUrlHere) $('#sm_tour_hotel').html(hotel);
        else $('#sm_tour_hotel').text(hotel);

        $('#sm_tour_meal').text(result.data[11] == '' ? unknown : result.data[11]);
        $('#sm_tour_htplace').text(result.data[22] == '' ? unknown : result.data[22]);
        var stops = '';
        switch (result.data[13])
		{
          case '0': stops += 'места(+)'; break;
          case '1': stops += 'места(−)'; break;
          case '2': stops += 'места(call)'; break;
          default: stops += 'места(?)'; break;
        }
        
        // if not included, state it
        // rowData[_sf.rt_ColumnMapping.getColumn('ticketsIsIncluded').index]
        
        if(result.data[12]=="True")
        {
          stops += ' / ';
          if (result.data[14] == '1' || result.data[16] == '1') stops += 'вылет(+)';
          else if (result.data[14] == '2' || result.data[16] == '2') stops += 'вылет(call)';
          else if (result.data[14] == '0' || result.data[16] == '0') stops += 'вылет(−)';
          else stops += 'вылет(?)';

          stops += ' / ';
          if (result.data[15] == '1' || result.data[17] == '1') stops += 'прилёт(+)';
          else if (result.data[15] == '2' || result.data[17] == '2') stops += 'прилёт(call)';
          else if (result.data[15] == '0' || result.data[15] == '0') stops += 'прилёт(−)';
          else stops += 'прилёт(?)';
        }
        else stops += ' / перелёт не включён';

        $('#sm_tour_stops').text(stops);
        $('#sm_tour_price').text('Цена: ' + result.data[18].toString() + ' ' + result.data[21]);
      }
    });
  },

  sendTourOrder: function ()
  {
    var offerId = $('#sm_dialog').data('offerId');
    var sourceId = $('#sm_dialog').data('sourceId');
    mAjax.saveTourOrder
    (
      _sf.lastRequestId, offerId, sourceId, $('#sm_user').val(), $('#sm_email').val(), $('#sm_phone').val(), $('#sm_info').val(),
      (_sf.module_STA)?$.getUrlVar('countryName'):$('#sm_country').text(), (_sf.module_STA)?$.getUrlVar('cityFromName'):$('#sm_city').text(), _sf.lastCurrencyAlias,
      function ()
	  {
        $('#sm_dialog_content').hide();
        $('#sm_dialog_status').text('...заявка отправлена - менеджер свяжется с вами...');
        $('#sm_dialog_status').show();
      }
    );
  },

  showReportErrorForm: function ()
  {
    var f = $('#sm_report_error');
    f.toggle();
    f.position({ my: 'left bottom', at: 'left top', of: $('#sm_show_report_form'), offset: '0,0' });
    f.position({ my: 'left bottom', at: 'left top', of: $('#sm_show_report_form'), offset: '0,0' }); // fixes position
  },

  reportError: function ()
  {
    if ($('#sm_error_desc').val() == '') alert('Укажите описание/подробности ошибки.');
    else
	{
      var offerId = $('#sm_dialog').data('offerId');
      var sourceId = $('#sm_dialog').data('sourceId');
      mAjax.reportError(
      $('#sm_country').data('uid'), $('#sm_city').data('uid'), sourceId, offerId, _sf.lastCurrencyAlias, $('#sm_error_type').val(), $('#sm_error_desc').val(),
      function ()
	  {
        alert('Спасибо! Сообщение об ошибке отправлено.');
        $('#sm_report_error').hide();
      }
      );
    }
  },

  parseExtendedFormUrl: function ()
  {
    if ($.getUrlVar('adults')) $('#sm_adults').val($.getUrlVar('adults'));
    if ($.getUrlVar('kids')) $('#sm_kids').val($.getUrlVar('kids'));
    if ($.getUrlVar('nightsMin'))
	{
      $('#sm_nights_min').val($.getUrlVar('nightsMin'));
      $('#sm_nights_max').val(31);
    }
    if ($.getUrlVar('nightsMax')) $('#sm_nights_max').val($.getUrlVar('nightsMax'));
    if ($.getUrlVar('priceFrom')) $('#sm_price_min').val($.getUrlVar('priceFrom'));
    if ($.getUrlVar('priceTo')) $('#sm_price_max').val($.getUrlVar('priceTo'));
    if ($.getUrlVar('currency')) $('#sm_currency').text($.getUrlVar('currency'));
    if ($.getUrlVar('dateFrom')) $('#sm_date_from').val($.getUrlVar('dateFrom'));
	else $('#sm_date_from').val(_sf.DateFormat(new Date(), mSettings.fm.dateFromExt));
    if ($.getUrlVar('dateTo')) $('#sm_date_to').val($.getUrlVar('dateTo'));
	else $('#sm_date_to').val(_sf.DateFormat(new Date(), mSettings.fm.dateToExt));
  },

  DateFormat: function (curentdate, extdate)
  {
    try
    {
      date = new Date(curentdate.getFullYear(), curentdate.getMonth(), curentdate.getDate() + extdate);
      return $.datepicker.formatDate('dd/mm/yy', date);
    }
    catch(p){}
    return "01/01/2012";
  },
  
  defaultsSet: 0,
  setupDefaults: function(what)
  {
    if(_sf.defaultsSet) return false;
    if(mSettings.defaultMeals!=undefined)
    {
      if(mSettings.defaultMeals.length>0) $('#sm_meal').text('');
      for(var i=0;i<mSettings.defaultMeals.length;i++) $('#sm_select_meal_list li').each(function(j,e) { if($(e).text()==mSettings.defaultMeals[i]) { $(e).find('input').attr('checked','checked'); $('#sm_meal').text($('#sm_meal').text()+$(e).text()+' '); } });
    }
    if(mSettings.defaultCities!=undefined) for(var i=0;i<mSettings.defaultCities.length;i++) $('#sm_resort_list li').each(function(j,e) { if($(e).text()==mSettings.defaultCities[i]) $(e).find('input').attr('checked','checked'); });
    if(mSettings.defaultHotels!=undefined) for(var i=0;i<mSettings.defaultHotels.length;i++) $('#sm_hotels_list li').each(function(j,e) { if($(e).text()==mSettings.defaultHotels[i]) $(e).find('input').attr('checked','checked'); });
    if(mSettings.defaultStars!=undefined) for(var i=0;i<mSettings.defaultStars.length;i++) $('#sm_stars_list li').each(function(j,e) { if($(e).text()==mSettings.defaultStars[i]) $(e).find('input').attr('checked','checked'); });

    if(mSettings.defaultMinPrice!=undefined) $('#sm_price_min').val(mSettings.defaultMinPrice);
    if(mSettings.defaultMaxPrice!=undefined) $('#sm_price_max').val(mSettings.defaultMaxPrice);
//    if(mSettings.defaultCurrency!=undefined) $('#sm_currency').val(mSettings.defaultCurrency);
    if(mSettings.defaultMinNights!=undefined) $('#sm_nights_min').val(mSettings.defaultMinNights);
    if(mSettings.defaultMaxNights!=undefined) $('#sm_nights_max').val(mSettings.defaultMaxNights);
    if(mSettings.defaultMinDate!=undefined) $('#sm_date_from').val(mSettings.defaultMinDate);
    if(mSettings.defaultMaxDate!=undefined) $('#sm_date_to').val(mSettings.defaultMaxDate);
    if(mSettings.defaultAdults!=undefined) $('#sm_adults').val(mSettings.defaultAdults);
    if(mSettings.defaultKids!=undefined) $('#sm_kids').val(mSettings.defaultKids);
    if(mSettings.defaultFlightIncluded!=undefined) _sf.checkItem('#sm_HasFlight',mSettings.defaultFlightIncluded);
    if(mSettings.defaultHotelOK!=undefined) _sf.checkItem('#sm_HotelIsNotInStop',mSettings.defaultHotelOK);
    if(mSettings.defaultFlightOK!=undefined) _sf.checkItem('#sm_HasTickets',mSettings.defaultFlightOK);
    
    if($.getUrlVar('STA') == '1')
    {
      if($.getUrlVar('dateFrom'))
      {
        $('#sm_date_from').val($.getUrlVar('dateFrom'));
        var dateFrom = $.datepicker.parseDate('dd/mm/yy', $.getUrlVar('dateFrom'));
        $('#sm_date_to').val($.datepicker.formatDate('dd/mm/yy', new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + mSettings.em.dateToExt)));
      }
      if($.getUrlVar('cities'))
      {
        for(var i=0;i<1;i++) $('#sm_resort_list li').each(function(j,e)
        {
          if($(e).find('input').val()==$.getUrlVar('cities')) $(e).find('input').attr('checked','checked');
        });
      }
    }
  	_sf.cookieSettings(false);
  	
    _sf.getCityByIp(function(data)  // if DEPCITY coo is empty, do geoip lookup
    {
      if(!data || (_sf.getCookie('sf_cityfrom_id') && _sf.getCookie('sf_cityfrom_name'))) return;
      _sf.setCookie('sf_cityfrom_id', data[0], 365);
      _sf.setCookie('sf_cityfrom_name', data[1], 365);
      $('#sm_city').data('uid', data[0]);
      $('#sm_city').text(data[1]);
    });
    _sf.defaultsSet = 1;
  },
  
  getCityByIp: function(cb)
  {
  },
  
  postLoadAll: function()   // do not fill, used for external purposes
  {
  },

  getCookie: function(cookieName)
  {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==cookieName) return unescape(y);
    }
  },

  setCookie: function(cookieName, cookieValue, nDays)
  {
    var today = new Date();
    var expire = new Date();
    if (nDays==null || nDays==0) nDays=1;
    expire.setTime(today.getTime() + 3600000*24*nDays);
    document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString();
  },
  
  cookieSettings: function(save)
  {
    if(_sf.module_STA==true || !mSettings.allowSaveToCookies) return false;
    if(save)
    {
      _sf.setCookie('sf_country_id', $('#sm_country').data('uid'), 365);
      _sf.setCookie('sf_country_name', $('#sm_country').text(), 365);
      _sf.setCookie('sf_cityfrom_id', $('#sm_city').data('uid'), 365);
      _sf.setCookie('sf_cityfrom_name', $('#sm_city').text(), 365);
    }
    else
    {
      $('#sm_country').data('uid', _sf.getCookie('sf_country_id'));
      $('#sm_country').text(_sf.getCookie('sf_country_name'));
      $('#sm_city').data('uid',_sf.getCookie('sf_cityfrom_id'));
      $('#sm_city').text(_sf.getCookie('sf_cityfrom_name'));

      if(_sf.getCookie('sf_cityfrom_id')=="1264") $('#sm_antidnep, #sm_small_adv').show();
      else $('#sm_antidnep, #sm_small_adv').hide();
    }
  },
  
// ====== SMALL FUNCS HERE ======
  
  checkItem: function (w,h) { if(h) $(w).attr('checked','checked'); else $(w).removeAttr('checked'); },
  afterInitCustom: function () {},  //  do not fill, used for external purposes
  biscuitPairs: function(save) {},  //  do not fill, used for external purposes
  checkedElements: function (listName) { return $('#' + listName).find("input[type='checkbox'][checked='true']").size() > 0; },
  setSrcInHtml: function (html) { return html.replace(/\$module_path\$/g, mSettings.modulePath.substr(0, mSettings.modulePath.length - 1)); },
  currencySelected: function (e) { $('#sm_currency').text($(e.target).text()); _sf.closeAllPopups(); },
  showCheckedHotels: function () { _sf.showCheckedValues(_sf.tHotels.id); },
  showCheckedOperators: function () { _sf.showCheckedValues(_sf.tOperators.id); },
  showLoadingLayer: function () { $('#sm_table_form').addClass('sm_disabled_form'); $('#sm_loading_wrapper').show(); },
  hideLoadingLayer: function () { $('#sm_result_table_wrapper').show(); $('#sm_table_form').removeClass('sm_disabled_form'); $('#sm_loading_wrapper').hide(); },
  loadToursOnNewPage: function () { var wndResult=window.open((mSettings.fm.resultPage||mSettings.modulePath+'html/SearchResultNoTO.htm')+_sf.getQueryString(),'results'); },

  fake: 0,
  module_STA: false,
  updateResult: false,
  doExtendSearch: false,
  extendSearchValue: 0,
  extendSearchPN: 0,
  searchFilterType: 0,
  searchFilterData: 0,
  patch01: 0, patch02: 0, patch03: 0, patch04: 0,
  genericTimeout: 0,
  module_result: 0,
  vkgId: 0
}
