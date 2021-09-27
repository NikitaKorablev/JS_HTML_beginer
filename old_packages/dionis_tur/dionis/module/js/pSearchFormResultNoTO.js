// Code behind for the page "SearchFormResult.htm".
// Weirdie, 2010
// Robin, 2011

$.extend(_sf,
{
  columns: [
    'checkIn', 'nights', 'resortName', 'hotelName', 'hotelIsInStop', 'mealName', 'htPlaceName', 
    'hasEconomTicketsDpt', 'hasBusinessTicketsDpt', 'price'],

  init: function ()
  {
    $.ajax({ url: mSettings.modulePath + 'templates/SearchResultNoTO.htm', success: function (data) {
      $('#sm_SearchResult').html(_sf.setSrcInHtml(data));
      _sf.table = $('#sm_result_table');
      $('#sm_show_stat').click(function () { _sf.showStat(this); return false; });
      $('#sm_stat_close_link').click(function () { $('#sm_stat_info').hide(); return false; });
      $('body').click(function () { $('#sm_stat_info').hide(); });
      $('#sm_stat_info').click(function (e) { e.stopPropagation(); });
      _sf.isResultTableHtmlLoaded = true;
      _sf.afterInit();
    }
    });
    $.ajax({ url: mSettings.modulePath + 'templates/SearchOrder.htm', success: function (data) {
      $('body').append(_sf.setSrcInHtml(data));
      $('#sm_close_order_form').click(function () { $.colorbox.close(); $('#sm_dialog').hide(); return false; });
      _sf.isOrderHtmlLoaded = true;
      var form = $('#sm_order_form');
      if (form.length > 0) {
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
        _sf.afterInit();
      }
    }
    });
  },

  afterInit: function ()
  {
    if (!_sf.isResultTableHtmlLoaded || !_sf.isOrderHtmlLoaded) return;
    _sf.loadToursInit();
  },

  loadToursInit: function ()
  {
    _sf.lastRequestId = 0;
    _sf.isFirstRequest = true;
    $('#sm_progress').hide();
    $('#sm_stat_info').hide();
    if (_sf.lastLoadStateTimer != null) clearTimeout(_sf.lastLoadStateTimer);
    _sf.lastNewLoadState = null;
    _sf.loadTours(1);
  },

  module_style: 'noto',
  module_STA: true,		
  module_result: 1,	
  module_meals: true
});
