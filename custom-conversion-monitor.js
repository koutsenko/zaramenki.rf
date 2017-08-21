(function() {
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
    var yaCounterName = 'yaCounter45272754';
    var yaCounter = window[yaCounterName];
    
    if (yaCounter === undefined) {
      console.error('Недоступен счетчик Я.Метрики ' + yaCounterName + ', отслеживание конверсий для событий JavaScript не будет работать');
      return;
    }
  
    setTimeout(function() {
      console.log('Отладка custom-conversion-monitor, поиск отслеживаемых элементов');
  
      listenElements(selectors.formSubmits, 'форма', 'submit', function(event) { 
        var goal = yaTargets[keyById[event.target.id]];
        console.log('Регистрируем достижение цели', goal); 
        yaCounter.reachGoal(goal);
      });
    }, 0);
  });
})();