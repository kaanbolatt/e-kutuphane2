import { Table } from 'primeng/table';
import { ColumnType } from '../../../shared/enums/column-type';
import { BaseComponent } from '../../../shared/bases/base.component';
import { DatatableInfo } from '../../../shared/models/datatable-info';
import { GridRefreshMode } from '../../../shared/enums/grid-refresh-mode';
import { CellTemplateDirective } from '../../../shared/directives/cell-template.directive';
import { AfterContentInit, Component, ContentChild, ContentChildren, EventEmitter, HostListener, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { SortMeta } from 'primeng/api';

@Component({
  selector: 'app-grid',
  templateUrl: './app.grid.component.html',
  styleUrls: ['./app.grid.component.scss']
})

export class GridComponent extends BaseComponent implements OnInit, AfterContentInit {
  @ContentChildren(CellTemplateDirective) cellTemplates: QueryList<CellTemplateDirective>;
  @Output() gridRefresh: EventEmitter<any> = new EventEmitter();
  @Output() dbClickToTr: EventEmitter<any> = new EventEmitter();
  @Output() rowPreparedEvent: EventEmitter<any> = new EventEmitter();
  @Output() rowSelect = new EventEmitter();
  @Output() rowUnselect = new EventEmitter();
  @Output() allSelectedItems = new EventEmitter();
  @Output() selectedItemsOutput = new EventEmitter();
  @Input() doubleClick:boolean=false;
  @Input() textCenter:boolean=false;
  @Input() coloring: any;
  @Input() headerText:string
  @Input() rowColoring: any;
  @Input() datatableIndex = 0;
  @Input() rowCountPerPage = 10;
  @Input() rowCount = true;
  @Input() sorting = true;
  @Input() reorderableColumns = true;
  @Input() resizableColumns = true;
  @Input() totalRecordSummary = true;
  @Input() paginator = true;
  @Input() exceleAktar = false;
  @Input() columnSelection = true;
  @Input() dataKey = 'id';
  @Input() deferred = false;
  @Input() rowExpansion = false;
  @Input() scrollable = false;
  @Input() scrollHeight = '';
  @Input() sortMode = 'multiple';
  @Input() selectedItems: any;
  @Input() lazy = true;
  @Input() ctrlKey = false;
  @Input() whiteSpace = false;
  @ContentChild('myref') templateChild: TemplateRef<any>;
  cellTemplatesMap: { [key: string]: TemplateRef<any> };

  multiSortMeta: SortMeta[];
  selectedItemsArray: any[] = [];
  ctrlStart = 0;
  ctrlEnd = 0;

  columnTypeEnum = ColumnType;
  constructor() {
    super();
  }

  // Ctrl Tuşuyla Checkboxlar Arası Seçim Yapmayı Sağlar.
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.ctrlKey) {
      if (event.key === '17') {
        if (this.ctrlStart != 0 && this.ctrlEnd != 0) {
          // eslint-disable-next-line @typescript-eslint/ban-types
          const tempObject: Object[] = [];
          for (let i = (this.ctrlStart) - 1; i <= this.ctrlEnd - 1; i++) {
            tempObject.push(this.gh.getGridData()[i]);
          }
          this.selectedItems = tempObject;
          this.selectedItemsOutput.emit(this.selectedItems);
        }
      }
    }
  }

  ngOnInit() {
  }
 dbClkTr(event:any){
  if(this.doubleClick==true){
    this.dbClickToTr.emit(event);
  }else{
  }

 }
  rowPrepared(rowData: any) {
    if (this.rowColoring) {
      return this.rowColoring(rowData);
    }
    this.rowPreparedEvent.emit(rowData);
  }

  callGridRefresh(datatable?: Table) {
    const dataTableInfo = this.gh.getDataTableInfo(this.datatableIndex);

    if (dataTableInfo.datatable == null) {
      dataTableInfo.datatable = datatable;
    }
    dataTableInfo.gridRefreshMode = datatable != null ? GridRefreshMode.lazyLoad : GridRefreshMode.exportExcel;
    if (this.deferred === false) {
      this.gridRefresh.emit(this.datatableIndex);
    }
  }

  getColoring(col, rowData, colField) {
    if (this.coloring) {
      return this.coloring(col, rowData, colField);
    }
  }

  kayitVarMi(datatableIndex: number = 0): boolean {


    return this.gh.getDataTableInfo(datatableIndex).totalRecords > 0 ? true : false;
  }

  ngAfterContentInit() {
    this.cellTemplatesMap = this.cellTemplates.reduce((acc, cur) => {
      acc[cur.name] = cur.template;
      return acc;
    }, {});
  }

  allRowClick(values: any[]) {
    this.allSelectedItems.emit(values);
  }

  onRowSelect(value) {
    this.rowSelect.emit(value);
    // Checkboxların Aralığını Belirleme Yapar. Satırın Numarasının Olması Lazım.
    if (this.ctrlKey) {
      if (this.selectedItems.length == 2) {
        this.ctrlStart = (this.selectedItems[0]['no'] < this.selectedItems[1]['no'] ? this.selectedItems[0]['no'] : this.selectedItems[1]['no']);
        this.ctrlEnd = (this.selectedItems[1]['no'] > this.selectedItems[0]['no'] ? this.selectedItems[1]['no'] : this.selectedItems[0]['no']);
      } else {
        this.ctrlStart = 0;
        this.ctrlEnd = 0;
      }
    }
  }

  onRowUnselect(value) {
    this.rowUnselect.emit(value);
  }

  gridColumnsReorder(datatable: DatatableInfo) {
    const selectedColumns = datatable.selectedColumns;
    datatable.selectedColumns = [];

    for (const col of datatable.cols) {
      if (selectedColumns.findIndex(d => d.field === col.field) > -1) {
        datatable.selectedColumns.push(col);
      }
    }
  }
}
