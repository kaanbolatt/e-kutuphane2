import { FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { GridRefreshMode } from '../enums/grid-refresh-mode';

export class DatatableInfo {
  datatable: Table;
  filterForm?: FormGroup;
  // eslint-disable-next-line @typescript-eslint/ban-types
  searchFilter?: Object;
  selectedColumns: any[];
  loading = true;
  cols: any[];
  totalRecords = 0;
  gridData: any;
  gridRefreshMode: GridRefreshMode = GridRefreshMode.search;
  displayGrid = false;
}
