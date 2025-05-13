import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  InputComponent,
  LabelComponent,
  TextAreaComponent,
  Ui5MainModule,
} from '@ui5/webcomponents-ngx';
import { AnalyticalTableComponent } from '../../components/analytical-table/react-table';
import { ServiceService } from '../../services/service.service';
import { User } from '../../shared/Model/user';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LabelComponent,
    TextAreaComponent,
    AnalyticalTableComponent,
    InputComponent,
    Ui5MainModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  @Input() isOpen: boolean | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() IsOpenToastAlert = new EventEmitter<void>();
  ToastType: string = '';
  loading: boolean = false;
  isSuccess: boolean = false;
  isAddError: boolean = false;

  errorMassage: string = '';

  // first_name: string = '';
  // last_name: string = '';
  // email: string = '';
  // phone: string = '';
  // address: string = '';

  htmlContent: string = '';
  placeholder: string = '';
  isActive: boolean = true;
  User = new User().deserialize({});

  constructor(
    private commandService: ServiceService,
    private datepipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  toggleAction($event: any) {
    if ($event.target.checked) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }
  insertData() {
    if (!this.User.first_name || !this.User.address) {
      this.errorMassage = 'Please fill all the fields.';
      return;
    }

    const data = {
      first_name: this.User.first_name,
      last_name: this.User.last_name,
      email: this.User.email,
      phone: this.User.phone,
      address: this.User.address,

      is_active: this.isActive,
    };
    console.log('data', data);

    this.loading = true;
    this.commandService.post('Users', data).subscribe(
      (response: any) => {
        console.log('response', response);
        this.loading = false;
        this.isSuccess = true;
        this.ToastType = 'add';
        setTimeout(() => {
          this.IsOpenToastAlert.emit();
        }, 1000);
        this.resetForm();
        this.closeDialog();
      },
      (error: any) => {
        this.loading = false;
        this.errorMassage = 'An error occurred while submitting the data.';
        console.error(error);
      }
    );
  }
  rersetForm() {
    this.errorMassage = '';
    this.User.first_name = '';
    this.User.last_name = '';
    this.User.email = '';
    this.User.phone = '';
    this.User.address = '';
  }
  closeDialog() {
    this.isOpen = false;
    this.close.emit();
  }

  resetForm() {
    this.User.first_name = '';
    this.User.last_name = '';
    this.User.email = '';
    this.User.phone = '';
    this.User.address = '';
    this.htmlContent = '';
    this.isActive = true;
  }
}
