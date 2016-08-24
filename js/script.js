var clock = {
  counter: 0,
  seconds: 0,
  minutes: 0,
  hours: 0,
  mkNull: function() {
      this.counter = 0;
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
  },
  msCounter: function() {
    clock.counter++;
    if (clock.counter == 250) {
      clock.seconds++;
      clock.counter = 0;
      if (clock.seconds == 60) {
        clock.minutes++;
        clock.seconds = 0;
        if (clock.minutes == 60) {
          clock.hours++;
          clock.minutes = 0;
          if (clock.hours == 24) {
            clock.hours = 0;
          }
          this.hoursId.innerHTML = myNumber(clock.hours);
        }
        this.minutesId.innerHTML = myNumber(clock.minutes);
      }
      this.secondsId.innerHTML = myNumber(clock.seconds);
    }
    this.msecondsId.innerHTML = clock.counter;
  }
}

function clockOn() {
  clock.msCounter.apply(clockId);
}

var clockId = {
  msecondsId: document.getElementById('mseconds'),
  secondsId: document.getElementById('seconds'),
  minutesId: document.getElementById('minutes'),
  hoursId: document.getElementById('hours'),
  mkNullId: function() {    
      this.msecondsId.innerHTML = '00';                    
      this.secondsId.innerHTML = '00';
      this.minutesId.innerHTML = '00';
      this.hoursId.innerHTML = '00';   
  }
}

var menu = {
  button_start: document.getElementById('button_start'),
  button_pause: document.getElementById('button_pause'),
  button_cont: document.getElementById('button_cont'),
  button_clear: document.getElementById('button_clear'),
  myMenuStart: function() {
    button_start.classList.add('hidden');                        
    button_start.removeEventListener('click', menu.myMenuStart); 
    button_pause.classList.remove('hidden');                      
    button_clear.addEventListener('click', menu.myMenuClear);    
    button_pause.addEventListener('click', menu.myMenuPause);
    timerFlag = setInterval(clockOn, 1);
  },
  myMenuPause: function() {
    button_pause.classList.add('hidden');                         
    button_pause.removeEventListener('click', menu.myMenuPause);  
    clearInterval(timerFlag);                                     
    button_cont.classList.remove('hidden');                       
    button_cont.addEventListener('click', menu.myMenuCont);       
  },
  myMenuCont: function() {
    button_cont.classList.add('hidden');                        
    button_cont.removeEventListener('click', menu.myMenuCont);
    timerFlag = setInterval(clockOn, 1);
    button_pause.classList.remove('hidden');                    
    button_pause.addEventListener('click', menu.myMenuPause);
  },
  myMenuClear: function() {
    clearInterval(timerFlag);                               
    clockId.mkNullId();                                     
    clock.mkNull(true);
    if (button_cont.classList[0] != 'hidden') {             
      button_cont.classList.add('hidden'); 
      button_cont.removeEventListener('click', menu.myMenuCont);
    } 
    if (button_pause.classList[0] != 'hidden') {
      button_pause.classList.add('hidden');
      button_pause.removeEventListener('click', menu.myMenuPause);
    }  
    button_start.classList.remove('hidden');                
    button_start.addEventListener('click', menu.myMenuStart);
    button_clear.removeEventListener('click', menu.myMenuClear);
  }
};

function myNumber(num) {
  if (num > 9) {
      return num;
    } else {
      num = '0' + num;
      return num;
    }
}

menu.button_start.addEventListener('click', menu.myMenuStart);



