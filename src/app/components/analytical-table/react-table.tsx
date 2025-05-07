import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AnalyticalTable, ThemeProvider } from '@ui5/webcomponents-react';
import React from 'react';
import { createRoot } from 'react-dom/client';

const containerElementRef="ReactComponentContainer";
@Component({
  selector: 'react-analytical-table',
  template:`<span #${containerElementRef}></span>`,
  standalone: true,
  styleUrl: './analytical-table.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ReactAnalyticalTable implements OnDestroy,AfterViewInit,OnInit{
  @ViewChild(containerElementRef, { static: true }) containerRef!: ElementRef;
  private root:ReturnType<typeof createRoot>|null=null;

@Input() headerTitel:string="";
@Input() insertTitle:string="";
@Input() odataUrl:string="";
@Input() tableColumn:any;
@Input() isInsertData:boolean=false;
@Input() emptyDataText: string = "";
@Input() selectionMode:"None"|"Single"|"Multiple"|undefined="None";

tableDataCount:number=0;
searchFilter:string="";
segmentedState:string="all";
dataList:any[]=[];




constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  
  }
  ngAfterViewInit(): void {
    if(!this.root){
      this.root=createRoot(this.containerRef.nativeElement);
    }
    this.render()
  }
  ngOnDestroy(): void {
    if(this.root){
      this.root.unmount();
      this.root=null;
    }
    throw new Error('Method not implemented.');
  }

  private render(){
    if(this.root){
      this.root.render(
       <React.StrictMode>
        <ThemeProvider>
          <div className="analytical-table">
            <AnalyticalTable style={{border:"1px solid #dbdbdb",minHeight:"100%",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px"}} 
            data ={this.dataList}
            columns={this.tableColumn}
           onAutoResize={function ki(){}}
           onColumnsReorder={function ki(){}}
           onRowExpandChange={function ki(){}}
          //  onRowSelect={(e)=>{this.handleRowClick(e)}}
           selectionMode={this.selectionMode}
           subComponentsBehavior="IncludeHeight"
           subRowsKey="subRows"
           noDataText={this.emptyDataText}

        
            >
              
            </AnalyticalTable>
          </div>
        </ThemeProvider>
       </React.StrictMode>
      );
    }
  }

}
