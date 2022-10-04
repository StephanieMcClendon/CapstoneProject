export class CurrDate extends Date{
    //created custom date class fpr the purpose of storing in Date field in db
    month!: number;
    day!: number;
    year!: number;

    constructor(month: number, day:number, year: number){
        super();
        this.month = month;
        this.day = day;
        this.year = year;
    }

    public returnDate(){
        return this.month + "-" + this.day + "-" + this.year;
    }

}