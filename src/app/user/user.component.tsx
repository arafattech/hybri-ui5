import { CommonModule, DatePipe } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { AnalyticalTableComponent } from "../components/analytical-table/react-table";
import { FormsModule } from "@angular/forms";
import { TextAlign } from "@ui5/webcomponents-react";
import React from "react";
import { ServiceService } from "../services/service.service";
import { User } from "../shared/Model/user";
@Component({
  selector: "app-user",
  standalone: true,
  imports: [CommonModule, FormsModule, AnalyticalTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
export class UserComponent implements OnInit {
  @Output() refreshTable: EventEmitter<void> = new EventEmitter<void>();
  @Output() IsOpenToastAlert = new EventEmitter<void>();
  ToastType: string = "";
  totalFaqs: number = 0;
  itemsPerPage: number;
  currentPage = 1;
  odata: boolean;
  loading: boolean = false;
  isInsert: boolean = false;
  isEdit: boolean = false;
  isDetails: boolean = false;
  isDeleteOpen: boolean = false;
  isDeleteLoading: boolean = false;
  isSuccess: boolean = false;
  isDeleteError: boolean = false;
  sucessMessage: string = "";
  filter: string = "";
  Title: string;
  type: string | null = null;
  selectedFaqId: number | null = null;
  selectedFaqData: any = null;

  user = new User().deserialize({});
  User = User;
  constructor(
    private serviceService: ServiceService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {
    this.itemsPerPage = this.serviceService.itemsPerPage;
    this.odata = this.serviceService.odata;
    this.Title = "User";
  }
  ngOnInit(): void {
  
  }

  tableColum() {
    const columns = [
      {
        Header: "Sl No.",
        accessor: ".",
        autoResizable: true,
        disableFilters: true,
        disableGroupBy: true,
        disableSortBy: true,
        className: "custom-class-name",
        Cell: ({ row }: { row: any }) => {
          return React.createElement("span", null, row.index + 1);
        },
        hAlign: "Center" as TextAlign,
        width: 70,
      },

      {
        Header: "Name",
        accessor: "name",
        autoResizable: true,
        className: "custom-class-name",
      },
      {
        Header: "Email",
        accessor: "email",
        autoResizable: true,
        className: "custom-class-name",
      },
      {
        Header: "Phone",
        accessor: "phone",
        autoResizable: true,
        className: "custom-class-name",
      },
      {
        Header: "Created At",
        accessor: "created_at",
        autoResizable: true,
        className: "custom-class-name",
        hAlign: "Center" as TextAlign,
        Cell: ({ value }: any) => new Date(value).toLocaleDateString(),
      },
    ];
    return columns;
  }

  handleInsertData(isInsert: boolean): void {
    console.log("Received isInsertData:", isInsert);
    if (isInsert) {
      this.isInsert = isInsert;
    }
  }

  editUser(original: any) {
    this.isEdit = true;
  }

  customData = [
    {
      name: "John Doe",
      email: "study.shihab@gmail.com",
      phone: "1234567890",
      created_at: "2023-10-01",
    },
    {
      name: "John Doe",
      email: "study.shihab@gmail.com",
      phone: "1234567890",
      created_at: "2023-10-01",
    },
    {
      name: "John Doe",
      email: "study.shihab@gmail.com",
      phone: "1234567890",
      created_at: "2023-10-01",
    },
    {
      name: "John Doe",
      email: "study.shihab@gmail.com",
      phone: "1234567890",
      created_at: "2023-10-01",
    },
  ];
}
