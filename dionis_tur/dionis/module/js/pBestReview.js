var _scrbest = {
  init: function ()
  {
    if (mSettings.sc.dateFromExt >= mSettings.sc.dateToExt) alert('Начальные даты для формы поиска заданы неверно (DateFrom >= DateTo).');
    $.ajax({ url: mSettings.modulePath + 'templates/BestReview.htm', success: _scrbest.afterInit });
  },

  afterInit: function (data, status, request)
  {
    $('#ht_BestReview').html(_scrbest.setSrcInHtml(data));
    _scrbest.loadTours();
  },

  loadTours: function ()
  {
    mAjax.getShowcaseReview(mSettings.sc.templateBest,
      mSettings.sc.defaultCityFrom,
      mSettings.sc.adults,
      mSettings.sc.kids,
      mSettings.sc.nightsMin,
      mSettings.sc.nightsMax,
      mSettings.sc.priceMin ? mSettings.sc.priceMin : '',
      mSettings.sc.priceMax ? mSettings.sc.priceMax : '',
      mSettings.sc.currency,
      _scrbest.DateFormat(new Date(), mSettings.sc.dateFromExt),
      _scrbest.DateFormat(new Date(), mSettings.sc.dateToExt),
      mSettings.sc.hideHotelsInStop,
      mSettings.sc.hideToursWithoutTickets,
      function (data, status, request) { _scrbest.fillTours(data); },
      function (msg) { alert(msg); },
      function (request, text) { if (confirm("Не удалось загрузить данные. Попробовать еще раз?")) { _scrbest.loadTours(); return; } }
    );
  },

  fillTours: function (data)
  {
    var html = '';
    if (data.length > 0) for (var i = 0; i < data.length; i++) html += _scrbest.renderItem(data[i]);
    else html = '<div class="ht_scrbest_no_data">Нет данных.</div>';
    $('#ht_best_wrapper').html(html);
  },

  renderItem: function (item)
  {
    var html = '';
    html += '<div class="ht_scrbest_item">';
    html += '<a href="' + _scrbest.getQueryString(item.CountryId) + '">';
    html += item.CountryName;
    if (item.MinPrice) html += ' от ' + item.MinPrice;
    html += '</a><br /><a href="' + _scrbest.getQueryString(item.CountryId) + '"><img src="' + item.CountryImageUrl + '" alt="' + item.CountryName + '" /></a></div>';
    return html;
  },

  getQueryString: function (countryId)
  {
    var query = (mSettings.sc.bestUrl || 'BestPic.htm') + '?';
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
$(_scrbest.init);

