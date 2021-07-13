// Code behind for the page "SmallSearchForm.htm".
// Weirdie, 2010
// Robin, 2011

$.extend(_sf,
{
  columns: [
    'checkIn', 'nights', 'resortName', 'hotelName', 'hotelIsInStop', 'mealName', 'htPlaceName', 
    'hasEconomTicketsDpt', 'hasBusinessTicketsDpt', 'price'],

  init: function ()
  {
    if (mSettings.sm.dateFromExt >= mSettings.sm.dateToExt) alert('Начальные даты для формы поиска заданы неверно (DateFrom >= DateTo).');
    $.ajax({ url: mSettings.modulePath + 'templates/SmallSearchForm.htm', success: _sf.afterInit });
    $.ajax({ url: mSettings.modulePath + 'templates/SearchResultNoTO.htm', success: function (data)
	{
      $('#sm_SearchResult').html(_sf.setSrcInHtml(data));
      _sf.table = $('#sm_result_table');
      $('#sm_show_stat').click(function () { _sf.showStat(this); return false; });
      $('#sm_stat_close_link').click(function () { $('#sm_stat_info').hide(); return false; });
      $('body').click(function () { $('#sm_stat_info').hide(); });
      $('#sm_stat_info').click(function (e) { e.stopPropagation(); });
      _sf.isResultTableHtmlLoaded = true;
    }
    });
    $.ajax({ url: mSettings.modulePath + 'templates/SearchOrder.htm', success: function (data) {
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
          messages: {
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
	  if (mAjax.userId)
	  {
        $('#sm_show_report_form').show();
        $('#sm_show_report_form').click(function () { _sf.showReportErrorForm(); return false; });
      }
      else $('#sm_show_report_form').hide();
    }
    });
  },

  afterInit: function (data, status, request) {
    $('#sm_SearchForm').html(_sf.setSrcInHtml(data));
    _sf.parseExtendedFormUrl();
    _sf.cCountry = $('#sm_country')[0];
    _sf.cFromCity = $('#sm_city')[0];
    _sf.tCities = $('#sm_resort')[0];
    _sf.tHotels = $('#sm_hotel')[0];
    $('#sm_adults,#sm_kids,#sm_nights_min,#sm_price_max').filter_input({ regex: '[0-9]' });
    $('#sm_date_from').val(_sf.DateFormat(new Date(), mSettings.sm.dateFromExt)).filter_input({ regex: '[0-9/]' });
    var numericUps = $('#sm_nights_min_up,#sm_adults_up,#sm_kids_up');
    var numericDns = $('#sm_nights_min_dn,#sm_adults_dn,#sm_kids_dn');
    numericUps.add(numericDns).data("minValue", 0).data("maxValue", 99);
    numericUps.click(function () {
      var tb = $('#' + this.id.substring(0, this.id.length - 3));
      var val = parseInt($(tb).val());
      var maxVal = parseInt($(this).data('maxValue'));
      if (isNaN(val)) {
        val = 1;
      }
      if (val < maxVal) {
        $(tb).val(val + 1);
      }
    });
    numericDns.click(function () {
      var tb = $('#' + this.id.substring(0, this.id.length - 3));
      var val = parseInt($(tb).val());
      var minVal = parseInt($(this).data('minValue'));
      if (isNaN(val)) {
        val = 1;
      }
      if (val > minVal) {
        $(tb).val(val - 1);
      }
    });
    $('#sm_date_from').datepicker({
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      minDate: new Date(),
      nextText: "Далее",
      prevText: "Назад"
    });
    $('#sm_date_from_cal').click(function () { $('#sm_date_from').datepicker('show'); return false; });
    var ups = $('#sm_nights_min_up,#sm_adults_up,#sm_kids_up');
    var dns = $('#sm_nights_min_dn,#sm_adults_dn,#sm_kids_dn');
    ups.add(dns).dblclick(function () { this.click(); });
    $('#sm_currency,#sm_currency_open').click(function ()
	{
      _sf.closeAllPopups('sm_select_currency');
      $('#sm_select_currency').toggle();
      $('#sm_select_currency').position({ my: 'right top', at: 'right bottom', of: $('#sm_currency_open'), offset: '1 1' });
      return false;
    });
    _sf.makeListLive('sm_select_currency', null, _sf.currencySelected);
    $(_sf.tHotel).keyup(_sf.loadHotels);
    $('#sm_searching').click(_sf.findClicked);
	$(document).keydown(function(e)
	{
	  if(e.which==17) isCtrl=true;
	  if(e.keyCode=='13' && isCtrl && mSettings.debugVersion) { _sf.clearCache = true; _sf.findClicked(); }
	});

    _sf.loadDepartCities();
    _sf.loadCountries();

    $('body').click(function () { _sf.closeAllPopups(); });
    $('#sm_select_city_list, #sm_select_country_list, #sm_select_currency, #sm_select_resort, #sm_select_hotel').click(function (e) { e.stopPropagation(); });
    $('#sm_version').text('версия '+_sf.moduleVersion);
  },

  validateForm: function ()
  {
    var dateFrom = $.datepicker.parseDate('dd/mm/yy', $('#sm_date_from').val());
    var nightsMin = parseInt($('#sm_nights_min').val());
    if (isNaN(nightsMin))
    {
      alert('Значение поля "ночей от" указано неверно, поправьте его и повторите поиск.');
      return false;
    }
    var priceMax = parseInt($('#sm_price_max').val());
    if ($('#sm_price_max').val() != '' && isNaN(priceMax))
    {
      alert('Значение поля "цена до" указано неверно, поправьте его и повторите поиск.');
      return false;
    }
    var adults = parseInt($('#sm_adults').val());
    if ($('#sm_adults').val() != '' && isNaN(adults))
    {
      alert('Значение поля "взрослых" указано неверно, поправьте его и повторите поиск.');
      return false;
    }
    var kids = parseInt($('#sm_kids').val());
    if ($('#sm_kids').val() != '' && isNaN(kids))
    {
      alert('Значение поля "детей" указано неверно, поправьте его и повторите поиск.');
      return false;
    }
    return true;
  },

  closeAllPopups: function (skipThis)
  {
    var popups = ['sm_select_currency', 'sm_select_country', 'sm_select_city', 'sm_select_resort', 'sm_select_hotel'];
    for (var i = 0; i < popups.length; i++) if (popups[i] != skipThis) $('#' + popups[i]).hide();
  },

  loadToursOnNewPage: function () {
    var wndResult = window.open((mSettings.sm.resultPage || mSettings.modulePath + 'html/SearchResultNoTO.htm') + _sf.getQueryString(), 'results');
  },
  
  findClicked: function ()
  {
    _sf.closeAllPopups();
    if (!_sf.isCountriesLoaded) { alert('Список стран ещё не загружен. Пожалуйста, подождите.'); return false; }
    if (!_sf.isDepartCitiesLoaded) { alert('Список городов ещё не загружен. Пожалуйста, подождите.'); return false; }
    if (mSettings.sm.showResultOnSamePage) { _sf.showLoadingLayer(); _sf.loadToursInit(true); return false; }
    else { _sf.loadToursOnNewPage(); return false; }
  },
  
  getQueryString: function ()
  {
    var query = '?STA=1';
    var countryId = $('#sm_country').data('uid');
    if (countryId && countryId != '') query += '&country=' + escape(countryId);
    if ($('#sm_country').text() != '') query += '&countryName=' + escape($('#sm_country').text());
    var cityId = $('#sm_city').data('uid');
    if (cityId && cityId != '') query += '&cityFrom=' + escape(cityId);
    if ($('#sm_city').text() != '') query += '&cityFromName=' + escape($('#sm_city').text());

    if ($('#sm_resort').data('uid'))
    {
      query += '&cities=' + $('#sm_resort').data('uid');
      query += '&cityNames=' + $('#sm_resort').text();
    }
    if ($('#sm_hotel').data('uid'))
    {
      query += '&hotels=' + $('#sm_hotel').data('uid');
      query += '&hotelNames=' + $('#sm_hotel').text();
    }

    if ($('#sm_adults').val() != '') query += '&adults=' + escape($('#sm_adults').val());
    if ($('#sm_kids').val() != '') query += '&kids=' + escape($('#sm_kids').val());
    if ($('#sm_nights_min').val() != '') query += '&nightsMin=' + escape($('#sm_nights_min').val());
    if ($('#sm_date_from').val() != '') query += '&dateFrom=' + escape($('#sm_date_from').val());
    if ($('#sm_price_max').val() != '') query += '&priceTo=' + escape($('#sm_price_max').val());
    query += '&currency=' + $('#sm_currency').text();
    query += '&hotelIsNotInStop=true';
    query += '&hasTickets=true&';
    query += '&moduleStyle=mini';
    return query;
  },

  resortSelected: function (e)
  {
    $('#sm_resort').data('uid', e.target.id.substring(6));
    $('#sm_resort').text($(e.target).text());
    _sf.closeAllPopups();
    _sf.loadHotelsInfo();
  },

  hotelSelected: function (e)
  {
    $('#sm_hotel').data('uid', e.target.id.substring(5));
    $('#sm_hotel').text($(e.target).text());
    _sf.closeAllPopups();
  },

  loadCities: function () {
    _sf.setDivListMsg(_sf.tCities, 'Загрузка данных...');
    var callback = function (data) {
      $('#sm_select_resort_list').html('');
      var html = '';
      for (var i = 0; i < data.length; i++) {
        html += '<li id="resort' + data[i].Id + '">' + data[i].Name + '</li>';
      }
      $('#sm_select_resort_list').html(html);
      _sf.makeListLive('sm_select_resort_list', 'resort', _sf.resortSelected);
      if (!_sf.resortClickBound) {
        $('#sm_resort, #sm_resort_open').click(function () {
          _sf.closeAllPopups('sm_select_resort');
          $('#sm_select_resort').toggle();
          $('#sm_select_resort').position({ my: 'right top', at: 'right bottom', of: $('#sm_resort_open'), offset: '0 1' });
          return false;
        });
        _sf.resortClickBound = true;
      }
      _sf.setDivListMsg(_sf.tCities, 'Любой', '');
    };
    mAjax.getCities($('#sm_country').data('uid'), callback);
  },

  loadHotelsInfo: function () {
    _sf.loadHotels();
  },

  loadHotels: function () {
    _sf.setDivListMsg(_sf.tHotels, 'Загрузка данных...');
    var city = $('#sm_resort').data('uid');
    var callback = function (data) {
      $('#sm_select_hotel_list').html('');
      var html = '';
      for (var i = 0; i < data.length; i++) {
        if (data[i].Name.length <= 30) {
          html += '<li id="hotel' + data[i].Id + '">' + data[i].Name + '</li>'
        }
        else {
          html += '<li id="hotel' + data[i].Id + '">' + data[i].Name.substring(0, 30) + '...</li>'
        }
      }
      $('#sm_select_hotel_list').html(html);
      _sf.makeListLive('sm_select_hotel_list', 'hotel', _sf.hotelSelected);
      if (!_sf.hotelClickBound) {
        $('#sm_hotel, #sm_hotel_open').click(function () {
          _sf.closeAllPopups('sm_select_hotel');
          $('#sm_select_hotel').toggle();
          $('#sm_select_hotel').position({ my: 'right top', at: 'right bottom', of: $('#sm_hotel_open'), offset: '0 1' });
          return false;
        });
        _sf.hotelClickBound = true;
      }
      _sf.setDivListMsg(_sf.tHotels, 'Любой', '');
    };
    mAjax.getHotels($('#sm_country').data('uid'), city, '', '', callback);
  },

  parseExtendedFormUrl: function () {
    if ($.getUrlVar('adults')) {
      $('#sm_adults').val($.getUrlVar('adults'));
    }
    if ($.getUrlVar('kids')) {
      $('#sm_kids').val($.getUrlVar('kids'));
    }
    if ($.getUrlVar('nightsMin')) {
      $('#sm_nights_min').val($.getUrlVar('nightsMin'));
    }
    if ($.getUrlVar('priceTo')) {
      $('#tPriceTo').val($.getUrlVar('priceTo'));
    }
    if ($.getUrlVar('currency')) {
      $('#currency').val($.getUrlVar('currency'));
    }
    if ($.getUrlVar('dateFrom')) {
      $('#tDateFrom').val($.getUrlVar('dateFrom'));
    }
  },

  module_style: 'mini',
  module_meals: false
});
