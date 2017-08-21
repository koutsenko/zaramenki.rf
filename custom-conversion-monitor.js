(function() {
  /**
   * Имена объектов счетчиков.
   */
  var yaCounterName = 'yaCounter45272754';
  var gaCounterName = 'ga';

  /**
   * Значения селекторов для document.querySelectorAll
   */
  var selectors = {
    formSubmits: {
      'volunteer'       : 'form#CF59712a9e699c0_2'          ,
      'subscribe-mail'  : 'form#mc-embedded-subscribe-form' ,
      'subscribe-sms'   : 'form#CF597745c668226_4'      
    }
  };

  /**
   * Мап для самоидентификации формы, для определения id цели.
   */
  var keyById = {
    'CF59712a9e699c0_2'          : 'volunteer'       ,
    'mc-embedded-subscribe-form' : 'subscribe-mail'  ,
    'CF597745c668226_4'          : 'subscribe-sms'   
  };

  /**
   * ID целей в том виде в котором они заданы в Я.Метрике.
   */
  var yaTargets = {
    'volunteer'       : 'form-volunteer'        ,
    'subscribe-mail'  : 'form-subscribe-email'  ,
    'subscribe-sms'   : 'form-subscribe-sms'
  };

  /**
   * ID целей в том виде в котором они заданы в Гугл Аналитике.
   * Пока решил не усложнять и сделал такие же строковые id.
   */
  var gaTargets = yaTargets;

  /**
   * Функция подписывающая на события все элементы одной группы.
   */
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
  };

  /**
   * Непосредственно исполняемый код скрипта.
   */
  window.addEventListener('load', function() {  
    var yaCounter = window[yaCounterName];
    var gaCounter = window[gaCounterName];
 
    if (yaCounter === undefined) {
      console.error('Недоступен счетчик Я.Метрики ' + yaCounterName + ', отслеживание конверсий js-событий не будет работать для Яндекс.Метрики');
    }

    if (gaCounter === undefined) {
      console.error('Недоступен счетчик Гугл Аналитики ' + gaCounterName + ', отслеживание конверсий js-событий не будет работать для Гугл Аналитики');
    }

    if ((yaCounter === undefined) && (gaCounter === undefined)) {
      console.error('Оба счетчика недоступны. Скрипт конверсий js-событий остановлен');
      return;
    }
  
    setTimeout(function() {
      console.log('Отладка custom-conversion-monitor, поиск отслеживаемых элементов');
  
      listenElements(selectors.formSubmits, 'форма', 'submit', function(event) { 
        var yaGoal = yaTargets[keyById[event.target.id]];
        var gaGoal = gaTargets[keyById[event.target.id]];
        
        if (yaCounter !== undefined) {          
          console.log('Оповещаем Яндекс.Метрику о достижении цели', yaGoal); 
          yaCounter.reachGoal(yaGoal);
        }

        if (gaCounter !== undefined) {
          console.log('Оповещаем Гугл Аналитику о достижении цели', gaGoal); 
          gaCounter('send', 'event', gaGoal);
        }
      });
    }, 0);
  });
})();