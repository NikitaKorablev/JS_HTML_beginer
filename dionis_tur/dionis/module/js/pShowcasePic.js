// Code behind for the page "Showcase.htm".
// Weirdie, 2010
// Robin, 2011

var _sc = {
  cCountry: null, cFromCity: null,
  isDepartCitiesLoaded: false,
  isCountriesLoaded: false,
  isOrderHtmlLoaded: false,
  lastRequestId: 0,
  lastLoadedData: null,
  rt_ColumnMapping:
  {
    array: [
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
      { index: 28, name: 'checkOutShort', internal: false },
      { index: 29, name: 'hotelIconURL', internal: false }
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
    if (mSettings.sc.dateFromExt >= mSettings.sc.dateToExt) alert('Начальные даты для формы поиска заданы неверно (DateFrom >= DateTo).');
    $.ajax({ url: mSettings.modulePath + 'templates/Showcase.htm', success: _sc.afterInit });
    $.ajax({ url: mSettings.modulePath + 'templates/SearchOrder.htm', success: function (data)
    {
      $('body').append(_sc.setSrcInHtml(data));
      $('#sm_close_order_form').click(function () { $.colorbox.close(); $('#sm_dialog').hide(); return false; });
      _sc.isOrderHtmlLoaded = true;
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
          submitHandler: _sc.sendTourOrder,
          errorElement: 'em',
          wrapper: 'li',
          errorLabelContainer: '#sm_tour_order_error'
        });
      }
      if (mAjax.userId)
      {
        $('#sm_show_report_form').show();
        $('#sm_show_report_form').click(function () { _sc.showReportErrorForm(); return false; });
      }
      else $('#sm_show_report_form').hide();
    }
    });
  },

  afterInit: function (data, status, request)
  {
    $('#ht_Showcase').html(_sc.setSrcInHtml(data));
    _sc.cCountry = $('#ht_country')[0];
    _sc.cFromCity = $('#ht_cityFrom')[0];
    $(_sc.cFromCity).change(_sc.loadCountries);
    $(_sc.cCountry).change(_sc.loadTours);
    _sc.loadDepartCities();
  },

  afterInitBack: function ()
  {
    _sc.loadTours();
  },

  loadDepartCities: function ()
  {
    var list, callback = function (data)
    {
      _sc.fillSelect('ht_cityFrom', data, mSettings.sc.defaultCityFrom);
      if ($.getUrlVar('cityFrom')) $('#ht_cityFrom').val($.getUrlVar('cityFrom'));
      if ($.getUrlVar('cityFromName'))
      {
        list = $('#ht_cityFrom option');
        for (var i = 0; i < list.length; i++)
        {
          if ($(list[i]).text() == $.getUrlVar('cityFromName'))
          {
            $('#ht_cityFrom').val(list[i].value);
            break;
          }
        }
      }
      _sc.isDepartCitiesLoaded = true;
      if (_sc.isCountriesLoaded) _sc.afterInitBack();
      _sc.loadCountries();
    };
    mAjax.getDepartCities(mSettings.sc.templateHot, callback);
  },

  loadCountries: function ()
  {
    var list, callback = function (data)
    {
      _sc.fillSelect('ht_country', data, mSettings.sc.defaultCountry);
      if ($.getUrlVar('country')) $('#ht_country').val($.getUrlVar('country'));
      if ($.getUrlVar('countryName'))
      {
        list = $('#ht_country option');
        for (var i = 0; i < list.length; i++)
        {
          if ($(list[i]).text() == $.getUrlVar('countryName'))
          {
            $('#ht_country').val(list[i].value);
            break;
          }
        }
      }
      _sc.isCountriesLoaded = true;
      if (_sc.isDepartCitiesLoaded) _sc.afterInitBack();
    };
    mAjax.getCountries(mSettings.sc.templateHot, 1, $('#ht_cityFrom').val(), callback);
  },

  fillSelect: function (selectName, data, selected)
  {
    var output = [];
    $.each(data, function (index, item)
    {
      if (item.Name == selected) output.push('<option selected="selected" value="' + item.Id + '">' + item.Name + '</option>');
      else output.push('<option value="' + item.Id + '">' + item.Name + '</option>');
    });
    $('#' + selectName).html(output.join(''));
  },

  loadTours: function ()
  {
    $('#ht_result_body').html('<tr id="ht_result_loading"><td>Загрузка туров...</td></tr>');
    mAjax.getShowcase(mSettings.sc.templateHot,
      150,
      _sc.cCountry.value, $('#' + _sc.cCountry.id + ' option:selected').text(),
      _sc.cFromCity.value, $('#' + _sc.cFromCity.id + ' option:selected').text(),null,null,null,null,null,null,'руб.',null,null,null,null,
      function (data, status, request)
      {
        _sc.lastLoadedData = data;
        _sc.lastRequestId = data.requestId;
        _sc.fillTours(data);
      },
      function (msg)
      {
        alert(msg);
      },
      function (request, text)
      {
        if (confirm("Не удалось загрузить данные по указанному фильтру. Попробовать еще раз?")) { _sc.loadTours(); return; }
      }
    );
  },

  fillTours: function (data)
  {
    var html = '', prevHotelName, newLine = 0, prevNewLine = 0, uniques = 0, unique = true, canDH = false;
    var dhUsed = 0;

    /*if(mSettings.sc.sletatDummies) _im.test('http://www.sletat.ru/files/dh/' + _sc.cCountry.value + '/1.png', function()
    {
      canDH = true;
    });*/
    $('#ht_result_body').html('');
    for (var i = 0; i < data.aaData.length +1; i++) if(data.aaData[i]!=undefined || i==data.aaData.length)
    {
      if (i<data.aaData.length)
      {
        var row = data.aaData[i];
        var hotelName = row[_sc.rt_ColumnMapping.getColumn('hotelName').index];
        if(hotelName.length>30) hotelName=hotelName.substr(0,30)+' ...';
      }
      else hotelName = "ht_default_hotel";

      if (hotelName == prevHotelName) unique = false;
      else
      {
        unique = true;
        uniques++;
        prevNewLine = newLine; newLine = i;
      }

      if (uniques>mSettings.sc.resultLengthExt+1) continue;
      try
      {
        var starName = row[_sc.rt_ColumnMapping.getColumn('starName').index];
      }
      catch(e){}
      var filter = false;

      html += '<tr id="ht_htid_'+i+'"';
      if (!unique) html += ' style="display:none;"';
      html += '><td';
      if (unique) html += ' class="ht_dotted_1"';
      else html += ' class="ht_dotted_3"';
      html += '>';

      if(!row[_sc.rt_ColumnMapping.getColumn('hotelIconURL').index])
      {
        var dh, rh; // = Math.floor(dhUsed+1+Math.random()*(7-dhUsed)); // From 1(x) to 8
        rh = dhUsed + 1;
        if(mSettings.sc.sletatDummies)
        {
          dh = 'http://www.sletat.ru/files/dh/' + _sc.cCountry.value + '/' + rh + '.png';
          _im.test(dh, i, null, function(x)
          {
            $('#ht_htimg_'+x).attr('src', mSettings.modulePath + 'styles/images/hotel.jpg');
          });
          if(unique) dhUsed++;
        }
        else dh = mSettings.modulePath + "styles/images/hotel.jpg";
        row[_sc.rt_ColumnMapping.getColumn('hotelIconURL').index] = dh;
      } 

      var hotURL='';
      var hotelUrl = row[_sc.rt_ColumnMapping.getColumn('hotelUrl').index];
      if (hotelUrl != '')
      {
        if ($.browser.msie || mSettings.showExternalLinksOnBlankPage) hotURL = '<a class="ht_hotel_link" href="#" onClick="IE_hotel(\'' + hotelUrl + '\'); return false;">';
        else hotURL = '<a class="ht_hotel_link" href="' + hotelUrl + '">';
      }

      if (unique)
      {
        if (hotelUrl != '') html += hotURL;
        html += '<img id="ht_htimg_'+i+'" style="width:115px;height:80px;" src="'+row[_sc.rt_ColumnMapping.getColumn('hotelIconURL').index]+'" alt="Изображение загружается...">';
        if (hotelUrl != '') html += '</a>';
      }
      html += '</td><td ';
      if (unique) html += ' class="ht_dotted_2"';
      else html += ' class="ht_dotted_4"';
      html += '>';

      if (unique)
      {
        html += '<strong>' + row[_sc.rt_ColumnMapping.getColumn('resortName').index] + '</strong>, ';
        var hotel = hotelName;
        if (hotelUrl != '') hotel = hotURL + hotel + '</a>';

        html += '<strong>' + hotel + '</strong> &nbsp;<input class="ht_yellowstar" style="width:';
        switch(starName)
        {
          case 'Apts': html+='50'; break;
          case '1*': html+='10'; break;
          case '2*': html+='20'; break;
          case '3*': html+='30'; break;
          case '4*': html+='40'; break;
          case '5*': html+='50'; break;
          case 'HV-1':html+='50'; break;
          case 'HV-2': html+='40'; break;
          default: html+='0';
        }
        html += 'px;"><br><br>';
      }
      html += row[_sc.rt_ColumnMapping.getColumn('checkIn').index];
      html += ' (';
      html += row[_sc.rt_ColumnMapping.getColumn('nights').index]+1;
      html += ' дн)&nbsp; ';
      html += row[_sc.rt_ColumnMapping.getColumn('htPlaceName').index] + ' ';

      var opkui = ' (от '+row[_sc.rt_ColumnMapping.getColumn('operator').index]+')';
      if(mAjax.userId == null) opkui='';

      html += '&nbsp;<a rel="nofollow" class="ht_order_link" href="#" onclick="_sc.showTourOrderForm(' + row[_sc.rt_ColumnMapping.getColumn('operatorId').index] + ', \'' + row[_sc.rt_ColumnMapping.getColumn('id').index] + '\'); return false;">Купить'+opkui+'</a> за <span class="ht_price">' + row[_sc.rt_ColumnMapping.getColumn('price').index].replace(' ', '&nbsp;') + '</span>';


      if (newLine == i && i) // thus it's a first HT in the set (except 0); we need to add to the previous newline a button and a number
      {
        $('#ht_htsp_'+prevNewLine).html(newLine - prevNewLine - 1);
        if (newLine - prevNewLine == 1) { $('#ht_htsp2_'+prevNewLine).remove(); $('#ht_htln_'+prevNewLine).show(); }
      }
      if (unique)
      {
        html += '<span id="ht_htsp2_'+i+'" style="margin-left:15px;"><strong><a id="ht_hta_'+i+'" href="#">( + ещё <span id="ht_htsp_'+i+'">???</span> )</a></strong></span> <span id="ht_htsp3_'+i+'" style="display:none;margin-left:12px;"><strong><a id="ht_hta2_'+i+'" href="#">( скрыть ) </a></strong></span>';
        var j = prevNewLine + 1;
        var am = newLine - prevNewLine - 1;
        if (newLine)
        {
          $('#ht_hta_'+prevNewLine).attr('href', 'javascript:toggleRange('+j+','+am+');');
          $('#ht_hta2_'+prevNewLine).attr('href', 'javascript:toggleRange('+j+','+am+');');
        }
      }

      var sourceId = row[_sc.rt_ColumnMapping.getColumn('operatorId').index];
      var offerId = String(row[_sc.rt_ColumnMapping.getColumn('id').index]);
      if ($.getUrlVar('debug') == '1') html += ' &nbsp; [ oper=' + sourceId + ';&nbsp; id=' + offerId + ']';

      html += '</td></tr>';
      prevHotelName = hotelName;
      if (i<data.aaData.length) $('#ht_result_body').append(html); html='';
     
      if (filter==true) $('#ht_htid_'+i).hide();
      if (uniques>=mSettings.sc.resultLengthExt+1) $('#ht_htid_'+i).hide();
    }

    html += '<tr><td colspan=2 class="ht_dotted_5">&nbsp;</td></tr>';
    if (mSettings.sc.extendedFormMore) html += '<tr><td colspan=2><a href="' + _sc.getQueryString() + '" class="ht_tours_all">ПОКАЗАТЬ ВСЕ ТУРЫ</a></td></tr>';
    if (data.aaData.length==0) html += '<tr><td colspan=2><span class="ht_tours_no_data">Нет туров для выбранных города вылета и направления.</span></td></tr>';
    $('#ht_result_body').html($('#ht_result_body').html()+html);
    if (!mSettings.showExternalLinksOnBlankPage && !$.browser.msie)
    {
      $('.ht_hotel_link').colorbox({ width: "70%", height: "80%", speed: 100, transition: 'fade', close: '', iframe: true });
    }
  },

  getQueryString: function ()
  {
    var query = (mSettings.sc.extendedFormUrl || 'SearchFormNoTO.htm') + '?';
    query += 'country=' + escape(_sc.cCountry.value);
    query += '&cityFrom=' + escape(_sc.cFromCity.value);
    query += '&adults=2';
    query += '&kids=0';
    query += '&nightsMin=3';
    query += '&nightsMax=15';
    query += '&dateFrom=' + _sc.DateFormat(new Date(), mSettings.sc.dateFromExt);
    query += '&dateTo=' + _sc.DateFormat(new Date(), mSettings.sc.dateToExt);
    if (mSettings.sc.priceMin) query += '&priceTo=' + mSettings.sc.priceMin;
    if (mSettings.sc.priceMax) query += '&priceFrom=' + mSettings.sc.priceMax;
    query += '&currency=RUB';// + mSettings.sc.currency;
    query += '&hotelIsNotInStop=' + mSettings.sc.hideHotelsInStop;
    query += '&hasTickets=' + mSettings.sc.hideToursWithoutTickets;
    return query;
  },

  showTourOrderForm: function (sourceId, offerId)
  {
    if (!_sc.isOrderHtmlLoaded)
    {
      alert('Форма заказа ещё не загружена. Подождите, пожалуйста.');
      return;
    }
    $('#sm_dialog').data('offerId', offerId);
    $('#sm_dialog').data('sourceId', sourceId);
    $('#sm_dialog_content').hide();
    $('#sm_dialog_status').text('...актуализация данных...');
    $('#sm_dialog_status').show();

    $.colorbox({ width: '715px', height: '450px', inline: true, transition: 'fade', speed: 100, close: '', href: '#sm_dialog', onComplete: function () { $('#sm_dialog').show(); }, onCleanup: function () { $('#sm_dialog').hide(); } });

    mAjax.getActualPrice(_sc.lastRequestId, _sc.cCountry.value, 1, sourceId, offerId, 'RUB', function (result)
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

        $('#sm_tour_stops').text(stops);
        $('#sm_tour_price').text('Цена: ' + result.data[18].toString() + ' ' + result.data[21]);
      }
    });
  },

  sendTourOrder: function ()
  {
    var offerId = $('#sm_dialog').data('offerId');
    var sourceId = $('#sm_dialog').data('sourceId');
    mAjax.saveTourOrder(
      _sc.lastRequestId, offerId, sourceId, $('#sm_user').val(), $('#sm_email').val(), $('#sm_phone').val(), $('#sm_info').val(),
      $('#ht_country option:selected').text(), $('#ht_cityFrom option:selected').text(), 'RUB',
      function ()
      {
        $('#sm_dialog_content').hide();
        $('#sm_dialog_status').text('...заявка отправлена - менеджер свяжется с вами...');
        $('#sm_dialog_status').show();
      }
    );
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
$(_sc.init);

_im =
{
  img:0,
  test: function(u, d, sc, fl)
  {
    delete _im.img;
    _im.img = new Image();
    _im.img.onload = sc;
    _im.img.onerror = function() { fl(d); };
    _im.img.src = u;
  }
};

/*
  Aux code.
*/
function toggleRange(b, a)
{
  var t;
  for(var i=0;i<a;i++) { t=b+i; $('#ht_htid_'+t).toggle(); }
  t = b - 1;
  if( $('#ht_htid_'+b).css('display') != "none" )
  {
    $('#ht_htsp2_'+t).hide();
    $('#ht_htsp3_'+t).show();
  }
  else
  {
    $('#ht_htsp3_'+t).hide();
    $('#ht_htsp2_'+t).show();
  }
}

function IE_hotel(h)
{
  window.open(h,'_blank');
}
