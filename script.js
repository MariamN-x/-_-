function getBirthDate(){
  let bd=new Date(document.getElementById("dateOfBirth").value);
  let year=bd.getFullYear();
  let month=bd.getMonth();
  let day=bd.getDate();

  //start date of calculation
  let current=new Date(document.getElementById("currentDate").value);
  let cYear=current.getFullYear();
  let cMonth=current.getMonth();
  let cDay=current.getDate();

  let yearDiff = cYear - year;
  let monthDiff = cMonth - month;
  let dayDiff = cDay - day;

  if (dayDiff < 0) { //day before birth day
    monthDiff--;
    // Get the last day of the birth month
    const lastDayOfMonth = new Date(cYear, cMonth, 0).getDate();
    dayDiff += lastDayOfMonth;
  }
  //month before birth month
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }
console.log(yearDiff);
console.log(monthDiff);
console.log(dayDiff);
  document.querySelector(".result").innerHTML = yearDiff + " year <br>" + monthDiff + (monthDiff !== 1 ? " months<br>" : " month<br>") + dayDiff + (dayDiff !== 1 ? " days" : " day");


}

