import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, TransactionFormComponent],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  showModal = false;

  currentPage = 1;
  itemsPerPage = 5;
  itemsPerPageOptions = [5, 10, 25];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data.map((transaction) => ({
        ...transaction,
        formattedDate: this.formatDate(transaction.transaction_date),
        formattedTime: this.formatTime(transaction.transaction_date)
      })).sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime());
      this.updateFilteredTransactions();
    });
  }

  updateFilteredTransactions(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredTransactions = this.transactions.slice(start, end);
  }

  formatDate(dateString: string): string {
    const mstDate = new Date(dateString);

    const month = mstDate.getMonth() + 1;
    const day = mstDate.getDate();
    const year = mstDate.getFullYear();

    return `${month}-${day}-${year}`;
  }

  formatTime(dateString: string): string {
    const mstDate = new Date(dateString);

    let hours = mstDate.getHours();
    const minutes = mstDate.getMinutes();
    const isPM = hours >= 12;

    hours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const ampm = isPM ? "pm" : "am";

    return `${hours}:${formattedMinutes}${ampm}`;
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.loadTransactions();
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.updateFilteredTransactions();
  }

  onItemsPerPageChange(newItemsPerPage: number): void {
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1;
    this.updateFilteredTransactions();
  }
}
