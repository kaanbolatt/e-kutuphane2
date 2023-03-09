export enum GridRefreshMode {
  /**
   * Paging, ordering, page size değiştirme ve gridin ilk yüklenmesi için kullanılır.
   */
  lazyLoad = 1,
  /**
   * Sayfada arama butonuna tıklandığında kullanılır.
   */
  search = 2,
  /**
   * Excele aktarma işlemi için kullanılır.
   */
  exportExcel = 3
}
