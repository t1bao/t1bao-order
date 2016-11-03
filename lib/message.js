var events = require('t1bao-notifier').events;
function send(notifier) {
  return function (config, cb) {
    var event = config.event;
    var type = config.type;
    var receiver = config.receiver;
    var data = config.data;
    var options = {
      config: notifier.mail,
      toUser: receiver,
      options: data
    };
    if (type === 'sms') {
      options.config = notifier.sms;
    }
    cb = cb || function () { };
    events.emit(type, event, options, cb);
  };
}
module.exports = send;
