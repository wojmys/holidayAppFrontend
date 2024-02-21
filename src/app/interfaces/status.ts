import { Vacation } from "./vacation";

export interface Status {
    id?: Number;
    name: string;
    bookings: Array<Vacation>;
}
