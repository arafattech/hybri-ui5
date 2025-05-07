import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
import "@ui5/webcomponents/dist/Input.js";

import { ServiceService } from '../services/service.service';
///
import { CommonModule, DatePipe } from '@angular/common';
import { Button, Icon, TextAlign } from "@ui5/webcomponents-react";
import React from "react";
import { ReactAnalyticalTable } from '../components/analytical-table/react-table';
import { user } from '../Models/user';
//
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ ReactAnalyticalTable,CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  // @Input() model: any;
  // @Output() refreshTable: EventEmitter<void> = new EventEmitter<void>();
  // @Output() IsOpenToastAlert = new EventEmitter<void>();
  // ToastType: string = "";
  // totalJobs: number = 0;
 
  // currentPage = 1;
  // jobData: any[] = [];

  // loading: boolean = false;
  // isInsert: boolean = false;
  // isEdit: boolean = false;
  // isDetails: boolean = false;
  // isDeleteOpen: boolean = false;
  // isDeleteLoading: boolean = false;
  // isSuccess: boolean = false;
  // isDeleteError: boolean = false;
  // sucessMessage: string = "";
  // filter: string = "";

  // type: string | null = null;
  // selectedJobId: number | null = null;
  // selectedJobData: any = null;

  
  // constructor( private http: HttpClient,
  //   private service: ServiceService){}

  // ngOnInit(): void {
  //   this.tableColum();
  //   console.log(this.model);
   
  // }
  //   tableColum() {
  //     const columns = [
  //       {
  //         Header: "Sl No.",
  //         accessor: ".",
  //         autoResizable: true,
  //         disableFilters: true,
  //         disableGroupBy: true,
  //         disableSortBy: true,
  //         className: "custom-class-name",
  //         Cell: ({ row }: { row: any }) => {
  //           return React.createElement("span", null, row.index + 1);
  //         },
  //         hAlign: "Center" as TextAlign,
  //         width: 70,
  //       },
  //       {
  //         Header: "Active",
  //         accessor: "is_active",
  //         autoResizable: true,
  //         disableGroupBy: true,
  //         disableFilters: true,
  //         className: "custom-class-name",
  //         width: 100,
  //         hAlign: "Center" as TextAlign,
  //         // Cell: ({ value }: any) =>

  //         // value ? <Icon name="accept" /> : <Icon name="decline" />,
  //       },
  //       {
  //         Header: " Title",
  //         accessor: "title",
  //         autoResizable: true,
  //         className: "custom-class-name",
  //       },
  //       {
  //         Header: "Header Description",
  //         accessor: "header_description",
  //         autoResizable: true,
  //         className: "custom-class-name",
  //       },
  //       {
  //         Header: "Created At",
  //         accessor: "created_at",
  //         autoResizable: true,
  //         className: "custom-class-name",
  //         hAlign: "Center" as TextAlign,
  //         Cell: ({ value }: any) => new Date(value).toLocaleDateString(),
  //       },
  //       {
  //         Header: "   Actions",
  //         accessor: ".",
  //         cellLabel: () => "",
  //         disableFilters: true,
  //         disableGroupBy: true,
  //         disableSortBy: true,
  //         autoResizable: true,
  //         id: "actions",
  //         className: "custom-class-name",
  //         hAlign: "Center" as TextAlign,
         
  //       },
  //     ];
  //     return columns;
  //   }
  //   closeAddJobModal() {
  //     this.isInsert = false;
  //     this.refreshTable.emit();
  //     // this.loadJobs();
  //   }
  @Output() refreshTable: EventEmitter<void> = new EventEmitter<void>();
  @Output() IsOpenToastAlert = new EventEmitter<void>();
  ToastType: string = "";
  totalFaqs: number = 0;
  // itemsPerPage: number;
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
  Users=user
  faqs = new user().deserialize({});
  constructor(
    private commonService: ServiceService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {
    // this.itemsPerPage = this.commonService.itemsPerPage;
    this.odata = this.commonService.odata;
    this.Title = "Faq List";
    this.tableColum();
  }
  ngOnInit(): void {}

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
        Header: "Active",
        accessor: "is_active",
        autoResizable: true,
        disableGroupBy: true,
        disableFilters: true,
        className: "custom-class-name",
        width: 100,
        hAlign: "Center" as TextAlign,
        Cell: ({ value }: any) =>
          value ? <Icon name="accept" /> : <Icon name="decline" />,
      },
      {
        Header: " Quastion",
        accessor: "question",
        autoResizable: true,
        className: "custom-class-name",
      },
      {
        Header: "Answer",
        accessor: "answer",
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
      {
        Header: "   Actions",
        accessor: ".",
        cellLabel: () => "",
        disableFilters: true,
        disableGroupBy: true,
        disableSortBy: true,
        autoResizable: true,
        id: "actions",
        className: "custom-class-name",
        width: 150,
        hAlign: "Center" as TextAlign,
        Cell: ({ row }: any) => (
          <div>
            <Button
              icon="edit"
              design="Transparent"
              onClick={() => {
                this.editFaq(row.original);
              }}
            />
            <Button
              icon="information"
              design="Transparent"
              onClick={() => {
                this.FaqsDetails(row.original);
              }}
            ></Button>

            <Button
              icon="delete"
              design="Transparent"
              onClick={() => {
                this.deleteFaqs(row.original);
              }}
            ></Button>
          </div>
        ),
      },
    ];
    return columns;
  }
  FaqsDetails(original: any) {
    this.selectedFaqId = original.id;
    this.selectedFaqData = { ...original };
    this.isDetails = true;
    this.cdr.detectChanges();
  }

  closeFaqDetailsModal() {
    this.isDetails = false;
    this.selectedFaqId = null;
    this.selectedFaqData = null;
  }

  handleInsertData(isInsert: boolean): void {
    console.log("Received isInsertData:", isInsert);
    if (isInsert) {
      this.isInsert = isInsert;
    }
  }
  closeAddFaqModal() {
    this.isInsert = false;
    this.refreshTable.emit();
  }

  deleteFaqs(original: any) {
    this.isDeleteOpen = true;
    this.selectedFaqId = original.id;
  }

  // deleteItemConfirm() {
  //   this.isDeleteLoading = true;
  //   const id = this.selectedFaqId;
  //   this.commonService.delete(`user/${id}`, this.odata).subscribe({
  //     next: (response: any) => {
  //       this.isDeleteOpen = false;
  //       this.isDeleteLoading = false;
  //       this.ToastType = "delete";
  //       setTimeout(() => {
  //         this.IsOpenToastAlert.emit();
  //       }, 1000);
  //       this.refreshTable.emit();
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //       this.isDeleteError = true;
  //       this.isDeleteOpen = false;
  //       this.isDeleteLoading = false;
  //       this.refreshTable.emit();
  //     },
  //   });
  // }

  editFaq(original: any) {
    this.isEdit = true;
    this.selectedFaqId = original.id;
    this.selectedFaqData = { ...original };
  }

  closeEditFaqModal() {
    this.isEdit = false;
  }
  
}
