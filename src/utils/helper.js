export const dateIndo = (date) => {
  const currentDate = new Date()
  const inputDateObj = new Date(date)

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  if (isSameDate(inputDateObj, currentDate)) {
    return "Hari Ini"
  } else {
    const yesterday = new Date(currentDate)
    yesterday.setDate(currentDate.getDate() - 1)

    if (isSameDate(inputDateObj, yesterday)) {
      return "Kemarin"
    }
  }

  const [year, month, day] = date.split('-')
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const indoMonth = monthNames[parseInt(month, 10) - 1]

  const indoDate = `${day} ${indoMonth} ${year}`

  return indoDate
}

export const timeJamMenit = (time) => {
  const [jam, menit, detik] = time.split(':')
  
  return `${jam}:${menit}`
}