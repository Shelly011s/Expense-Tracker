import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/Expense';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {
  @Input() expense: Expense | undefined = undefined;
  @Input() doAdd!: boolean;
  @Output() onAddExpense: EventEmitter<Expense> = new EventEmitter();
  @Output() onEditExpense: EventEmitter<Expense> = new EventEmitter();
  expenseForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
      expenseType: [this.doAdd ? '' : this.expense?.type, Validators.required],
      category: [
        this.doAdd ? '' : this.expense?.category,
        Validators.required,
      ],
      date: [this.doAdd ? '' : this.expense?.date, Validators.required],
      amount: [this.doAdd ? '' : this.expense?.amount, Validators.required],
    });
  }

  onSubmit() {
    const value = this.expenseForm.value;
    if (![value.category, value.expenseType, value.amount].includes('')) {
      if(this.doAdd){
        const newExpense = {
          category: value.category,
          //date:value.date,
          type: value.expenseType,
          amount: value.amount,
        };
        //console.log(newExpense);
        this.onAddExpense.emit(newExpense);
      }
      else{
        const newExpense = {
          id: this.expense?.id,
          category: value.category,
          //date:value.date,
          type: value.expenseType,
          amount: value.amount,
        };
        //console.log(newExpense);
        this.onEditExpense.emit(newExpense);
      }
      this.closeModal();
      
    }

    // You can make a service call to post the form data to the backend
  }

  closeModal(): void {
    this.modalService.onCloseModal();
  }
}
