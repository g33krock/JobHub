import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransactionService } from '../transaction.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TransactionFormComponent],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];
  showModal = false;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data.sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime());
    });
  }
  

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.loadTransactions();
  }
}
