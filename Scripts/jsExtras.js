//=============================================================================
//
//     FILE : jsExtras.js
//
//  PROJECT : Any
//
//  PURPOSE : Extra Javascript functionality
//
//   AUTHOR : Bill Daniels
//            Copyright (c) 2014-2016, D+S Tech Labs, Inc.
//            All Rights Reserved
//
//=============================================================================

//---------------------------------------------------------
//  String Functions
//---------------------------------------------------------

if (typeof String.prototype.startsWith != 'function')
{
  String.prototype.startsWith = function (string)
  {
    return this.slice (0, string.length) == string;
  };
}

if (typeof String.prototype.endsWith != 'function')
{
  String.prototype.endsWith = function (string)
  {
    return this.slice (-string.length) == string;
  };
}

if (typeof String.prototype.padLeft != 'function')
{
  String.prototype.padLeft = function (padChar, totalLength)
  {
    var paddedString = this;

    while (paddedString.length < totalLength)
      paddedString = padChar + paddedString;

    return paddedString;
  };
}

if (typeof String.prototype.padRight != 'function')
{
  String.prototype.padRight = function (padChar, totalLength)
  {
    var paddedString = this;

    while (paddedString.length < totalLength)
      paddedString += padChar;

    return paddedString;
  };
}

if (typeof String.prototype.replaceAll != 'function')
{
  String.prototype.replaceAll = function (search, replace)
  {
    if (replace === undefined)
      return this.toString();

    return this.split (search).join (replace);
  }
}

//---------------------------------------------------------
//  Number Functions
//---------------------------------------------------------

if (typeof Number.prototype.toFixedNoPad != 'function')
{
  Number.prototype.toFixedNoPad = function (numDigits)
  {
    var numString = this.toFixed (numDigits);

    while (numString.endsWith ("0"))
      numString = numString.substring (0, numString.length-1);

    if (numString.endsWith ("."))
      numString = numString.substring (0, numString.length-1);

    return numString;
  };
}


//---------------------------------------------------------
//  Misc Functions
//---------------------------------------------------------

//--- GetTimestamp ----------------------------------------

function GetTimestamp ()
{
  try
  {
    // Return a current timestamp
    var newDate   = new Date ();
    var timestamp = newDate.getHours        ().toString().padLeft  ('0', 2) + ':' +
                    newDate.getMinutes      ().toString().padLeft  ('0', 2) + ':' +
                    newDate.getSeconds      ().toString().padLeft  ('0', 2) + '.' +
                    newDate.getMilliseconds ().toString().padRight ('0', 3);

    return timestamp;
  }
  catch (ex)
  {
    ShowException (ex);
  }
}

//--- GetBrowserWidth -----------------------------------

function GetBrowserWidth ()
{
  try
  {
    if (self.innerWidth)
      return self.innerWidth;
    if (document.documentElement && document.documentElement.clientWidth)
      return document.documentElement.clientWidth;
    if (document.body)
      return document.body.clientWidth;
  }
  catch (ex)
  {
    ShowException (ex);
  }

  return 0;
}

//--- GetBrowserHeight ----------------------------------

function GetBrowserHeight ()
{
  try
  {
    if (self.innerHeight)
      return self.innerHeight;
    if (document.documentElement && document.documentElement.clientHeight)
      return document.documentElement.clientHeight;
    if (document.body)
      return document.body.clientHeight;
  }
  catch (ex)
  {
    ShowException (ex);
  }

  return 0;
}


//---------------------------------------------------------
//  Modal Popups
//---------------------------------------------------------

function ShowModalHTML (htmlCode)
{
  // Popup any HTML code in a modal window
  // Example:
  //    <button onclick="ShowModalHTML('<h1>Hello World!</h1>');">
  //      Click me
  //    </button>

  try
  {
    // Clear any previous contents of the backdrop
    $("#modalBackdrop").empty ();

    // Add specified HTML content to a modal div
    $("#modalBackdrop").append ('<div class="modalDiv">' + htmlCode + '</div>');

    // Display the backdrop
    $("#modalBackdrop").css ('display', 'inline');
    $("#modalBackdrop").scrollTop (0);
  }
  catch (ex)
  {
    ShowException (ex);
  }
}

function ShowModalFile (htmlFile)
{
  // Popup any HTML file in a modal window
  // Example:
  //    <button onclick="ShowModalFile('hello.html');">
  //      Click me
  //    </button>

  try
  {
    // Clear any previous contents of the backdrop
    $("#modalBackdrop").empty ();

    // Add specified HTML content to a modal div
    $("#modalBackdrop").load (htmlFile);

    // Display the backdrop
    $("#modalBackdrop").css ('display', 'inline');
    $("#modalBackdrop").scrollTop (0);
  }
  catch (ex)
  {
    ShowException (ex);
  }
}

function ShowModalImage (imageFile)
{
  try
  {
    // Clear any previous contents of the backdrop
    $("#modalBackdrop").empty ();

    // Add image to a modal div
    $("#modalBackdrop").append ('<img class="modalDiv" src="' + imageFile + '" alt="Missing image ' + imageFile + '" />');

    // Display the backdrop
    $("#modalBackdrop").css ('display', 'inline');
    $("#modalBackdrop").scrollTop (0);
  }
  catch (ex)
  {
    ShowException (ex);
  }
}

//function ShowModalImageArray (imageArray)
//{
//  try
//  {
//    var picIndex     = 0;
//    var modaldivHTML = '<div class="modalDiv">' +
//                       '  <span style="font-size:100px; vertical-align:middle" onclick="if (--picIndex < 0) picIndex=picArray.length-1;"><</span> ' +
//                       '  <img src="' + picArray[picIndex] + '" /> ' +
//                       '  <span style="font-size:100px; vertical-align:middle" onclick="if (++picIndex > picArray.length) picIndex=0;">></span> ' +
//                       '</div>';
//
//    ShowModal (modalHTML);
//  }
//  catch (ex)
//  {
//    ShowException (ex);
//  }
//}

function HideModal (event)
{
  try
  {
    $("#modalBackdrop").empty ();
    $("#modalBackdrop").css ('display', 'none');

    event.preventDefault ();
  }
  catch (ex)
  {
    ShowException (ex);
  }
}


//---------------------------------------------------------
//  Exception Handling
//---------------------------------------------------------

function ShowException (ex)
{
  // Show exception details
  try
  {
    var msg = 'Error: ';
    if (ex.message == undefined)
      msg += ex;
    else
      msg += ex.message + "\n" + ex.filename + " (line " + ex.lineNumber + ")";

    alert (msg);
  }
  catch (exSE)
  {
    alert ('Exception in ShowException():\n' + exSE.message);
  }
}

