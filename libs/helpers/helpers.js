
exports.hasAuth = (req, res, next) => {
  if (req.session && req.session.auth) { return next() } else { return res.redirect('/sign-in/') }
}

exports.addTrailingZero = num => {
  var s = num + ''
  while (s.length < 2) s = '0' + s
  return s
}


exports.getHours = (duration) => {
  var minutesNow = Math.floor(duration / 60);
  var hoursNow = Math.floor(minutesNow / 60);
  return hoursNow;
}


exports.getMinutes = (duration) => {
  var minutesNow = Math.floor(duration / 60);
  var hoursNow = Math.floor(minutesNow / 60);
  minutesNow = minutesNow - (hoursNow * 60);
  minutesNow = minutesNow < 10 ? '0' + minutesNow : minutesNow;
  return minutesNow;
}


exports.getSeconds = (duration) => {
  var minutesNow = Math.floor(duration / 60);
  var secondsNow = duration - (minutesNow * 60);
  secondsNow = secondsNow < 10 ? '0' + secondsNow : secondsNow;
  return secondsNow;
}


exports.getDuration = (durationString) => {

  const arr = durationString.split(':');
  const duration = arr[0] * 60 * 60 + arr[1] * 60;

  if (typeof duration == 'number') {
    return duration;
  } else {
    return false;
  }
}

exports.datePrevDate = date => {
  date.setDate(date.getDate() - 1)
  return date
}

exports.dateNextDate = date => {
  date.setDate(date.getDate() + 1)
  return date
}

exports.dateDbToDate = dbDate => {
  return new Date(parseInt(dbDate.toString().substring(0, 4)), parseInt(dbDate.toString().substring(4, 6)-1), parseInt(dbDate.toString().substring(6, 8)))
}

exports.dateDateToDb = date => {
  return parseInt(date.getFullYear() + '' + this.addTrailingZero((date.getMonth() + 1)) + '' + this.addTrailingZero(date.getDate()))
}

exports.getDurationTitle = duration => {
  return this.getHours(duration) + ':' + this.getMinutes(duration)
}

exports.getStandardDates = (year, month, day) => {
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  const dateUrl = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()
  const dateForDb = this.dateDateToDb(date)

  return {
    date,
    dateUrl,
    dateForDb
  }
}


exports.parseDateTime = dateTime => {
  const dateArr = dateTime.split(' ')

  const date = dateArr[0].split('-'),
    yyyy = date[0],
    mm = date[1] - 1,
    dd = date[2]

  const time = dateArr[1].split(':'),
    h = time[0],
    m = time[1],
    s = parseInt(time[2])

  return new Date(yyyy, mm, dd, h, m, s)
}



exports.colors = [
  '#4D4D4D', '#B33C24', '#B37D47', '#B3A147', '#A1B347', '#7DB347', '#68B359', 
  '#47B359', '#47B37D', '#47B3A1', '#47A1B3', '#477DB3', '#4759B3', '#5947B3', 
  '#7D47B3', '#A147B3', '#B359A4', '#B3477D', '#B34759'
]