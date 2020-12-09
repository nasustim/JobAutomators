function scheduleMaker() {
  const calendar = CalendarApp.getCalendarById(ENV.CALENDAR_ID)
  
  const today = new Date()
  const events = calendar.getEventsForDay(today)
  
  const schedule = events.reduce((acc, event) => {
    const title = event.getTitle()
    const startTime = event.getStartTime()
    const endTime = event.getEndTime()
    
    return acc + template(timeToStr(startTime), timeToStr(endTime), title) + '\n'
  }, '')
  
  // 今はとりいそぎ会社のメールアドレスに送信
  // ToDo: Slackのwebhook urlを作ってそちらに投稿できるようにしたい
  GmailApp.sendEmail(
    ENV.CALENDAR_ID,
    '今日のスケジュール',
    schedule,
  )
  console.log('send done')
}

function timeToStr (date) {
  const hour = ('0' + date.getHours()).slice(-2)
  const minute = ('0' + date.getMinutes()).slice(-2)
  
  return `${ hour }:${ minute }`
}

const template = (startOn, endOn, title) => `${startOn}-${endOn} ${title}`
