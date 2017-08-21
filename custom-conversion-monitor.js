window.addEventListener('load', function() {
  var selectors = {
    chargeDownloads: {
      'bolotin' : 'a[href*="Квитанция-Болотин.pdf"]'  ,
      'zubko'   : 'a[href*="Квитанция-Зубко.pdf"]'    ,
      'lomova'  : 'a[href*="Квитанция-Ломова.pdf"]'   ,
      'sentsova': 'a[href*="Квитанция-Сенцова.pdf"]'  ,
      'hohlova' : 'a[href*="Квитанция-Хохлова.pdf"]'  ,
      'plyuhov' : 'a[href*="Квитанция-Плюхов.pdf"]'   ,
      'denisov' : 'a[href*="Квитанция-Денисов.pdf"]'  ,
      'paisov'  : 'a[href*="Квитанция-Паисов.pdf"]'
    },
    formSubmits: {
      'volunteer'       : 'form#CF59712a9e699c0_2'          ,
      'subscribe-mail'  : 'form#mc-embedded-subscribe-form' ,
      'subscribe-sms'   : 'form#CF597745c668226_4'      
    }
  };

  var listenElements = function(object, descriptor, eventType, eventListener) {
    Object.keys(object).forEach(function(key) {
      var selector = object[key];
      var elements = document.querySelectorAll(selector);
      var output = 'Сущность ' + descriptor + ', ключ ' + key + ', селектор ' + selector + ', найдено ' + elements.length + ' элементов';
      if (!elements.length) {
        console.error(output);
      } else {
        console.log(output);
        elements.forEach(function(element) {
          element.addEventListener(eventType, eventListener);
        });
      }
    });
  }

  setTimeout(function() {
    console.log('Отладка custom-conversion-monitor, поиск отслеживаемых элементов');
    listenElements(selectors.chargeDownloads, 'файл платежки' , 'click'   , function(event) { console.log('clicked',   event.target); });
    listenElements(selectors.chargeDownloads, 'форма'         , 'submit'  , function(event) { console.log('submitted', event.target); });
  }, 0);
});