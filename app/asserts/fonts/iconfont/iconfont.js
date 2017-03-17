;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-yulan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.122 272.146c-247.216 0-412.027 247.216-412.027 247.216s164.811 247.216 412.027 247.216c247.216 0 412.027-247.216 412.027-247.216S759.217 272.146 512.122 272.146z m0 410.207c-90.537 0-163.962-73.424-163.962-163.962s73.424-163.962 163.962-163.962c90.537 0 163.962 73.424 163.962 163.962-0.122 90.658-73.424 163.962-163.962 163.962z m-82.406-163.476c0 21.482 8.86 42.841 24.03 58.012s36.53 24.03 58.012 24.03 42.841-8.86 58.012-24.03c15.17-15.17 24.03-36.53 24.03-58.012s-8.86-42.841-24.03-58.012c-15.17-15.17-36.53-24.03-58.012-24.03s-42.841 8.86-58.012 24.03c-15.17 15.292-24.03 36.53-24.03 58.012z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-zanting" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M430.4 340.608c-18.24 0-33.088 12.736-33.088 28.544v285.696c0 15.744 14.784 28.544 33.088 28.544 18.24 0 33.024-12.8 33.024-28.544V369.152c0-15.808-14.848-28.544-33.024-28.544zM594.624 340.608c-18.24 0-33.024 12.736-33.024 28.544v285.696c0 15.744 14.72 28.544 33.024 28.544s33.088-12.8 33.088-28.544V369.152c0-15.808-14.848-28.544-33.088-28.544z"  ></path>' +
    '' +
    '<path d="M512.512 65.984C266.56 65.984 66.496 266.048 66.496 512s200.064 446.016 446.016 446.016S958.528 757.952 958.528 512s-200.064-446.016-446.016-446.016z m0 828.032c-210.624 0-382.016-171.392-382.016-382.016s171.392-382.016 382.016-382.016S894.528 301.376 894.528 512s-171.392 382.016-382.016 382.016z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-bofang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M540.032 70.976c-245.952 0-446.016 200.064-446.016 446.016s200.064 446.016 446.016 446.016 446.016-200.064 446.016-446.016-200.064-446.016-446.016-446.016z m0 828.032c-210.624 0-382.016-171.392-382.016-382.016s171.392-382.016 382.016-382.016 382.016 171.392 382.016 382.016-171.392 382.016-382.016 382.016z"  ></path>' +
    '' +
    '<path d="M417.152 643.84c0 35.2 24.96 49.6 55.424 32l219.584-126.784c30.528-17.6 30.528-46.4 0-64L472.576 358.208c-30.528-17.6-55.424-3.2-55.424 32v253.632z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-checkbox-weixuan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M832 192v640H192V192h640m32-64H160c-17.6 0-32 14.4-32 32v704c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32V160c0-17.6-14.4-32-32-32z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-checkbox-xuanzhong" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M864 128H160c-17.6 0-32 14.4-32 32v704c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32V160c0-17.6-14.4-32-32-32zM428 718.4l-45.6 45.6-45.6-45.6-116-117.6 45.6-45.6L383.2 672l367.2-367.2 45.6 45.6-368 368z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sousuo-xianxing" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M384 128c140.8 0 256 115.2 256 256S524.8 640 384 640 128 524.8 128 384s115.2-256 256-256m0-64C207.2 64 64 207.2 64 384s143.2 320 320 320 320-143.2 320-320S560.8 64 384 64z m294.4 569.6l-45.6 45.6 272 272 45.6-45.6-272-272z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shouye-xianxing" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.8 206.4L768 389.6V832H640V576H384v256H256V389.6l256.8-183.2m0-71.2c-6.4 0-12.8 1.6-18.4 5.6L104 419.2c-12.8 8.8-6.4 28.8 9.6 28.8H192v432c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V640h128v240c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V448h78.4c15.2 0 21.6-20 9.6-28.8L531.2 141.6c-5.6-4-12-6.4-18.4-6.4z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shijian-xianxing" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m0 832c-212 0-384-172-384-384s172-384 384-384 384 172 384 384-172 384-384 384z m32-393.6l191.2 110.4-32 55.2L488.8 544H480V256h64v246.4z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-rili" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M864 192H704v-64h-64v64H384v-64h-64v64H160c-17.6 0-32 14.4-32 32v640c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32V224c0-17.6-14.4-32-32-32z m-32 640H192V384h640v448zM384 512H256v-64h128v64z m192 0H448v-64h128v64z m192 0H640v-64h128v64zM384 640H256v-64h128v64z m192 0H448v-64h128v64z m192 0H640v-64h128v64zM384 768H256v-64h128v64z m192 0H448v-64h128v64z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-liebiaoshitucaidan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M896 256H128V128h768v128z m0 192H128v128h768V448z m0 320H128v128h768V768z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shangyiyehoutuifanhui" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M319.64 512.016l336.016-336.008 45.248 45.248L364.896 557.28z"  ></path>' +
    '' +
    '<path d="M365.216 466.464l339.976 339.968-45.256 45.256-339.976-339.976z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiayiyeqianjinchakangengduo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M658.56 557.392L322.536 221.384l45.248-45.256 336.016 336.008z"  ></path>' +
    '' +
    '<path d="M704.088 512.2L364.12 852.16l-45.256-45.248 339.976-339.976z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)