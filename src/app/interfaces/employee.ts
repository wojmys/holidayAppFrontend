export interface Employee {

    id?: Number;
    name: string;
    totalHolidays: Number;
    remainingHolidays: Number;
    bookingIds: Array<Number>;
    substitutionsId: Array<Number>;

}
