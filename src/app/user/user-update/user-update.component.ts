import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css',
})
export class UserUpdateComponent {
  @Input() isOpen: boolean = false;
  @Input() UserId: number | null = null;
  @Input() UserData: any = null;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshtable: EventEmitter<void> = new EventEmitter<void>();

  isSuccess: boolean = false;
  isEditError: boolean = false;
  SuccessMassage: string = '';
  ErrorMassage: string = '';
  loading: boolean = false;
  formloading: boolean = false;
  isActive: boolean = true;

  name: string = '';
  email: string = '';
  phone: string = '';

  odata: boolean = false;

  user: any = {};

  constructor(private commonService: ServiceService, DatePipe: DatePipe) {
    this.odata = this.commonService.odata;
  }
  ngOnInit(): void {
    if (this.UserData) {
      this.name = this.UserData.name;
      this.email = this.UserData.email;
      this.phone = this.UserData.phone;
      this.loadUserData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue == true) {
      if (this.UserData) {
        this.loadUserData();
      } else if (this.UserId) {
        this.getUserInfo();
      }
    }
  }

  loadUserData() {
    this.name = this.UserData.name || '';
    this.email = this.UserData.email || '';
    this.phone = this.UserData.phone || '';
    this.isActive = this.user.is_active == true;
  }

  getUserInfo(): void {
    if (!this.UserId) return;

    this.loading = true;
    this.commonService.get(`Users/${this.UserId}`).subscribe({
      next: (Response: any) => {
        this.UserData = Response;
        this.loadUserData();
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }

  updateUser() {
    const formData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      is_active: this.isActive,
    };
    this.formloading = true;
    this.commonService.put(`Users(${this.UserId!})`, formData, true).subscribe({
      next: (Response: any) => {
        this.formloading = false;
        this.isSuccess = true;
        this.SuccessMassage = 'User Update Successfully';
        this.closeDialog();
      },
      error: (error: any) => {
        this.formloading = false;
        this.isEditError = true;
        this.ErrorMassage = error.error?.message || 'Error Updating FAQ';
      },
    });
  }

  toggleActive($event: any) {
    this.isActive = $event.target.checked;
  }
  closeDialog() {
    this.isOpen = false;
    this.close.emit();
  }
}
