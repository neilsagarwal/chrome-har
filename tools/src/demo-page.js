/**
* functionality for example page
* `perfCascade` is a global object if not running in AMD or CommonJS context (it uses UMD)
*/
(function (perfCascade) {

  /** holder DOM element to render PerfCascade into */
  var outputHolder = document.getElementsByClassName("output")[0];
  /** Select box for multi-page HARs */
  var pageSelectorEl = document.getElementById("page-selector");
  /** Holder element for legend HTML */
  var legendHolderEl = document.getElementById("legend-holder");

  /** options for PerfCascade (all have defaults)
   * Source: /src/ts/typing/options.d.ts
  */
  var perfCascadeOptions = {
    rowHeight: 23, //default: 23
    showAlignmentHelpers: true, //default: true
    showIndicatorIcons: true, //default: true
    leftColumnWidth: 25, //default: 25
    pageSelector: pageSelectorEl, //default: undefined
    legendHolder: legendHolderEl, //default: undefined (hide-legend)
    showUserTiming: true //default: false
  };

  /** renders the har (passing in the har.log node) */
  function renderPerfCascadeChart(harLogData) {
    /** remove all children of `outputHolder`,
     * so you can upload new HAR files and get a new SVG  */
    while (outputHolder.childNodes.length > 0) {
      outputHolder.removeChild(outputHolder.childNodes[0]);
    }

    /**
     * THIS IS WHERE THE MAGIC HAPPENS
     * pass HAR and options to `newPerfCascadeHar` to generate the SVG element
     */
    var perfCascadeSvg = perfCascade.fromHar(harLogData, perfCascadeOptions);

    /** append SVG to page - that's it */
    outputHolder.appendChild(perfCascadeSvg);
  }

  /** handle client side file upload */
  function onFileSubmit(evt) {
    var files = evt.target.files;
    if (!files) {
      alert("Failed to load HAR file");
      return
    }

    // USE THIS when not supporting compressed *.zhar files
    // var reader = new FileReader();
    // reader.onload = function(loadEvt){
    //   var harData
    //   try {
    //     harData = JSON.parse(loadEvt.target["result"]);
    //   } catch (err) {
    //     alert("File does not seem to be a valid HAR file");
    //     console.error(err)
    //     return undefined
    //   }
    //   renderPerfCascadeChart(harData.log);
    // };
    // reader.readAsText(files[0]);

    // Just needed for gzipped *.zhar files, you can use the standard FileReader api for normal .har files
    perfCascadeFileReader.readFile(files[0], evt.target.value, function(error, data){
      if(error){
        console.error(error)
      }else{
        renderPerfCascadeChart(data)
      }
    });
  }
  document.getElementById("fileinput").addEventListener("change", onFileSubmit, false);



  /** functionality for "use example HAR" */
  function getExampleHar() {
    var response = {
  "log": {
    "version": "1.2",
    "creator": {
      "name": "chrome-har",
      "version": "0.11.4",
      "comment": "https://github.com/sitespeedio/chrome-har"
    },
    "pages": [
      {
        "id": "page_1",
        "startedDateTime": "2019-11-16T10:39:00.333Z",
        "title": "https://nih.gov/",
        "pageTimings": {
          "onContentLoad": 8576.279
        }
      }
    ],
    "entries": [
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:01.798Z",
        "_requestId": "A4D4704385AE7D0FB02CDAF513EC7646",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://nih.gov/",
          "queryString": [],
          "headersSize": 523,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Host",
              "value": "www.nih.gov"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Upgrade-Insecure-Requests",
              "value": "1"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            },
            {
              "name": "Sec-Fetch-User",
              "value": "?1"
            },
            {
              "name": "Accept",
              "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
            },
            {
              "name": "Sec-Fetch-Site",
              "value": "none"
            },
            {
              "name": "Sec-Fetch-Mode",
              "value": "navigate"
            },
            {
              "name": "Accept-Encoding",
              "value": "gzip, deflate, br"
            },
            {
              "name": "Accept-Language",
              "value": "en-GB,en-US;q=0.9,en;q=0.8"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 2156.33,
        "_initiator_detail": "{\"type\":\"other\"}",
        "_initiator_type": "other",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/html",
            "size": 67350,
            "compression": 53414
          },
          "headersSize": 834,
          "bodySize": 13936,
          "cookies": [],
          "headers": [
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Age",
              "value": "2138"
            },
            {
              "name": "Cache-Control",
              "value": "public, max-age=21600"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "Content-Language",
              "value": "en"
            },
            {
              "name": "Content-Type",
              "value": "text/html; charset=utf-8"
            },
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:03 GMT"
            },
            {
              "name": "Etag",
              "value": "\"1573896903-1\""
            },
            {
              "name": "Expires",
              "value": "Sun, 19 Nov 1978 05:00:00 GMT"
            },
            {
              "name": "Last-Modified",
              "value": "Sat, 16 Nov 2019 09:35:03 GMT"
            },
            {
              "name": "Link",
              "value": "<https://www.nih.gov/>; rel=\"canonical\",<https://www.nih.gov/>; rel=\"shortlink\""
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Vary",
              "value": "Cookie,Accept-Encoding"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "X-Cache-Hits",
              "value": "1072"
            },
            {
              "name": "X-Drupal-Cache",
              "value": "HIT"
            },
            {
              "name": "X-Frame-Options",
              "value": "SAMEORIGIN"
            },
            {
              "name": "X-Generator",
              "value": "Drupal 7 (http://drupal.org)"
            },
            {
              "name": "X-Request-ID",
              "value": "v-54042144-0858-11ea-a590-cb0fc7d06532"
            },
            {
              "name": "X-UA-Compatible",
              "value": "IE=edge,chrome=IE6"
            },
            {
              "name": "X-XSS-Protection",
              "value": "1; mode=block"
            },
            {
              "name": "Content-Length",
              "value": "13936"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            }
          ],
          "_transferSize": 14770
        },
        "connection": "59",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0.472,
          "dns": 105.53,
          "connect": 1597.693,
          "send": 0.129,
          "wait": 451.179,
          "receive": 1.327,
          "ssl": 413.938,
          "_queued": 1464.949
        },
        "_requestTime": 202756.310759
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.976Z",
        "_requestId": "67777.2",
        "_initialPriority": "High",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/all/libraries/DAP/Universal-Federated-Analytics-Min.1.0.js?agency=HHS&subagency=NIH&pua=UA-22075261-1&sp=find&yt=true&exts=doc,docx,xls,xlsx,xlsm,ppt,pptx,exe,zip,pdf,js,txt,csv,dxf,wmv,jpg,wma,mov,avi,mp3,mp4,csv",
          "queryString": [
            {
              "name": "agency",
              "value": "HHS"
            },
            {
              "name": "subagency",
              "value": "NIH"
            },
            {
              "name": "pua",
              "value": "UA-22075261-1"
            },
            {
              "name": "sp",
              "value": "find"
            },
            {
              "name": "yt",
              "value": "true"
            },
            {
              "name": "exts",
              "value": "doc,docx,xls,xlsx,xlsm,ppt,pptx,exe,zip,pdf,js,txt,csv,dxf,wmv,jpg,wma,mov,avi,mp3,mp4,csv"
            }
          ],
          "headersSize": 438,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 230.524,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":14}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 15,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/javascript",
            "size": 17565,
            "compression": 13122
          },
          "headersSize": 566,
          "bodySize": 4443,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649042"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "4443"
            },
            {
              "name": "X-Request-ID",
              "value": "v-23d2d58e-0276-11ea-93fd-4fefe5b108f4"
            },
            {
              "name": "Last-Modified",
              "value": "Sat, 28 Sep 2019 07:22:32 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "application/javascript"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:41 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "391081"
            }
          ],
          "_transferSize": 5009
        },
        "connection": "59",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 2.742,
          "dns": -1,
          "connect": -1,
          "send": 0.094,
          "wait": 224.308,
          "receive": 3.38,
          "ssl": -1,
          "_queued": 1.705
        },
        "_requestTime": 202758.489051
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.976Z",
        "_requestId": "67777.3",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/css/css_mtppzd8_PFstl_yJg9eSCqHm2C-vo2-O3ZRK8QVn30M.css",
          "queryString": [],
          "headersSize": 294,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1155.706,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":48}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 49,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 14532,
            "compression": 10947
          },
          "headersSize": 552,
          "bodySize": 3585,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649039"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "3585"
            },
            {
              "name": "X-Request-ID",
              "value": "v-256f809a-0276-11ea-9a17-87c717ebc4c4"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:50:35 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/css"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "171912"
            }
          ],
          "_transferSize": 4137
        },
        "connection": "61",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 3.555,
          "dns": -1,
          "connect": -1,
          "send": 0.091,
          "wait": 1149.206,
          "receive": 2.854,
          "ssl": -1,
          "_queued": 1.918
        },
        "_requestTime": 202758.489659
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.977Z",
        "_requestId": "67777.4",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/css/css__mIWP9gcStq74isjZVoAAsiih8VXwJoN75Nyw_BXrj0.css",
          "queryString": [],
          "headersSize": 294,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 523.9639999999999,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":49}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 50,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 2157,
            "compression": 1422
          },
          "headersSize": 551,
          "bodySize": 735,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649039"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "735"
            },
            {
              "name": "X-Request-ID",
              "value": "v-25799fee-0276-11ea-9f18-aba4c68e0909"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:50:36 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/css"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "172403"
            }
          ],
          "_transferSize": 1286
        },
        "connection": "59",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 229.683,
          "dns": -1,
          "connect": -1,
          "send": 0.085,
          "wait": 292.613,
          "receive": 1.583,
          "ssl": -1,
          "_queued": 2.108
        },
        "_requestTime": 202758.490203
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.978Z",
        "_requestId": "67777.5",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/css/css_jENQOQqZCRFGZK__DTefxYiXR2RUf03k1ugj3_Vg7vk.css",
          "queryString": [],
          "headersSize": 294,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 2402.934,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":52}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 53,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 510,
            "compression": 255
          },
          "headersSize": 551,
          "bodySize": 255,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649039"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "255"
            },
            {
              "name": "X-Request-ID",
              "value": "v-257cb74c-0276-11ea-b787-4389cf16f78f"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:50:37 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/css"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "170720"
            }
          ],
          "_transferSize": 806
        },
        "connection": "103",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 3.549,
          "dns": 0.022,
          "connect": 507.054,
          "send": 0.063,
          "wait": 1891.712,
          "receive": 0.534,
          "ssl": 284.267,
          "_queued": 2.306
        },
        "_requestTime": 202758.490997
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.979Z",
        "_requestId": "67777.6",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://cdn.jsdelivr.net/qtip2/3.0.3/jquery.qtip.min.css",
          "queryString": [],
          "headersSize": 255,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 721.2130000000001,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":53}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 54,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 8982,
            "compression": 6822
          },
          "headersSize": 592,
          "bodySize": 2160,
          "cookies": [],
          "headers": [
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000; includeSubDomains; preload"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "X-Cache",
              "value": "HIT, HIT"
            },
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Content-Length",
              "value": "2160"
            },
            {
              "name": "X-Served-By",
              "value": "cache-ams21024-AMS, cache-lon4261-LON"
            },
            {
              "name": "ETag",
              "value": "W/\"2316-k659ZOOg/NsF77TYUiTPe7p0mPg\""
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Content-Type",
              "value": "text/css; charset=utf-8"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Access-Control-Expose-Headers",
              "value": "*"
            },
            {
              "name": "Cache-Control",
              "value": "public, max-age=31536000, s-maxage=31536000, immutable"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Timing-Allow-Origin",
              "value": "*"
            }
          ],
          "_transferSize": 2752
        },
        "connection": "174",
        "serverIPAddress": "151.101.194.109",
        "timings": {
          "blocked": 4.909,
          "dns": 110.928,
          "connect": 472.064,
          "send": 0.06,
          "wait": 132.113,
          "receive": 1.139,
          "ssl": 338.491,
          "_queued": 3.5
        },
        "_requestTime": 202758.492541
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.980Z",
        "_requestId": "67777.7",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/css/css_3yt-b0M1HNJsvKsXwYjh5TEtX2lJGAvJvtmVAfORYZs.css",
          "queryString": [],
          "headersSize": 294,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 726.368,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":54}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 55,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 135,
            "compression": 6
          },
          "headersSize": 551,
          "bodySize": 129,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649038"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "129"
            },
            {
              "name": "X-Request-ID",
              "value": "v-267fb716-0276-11ea-aee9-eb9ab702786e"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:50:37 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/css"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:46 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "171775"
            }
          ],
          "_transferSize": 680
        },
        "connection": "59",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 521.304,
          "dns": -1,
          "connect": -1,
          "send": 0.091,
          "wait": 204.494,
          "receive": 0.479,
          "ssl": -1,
          "_queued": 3.83
        },
        "_requestTime": 202758.493069
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.980Z",
        "_requestId": "67777.8",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://fonts.googleapis.com/css?family=Droid+Sans:700,regular%7CDroid+Serif:italic,regular&subset=latin",
          "queryString": [
            {
              "name": "family",
              "value": "Droid Sans:700,regular|Droid Serif:italic,regular"
            },
            {
              "name": "subset",
              "value": "latin"
            }
          ],
          "headersSize": 303,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 2851.569,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":55}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 56,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 1757,
            "compression": 1356
          },
          "headersSize": 709,
          "bodySize": 401,
          "cookies": [],
          "headers": [
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Encoding",
              "value": "br"
            },
            {
              "name": "Last-Modified",
              "value": "Sat, 16 Nov 2019 10:39:06 GMT"
            },
            {
              "name": "Server",
              "value": "ESF"
            },
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:06 GMT"
            },
            {
              "name": "X-Frame-Options",
              "value": "SAMEORIGIN"
            },
            {
              "name": "Content-Type",
              "value": "text/css; charset=utf-8"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Alt-Svc",
              "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
            },
            {
              "name": "Cache-Control",
              "value": "private, max-age=86400, stale-while-revalidate=604800"
            },
            {
              "name": "Transfer-Encoding",
              "value": "chunked"
            },
            {
              "name": "Timing-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Link",
              "value": "<https://fonts.gstatic.com>; rel=preconnect; crossorigin"
            },
            {
              "name": "X-XSS-Protection",
              "value": "0"
            },
            {
              "name": "Expires",
              "value": "Sat, 16 Nov 2019 10:39:06 GMT"
            }
          ],
          "_transferSize": 1110
        },
        "connection": "186",
        "serverIPAddress": "172.217.169.74",
        "timings": {
          "blocked": 1.623,
          "dns": 1420.567,
          "connect": 1033.398,
          "send": 0.064,
          "wait": 395.184,
          "receive": 0.733,
          "ssl": 329.681,
          "_queued": 4.007
        },
        "_requestTime": 202758.49343
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.980Z",
        "_requestId": "67777.9",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://js.api.here.com/v3/3.0/mapsjs-ui.css",
          "queryString": [],
          "headersSize": 243,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 877.343,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":56}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 57,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 11965,
            "compression": 8971
          },
          "headersSize": 342,
          "bodySize": 2994,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "Last-Modified",
              "value": "Thu, 25 Jan 2018 15:51:39 GMT"
            },
            {
              "name": "Server",
              "value": "Apache"
            },
            {
              "name": "ETag",
              "value": "\"1ac8f39099fb9da745ca3ca1642bce7f:1517390907\""
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Content-Type",
              "value": "text/css"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Content-Length",
              "value": "2994"
            }
          ],
          "_transferSize": 3336
        },
        "connection": "177",
        "serverIPAddress": "104.78.177.251",
        "timings": {
          "blocked": 4.752,
          "dns": 110.144,
          "connect": 485.431,
          "send": 0.063,
          "wait": 276.255,
          "receive": 0.698,
          "ssl": 351.131,
          "_queued": 4.037
        },
        "_requestTime": 202758.493656
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.981Z",
        "_requestId": "67777.10",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/css/css_oTdMQ9QWtIt933yCG_bKROjEPaHnpw9Ef0Rw7TKOWrs.css",
          "queryString": [],
          "headersSize": 294,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1127.3139999999999,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":57}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 58,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 4315,
            "compression": 3086
          },
          "headersSize": 551,
          "bodySize": 1229,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649036"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "1229"
            },
            {
              "name": "X-Request-ID",
              "value": "v-27d309ce-0276-11ea-8a71-7f80fb12cac9"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:55:12 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/css"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:48 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "94803"
            }
          ],
          "_transferSize": 1780
        },
        "connection": "59",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 725.825,
          "dns": -1,
          "connect": -1,
          "send": 0.081,
          "wait": 400.875,
          "receive": 0.533,
          "ssl": -1,
          "_queued": 3.989
        },
        "_requestTime": 202758.493844
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.981Z",
        "_requestId": "67777.11",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/css/css_VGoLuPNSo2NQ2V-QqFhxWsLCNFqtOFjVSUJDUR3kuCI.css",
          "queryString": [],
          "headersSize": 294,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 3609.027,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":58}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 59,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 197484,
            "compression": 175869
          },
          "headersSize": 553,
          "bodySize": 21615,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:05 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649040"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "21615"
            },
            {
              "name": "X-Request-ID",
              "value": "v-25835ac0-0276-11ea-a540-2bbad9c6794b"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:50:37 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/css"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "172818"
            }
          ],
          "_transferSize": 22168
        },
        "connection": "59",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 1127.025,
          "dns": -1,
          "connect": -1,
          "send": 0.089,
          "wait": 2441.114,
          "receive": 40.799,
          "ssl": -1,
          "_queued": 4.081
        },
        "_requestTime": 202758.494334
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.982Z",
        "_requestId": "67777.12",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/css/css_KviiBystpJcQq4MplcQZvCFxnu9V763f5bPq_AKh4xM.css",
          "queryString": [],
          "headersSize": 294,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1808.273,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":63}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 64,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 3542,
            "compression": 2878
          },
          "headersSize": 551,
          "bodySize": 664,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:05 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649039"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "664"
            },
            {
              "name": "X-Request-ID",
              "value": "v-263a2778-0276-11ea-ab6d-8fe67c138ca5"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:50:37 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/css"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:45 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "170408"
            }
          ],
          "_transferSize": 1215
        },
        "connection": "61",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 1151.052,
          "dns": -1,
          "connect": -1,
          "send": 0.101,
          "wait": 656.599,
          "receive": 0.521,
          "ssl": -1,
          "_queued": 4.351
        },
        "_requestTime": 202758.494839
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.982Z",
        "_requestId": "67777.13",
        "_initialPriority": "High",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js",
          "queryString": [],
          "headersSize": 291,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 3638.741,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":64}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 65,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/javascript",
            "size": 120316,
            "compression": 78282
          },
          "headersSize": 560,
          "bodySize": 42034,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:05 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649041"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "42034"
            },
            {
              "name": "X-Request-ID",
              "value": "v-2586d4c0-0276-11ea-b810-4708ea0781cd"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:50:39 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/javascript"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "169752"
            }
          ],
          "_transferSize": 42594
        },
        "connection": "61",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 1807.947,
          "dns": -1,
          "connect": -1,
          "send": 0.092,
          "wait": 914.233,
          "receive": 916.469,
          "ssl": -1,
          "_queued": 4.697
        },
        "_requestTime": 202758.495367
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.983Z",
        "_requestId": "67777.14",
        "_initialPriority": "High",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/js/js_hNnF7a_sbk6nZ2-mOamHzalYND7HBHDLRInsaU93HDk.js",
          "queryString": [],
          "headersSize": 291,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 3968.5800000000004,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":65}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 66,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/javascript",
            "size": 65938,
            "compression": 46343
          },
          "headersSize": 560,
          "bodySize": 19595,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:07 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649043"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "19595"
            },
            {
              "name": "X-Request-ID",
              "value": "v-253943ea-0276-11ea-be9b-8b1bbcc50183"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:50:39 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/javascript"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "387204"
            }
          ],
          "_transferSize": 20155
        },
        "connection": "123",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0.174,
          "dns": 0.013,
          "connect": 2038.988,
          "send": 0.065,
          "wait": 1925.458,
          "receive": 3.882,
          "ssl": 531.928,
          "_queued": 4.885
        },
        "_requestTime": 202758.49576
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.983Z",
        "_requestId": "67777.15",
        "_initialPriority": "High",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/js/js_Tik8PIaz_eQ5I4FMzmjkWoPEs9jKBgTSauo1jgsNa6g.js",
          "queryString": [],
          "headersSize": 291,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 3334.729,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":66}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 67,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/javascript",
            "size": 7582,
            "compression": 5202
          },
          "headersSize": 559,
          "bodySize": 2380,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:06 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649041"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "2380"
            },
            {
              "name": "X-Request-ID",
              "value": "v-258fc1c0-0276-11ea-96ce-47ba8267a91f"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:50:40 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/javascript"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "170476"
            }
          ],
          "_transferSize": 2939
        },
        "connection": "103",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 2398.261,
          "dns": -1,
          "connect": -1,
          "send": 0.096,
          "wait": 935.622,
          "receive": 0.75,
          "ssl": -1,
          "_queued": 5.038
        },
        "_requestTime": 202758.496127
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.983Z",
        "_requestId": "67777.16",
        "_initialPriority": "High",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://cdn.jsdelivr.net/qtip2/3.0.3/jquery.qtip.min.js",
          "queryString": [],
          "headersSize": 254,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1903.222,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":72}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 73,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/javascript",
            "size": 44303,
            "compression": 28199
          },
          "headersSize": 607,
          "bodySize": 16104,
          "cookies": [],
          "headers": [
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000; includeSubDomains; preload"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "X-Cache",
              "value": "HIT, HIT"
            },
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Content-Length",
              "value": "16104"
            },
            {
              "name": "X-Served-By",
              "value": "cache-ams21051-AMS, cache-lon4261-LON"
            },
            {
              "name": "ETag",
              "value": "W/\"ad0f-GCjWt/l1SOQ2YsYv/Sg+O/ji3Yk\""
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Content-Type",
              "value": "application/javascript; charset=utf-8"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Access-Control-Expose-Headers",
              "value": "*"
            },
            {
              "name": "Cache-Control",
              "value": "public, max-age=31536000, s-maxage=31536000, immutable"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Timing-Allow-Origin",
              "value": "*"
            }
          ],
          "_transferSize": 16711
        },
        "connection": "174",
        "serverIPAddress": "151.101.194.109",
        "timings": {
          "blocked": 717.637,
          "dns": -1,
          "connect": -1,
          "send": 0.067,
          "wait": 202.671,
          "receive": 982.847,
          "ssl": -1,
          "_queued": 5.022
        },
        "_requestTime": 202758.496366
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.983Z",
        "_requestId": "67777.17",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://script.crazyegg.com/pages/scripts/0011/2616.js",
          "queryString": [],
          "headersSize": 253,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 2268.312,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":73}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 74,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/x-javascript",
            "size": 155
          },
          "headersSize": 736,
          "bodySize": 297,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:05 GMT"
            },
            {
              "name": "Via",
              "value": "1.1 5ebef4b6eba4f6ee211859e315b4fa16.cloudfront.net (CloudFront)"
            },
            {
              "name": "CF-Cache-Status",
              "value": "HIT"
            },
            {
              "name": "Age",
              "value": "2742"
            },
            {
              "name": "Cf-Polished",
              "value": "origSize=156"
            },
            {
              "name": "Transfer-Encoding",
              "value": "chunked"
            },
            {
              "name": "X-Cache",
              "value": "Miss from cloudfront"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "Last-Modified",
              "value": "Tue, 09 Apr 2019 19:40:34 GMT"
            },
            {
              "name": "Server",
              "value": "cloudflare"
            },
            {
              "name": "ETag",
              "value": "W/\"3534c1f9fb09b26adead33c6855397b0\""
            },
            {
              "name": "Expect-CT",
              "value": "max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\""
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Content-Type",
              "value": "application/x-javascript"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=300"
            },
            {
              "name": "X-Amz-Cf-Pop",
              "value": "FJR50-C1"
            },
            {
              "name": "CF-RAY",
              "value": "5368d6cdba72e614-LHR"
            },
            {
              "name": "X-Amz-Cf-Id",
              "value": "mJivuvcxuVbehNkWRvHrVuxUJYrOmfw2I8B-UI-jmCnYot7gtb_S7w=="
            },
            {
              "name": "Cf-Bgj",
              "value": "minify"
            }
          ],
          "_transferSize": 1033
        },
        "connection": "182",
        "serverIPAddress": "104.19.148.8",
        "timings": {
          "blocked": 251.975,
          "dns": 0.028,
          "connect": 1577.903,
          "send": 0.061,
          "wait": 437.494,
          "receive": 0.851,
          "ssl": 1313.446,
          "_queued": 5.028
        },
        "_requestTime": 202758.496603
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.984Z",
        "_requestId": "67777.18",
        "_initialPriority": "High",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://js.api.here.com/v3/3.0/mapsjs-core.js",
          "queryString": [],
          "headersSize": 244,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 3104.5190000000002,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":74}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 75,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/x-javascript",
            "size": 230627,
            "compression": 147766
          },
          "headersSize": 383,
          "bodySize": 82861,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "Last-Modified",
              "value": "Wed, 31 Jan 2018 09:28:29 GMT"
            },
            {
              "name": "Server",
              "value": "Apache"
            },
            {
              "name": "ETag",
              "value": "\"3e4acd73bd01e232a294916a2575200f:1517390907\""
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Content-Type",
              "value": "application/x-javascript"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Transfer-Encoding",
              "value": "chunked"
            },
            {
              "name": "Connection",
              "value": "keep-alive, Transfer-Encoding"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            }
          ],
          "_transferSize": 83244
        },
        "connection": "179",
        "serverIPAddress": "104.78.177.251",
        "timings": {
          "blocked": 1.75,
          "dns": 110.067,
          "connect": 538.23,
          "send": 0.064,
          "wait": 1210.114,
          "receive": 1244.294,
          "ssl": 401.76,
          "_queued": 5.047
        },
        "_requestTime": 202758.496835
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.984Z",
        "_requestId": "67777.19",
        "_initialPriority": "High",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://js.api.here.com/v3/3.0/mapsjs-service.js",
          "queryString": [],
          "headersSize": 247,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 2193.734,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":75}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 76,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/x-javascript",
            "size": 77938,
            "compression": 52974
          },
          "headersSize": 359,
          "bodySize": 24964,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:04 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "Last-Modified",
              "value": "Wed, 31 Jan 2018 09:28:29 GMT"
            },
            {
              "name": "Server",
              "value": "Apache"
            },
            {
              "name": "ETag",
              "value": "\"6d439d6a5848cedead24449188a05e8f:1517390907\""
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Content-Type",
              "value": "application/x-javascript"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Content-Length",
              "value": "24964"
            }
          ],
          "_transferSize": 25323
        },
        "connection": "175",
        "serverIPAddress": "104.78.177.251",
        "timings": {
          "blocked": 0,
          "dns": 111.395,
          "connect": 570.877,
          "send": 0.063,
          "wait": 760.134,
          "receive": 751.265,
          "ssl": 436.95,
          "_queued": 5.092
        },
        "_requestTime": 202758.497073
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.984Z",
        "_requestId": "67777.20",
        "_initialPriority": "High",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://js.api.here.com/v3/3.0/mapsjs-ui.js",
          "queryString": [],
          "headersSize": 242,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 2497.26,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":76}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 77,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/x-javascript",
            "size": 81026,
            "compression": 57819
          },
          "headersSize": 359,
          "bodySize": 23207,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:05 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "Last-Modified",
              "value": "Wed, 31 Jan 2018 09:28:29 GMT"
            },
            {
              "name": "Server",
              "value": "Apache"
            },
            {
              "name": "ETag",
              "value": "\"fb1c3c9e4000423a49dcddcc442c4013:1517390907\""
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Content-Type",
              "value": "application/x-javascript"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Content-Length",
              "value": "23207"
            }
          ],
          "_transferSize": 23566
        },
        "connection": "177",
        "serverIPAddress": "104.78.177.251",
        "timings": {
          "blocked": 874.295,
          "dns": -1,
          "connect": -1,
          "send": 0.102,
          "wait": 1174.733,
          "receive": 448.13,
          "ssl": -1,
          "_queued": 5.139
        },
        "_requestTime": 202758.497308
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.984Z",
        "_requestId": "67777.21",
        "_initialPriority": "High",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://js.api.here.com/v3/3.0/mapsjs-mapevents.js",
          "queryString": [],
          "headersSize": 249,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 3601.5409999999997,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":77}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 78,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/x-javascript",
            "size": 15997,
            "compression": 10521
          },
          "headersSize": 358,
          "bodySize": 5476,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:06 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "Last-Modified",
              "value": "Wed, 31 Jan 2018 09:28:29 GMT"
            },
            {
              "name": "Server",
              "value": "Apache"
            },
            {
              "name": "ETag",
              "value": "\"2645d1fb8f34dfad2b50c8e017880437:1517390907\""
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Content-Type",
              "value": "application/x-javascript"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Content-Length",
              "value": "5476"
            }
          ],
          "_transferSize": 5834
        },
        "connection": "178",
        "serverIPAddress": "104.78.177.251",
        "timings": {
          "blocked": 0.945,
          "dns": 110.088,
          "connect": 1698.333,
          "send": 0.085,
          "wait": 1791.475,
          "receive": 0.615,
          "ssl": 1563.622,
          "_queued": 5.193
        },
        "_requestTime": 202758.497557
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:03.985Z",
        "_requestId": "67777.22",
        "_initialPriority": "High",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js",
          "queryString": [],
          "headersSize": 291,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 4690.932,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":78}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 79,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/javascript",
            "size": 117524,
            "compression": 85977
          },
          "headersSize": 559,
          "bodySize": 31547,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:06 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649041"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "31547"
            },
            {
              "name": "X-Request-ID",
              "value": "v-2591fab2-0276-11ea-8803-67b156666ee8"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:55:12 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/javascript"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "92989"
            }
          ],
          "_transferSize": 32106
        },
        "connection": "78",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0,
          "dns": 0,
          "connect": 2681.638,
          "send": 0.107,
          "wait": 1097.686,
          "receive": 911.501,
          "ssl": 278.351,
          "_queued": 5.288
        },
        "_requestTime": 202758.498
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:06.913Z",
        "_requestId": "67777.23",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/all/themes/nih/images/nih-logo-color.png",
          "queryString": [],
          "headersSize": 265,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 272.32800000000003,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":98}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 99,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/png",
            "size": 9979
          },
          "headersSize": 513,
          "bodySize": 9979,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:07 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649040"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "9979"
            },
            {
              "name": "X-Request-ID",
              "value": "v-26808a38-0276-11ea-b58d-67c7aba9d314"
            },
            {
              "name": "Last-Modified",
              "value": "Sat, 28 Sep 2019 07:22:33 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/png"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:46 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "165499"
            }
          ],
          "_transferSize": 10492
        },
        "connection": "84",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0.338,
          "dns": -1,
          "connect": -1,
          "send": 0.07,
          "wait": 269.865,
          "receive": 2.055,
          "ssl": -1,
          "_queued": 2932.977
        },
        "_requestTime": 202761.426261
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:07.621Z",
        "_requestId": "67777.24",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/slide_breakpoint-large-extra/public/home_0/slides/current/slide-alzheimers.png?itok=EWtaPIS8&timestamp=1573825866",
          "queryString": [
            {
              "name": "itok",
              "value": "EWtaPIS8"
            },
            {
              "name": "timestamp",
              "value": "1573825866"
            }
          ],
          "headersSize": 359,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 968.757,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":368}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 369,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/png",
            "size": 589312
          },
          "headersSize": 512,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:07 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "74869"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "721506"
            },
            {
              "name": "X-Request-ID",
              "value": "v-ffad6a5a-07ae-11ea-97e7-8ba288bcb9bf"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 15 Nov 2019 13:51:12 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/png"
            },
            {
              "name": "Expires",
              "value": "Fri, 29 Nov 2019 13:51:18 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "4825"
            }
          ],
          "_transferSize": 512
        },
        "connection": "61",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0.267,
          "dns": -1,
          "connect": -1,
          "send": 0.071,
          "wait": 968.419,
          "receive": 0,
          "ssl": -1,
          "_queued": 3640.939
        },
        "_requestTime": 202762.134489
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:07.785Z",
        "_requestId": "67777.25",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/slide_breakpoint-large-extra/public/home_0/slides/current/slide-healthy-eating-special-edition_0.jpg?itok=gjJsWLBX&timestamp=1573825847",
          "queryString": [
            {
              "name": "itok",
              "value": "gjJsWLBX"
            },
            {
              "name": "timestamp",
              "value": "1573825847"
            }
          ],
          "headersSize": 381,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1673.658,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":393}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 394,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 85534
          },
          "headersSize": 512,
          "bodySize": 85534,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:07 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "74880"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "85534"
            },
            {
              "name": "X-Request-ID",
              "value": "v-f9075616-07ae-11ea-9e29-af90ed3a2a6b"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 15 Nov 2019 13:50:53 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 29 Nov 2019 13:51:07 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "4835"
            }
          ],
          "_transferSize": 86046
        },
        "connection": "84",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0.327,
          "dns": -1,
          "connect": -1,
          "send": 0.093,
          "wait": 366.162,
          "receive": 1307.076,
          "ssl": -1,
          "_queued": 3804.683
        },
        "_requestTime": 202762.298296
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.686Z",
        "_requestId": "67777.26",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/slide_breakpoint-large-extra/public/home_0/slides/current/slide-adult-dental-care.jpg?itok=BZOLHc3j&timestamp=1573825816",
          "queryString": [
            {
              "name": "itok",
              "value": "BZOLHc3j"
            },
            {
              "name": "timestamp",
              "value": "1573825816"
            }
          ],
          "headersSize": 366,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 2669.757,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":418}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 419,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 51186
          },
          "headersSize": 512,
          "bodySize": 51186,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:08 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "74923"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "51186"
            },
            {
              "name": "X-Request-ID",
              "value": "v-e03795e2-07ae-11ea-a198-dbc46038c0eb"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 15 Nov 2019 13:50:21 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 29 Nov 2019 13:50:25 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "4863"
            }
          ],
          "_transferSize": 51698
        },
        "connection": "78",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0.99,
          "dns": -1,
          "connect": -1,
          "send": 0.193,
          "wait": 747.023,
          "receive": 1921.551,
          "ssl": -1,
          "_queued": 4705.91
        },
        "_requestTime": 202763.199591
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.687Z",
        "_requestId": "67777.27",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/slide_breakpoint-large-extra/public/home_0/slides/current/slide-family-health-history.jpg?itok=XnvO1AZm&timestamp=1572614116",
          "queryString": [
            {
              "name": "itok",
              "value": "XnvO1AZm"
            },
            {
              "name": "timestamp",
              "value": "1572614116"
            }
          ],
          "headersSize": 370,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1800.838,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":443}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 444,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 53421
          },
          "headersSize": 514,
          "bodySize": 53421,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:08 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "648974"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "53421"
            },
            {
              "name": "X-Request-ID",
              "value": "v-4ebcf676-0276-11ea-8fb4-fb34851309b7"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 01 Nov 2019 13:15:35 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:22:53 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "33180"
            }
          ],
          "_transferSize": 53935
        },
        "connection": "123",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 2.03,
          "dns": -1,
          "connect": -1,
          "send": 0.073,
          "wait": 817.785,
          "receive": 980.95,
          "ssl": -1,
          "_queued": 4706.616
        },
        "_requestTime": 202763.20039
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.688Z",
        "_requestId": "67777.28",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/slide_breakpoint-large-extra/public/home_0/slides/current/slide-LRP-2.jpg?itok=bw9rnZHj&timestamp=1572270142",
          "queryString": [
            {
              "name": "itok",
              "value": "bw9rnZHj"
            },
            {
              "name": "timestamp",
              "value": "1572270142"
            }
          ],
          "headersSize": 354,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 6654.481,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":468}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 469,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 71074
          },
          "headersSize": 514,
          "bodySize": 71074,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:11 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649029"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "71074"
            },
            {
              "name": "X-Request-ID",
              "value": "v-2fbec93e-0276-11ea-af94-0f6b26fd1933"
            },
            {
              "name": "Last-Modified",
              "value": "Mon, 28 Oct 2019 13:42:30 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:22:01 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "34024"
            }
          ],
          "_transferSize": 71588
        },
        "connection": "59",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 1.86,
          "dns": -1,
          "connect": -1,
          "send": 0.06,
          "wait": 3924.306,
          "receive": 2728.255,
          "ssl": -1,
          "_queued": 4707.067
        },
        "_requestTime": 202763.200898
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.689Z",
        "_requestId": "67777.29",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/landing_teaser_breakpoint-large/public/home_0/itn/current/20191030-heart.jpg?itok=MpfWSUt3&timestamp=1572457757",
          "queryString": [
            {
              "name": "itok",
              "value": "MpfWSUt3"
            },
            {
              "name": "timestamp",
              "value": "1572457757"
            }
          ],
          "headersSize": 357,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1886.4589999999998,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":501}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 502,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 21541
          },
          "headersSize": 514,
          "bodySize": 21541,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:08 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649043"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "21541"
            },
            {
              "name": "X-Request-ID",
              "value": "v-25ca60c8-0276-11ea-955d-1f792a347077"
            },
            {
              "name": "Last-Modified",
              "value": "Wed, 30 Oct 2019 17:49:46 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:45 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "81551"
            }
          ],
          "_transferSize": 22055
        },
        "connection": "103",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0.858,
          "dns": -1,
          "connect": -1,
          "send": 0.05,
          "wait": 1644.906,
          "receive": 240.645,
          "ssl": -1,
          "_queued": 4708.158
        },
        "_requestTime": 202763.202044
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.849Z",
        "_requestId": "67777.30",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/landing_teaser_breakpoint-large/public/home_0/itn/current/20191106-flu.jpg?itok=Hz3uQDE9&timestamp=1573069915",
          "queryString": [
            {
              "name": "itok",
              "value": "Hz3uQDE9"
            },
            {
              "name": "timestamp",
              "value": "1573069915"
            }
          ],
          "headersSize": 355,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 2076.3230000000003,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":517}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 518,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 10618
          },
          "headersSize": 514,
          "bodySize": 10618,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:10 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649044"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "10618"
            },
            {
              "name": "X-Request-ID",
              "value": "v-25d72812-0276-11ea-8121-ab84a14902ad"
            },
            {
              "name": "Last-Modified",
              "value": "Wed, 06 Nov 2019 19:51:59 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:45 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "80867"
            }
          ],
          "_transferSize": 11132
        },
        "connection": "84",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 1263.89,
          "dns": -1,
          "connect": -1,
          "send": 0.145,
          "wait": 809.182,
          "receive": 3.106,
          "ssl": -1,
          "_queued": 4868.337
        },
        "_requestTime": 202763.362275
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.850Z",
        "_requestId": "67777.31",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/landing_teaser_breakpoint-large/public/home_0/itn/current/20191105-vape.jpg?itok=xVE4WhO0&timestamp=1573073100",
          "queryString": [
            {
              "name": "itok",
              "value": "xVE4WhO0"
            },
            {
              "name": "timestamp",
              "value": "1573073100"
            }
          ],
          "headersSize": 356,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 12117.863,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":533}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 534,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 21227
          },
          "headersSize": 514,
          "bodySize": 21227,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:16 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649051"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "21227"
            },
            {
              "name": "X-Request-ID",
              "value": "v-25e016a2-0276-11ea-9a27-cf6ba7c7fbe3"
            },
            {
              "name": "Last-Modified",
              "value": "Wed, 06 Nov 2019 20:45:43 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:45 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "80536"
            }
          ],
          "_transferSize": 21741
        },
        "connection": "78",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 4008.628,
          "dns": -1,
          "connect": -1,
          "send": 0.373,
          "wait": 6332.62,
          "receive": 1776.242,
          "ssl": -1,
          "_queued": 4869.551
        },
        "_requestTime": 202763.363547
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.850Z",
        "_requestId": "67777.32",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/landing_teaser_breakpoint-large/public/home_0/itn/current/502116925.jpg?itok=TCeJveaQ&timestamp=1573831504",
          "queryString": [
            {
              "name": "itok",
              "value": "TCeJveaQ"
            },
            {
              "name": "timestamp",
              "value": "1573831504"
            }
          ],
          "headersSize": 352,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 4459.278,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":549}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 550,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 20966
          },
          "headersSize": 512,
          "bodySize": 20966,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:11 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "69241"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "20966"
            },
            {
              "name": "X-Request-ID",
              "value": "v-1ca4b6e2-07bc-11ea-ad05-f7c409793503"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 15 Nov 2019 15:25:08 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 29 Nov 2019 15:25:10 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "9201"
            }
          ],
          "_transferSize": 21478
        },
        "connection": "123",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 2627.637,
          "dns": -1,
          "connect": -1,
          "send": 0.112,
          "wait": 1622.031,
          "receive": 209.498,
          "ssl": -1,
          "_queued": 4869.44
        },
        "_requestTime": 202763.363495
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.849Z",
        "_requestId": "67777.33",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/thumbnail/public/home_0/at-a-glance/nih-at-a-glance-whoweare.jpg?itok=cDJSq9lF",
          "queryString": [
            {
              "name": "itok",
              "value": "cDJSq9lF"
            }
          ],
          "headersSize": 324,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1263.5430000000001,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":575}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 576,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 7703
          },
          "headersSize": 514,
          "bodySize": 7703,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:09 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649047"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "7703"
            },
            {
              "name": "X-Request-ID",
              "value": "v-23d9fa44-0276-11ea-8cb7-83253e1279a1"
            },
            {
              "name": "Last-Modified",
              "value": "Tue, 13 Nov 2018 14:49:29 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:41 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "312047"
            }
          ],
          "_transferSize": 8217
        },
        "connection": "84",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 610.143,
          "dns": -1,
          "connect": -1,
          "send": 0.092,
          "wait": 648.281,
          "receive": 5.027,
          "ssl": -1,
          "_queued": 4867.989
        },
        "_requestTime": 202763.362109
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.850Z",
        "_requestId": "67777.34",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/thumbnail/public/home_0/at-a-glance/nih-at-a-glance-director.jpg?itok=8tDZkc_N",
          "queryString": [
            {
              "name": "itok",
              "value": "8tDZkc_N"
            }
          ],
          "headersSize": 324,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 4026.916,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":593}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 594,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 6069
          },
          "headersSize": 513,
          "bodySize": 6069,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:11 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649045"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "6069"
            },
            {
              "name": "X-Request-ID",
              "value": "v-25e952e4-0276-11ea-b700-dfea8d08abf4"
            },
            {
              "name": "Last-Modified",
              "value": "Tue, 13 Nov 2018 14:49:29 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:45 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "92805"
            }
          ],
          "_transferSize": 6582
        },
        "connection": "84",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 2075.605,
          "dns": -1,
          "connect": -1,
          "send": 0.411,
          "wait": 1948.205,
          "receive": 2.695,
          "ssl": -1,
          "_queued": 4869.099
        },
        "_requestTime": 202763.363297
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.850Z",
        "_requestId": "67777.35",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/thumbnail/public/home_0/at-a-glance/nih-at-a-glance-funding.jpg?itok=8s0rOmpa",
          "queryString": [
            {
              "name": "itok",
              "value": "8s0rOmpa"
            }
          ],
          "headersSize": 323,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 2114.9449999999997,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":611}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 612,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 9532
          },
          "headersSize": 514,
          "bodySize": 9532,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:10 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649048"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "9532"
            },
            {
              "name": "X-Request-ID",
              "value": "v-23e4e648-0276-11ea-b04d-f7e8e0429ecb"
            },
            {
              "name": "Last-Modified",
              "value": "Tue, 13 Nov 2018 14:49:29 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:41 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "311003"
            }
          ],
          "_transferSize": 10046
        },
        "connection": "123",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 1638.629,
          "dns": -1,
          "connect": -1,
          "send": 0.075,
          "wait": 468.469,
          "receive": 7.772,
          "ssl": -1,
          "_queued": 4868.519
        },
        "_requestTime": 202763.362772
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.850Z",
        "_requestId": "67777.36",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/thumbnail/public/home_0/at-a-glance/nih-at-a-glance-labs.jpg?itok=HFyWgTQv",
          "queryString": [
            {
              "name": "itok",
              "value": "HFyWgTQv"
            }
          ],
          "headersSize": 320,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 4007.408,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":629}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 630,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 10813
          },
          "headersSize": 515,
          "bodySize": 10813,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:11 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649046"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "10813"
            },
            {
              "name": "X-Request-ID",
              "value": "v-25a3515e-0276-11ea-9dc9-3359d2559db1"
            },
            {
              "name": "Last-Modified",
              "value": "Tue, 13 Nov 2018 14:49:29 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "312118"
            }
          ],
          "_transferSize": 11328
        },
        "connection": "78",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 2506.761,
          "dns": -1,
          "connect": -1,
          "send": 0.31,
          "wait": 1492.432,
          "receive": 7.905,
          "ssl": -1,
          "_queued": 4869.134
        },
        "_requestTime": 202763.363442
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.851Z",
        "_requestId": "67777.37",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/thumbnail/public/home_0/at-a-glance/nih-at-a-glance-training.jpg?itok=3lxzN4AE",
          "queryString": [
            {
              "name": "itok",
              "value": "3lxzN4AE"
            }
          ],
          "headersSize": 324,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 5663.146000000001,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":647}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 648,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 10313
          },
          "headersSize": 514,
          "bodySize": 10313,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:12 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649046"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "10313"
            },
            {
              "name": "X-Request-ID",
              "value": "v-26b7aed2-0276-11ea-b431-5791911c4b99"
            },
            {
              "name": "Last-Modified",
              "value": "Tue, 13 Nov 2018 14:49:29 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:46 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "91660"
            }
          ],
          "_transferSize": 10827
        },
        "connection": "84",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 4026.369,
          "dns": -1,
          "connect": -1,
          "send": 0.108,
          "wait": 1632.337,
          "receive": 4.332,
          "ssl": -1,
          "_queued": 4869.673
        },
        "_requestTime": 202763.364031
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.850Z",
        "_requestId": "67777.38",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/styles/thumbnail/public/about-nih/researcher-holding-petri-dish.jpg?itok=af4KZKn0",
          "queryString": [
            {
              "name": "itok",
              "value": "af4KZKn0"
            }
          ],
          "headersSize": 320,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 2627.5200000000004,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":665}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 666,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/jpeg",
            "size": 8318
          },
          "headersSize": 514,
          "bodySize": 8318,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:11 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649046"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "8318"
            },
            {
              "name": "X-Request-ID",
              "value": "v-2567759e-0276-11ea-a91d-93f91c027e7a"
            },
            {
              "name": "Last-Modified",
              "value": "Tue, 13 Nov 2018 14:49:29 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/jpeg"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "310247"
            }
          ],
          "_transferSize": 8832
        },
        "connection": "123",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 2114.686,
          "dns": -1,
          "connect": -1,
          "send": 0.235,
          "wait": 509.127,
          "receive": 3.472,
          "ssl": -1,
          "_queued": 4868.972
        },
        "_requestTime": 202763.363382
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:06.381Z",
        "_requestId": "67777.40",
        "_initialPriority": "Medium",
        "_priority": "Medium",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/js/js_u7NkY8T8nlOgV0rVVicmfB0CUuCvZZE_2_NkS4ohh6A.js",
          "queryString": [],
          "headersSize": 291,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 531.8169999999999,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":838}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 839,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/javascript",
            "size": 10649,
            "compression": 6575
          },
          "headersSize": 558,
          "bodySize": 4074,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:06 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649041"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "4074"
            },
            {
              "name": "X-Request-ID",
              "value": "v-259fbdb4-0276-11ea-b645-0bba124f856c"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:52:43 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/javascript"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:44 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "93090"
            }
          ],
          "_transferSize": 4632
        },
        "connection": "84",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0,
          "dns": 0,
          "connect": 286.479,
          "send": 0.071,
          "wait": 244.462,
          "receive": 0.805,
          "ssl": 236.714,
          "_queued": 2397.374
        },
        "_requestTime": 202760.894233
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:07.186Z",
        "_requestId": "67777.41",
        "_initialPriority": "Medium",
        "_priority": "Medium",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/default/files/js/js_Um_qRLnP8fOzrkjyP_FeCuZh54gm2IzhJHenEGAjCVs.js",
          "queryString": [],
          "headersSize": 291,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 595.429,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":839}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 840,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/javascript",
            "size": 55627,
            "compression": 38979
          },
          "headersSize": 560,
          "bodySize": 16648,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:07 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649040"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "16648"
            },
            {
              "name": "X-Request-ID",
              "value": "v-268967fc-0276-11ea-ad87-0f3dc8f0a137"
            },
            {
              "name": "Last-Modified",
              "value": "Fri, 08 Nov 2019 21:50:39 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/javascript"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:46 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "169056"
            }
          ],
          "_transferSize": 17208
        },
        "connection": "84",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0.348,
          "dns": -1,
          "connect": -1,
          "send": 0.093,
          "wait": 592.021,
          "receive": 2.967,
          "ssl": -1,
          "_queued": 3202.107
        },
        "_requestTime": 202761.699064
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.690Z",
        "_requestId": "67777.42",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.google-analytics.com/analytics.js",
          "queryString": [],
          "headersSize": 244,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1320.204,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"12\",\"url\":\"https://www.nih.gov/sites/all/libraries/DAP/Universal-Federated-Analytics-Min.1.0.js?agency=HHS&subagency=NIH&pua=UA-22075261-1&sp=find&yt=true&exts=doc,docx,xls,xlsx,xlsm,ppt,pptx,exe,zip,pdf,js,txt,csv,dxf,wmv,jpg,wma,mov,avi,mp3,mp4,csv\",\"lineNumber\":14,\"columnNumber\":7954},{\"functionName\":\"\",\"scriptId\":\"12\",\"url\":\"https://www.nih.gov/sites/all/libraries/DAP/Universal-Federated-Analytics-Min.1.0.js?agency=HHS&subagency=NIH&pua=UA-22075261-1&sp=find&yt=true&exts=doc,docx,xls,xlsx,xlsm,ppt,pptx,exe,zip,pdf,js,txt,csv,dxf,wmv,jpg,wma,mov,avi,mp3,mp4,csv\",\"lineNumber\":14,\"columnNumber\":7973}]}}",
        "_initiator_type": "script",
        "_initiator": "https://www.nih.gov/sites/all/libraries/DAP/Universal-Federated-Analytics-Min.1.0.js?agency=HHS&subagency=NIH&pua=UA-22075261-1&sp=find&yt=true&exts=doc,docx,xls,xlsx,xlsm,ppt,pptx,exe,zip,pdf,js,txt,csv,dxf,wmv,jpg,wma,mov,avi,mp3,mp4,csv",
        "_initiator_line": 15,
        "_initiator_column": 7955,
        "_initiator_function_name": "",
        "_initiator_script_id": "12",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/javascript",
            "size": 44470,
            "compression": 26667
          },
          "headersSize": 593,
          "bodySize": 17803,
          "cookies": [],
          "headers": [
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=10886400; includeSubDomains; preload"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Last-Modified",
              "value": "Mon, 19 Aug 2019 17:22:41 GMT"
            },
            {
              "name": "Server",
              "value": "Golfe2"
            },
            {
              "name": "Age",
              "value": "5026"
            },
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 09:15:23 GMT"
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Content-Type",
              "value": "text/javascript"
            },
            {
              "name": "Cache-Control",
              "value": "public, max-age=7200"
            },
            {
              "name": "Alt-Svc",
              "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
            },
            {
              "name": "Content-Length",
              "value": "17803"
            },
            {
              "name": "Expires",
              "value": "Sat, 16 Nov 2019 11:15:23 GMT"
            }
          ],
          "_transferSize": 18396
        },
        "connection": "318",
        "serverIPAddress": "172.217.169.78",
        "timings": {
          "blocked": 250.447,
          "dns": 0.026,
          "connect": 452.634,
          "send": 0.065,
          "wait": 198.265,
          "receive": 418.767,
          "ssl": 237.608,
          "_queued": 4479.89
        },
        "_requestTime": 202763.203246
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.691Z",
        "_requestId": "67777.43",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.youtube.com/iframe_api",
          "queryString": [],
          "headersSize": 233,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1786.2319999999997,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"12\",\"url\":\"https://www.nih.gov/sites/all/libraries/DAP/Universal-Federated-Analytics-Min.1.0.js?agency=HHS&subagency=NIH&pua=UA-22075261-1&sp=find&yt=true&exts=doc,docx,xls,xlsx,xlsm,ppt,pptx,exe,zip,pdf,js,txt,csv,dxf,wmv,jpg,wma,mov,avi,mp3,mp4,csv\",\"lineNumber\":14,\"columnNumber\":14295}]}}",
        "_initiator_type": "script",
        "_initiator": "https://www.nih.gov/sites/all/libraries/DAP/Universal-Federated-Analytics-Min.1.0.js?agency=HHS&subagency=NIH&pua=UA-22075261-1&sp=find&yt=true&exts=doc,docx,xls,xlsx,xlsm,ppt,pptx,exe,zip,pdf,js,txt,csv,dxf,wmv,jpg,wma,mov,avi,mp3,mp4,csv",
        "_initiator_line": 15,
        "_initiator_column": 14296,
        "_initiator_function_name": "",
        "_initiator_script_id": "12",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/javascript",
            "size": 859
          },
          "headersSize": 446,
          "bodySize": 859,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:10 GMT"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Server",
              "value": "YouTube Frontend Proxy"
            },
            {
              "name": "Content-Type",
              "value": "application/javascript"
            },
            {
              "name": "Cache-Control",
              "value": "no-cache"
            },
            {
              "name": "Alt-Svc",
              "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
            },
            {
              "name": "Content-Length",
              "value": "859"
            },
            {
              "name": "X-XSS-Protection",
              "value": "0"
            },
            {
              "name": "Expires",
              "value": "Tue, 27 Apr 1971 19:44:06 GMT"
            }
          ],
          "_transferSize": 1305
        },
        "connection": "320",
        "serverIPAddress": "216.58.210.238",
        "timings": {
          "blocked": 250.629,
          "dns": 0.031,
          "connect": 1255.591,
          "send": 0.09,
          "wait": 279.147,
          "receive": 0.744,
          "ssl": 1038.844,
          "_queued": 4479.858
        },
        "_requestTime": 202763.204047
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:15.342Z",
        "_requestId": "67777.44r",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://search.usa.gov/javascripts/remote.loader.js",
          "queryString": [],
          "headersSize": 250,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1926.963,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"13\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":27,\"columnNumber\":47}]}}",
        "_initiator_type": "script",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 28,
        "_initiator_column": 48,
        "_initiator_function_name": "",
        "_initiator_script_id": "13",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "https://search.usa.gov/assets/sayt_loader.js",
          "status": 301,
          "statusText": "Moved Permanently",
          "content": {
            "mimeType": "text/html",
            "size": 0
          },
          "headersSize": 233,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Location",
              "value": "https://search.usa.gov/assets/sayt_loader.js"
            },
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:17 GMT"
            },
            {
              "name": "Server",
              "value": "Apache"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Content-Length",
              "value": "318"
            },
            {
              "name": "Content-Type",
              "value": "text/html; charset=iso-8859-1"
            }
          ],
          "_transferSize": 233
        },
        "connection": "364",
        "serverIPAddress": "34.230.181.82",
        "timings": {
          "blocked": 2.183,
          "dns": 1126.564,
          "connect": 608.996,
          "send": 0.064,
          "wait": 189.156,
          "receive": 0,
          "ssl": 430.827,
          "_queued": 11130.665
        },
        "_requestTime": 202769.85559
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:08.850Z",
        "_requestId": "67777.89",
        "_initialPriority": "Low",
        "_priority": "High",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/all/themes/nih/images/generated/icons-s44521854e4.png",
          "queryString": [],
          "headersSize": 353,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/sites/default/files/css/css_VGoLuPNSo2NQ2V-QqFhxWsLCNFqtOFjVSUJDUR3kuCI.css"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 4426.146000000001,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":21731},{\"functionName\":\"l\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":16995},{\"functionName\":\"fireWith\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":17782},{\"functionName\":\"ready\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":12503},{\"functionName\":\"A\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":9908}]}}",
        "_initiator_type": "script",
        "_initiator": "https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js",
        "_initiator_line": 2,
        "_initiator_column": 21732,
        "_initiator_function_name": "",
        "_initiator_script_id": "18",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/png",
            "size": 17282
          },
          "headersSize": 514,
          "bodySize": 17282,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:11 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649044"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "17282"
            },
            {
              "name": "X-Request-ID",
              "value": "v-26c1e26c-0276-11ea-a1b0-7b7ab770256c"
            },
            {
              "name": "Last-Modified",
              "value": "Sat, 28 Sep 2019 07:03:32 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/png"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:46 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "111781"
            }
          ],
          "_transferSize": 17796
        },
        "connection": "103",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 1725.729,
          "dns": -1,
          "connect": -1,
          "send": 0.075,
          "wait": 2693.568,
          "receive": 6.774,
          "ssl": -1,
          "_queued": 141.645
        },
        "_requestTime": 202763.362937
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:17.479Z",
        "_requestId": "67777.83",
        "_initialPriority": "VeryLow",
        "_priority": "VeryLow",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://fonts.gstatic.com/s/droidsans/v10/SlGVmQWMvZQIdix7AFxXkHNSbRYXags.woff2",
          "queryString": [],
          "headersSize": 389,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Origin",
              "value": "https://www.nih.gov"
            },
            {
              "name": "Referer",
              "value": "https://fonts.googleapis.com/css?family=Droid+Sans:700,regular|Droid+Serif:italic,regular&subset=latin"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 419.912,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":21731},{\"functionName\":\"l\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":16995},{\"functionName\":\"fireWith\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":17782},{\"functionName\":\"ready\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":12503},{\"functionName\":\"A\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":9908}]}}",
        "_initiator_type": "script",
        "_initiator": "https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js",
        "_initiator_line": 2,
        "_initiator_column": 21732,
        "_initiator_function_name": "",
        "_initiator_script_id": "18",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "font/woff2",
            "size": 11236
          },
          "headersSize": 571,
          "bodySize": 11236,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Tue, 12 Nov 2019 21:15:38 GMT"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Last-Modified",
              "value": "Mon, 22 Jul 2019 19:17:29 GMT"
            },
            {
              "name": "Server",
              "value": "sffe"
            },
            {
              "name": "Age",
              "value": "307419"
            },
            {
              "name": "Content-Type",
              "value": "font/woff2"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Cache-Control",
              "value": "public, max-age=31536000"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Timing-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Alt-Svc",
              "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
            },
            {
              "name": "Content-Length",
              "value": "11236"
            },
            {
              "name": "X-XSS-Protection",
              "value": "0"
            },
            {
              "name": "Expires",
              "value": "Wed, 11 Nov 2020 21:15:38 GMT"
            }
          ],
          "_transferSize": 11807
        },
        "connection": "208",
        "serverIPAddress": "172.217.20.131",
        "timings": {
          "blocked": 0.321,
          "dns": -1,
          "connect": -1,
          "send": 0.372,
          "wait": 126.216,
          "receive": 293.003,
          "ssl": -1,
          "_queued": 8736.644
        },
        "_requestTime": 202771.991796
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:17.945Z",
        "_requestId": "67777.86",
        "_initialPriority": "VeryLow",
        "_priority": "VeryLow",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://fonts.gstatic.com/s/droidserif/v10/tDbI2oqRg1oM3QBjjcaDkOr9rAXWGQyH.woff2",
          "queryString": [],
          "headersSize": 391,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Origin",
              "value": "https://www.nih.gov"
            },
            {
              "name": "Referer",
              "value": "https://fonts.googleapis.com/css?family=Droid+Sans:700,regular|Droid+Serif:italic,regular&subset=latin"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 360.436,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":21731},{\"functionName\":\"l\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":16995},{\"functionName\":\"fireWith\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":17782},{\"functionName\":\"ready\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":12503},{\"functionName\":\"A\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":9908}]}}",
        "_initiator_type": "script",
        "_initiator": "https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js",
        "_initiator_line": 2,
        "_initiator_column": 21732,
        "_initiator_function_name": "",
        "_initiator_script_id": "18",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "font/woff2",
            "size": 12560
          },
          "headersSize": 572,
          "bodySize": 12560,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Fri, 01 Nov 2019 13:25:40 GMT"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Last-Modified",
              "value": "Mon, 22 Jul 2019 19:18:22 GMT"
            },
            {
              "name": "Server",
              "value": "sffe"
            },
            {
              "name": "Age",
              "value": "1286018"
            },
            {
              "name": "Content-Type",
              "value": "font/woff2"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Cache-Control",
              "value": "public, max-age=31536000"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Timing-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Alt-Svc",
              "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
            },
            {
              "name": "Content-Length",
              "value": "12560"
            },
            {
              "name": "X-XSS-Protection",
              "value": "0"
            },
            {
              "name": "Expires",
              "value": "Sat, 31 Oct 2020 13:25:40 GMT"
            }
          ],
          "_transferSize": 13132
        },
        "connection": "208",
        "serverIPAddress": "172.217.20.131",
        "timings": {
          "blocked": 0.604,
          "dns": -1,
          "connect": -1,
          "send": 0.08,
          "wait": 126.307,
          "receive": 233.445,
          "ssl": -1,
          "_queued": 9199.897
        },
        "_requestTime": 202772.458335
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:15.343Z",
        "_requestId": "67777.99",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/all/modules/contrib/extlink/extlink_s.png",
          "queryString": [],
          "headersSize": 341,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/sites/default/files/css/css_mtppzd8_PFstl_yJg9eSCqHm2C-vo2-O3ZRK8QVn30M.css"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 204.667,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"get\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":76049},{\"functionName\":\"css\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":75023},{\"functionName\":\"\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":93407},{\"functionName\":\"access\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":16118},{\"functionName\":\"v.fn.<computed>\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":93178},{\"functionName\":\"r.doMath\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":175,\"columnNumber\":7556},{\"functionName\":\"init\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":174,\"columnNumber\":23447},{\"functionName\":\"e.flexslider\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":175,\"columnNumber\":9254},{\"functionName\":\"\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":175,\"columnNumber\":10393},{\"functionName\":\"each\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":14542},{\"functionName\":\"each\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":11216},{\"functionName\":\"e.fn.flexslider\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":175,\"columnNumber\":10186},{\"functionName\":\"\",\"scriptId\":\"38\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_u7NkY8T8nlOgV0rVVicmfB0CUuCvZZE_2_NkS4ohh6A.js\",\"lineNumber\":48,\"columnNumber\":16},{\"functionName\":\"each\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":14542},{\"functionName\":\"each\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":11216},{\"functionName\":\"$.fn.once\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":169,\"columnNumber\":39},{\"functionName\":\"_flexslider_init\",\"scriptId\":\"38\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_u7NkY8T8nlOgV0rVVicmfB0CUuCvZZE_2_NkS4ohh6A.js\",\"lineNumber\":41,\"columnNumber\":25},{\"functionName\":\"attach\",\"scriptId\":\"38\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_u7NkY8T8nlOgV0rVVicmfB0CUuCvZZE_2_NkS4ohh6A.js\",\"lineNumber\":31,\"columnNumber\":8},{\"functionName\":\"\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":306,\"columnNumber\":11},{\"functionName\":\"each\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":14493},{\"functionName\":\"Drupal.attachBehaviors\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":304,\"columnNumber\":4},{\"functionName\":\"\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":787,\"columnNumber\":9},{\"functionName\":\"l\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":16995},{\"functionName\":\"fireWith\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":17782},{\"functionName\":\"ready\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":12503},{\"functionName\":\"A\",\"scriptId\":\"18\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js\",\"lineNumber\":1,\"columnNumber\":9908}]}}",
        "_initiator_type": "script",
        "_initiator": "https://www.nih.gov/sites/default/files/js/js_8fSQqVw01CfRhmzAwvi5T4vnLcHaUagRVY08XdWCEKg.js",
        "_initiator_line": 2,
        "_initiator_column": 76050,
        "_initiator_function_name": "get",
        "_initiator_script_id": "18",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/png",
            "size": 153
          },
          "headersSize": 512,
          "bodySize": 153,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:15 GMT"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649049"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "153"
            },
            {
              "name": "X-Request-ID",
              "value": "v-25f55256-0276-11ea-b296-3fce45a2a90d"
            },
            {
              "name": "Last-Modified",
              "value": "Sat, 28 Sep 2019 07:03:32 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "image/png"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:45 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "160869"
            }
          ],
          "_transferSize": 665
        },
        "connection": "59",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 2.648,
          "dns": -1,
          "connect": -1,
          "send": 0.16,
          "wait": 200.547,
          "receive": 1.312,
          "ssl": -1,
          "_queued": 6462.949
        },
        "_requestTime": 202769.855776
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:15.547Z",
        "_requestId": "67777.103",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/all/libraries/foresee/foresee-surveydef.js",
          "queryString": [],
          "headersSize": 267,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 207.091,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"c.Ta\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":54,\"columnNumber\":106},{\"functionName\":\"i.Nd\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":66,\"columnNumber\":40},{\"functionName\":\"c.f.execute\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":125,\"columnNumber\":306},{\"functionName\":\"c.f.load\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":125,\"columnNumber\":57},{\"functionName\":\"\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":165,\"columnNumber\":133},{\"functionName\":\"\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":55,\"columnNumber\":111}],\"parent\":{\"description\":\"setTimeout\",\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":55,\"columnNumber\":68},{\"functionName\":\"c.Aa\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":55,\"columnNumber\":347}]}}}",
        "_initiator_type": "script",
        "_initiator": "https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js",
        "_initiator_line": 55,
        "_initiator_column": 107,
        "_initiator_function_name": "c.Ta",
        "_initiator_script_id": "19",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/javascript",
            "size": 2470,
            "compression": 1125
          },
          "headersSize": 566,
          "bodySize": 1345,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:15 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649050"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "1345"
            },
            {
              "name": "X-Request-ID",
              "value": "v-26101b40-0276-11ea-9a0a-f3f8251aef48"
            },
            {
              "name": "Last-Modified",
              "value": "Sat, 28 Sep 2019 07:03:32 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "application/javascript"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:45 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "114568"
            }
          ],
          "_transferSize": 1911
        },
        "connection": "59",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 2.334,
          "dns": -1,
          "connect": -1,
          "send": 0.718,
          "wait": 203.578,
          "receive": 0.461,
          "ssl": -1,
          "_queued": 6616.989
        },
        "_requestTime": 202770.060702
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:15.755Z",
        "_requestId": "67777.104",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.google-analytics.com/r/collect?v=1&_v=j79&aip=1&a=386463286&t=pageview&_s=1&dl=https%3A%2F%2Fwww.nih.gov%2F&dp=%2F&ul=en-gb&de=UTF-8&dt=National%20Institutes%20of%20Health%20(NIH)%20%7C%20Turning%20Discovery%20Into%20Health&sd=24-bit&sr=1680x1050&vp=1350x940&je=0&_u=YEBAAQAB~&jid=1425735673&gjid=1978549099&cid=1016622351.1573900750&tid=UA-33523145-1&_gid=817028905.1573900750&_r=1&cd1=HHS&cd2=HHS%20-%20NIH&cd3=20150226%20v1.03%20-%20Universal%20Analytics&z=455757341",
          "queryString": [
            {
              "name": "v",
              "value": "1"
            },
            {
              "name": "_v",
              "value": "j79"
            },
            {
              "name": "aip",
              "value": "1"
            },
            {
              "name": "a",
              "value": "386463286"
            },
            {
              "name": "t",
              "value": "pageview"
            },
            {
              "name": "_s",
              "value": "1"
            },
            {
              "name": "dl",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "dp",
              "value": "/"
            },
            {
              "name": "ul",
              "value": "en-gb"
            },
            {
              "name": "de",
              "value": "UTF-8"
            },
            {
              "name": "dt",
              "value": "National Institutes of Health (NIH) | Turning Discovery Into Health"
            },
            {
              "name": "sd",
              "value": "24-bit"
            },
            {
              "name": "sr",
              "value": "1680x1050"
            },
            {
              "name": "vp",
              "value": "1350x940"
            },
            {
              "name": "je",
              "value": "0"
            },
            {
              "name": "_u",
              "value": "YEBAAQAB~"
            },
            {
              "name": "jid",
              "value": "1425735673"
            },
            {
              "name": "gjid",
              "value": "1978549099"
            },
            {
              "name": "cid",
              "value": "1016622351.1573900750"
            },
            {
              "name": "tid",
              "value": "UA-33523145-1"
            },
            {
              "name": "_gid",
              "value": "817028905.1573900750"
            },
            {
              "name": "_r",
              "value": "1"
            },
            {
              "name": "cd1",
              "value": "HHS"
            },
            {
              "name": "cd2",
              "value": "HHS - NIH"
            },
            {
              "name": "cd3",
              "value": "20150226 v1.03 - Universal Analytics"
            },
            {
              "name": "z",
              "value": "455757341"
            }
          ],
          "headersSize": 680,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 125.749,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[],\"parent\":{\"description\":\"Image\",\"callFrames\":[{\"functionName\":\"ta\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":15,\"columnNumber\":87},{\"functionName\":\"wc\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":24,\"columnNumber\":690},{\"functionName\":\"ba\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":24,\"columnNumber\":503},{\"functionName\":\"Sa\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":29,\"columnNumber\":388},{\"functionName\":\"Ha.D\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":27,\"columnNumber\":457},{\"functionName\":\"pc.send\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":63,\"columnNumber\":342},{\"functionName\":\"X.b.<computed>\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":39,\"columnNumber\":163},{\"functionName\":\"Z.v\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":71,\"columnNumber\":333},{\"functionName\":\"Z.D\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":70,\"columnNumber\":239},{\"functionName\":\"N.N\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":73,\"columnNumber\":224},{\"functionName\":\"rc\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":63,\"columnNumber\":548},{\"functionName\":\"z\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":63,\"columnNumber\":580},{\"functionName\":\"\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":73,\"columnNumber\":346},{\"functionName\":\"\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":73,\"columnNumber\":398}]}}}",
        "_initiator_type": "script",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/gif",
            "size": 35
          },
          "headersSize": 518,
          "bodySize": 35,
          "cookies": [],
          "headers": [
            {
              "name": "Pragma",
              "value": "no-cache"
            },
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:15 GMT"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Last-Modified",
              "value": "Sun, 17 May 1998 03:00:00 GMT"
            },
            {
              "name": "Server",
              "value": "Golfe2"
            },
            {
              "name": "Content-Type",
              "value": "image/gif"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Cache-Control",
              "value": "no-cache, no-store, must-revalidate"
            },
            {
              "name": "Alt-Svc",
              "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
            },
            {
              "name": "Content-Length",
              "value": "35"
            },
            {
              "name": "Expires",
              "value": "Fri, 01 Jan 1990 00:00:00 GMT"
            }
          ],
          "_transferSize": 553
        },
        "connection": "318",
        "serverIPAddress": "172.217.169.78",
        "timings": {
          "blocked": 0.277,
          "dns": -1,
          "connect": -1,
          "send": 0.064,
          "wait": 124.269,
          "receive": 1.139,
          "ssl": -1,
          "_queued": 5710.435
        },
        "_requestTime": 202770.267956
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:15.975Z",
        "_requestId": "67777.105r",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.google-analytics.com/r/collect?v=1&_v=j79&aip=1&a=386463286&t=pageview&_s=1&dl=https%3A%2F%2Fwww.nih.gov%2F&dp=%2F&ul=en-gb&de=UTF-8&dt=National%20Institutes%20of%20Health%20(NIH)%20%7C%20Turning%20Discovery%20Into%20Health&sd=24-bit&sr=1680x1050&vp=1350x940&je=0&_u=YEDAAQAB~&jid=1117352391&gjid=1813279158&cid=1016622351.1573900750&tid=UA-22075261-1&_gid=817028905.1573900750&_r=1&z=273992057",
          "queryString": [
            {
              "name": "v",
              "value": "1"
            },
            {
              "name": "_v",
              "value": "j79"
            },
            {
              "name": "aip",
              "value": "1"
            },
            {
              "name": "a",
              "value": "386463286"
            },
            {
              "name": "t",
              "value": "pageview"
            },
            {
              "name": "_s",
              "value": "1"
            },
            {
              "name": "dl",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "dp",
              "value": "/"
            },
            {
              "name": "ul",
              "value": "en-gb"
            },
            {
              "name": "de",
              "value": "UTF-8"
            },
            {
              "name": "dt",
              "value": "National Institutes of Health (NIH) | Turning Discovery Into Health"
            },
            {
              "name": "sd",
              "value": "24-bit"
            },
            {
              "name": "sr",
              "value": "1680x1050"
            },
            {
              "name": "vp",
              "value": "1350x940"
            },
            {
              "name": "je",
              "value": "0"
            },
            {
              "name": "_u",
              "value": "YEDAAQAB~"
            },
            {
              "name": "jid",
              "value": "1117352391"
            },
            {
              "name": "gjid",
              "value": "1813279158"
            },
            {
              "name": "cid",
              "value": "1016622351.1573900750"
            },
            {
              "name": "tid",
              "value": "UA-22075261-1"
            },
            {
              "name": "_gid",
              "value": "817028905.1573900750"
            },
            {
              "name": "_r",
              "value": "1"
            },
            {
              "name": "z",
              "value": "273992057"
            }
          ],
          "headersSize": 605,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 129.707,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[],\"parent\":{\"description\":\"Image\",\"callFrames\":[{\"functionName\":\"ta\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":15,\"columnNumber\":87},{\"functionName\":\"wc\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":24,\"columnNumber\":690},{\"functionName\":\"ba\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":24,\"columnNumber\":503},{\"functionName\":\"Sa\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":29,\"columnNumber\":388},{\"functionName\":\"Ha.D\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":27,\"columnNumber\":457},{\"functionName\":\"pc.send\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":63,\"columnNumber\":342},{\"functionName\":\"X.b.<computed>\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":39,\"columnNumber\":163},{\"functionName\":\"Z.v\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":71,\"columnNumber\":333},{\"functionName\":\"Z.D\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":70,\"columnNumber\":239},{\"functionName\":\"N.N\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":73,\"columnNumber\":224},{\"functionName\":\"rc\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":63,\"columnNumber\":548},{\"functionName\":\"z\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":63,\"columnNumber\":580},{\"functionName\":\"\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":73,\"columnNumber\":346},{\"functionName\":\"\",\"scriptId\":\"40\",\"url\":\"https://www.google-analytics.com/analytics.js\",\"lineNumber\":73,\"columnNumber\":398}]}}}",
        "_initiator_type": "script",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "https://stats.g.doubleclick.net/r/collect?v=1&aip=1&t=dc&_r=3&tid=UA-22075261-1&cid=1016622351.1573900750&jid=1117352391&_gid=817028905.1573900750&gjid=1813279158&_v=j79&z=273992057",
          "status": 302,
          "statusText": "Found",
          "content": {
            "mimeType": "text/html",
            "size": 0
          },
          "headersSize": 697,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Pragma",
              "value": "no-cache"
            },
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:16 GMT"
            },
            {
              "name": "Last-Modified",
              "value": "Sun, 17 May 1998 03:00:00 GMT"
            },
            {
              "name": "Server",
              "value": "Golfe2"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Content-Type",
              "value": "text/html; charset=UTF-8"
            },
            {
              "name": "Location",
              "value": "https://stats.g.doubleclick.net/r/collect?v=1&aip=1&t=dc&_r=3&tid=UA-22075261-1&cid=1016622351.1573900750&jid=1117352391&_gid=817028905.1573900750&gjid=1813279158&_v=j79&z=273992057"
            },
            {
              "name": "Cache-Control",
              "value": "no-cache, no-store, must-revalidate"
            },
            {
              "name": "Alt-Svc",
              "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
            },
            {
              "name": "Content-Length",
              "value": "418"
            },
            {
              "name": "Expires",
              "value": "Fri, 01 Jan 1990 00:00:00 GMT"
            }
          ],
          "_transferSize": 697
        },
        "connection": "318",
        "serverIPAddress": "172.217.169.78",
        "timings": {
          "blocked": 0.52,
          "dns": -1,
          "connect": -1,
          "send": 0.145,
          "wait": 129.042,
          "receive": 0,
          "ssl": -1,
          "_queued": 5930.008
        },
        "_requestTime": 202770.487838
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:16.760Z",
        "_requestId": "67777.106",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://s.ytimg.com/yts/jsbin/www-widgetapi-vflUFVyEP/www-widgetapi.js",
          "queryString": [],
          "headersSize": 269,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 1127.573,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"41\",\"url\":\"https://www.youtube.com/iframe_api\",\"lineNumber\":1,\"columnNumber\":833},{\"functionName\":\"\",\"scriptId\":\"41\",\"url\":\"https://www.youtube.com/iframe_api\",\"lineNumber\":1,\"columnNumber\":854}]}}",
        "_initiator_type": "script",
        "_initiator": "https://www.youtube.com/iframe_api",
        "_initiator_line": 2,
        "_initiator_column": 834,
        "_initiator_function_name": "",
        "_initiator_script_id": "41",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/javascript",
            "size": 23139,
            "compression": 14459
          },
          "headersSize": 617,
          "bodySize": 8680,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Fri, 15 Nov 2019 11:07:37 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Last-Modified",
              "value": "Thu, 14 Nov 2019 11:18:40 GMT"
            },
            {
              "name": "Server",
              "value": "sffe"
            },
            {
              "name": "Age",
              "value": "84700"
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding, Origin"
            },
            {
              "name": "Content-Type",
              "value": "text/javascript"
            },
            {
              "name": "Cache-Control",
              "value": "public, max-age=691200"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Timing-Allow-Origin",
              "value": "https://www.youtube.com"
            },
            {
              "name": "Alt-Svc",
              "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
            },
            {
              "name": "Content-Length",
              "value": "8680"
            },
            {
              "name": "X-XSS-Protection",
              "value": "0"
            },
            {
              "name": "Expires",
              "value": "Sat, 23 Nov 2019 11:07:37 GMT"
            }
          ],
          "_transferSize": 9297
        },
        "connection": "375",
        "serverIPAddress": "172.217.169.78",
        "timings": {
          "blocked": 2.579,
          "dns": 133.034,
          "connect": 420.534,
          "send": 0.062,
          "wait": 504.118,
          "receive": 67.246,
          "ssl": 309.478,
          "_queued": 6280.83
        },
        "_requestTime": 202771.272993
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:15.761Z",
        "_requestId": "67777.107",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://www.nih.gov/sites/all/libraries/foresee/foresee-dhtml.css",
          "queryString": [],
          "headersSize": 264,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 213.105,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"c.Ta\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":54,\"columnNumber\":174},{\"functionName\":\"c.f.Qa\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":128,\"columnNumber\":208},{\"functionName\":\"c.f.tb\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":125,\"columnNumber\":442},{\"functionName\":\"\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":125,\"columnNumber\":341},{\"functionName\":\"d\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":65,\"columnNumber\":475},{\"functionName\":\"c.R.e.onload\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":54,\"columnNumber\":11}],\"parent\":{\"description\":\"load\",\"callFrames\":[{\"functionName\":\"c.Ta\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":53,\"columnNumber\":508},{\"functionName\":\"i.Nd\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":66,\"columnNumber\":40},{\"functionName\":\"c.f.execute\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":125,\"columnNumber\":306},{\"functionName\":\"c.f.load\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":125,\"columnNumber\":57},{\"functionName\":\"\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":165,\"columnNumber\":133},{\"functionName\":\"\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":55,\"columnNumber\":111}],\"parent\":{\"description\":\"setTimeout\",\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":55,\"columnNumber\":68},{\"functionName\":\"c.Aa\",\"scriptId\":\"19\",\"url\":\"https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js\",\"lineNumber\":55,\"columnNumber\":347}]}}}}",
        "_initiator_type": "script",
        "_initiator": "https://www.nih.gov/sites/default/files/js/js_MchPCyMNCVSPCV7wSrA8MLafYaAGsvEfFxPqKMuPvyw.js",
        "_initiator_line": 55,
        "_initiator_column": 175,
        "_initiator_function_name": "c.Ta",
        "_initiator_script_id": "19",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 10158,
            "compression": 7743
          },
          "headersSize": 552,
          "bodySize": 2415,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:15 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Age",
              "value": "649050"
            },
            {
              "name": "X-Cache",
              "value": "HIT"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "X-AH-Environment",
              "value": "prod"
            },
            {
              "name": "Content-Length",
              "value": "2415"
            },
            {
              "name": "X-Request-ID",
              "value": "v-2622b052-0276-11ea-8efe-afcf4c32c9ce"
            },
            {
              "name": "Last-Modified",
              "value": "Sat, 28 Sep 2019 07:03:32 GMT"
            },
            {
              "name": "Server",
              "value": "nginx"
            },
            {
              "name": "Vary",
              "value": "Host,Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000"
            },
            {
              "name": "Content-Type",
              "value": "text/css"
            },
            {
              "name": "Via",
              "value": "varnish"
            },
            {
              "name": "Expires",
              "value": "Fri, 22 Nov 2019 22:21:45 GMT"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=1209600"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "X-Cache-Hits",
              "value": "327126"
            }
          ],
          "_transferSize": 2967
        },
        "connection": "59",
        "serverIPAddress": "35.172.173.48",
        "timings": {
          "blocked": 0.467,
          "dns": -1,
          "connect": -1,
          "send": 0.18,
          "wait": 211.271,
          "receive": 1.187,
          "ssl": -1,
          "_queued": 0.304
        },
        "_requestTime": 202770.274434
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:16.109Z",
        "_requestId": "67777.105",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://stats.g.doubleclick.net/r/collect?v=1&aip=1&t=dc&_r=3&tid=UA-22075261-1&cid=1016622351.1573900750&jid=1117352391&_gid=817028905.1573900750&gjid=1813279158&_v=j79&z=273992057",
          "queryString": [
            {
              "name": "v",
              "value": "1"
            },
            {
              "name": "aip",
              "value": "1"
            },
            {
              "name": "t",
              "value": "dc"
            },
            {
              "name": "_r",
              "value": "3"
            },
            {
              "name": "tid",
              "value": "UA-22075261-1"
            },
            {
              "name": "cid",
              "value": "1016622351.1573900750"
            },
            {
              "name": "jid",
              "value": "1117352391"
            },
            {
              "name": "_gid",
              "value": "817028905.1573900750"
            },
            {
              "name": "gjid",
              "value": "1813279158"
            },
            {
              "name": "_v",
              "value": "j79"
            },
            {
              "name": "z",
              "value": "273992057"
            }
          ],
          "headersSize": 380,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 649.929,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":0}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 1,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/gif",
            "size": 35
          },
          "headersSize": 591,
          "bodySize": 35,
          "cookies": [],
          "headers": [
            {
              "name": "Pragma",
              "value": "no-cache"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=10886400; includeSubDomains; preload"
            },
            {
              "name": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "name": "Last-Modified",
              "value": "Sun, 17 May 1998 03:00:00 GMT"
            },
            {
              "name": "Server",
              "value": "Golfe2"
            },
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:16 GMT"
            },
            {
              "name": "Content-Type",
              "value": "image/gif"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Cache-Control",
              "value": "no-cache, no-store, must-revalidate"
            },
            {
              "name": "Alt-Svc",
              "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
            },
            {
              "name": "Content-Length",
              "value": "35"
            },
            {
              "name": "Expires",
              "value": "Fri, 01 Jan 1990 00:00:00 GMT"
            }
          ],
          "_transferSize": 626
        },
        "connection": "362",
        "serverIPAddress": "74.125.140.157",
        "timings": {
          "blocked": 1.71,
          "dns": 105.47,
          "connect": 411.739,
          "send": 0.062,
          "wait": 128.168,
          "receive": 2.78,
          "ssl": 302.177,
          "_queued": 1.198
        },
        "_requestTime": 202770.622488
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:17.279Z",
        "_requestId": "67777.44",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://search.usa.gov/assets/sayt_loader.js",
          "queryString": [],
          "headersSize": 243,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 196.818,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":0}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 1,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/javascript",
            "size": 2162,
            "compression": 1286
          },
          "headersSize": 509,
          "bodySize": 876,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:17 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "Last-Modified",
              "value": "Thu, 14 Nov 2019 20:28:47 GMT"
            },
            {
              "name": "Server",
              "value": "Apache"
            },
            {
              "name": "Age",
              "value": "0"
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000; includeSubdomains; preload"
            },
            {
              "name": "Content-Type",
              "value": "application/javascript"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=3600"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Content-Length",
              "value": "876"
            },
            {
              "name": "Via",
              "value": "1.1 proxy1.us-east-1.prod.infr.search.usa.gov:8443"
            },
            {
              "name": "Expires",
              "value": "Sat, 16 Nov 2019 11:39:17 GMT"
            }
          ],
          "_transferSize": 1385
        },
        "connection": "364",
        "serverIPAddress": "34.230.181.82",
        "timings": {
          "blocked": 0.395,
          "dns": -1,
          "connect": -1,
          "send": 0.202,
          "wait": 195.025,
          "receive": 1.196,
          "ssl": -1,
          "_queued": 1.926
        },
        "_requestTime": 202771.791992
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:17.480Z",
        "_requestId": "67777.108",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://search.usa.gov/assets/sayt.css",
          "queryString": [],
          "headersSize": 237,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 463.83799999999997,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"43\",\"url\":\"https://search.usa.gov/assets/sayt_loader.js\",\"lineNumber\":0,\"columnNumber\":1506}]}}",
        "_initiator_type": "script",
        "_initiator": "https://search.usa.gov/assets/sayt_loader.js",
        "_initiator_line": 1,
        "_initiator_column": 1507,
        "_initiator_function_name": "",
        "_initiator_script_id": "43",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "text/css",
            "size": 11494,
            "compression": 8747
          },
          "headersSize": 496,
          "bodySize": 2747,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:17 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "Last-Modified",
              "value": "Thu, 14 Nov 2019 20:28:47 GMT"
            },
            {
              "name": "Server",
              "value": "Apache"
            },
            {
              "name": "Age",
              "value": "0"
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000; includeSubdomains; preload"
            },
            {
              "name": "Content-Type",
              "value": "text/css"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=3600"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Content-Length",
              "value": "2747"
            },
            {
              "name": "Via",
              "value": "1.1 proxy1.us-east-1.prod.infr.search.usa.gov:8443"
            },
            {
              "name": "Expires",
              "value": "Sat, 16 Nov 2019 11:39:17 GMT"
            }
          ],
          "_transferSize": 3243
        },
        "connection": "364",
        "serverIPAddress": "34.230.181.82",
        "timings": {
          "blocked": 0.418,
          "dns": -1,
          "connect": -1,
          "send": 0.135,
          "wait": 461.676,
          "receive": 1.609,
          "ssl": -1,
          "_queued": 0.626
        },
        "_requestTime": 202771.993567
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:17.945Z",
        "_requestId": "67777.109",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://search.usa.gov/assets/sayt_loader_libs.js",
          "queryString": [],
          "headersSize": 248,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://www.nih.gov/"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 3510.074,
        "_initiator_detail": "{\"type\":\"script\",\"stack\":{\"callFrames\":[{\"functionName\":\"\",\"scriptId\":\"43\",\"url\":\"https://search.usa.gov/assets/sayt_loader.js\",\"lineNumber\":0,\"columnNumber\":1702}]}}",
        "_initiator_type": "script",
        "_initiator": "https://search.usa.gov/assets/sayt_loader.js",
        "_initiator_line": 1,
        "_initiator_column": 1703,
        "_initiator_function_name": "",
        "_initiator_script_id": "43",
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "application/javascript",
            "size": 124328,
            "compression": 83150
          },
          "headersSize": 511,
          "bodySize": 41178,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:17 GMT"
            },
            {
              "name": "Content-Encoding",
              "value": "gzip"
            },
            {
              "name": "Last-Modified",
              "value": "Thu, 14 Nov 2019 20:29:04 GMT"
            },
            {
              "name": "Server",
              "value": "Apache"
            },
            {
              "name": "Age",
              "value": "1"
            },
            {
              "name": "Vary",
              "value": "Accept-Encoding"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000; includeSubdomains; preload"
            },
            {
              "name": "Content-Type",
              "value": "application/javascript"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=3600"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Content-Length",
              "value": "41178"
            },
            {
              "name": "Via",
              "value": "1.1 proxy1.us-east-1.prod.infr.search.usa.gov:8443"
            },
            {
              "name": "Expires",
              "value": "Sat, 16 Nov 2019 11:39:17 GMT"
            }
          ],
          "_transferSize": 41689
        },
        "connection": "364",
        "serverIPAddress": "34.230.181.82",
        "timings": {
          "blocked": 0.599,
          "dns": -1,
          "connect": -1,
          "send": 0.097,
          "wait": 484.818,
          "receive": 3024.56,
          "ssl": -1,
          "_queued": 464.792
        },
        "_requestTime": 202772.458183
      },
      {
        "cache": {},
        "startedDateTime": "2019-11-16T10:39:21.496Z",
        "_requestId": "67777.110",
        "_initialPriority": "Low",
        "_priority": "Low",
        "pageref": "page_1",
        "request": {
          "method": "GET",
          "url": "https://search.usa.gov/assets/legacy/sayt/ui-bg_flat_75_ffffff_40x100-39ab7ccd9f4e82579da78a9241265df288d8eb65dbbd7cf48aed2d0129887df5.png",
          "queryString": [],
          "headersSize": 355,
          "bodySize": 0,
          "cookies": [],
          "headers": [
            {
              "name": "Referer",
              "value": "https://search.usa.gov/assets/sayt.css"
            },
            {
              "name": "User-Agent",
              "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3694.0 Safari/537.36 Chrome-Lighthouse"
            }
          ],
          "httpVersion": "http/1.1"
        },
        "time": 220.376,
        "_initiator_detail": "{\"type\":\"parser\",\"url\":\"https://www.nih.gov/\",\"lineNumber\":0}",
        "_initiator_type": "parser",
        "_initiator": "https://www.nih.gov/",
        "_initiator_line": 1,
        "response": {
          "httpVersion": "http/1.1",
          "redirectURL": "",
          "status": 200,
          "statusText": "OK",
          "content": {
            "mimeType": "image/png",
            "size": 178
          },
          "headersSize": 449,
          "bodySize": 178,
          "cookies": [],
          "headers": [
            {
              "name": "Date",
              "value": "Sat, 16 Nov 2019 10:39:21 GMT"
            },
            {
              "name": "Via",
              "value": "1.1 proxy1.us-east-1.prod.infr.search.usa.gov:8443"
            },
            {
              "name": "Last-Modified",
              "value": "Thu, 14 Nov 2019 20:27:54 GMT"
            },
            {
              "name": "Server",
              "value": "Apache"
            },
            {
              "name": "Age",
              "value": "0"
            },
            {
              "name": "Strict-Transport-Security",
              "value": "max-age=31536000; includeSubdomains; preload"
            },
            {
              "name": "Content-Type",
              "value": "image/png"
            },
            {
              "name": "Access-Control-Allow-Origin",
              "value": "*"
            },
            {
              "name": "Cache-Control",
              "value": "max-age=3600"
            },
            {
              "name": "Connection",
              "value": "keep-alive"
            },
            {
              "name": "Accept-Ranges",
              "value": "bytes"
            },
            {
              "name": "Content-Length",
              "value": "178"
            },
            {
              "name": "Expires",
              "value": "Sat, 16 Nov 2019 11:39:21 GMT"
            }
          ],
          "_transferSize": 627
        },
        "connection": "364",
        "serverIPAddress": "34.230.181.82",
        "timings": {
          "blocked": 0.707,
          "dns": -1,
          "connect": -1,
          "send": 0.087,
          "wait": 218.998,
          "receive": 0.584,
          "ssl": -1,
          "_queued": 0.364
        },
        "_requestTime": 202776.008881
      }
    ]
  }
};
    renderPerfCascadeChart(response);
  }
  document.getElementById("use-example").addEventListener("click", getExampleHar, false);

})(window.perfCascade);
