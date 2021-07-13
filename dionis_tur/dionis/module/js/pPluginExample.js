/*
This is an example of a plugin for JS sletat.ru interface module.
*/

$.extend(_sf,
{
  cityDptSelected: function (e)				// Modify or
  {											//
    _sf.closeAllPopups();					//
	alert('Mwa-ha-ha! Nothing works!');		//
  },										//
  myOwnFunction: function (0)				// add your own functions.
  {
    /* ... */
  },
  fake: 1,									// Modify or
  my_own_variable: 'Hello, world!'			// add your own variables.
});
