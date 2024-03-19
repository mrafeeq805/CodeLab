export const dateFormat = (da) => {
    const [month,day,year] = da.split('-')
    const months =  [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ];
    return `${day} ${months[month-1]} ${year}`
}