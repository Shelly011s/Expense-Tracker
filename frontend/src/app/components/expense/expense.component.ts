import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/Expense';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent {
  @Output() onDelete: EventEmitter<Expense> = new EventEmitter();
  @Output() setEdit: EventEmitter<Expense> = new EventEmitter();
  @Input() expense!: Expense;
  showModal!: boolean;
  subscription!: Subscription;

  constructor() {}

  setExpenseToEdit(expense: Expense) {
    this.setEdit.emit(expense);
  }

  onDeleteExp(exp: Expense) {
    //console.log(exp);
    this.onDelete.emit(exp);
  }
}
