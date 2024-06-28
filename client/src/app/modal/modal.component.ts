import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  onClose() {
    this.showModal = false;
    this.closeModal.emit();
  }
}
