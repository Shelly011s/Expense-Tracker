export interface Expense{
    id?: number;
    category: string;
    type: "expense" | "income";
    amount: number;
    date?: string;
}