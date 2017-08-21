(function() {
  /**
   * Константа времени, которое надо выждать после события, прежде чем искать элементы.
   * В случае window.onload не так уж и обязательно, но для других динамических элементов - таймаут просто необходим. 
   */
  var timeoutDuration = 500;

  /**
   * Значения селекторов для document.querySelectorAll
   */
  var selectors = {
    chargeChoices: {
      'bolotin' : 'input[type="checkbox"][value="Болотин Алексей"]' ,
      'zubko'   : 'input[type="checkbox"][value="Зубко Андрей"   ]' ,
      'lomova'  : 'input[type="checkbox"][value="Ломова Татьяна" ]' ,
      'sentsova': 'input[type="checkbox"][value="Сенцова Ирина"  ]' ,
      'hohlova' : 'input[type="checkbox"][value="Хохлова Эмилия" ]' ,
      'plyuhov' : 'input[type="checkbox"][value="Плюхов Сергей"  ]' ,
      'denisov' : 'input[type="checkbox"][value="Денисов Илья"   ]' ,
      'paisov'  : 'input[type="checkbox"][value="Паисов Дмитрий" ]'
    },
    chargeDownloads: {
      'bolotin' : 'a[href*="Квитанция-Болотин.pdf"]' ,
      'zubko'   : 'a[href*="Квитанция-Зубко.pdf"  ]' ,
      'lomova'  : 'a[href*="Квитанция-Ломова.pdf" ]' ,
      'sentsova': 'a[href*="Квитанция-Сенцова.pdf"]' ,
      'hohlova' : 'a[href*="Квитанция-Хохлова.pdf"]' ,
      'plyuhov' : 'a[href*="Квитанция-Плюхов.pdf" ]' ,
      'denisov' : 'a[href*="Квитанция-Денисов.pdf"]' ,
      'paisov'  : 'a[href*="Квитанция-Паисов.pdf" ]'
    },
    formSubmits: {
      'volunteer'       : 'form#CF59712a9e699c0_2'          ,
      'subscribe-mail'  : 'form#mc-embedded-subscribe-form' ,
      'subscribe-sms'   : 'form#CF597745c668226_4'      
    }
  };

  /**
   * Мап для самоидентификации чекбокса, триггерящего создание элемента.
   */
  var keyByValue = {
    'Болотин Алексей' : 'bolotin'  ,
    'Зубко Андрей'    : 'zubko'    ,
    'Ломова Татьяна'  : 'lomova'   ,
    'Сенцова Ирина'   : 'sentsova' ,
    'Хохлова Эмилия'  : 'hohlova'  ,
    'Плюхов Сергей'   : 'plyuhov'  ,
    'Денисов Илья'    : 'denisov'  ,
    'Паисов Дмитрий'  : 'paisov'
  };

  /**
   * Функция подписывающая на события все элементы одной группы.
   */
  var listenElements = function(object, descriptor, eventType, eventListener) {
    Object.keys(object).forEach(function(key) {
      listenElement(object, descriptor, eventType, eventListener, key);
    });
  };

  /**
   * Функция подписывающая на событие все элементы одного селектора.
   */
  var listenElement = function(object, descriptor, eventType, eventListener, key) {
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
  };

  /**
   * Непосредственно исполняемый код скрипта.
   */
  window.addEventListener('load', function() {  
    setTimeout(function() {
      console.log('Отладка custom-conversion-monitor, поиск отслеживаемых элементов');
      var timers = {};
  
      listenElements(selectors.formSubmits    , 'форма'     , 'submit'  , function(event) { console.log('submitted', event.target); });
      listenElements(selectors.chargeChoices  , 'кандидат'  , 'change'  , function(event) {
        // TODO Код работает корректно, т.к. по клику на чекбокс появляются/пропадают оба зависимых элемента
        // Но в целом здесь возможная слабость скрипта. По этой (и по другим) причине надо отслеживать изменения верстки... 
        console.log('Выбор кандидата - смотрим значение атрибута checked', event.target.checked);
        var key = keyByValue[event.target.value];
        if (event.target.checked) {
          timers[key] = setTimeout(function() {
            listenElement(selectors.chargeDownloads, 'файл платежки', 'click', function(event) { console.log('clicked',   event.target); }, key);
          }, timeoutDuration);
        } else {
          clearTimeout(timers[key]);
        }
      });
    }, timeoutDuration);
  });
})();