import { Component, HostBinding } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Expense } from 'src/app/Expense';
import { Observable, Subscription } from 'rxjs';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css'],
})
export class MonthlyComponent {
  expenses: Expense[] = [];
  showModal: boolean = false;
  doAdd: boolean = true;
  income: number = 0;
  expense: number = 0;
  subscription!: Subscription;
  expenseToEdit!: Expense;
  constructor(
    private expensesService: ExpensesService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    // Earlier
    this.expensesService.getExpenses().subscribe((data) => {
      console.log('success', data);
      this.expenses = data;

      this.expense = data
        .filter((datum) => datum.type === 'expense')
        .map((i) => i.amount)
        .reduce((a, b) => a + b);

      this.income = data
        .filter((datum) => datum.type === 'income')
        .map((i) => i.amount)
        .reduce((a, b) => a + b);
    });
  }

  openModal(): void {
    this.modalService.onOpenModal();
    this.subscription = this.modalService.showModal.subscribe(
      (value: boolean) => (this.showModal = value)
    );
  }

  setAddModal() {
    this.doAdd = true;
    this.openModal();
  }

  setEdit(value: Expense) {
    this.doAdd = false;
    this.expenseToEdit = value;
    this.openModal();
    console.log(this.expenseToEdit);
  }

  deleteExpense(expense: Expense) {
    this.expensesService
      .deleteExpense(expense)
      .subscribe(
        () => (this.expenses = this.expenses.filter((e) => e.id !== expense.id))
      );
  }

  editExpense(expense: Expense) {
    this.expensesService
      .updateExpense(expense)
      .subscribe(
        () =>
          (this.expenses = this.expenses.map((e) =>
            e.id === expense.id ? { ...expense, date: e.date } : e
          ))
      );
  }

  addExpense(expense: Expense) {
    this.expensesService
      .addExpense(expense)
      .subscribe((expense) => this.expenses.push(expense));
  }
}
