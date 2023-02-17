/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function sumJumpLengths(jumpings: number[]): number {

 return jumpings.reduce(
    (jumpDistanceSoFar: number, currentJump: number) => jumpDistanceSoFar + currentJump
  );
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  if (student.name == "Sebastian" && student.handedInOnTime) { 
    student.passed = true;
    return "VG";
  } else {
    return "IG";
  }
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class Temperature {
  constructor(public location: string, public date: Date, public temperature: number) {}
}

function averageWeeklyTemperatureInStockholm(temperatures: Temperature[]) {
  let sumOfDailyTemperatures = 0;
  const weekInMilliseconds = 604800000;

  for (let index = 0; index < temperatures.length; index++) {
    if (temperatures[index].location === "Stockholm" && temperatures[index].date.getTime() > Date.now() - weekInMilliseconds) {
        sumOfDailyTemperatures += temperatures[index].temperature;
      }
    }

  return sumOfDailyTemperatures / 7;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */
  class Product {
    constructor (
    public name: string,
    public price: number,
    public image: string) {}
  }

function showProduct(product:Product, parent: HTMLElement) {
  let productContainer = document.createElement(`
  <div>
  <h4>${product.name}</h4>
  <strong>${product.price.toString}</strong>
  <img src=${product.image}>`)
  parent.appendChild(productContainer) as HTMLElement;
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function presentStudents(students: Student[]) { 
  let listOfStudents;

  for (const student of students) { 
    let container = document.createElement("div") as HTMLDivElement; 
    let checkbox = document.createElement("input") as HTMLInputElement; 
    checkbox.type = "checkbox";
    container.appendChild(checkbox) as HTMLInputElement; 

    if (student.handedInOnTime) { 
        checkbox.checked = true;
        listOfStudents = document.querySelector("ul#passedstudents");
    } else {
      checkbox.checked = false;
      listOfStudents = document.querySelector("ul#failedstudents");
    }
    listOfStudents?.appendChild(container);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
function concatenateStrings() {
  let listOfWords = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return listOfWords.join(" ");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

class User {
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string
  ) {}
}

function checkUserAge(user: User) {

  let ageDiff = Date.now() - user.birthday.getTime(); //skillnaden mellan birthday och nu i millisekunder
  let ageDate = new Date(ageDiff); //personens födelsedatum
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);//förkortar födelsedatum till enbart år

  if (userAge >= 20) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
