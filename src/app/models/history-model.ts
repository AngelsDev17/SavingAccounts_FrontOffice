import { Type } from "../enums/type-enum";

export class History {
    id: number = 0;
    account: string = '';
    destination: string = '';
    amount: number = 0;
    date: Date = new Date();
    type: Type = Type.SendMoney;
}