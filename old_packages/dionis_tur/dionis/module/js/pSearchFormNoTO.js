$.extend(_sf,
{
  columns: [
    'checkIn', 'nights', 'resortName', 'hotelName', 'hotelIsInStop', 'mealName', 'htPlaceName', 
    'hasEconomTicketsDpt', 'hasBusinessTicketsDpt', 'price'],

  init: function ()
  {
    if($.browser.webkit||$.browser.opera) $('body').addClass('css-webkit');
    if($.browser.mozilla) $('body').addClass('css-ffox');
    if($.browser.msie) $('body').addClass('css-msie');
 	if ($.getUrlVar('STA') == '1') _sf.module_STA=true;
    if (mSettings.em.dateFromExt >= mSettings.em.dateToExt) alert('Начальные даты для формы поиска заданы неверно (DateFrom >= DateTo).');
    $.ajax({ url: mSettings.modulePath + 'templates/SearchFormNoTO.htm', success: _sf.afterInit });
    $.ajax({ url: mSettings.modulePath + 'templates/SearchResultNoTO.htm', success: function (data)
	{
      $('#sm_SearchResult').html(_sf.setSrcInHtml(data));
      _sf.table = $('#sm_result_table');
      $('body').click(function () { $('#sm_stat_info').hide(); });
      $('#sm_stat_info').click(function (e) { e.stopPropagation(); });
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
        form.validate({
          rules: {
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
	  $('#sm_HasFlight').click(function(){if(!$('input[name=sm_HasFlight_n]').is(':checked'))$('input[name=sm_HasTickets_n]').attr('checked',false);});
	  $('#sm_HasTickets').click(function(){if($('input[name=sm_HasTickets_n]').is(':checked'))$('input[name=sm_HasFlight_n]').attr('checked',true);});
    }
    });
  },

  closeAllPopups: function (skipThis)
  {
    var popups = ['sm_select_currency', 'sm_select_country', 'sm_select_city', 'sm_select_meal'];
    for (var i = 0; i < popups.length; i++) if (popups[i] != skipThis) $('#' + popups[i]).hide();
  },

  loadMeals: function ()
  {
    mAjax.ajaxSwitchCurrent=1;
    var callback = function (data)
    {
      $('#sm_select_meal_list').html('');
      var html = '';
      for (var i = 0; i < data.length; i++)
      {
        html += '<li id="meal' + data[i].Id + '"><input type="checkbox" id="mlcb' + data[i].Id + '" value="' + data[i].Id + '" /><label for="mlcb' + data[i].Id + '">' + data[i].Name + '</label></li>';
      }
      $('#sm_select_meal_list').html(html);
      _sf.makeListLive('sm_select_meal_list', 'meal', _sf.mealSelected);
  
      $('#sm_meal, #sm_meal_open').unbind("click");
      $('#sm_meal, #sm_meal_open').click(function ()
      {
        _sf.closeAllPopups('sm_select_meal');
        $('#sm_select_meal').toggle();
        $('#sm_select_meal').position({ my: 'right top', at: 'right bottom', of: $('#sm_meal_open'), offset: '0 1' });
        return false;
      });
      $('#sm_meal').text('Любое');
    };

    var mAjax_getMeals=function ()
    {
      mAjax.getMeals(callback, mAjax.defaultError, function ()
      { 
        if(mAjax.ajaxSwitchCurrent<mAjax.ajaxSwitchMax) {mAjax.ajaxSwitchCurrent++; $(mAjax_getMeals);}
        else return this.defaultAjaxError;
      },function ()
      {
        _sf.setListMsg(_sf.tMeals, "Ошибка (<a href='#' rel='nofollow' onclick='_sf.loadMeals(); return false;'>обновить</a>)", 'sm_listError');
      }
      );
    }
    $(mAjax_getMeals);
  },
  
  mealSelected: function (e)
  {
    var list = _sf.getCheckedNames('sm_select_meal_list');
    var text = 'Любое';
    if (list.length > 0) text = list.join(', ');
    if (text.length > 30) text = text.substring(0, 30) + ' ...';
    $('#sm_meal').text(text);
  },

  /*fillList: function (list, data, clickEventName)
  {
	if (data != null && data.length > 0)
	{
      $('#' + list.id).html('');
      var html = '';
      for (var i = 0; i < data.length; i++)
	  {
        html += '<li><input ' + (clickEventName ? 'onclick="' + clickEventName + '();" ' : '') + 'type="checkbox" id="' + list.id + data[i].Id + '" value="' + data[i].Id + '" /><label for="' + list.id + data[i].Id + '">' + data[i].Name + '</label></li>';
      }
      $('#' + list.id).html(html);
    }
    else _sf.setListMsg(list, 'Список пуст');
  },*/

  /*fillListUsingDiv: function (list, data, clickEventName)
  {
    if (data != null && data.length > 0)
	{
      $('#' + list.id).html('');
      var html = '';
      for (var i = 0; i < data.length; i++)
	  {
        html += '<div><input ' + (clickEventName ? 'onclick="' + clickEventName + '();" ' : '') + 'type="checkbox" id="' + list.id + data[i].Id + '" value="' + data[i].Id + '" /><label for="' + list.id + data[i].Id + '">' + data[i].Name + '</label></div>';
      }
      $('#' + list.id).html(html);
    }
    else _sf.setDivListMsg(list, 'Список пуст');
  },*/
  
  findClicked: function ()
  {
    _sf.closeAllPopups();
    if (!_sf.isCountriesLoaded)
	{
      alert('Список стран ещё не загружен. Пожалуйста, подождите.');
      return false;
    }
    if (!_sf.isDepartCitiesLoaded)
	{
      alert('Список городов ещё не загружен. Пожалуйста, подождите.');
      return false;
    }
    if (mSettings.em.showResultOnSamePage)
	{
      _sf.showLoadingLayer();
      _sf.loadToursInit(true); return false;				// first run
    }
    else { _sf.loadToursOnNewPage(); return false; }
  },
  
  loadToursOnNewPage: function ()
  {
    var wndResult = window.open((mSettings.em.resultPage || mSettings.modulePath + 'html/SearchResultNoTO.htm') + _sf.getQueryString(), 'results');
  },

  module_style: 'noto',
  module_meals: true
});
