// Code behind for the page "ShowcaseReview.htm".
// Weirdie, 2010
// Robin, 2011

var _scr = {
  init: function ()
  {
    if (mSettings.sc.dateFromExt >= mSettings.sc.dateToExt) alert('Начальные даты для формы поиска заданы неверно (DateFrom >= DateTo).');
    $.ajax({ url: mSettings.modulePath + 'templates/ShowcaseReview.htm', success: _scr.afterInit });
  },

  afterInit: function (data, status, request)
  {
    $('#ht_ShowcaseReview').html(_scr.setSrcInHtml(data));
    _scr.loadTours();
  },

  loadTours: function ()
  {
    $('#ht_result_body').html('<div class="ht_scr_loading">Загрузка данных...</div>');
    mAjax.getShowcaseReview(mSettings.sc.templateHot,
      mSettings.sc.defaultCityFrom,
      mSettings.sc.adults,
      mSettings.sc.kids,
      mSettings.sc.nightsMin,
      mSettings.sc.nightsMax,
      mSettings.sc.priceMin ? mSettings.sc.priceMin : '',
      mSettings.sc.priceMax ? mSettings.sc.priceMax : '',
      mSettings.sc.currency,
      _scr.DateFormat(new Date(), mSettings.sc.dateFromExt),
      _scr.DateFormat(new Date(), mSettings.sc.dateToExt),
      mSettings.sc.hideHotelsInStop,
      mSettings.sc.hideToursWithoutTickets,
      function (data, status, request) { _scr.fillTours(data); },
      function (msg) { alert(msg); },
      function (request, text) { if (confirm("Не удалось загрузить данные. Попробовать еще раз?")) { _scr.loadTours(); return; } }
    );
  },

  fillTours: function (data)
  {
    var html = '';
    if (data.length > 0) for (var i = 0; i < data.length; i++) html += _scr.renderItem(data[i]);
    else html = '<div class="ht_scr_no_data">Нет данных.</div>';
    $('#ht_showcase_wrapper').html(html);
  },

  renderItem: function (item)
  {
    var html = '';
    html += '<div class="ht_scr_item">';
    html += '<a href="' + _scr.getQueryString(item.CountryId) + '">';
    html += item.CountryName;
    if (item.MinPrice) html += ' от ' + item.MinPrice;
    html += '</a><br /><a href="' + _scr.getQueryString(item.CountryId) + '"><img src="' + item.CountryImageUrl + '" alt="' + item.CountryName + '" /></a></div>';
    return html;
  },

  getQueryString: function (countryId)
  {
    var query = (mSettings.sc.showcaseUrl || mSettings.modulePath+'html/ShowcasePic.htm') + '?';
    query += 'country=' + escape(countryId);
    return query;
  },

  DateFormat: function (curentdate, extdate)
  {
    date = new Date(curentdate.getFullYear(), curentdate.getMonth(), curentdate.getDate() + extdate);
    return $.datepicker.formatDate('dd/mm/yy', date);
  },

  setSrcInHtml: function (html)
  {
    return html.replace(/\$module_path\$/g, mSettings.modulePath.substr(0, mSettings.modulePath.length - 1));
  }
}
$(_scr.init);

