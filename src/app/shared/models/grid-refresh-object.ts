import { Table } from 'primeng/table';
import { GridRefreshMode } from '../enums/grid-refresh-mode';

export class GridRefreshObject {
  datatable?: Table;
  gridRefreshMode: GridRefreshMode = GridRefreshMode.Search;
}
