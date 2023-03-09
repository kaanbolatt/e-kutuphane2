import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeTr from '@angular/common/locales/tr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightboxModule } from 'primeng/lightbox';
import { AccordionModule } from 'primeng/accordion';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { BaseComponent } from './bases/base.component';
import { GridComponent } from './components/app.grid/app.grid.component';
import { ReportComponent } from './components/app.report/app.report.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { IlComponent } from './components/il/il.component';
import { IlceComponent } from './components/ilce/ilce.component';
import { KurumComponent } from './components/kurum/kurum.component';
import { SayfaBasligiComponent } from './components/sayfa-basligi/sayfa-basligi.component';
import { YilComponent } from './components/yil/yil.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { GlobalVariables } from './constants/global-variables';
import { CalendarDirective } from './directives/calendar.directive';
import { CellTemplateDirective } from './directives/cell-template.directive';
import { DialogDirective } from './directives/dialog.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { FileUploadDirective } from './directives/file-upload.directive';
import { FullCalendarDirective } from './directives/full-calendar.directive';
import { MenuDirective } from './directives/menu.directive';
import { MultiSelectDirective } from './directives/multiselect.directive';
import { SplitButtonDirective } from './directives/split-button.directive';
import { RemovewhitespacesPipe } from './pipes/remove-whitespaces.pipe';
import { AutoCompleteDirective } from './directives/auto-complete.directive';
import { KurumTuruComponent } from './components/kurum-turu/kurum-turu.component';
import { UlkeComponent } from './components/ulke/ulke.component';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { PromptComponent } from './components/dialogs/prompt/prompt.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NumberDirective } from './directives/only-number.directive';
import { BaseFormComponent } from './bases/base-form';
import { TextDirective } from './directives/only-text.directive';
import { TextOrNumberDirective } from './directives/only-text-or-number.directive';
import { TreeTableModule } from 'primeng/treetable';
import { SharedModule, MessageService, ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule, } from 'primeng/fileupload';
import { InputMaskModule, } from 'primeng/inputmask';
import { InputTextModule, } from 'primeng/inputtext';
import { InputTextareaModule, } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule, } from 'primeng/multiselect';
import { PanelModule, } from 'primeng/panel';
import { RadioButtonModule, } from 'primeng/radiobutton';
import { KeyFilterModule, } from 'primeng/keyfilter';
import { MessageModule, } from 'primeng/message';
import { MessagesModule, } from 'primeng/messages';
import { ToggleButtonModule, } from 'primeng/togglebutton';
import { OverlayPanelModule, } from 'primeng/overlaypanel';
import { ToolbarModule, } from 'primeng/toolbar';
import { MenuModule, } from 'primeng/menu';
import { ListboxModule, } from 'primeng/listbox';
import { FieldsetModule, } from 'primeng/fieldset';
import { SelectButtonModule, } from 'primeng/selectbutton';
import { StepsModule, } from 'primeng/steps';
import { ScrollPanelModule, } from 'primeng/scrollpanel';
import { SplitButtonModule, } from 'primeng/splitbutton';
import { AutoCompleteModule, } from 'primeng/autocomplete';
import { CardModule, } from 'primeng/card';
import { ChartModule, } from 'primeng/chart';
import { SpinnerModule, } from 'primeng/spinner';
import { TagModule } from 'primeng/tag';
import { PickListModule } from 'primeng/picklist';
import { TimerComponent } from './components/timer/timer.component';
import { BadgeModule } from 'primeng/badge';
import { SliderModule } from 'primeng/slider';
import { DividerModule } from 'primeng/divider';
import { MaskTextByAsteriksPipe } from './pipes/mask-text-by-asterisk.pipe';
import { UserTypePipe } from './pipes/user-type.pipe';
import { GenderTypePipe } from './pipes/gender-type.pipe';
import { EditorModule } from 'primeng/editor';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { DateHourFormatPipe } from './pipes/date-hour-format.pipe';
import { Constants } from './constants/constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SmsDialogComponent } from './components/sms-dialog/sms-dialog.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import { HeaderComponent } from './components/header/header.component';
import { ProcessCardComponent } from './components/process-card/process-card.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppDropdownComponent } from './components/app-dropdown/app-dropdown.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import {SidebarModule} from 'primeng/sidebar';

registerLocaleData(localeTr, 'tr');
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TreeTableModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    SharedModule,
    DropdownModule,
    FileUploadModule,
    InputMaskModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule,
    PanelModule,
    RadioButtonModule,
    TableModule,
    ToastModule,
    KeyFilterModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    DialogModule,
    ToggleButtonModule,
    OverlayPanelModule,
    ToolbarModule,
    MenuModule,
    AccordionModule,
    SpinnerModule,
    BreadcrumbModule,
    ListboxModule,
    FieldsetModule,
    SelectButtonModule,
    StepsModule,
    ScrollPanelModule,
    LightboxModule,
    TooltipModule,
    SplitButtonModule,
    AutoCompleteModule,
    DynamicDialogModule,
    CardModule,
    ChartModule,
    InputSwitchModule,
    ChipsModule,
    TagModule,
    PickListModule,
    BadgeModule,
    SliderModule,
    DividerModule,
    EditorModule,
    TabMenuModule,
    TabViewModule,
    NgxDropzoneModule,
    NgxMaskModule.forRoot(maskConfig),
    SidebarModule
  ],
  declarations: [
    BaseComponent,
    GridComponent,
    UlkeComponent,
    IlComponent,
    IlceComponent,
    KurumComponent,
    KurumTuruComponent,
    YilComponent,
    ReportComponent,
    SayfaBasligiComponent,
    FileUploadComponent,
    AutoCompleteComponent,
    PromptComponent,
    BaseFormComponent,
    TimerComponent,

    NumberDirective,
    TextOrNumberDirective,
    TextDirective,
    CellTemplateDirective,
    CalendarDirective,
    DropdownDirective,
    MultiSelectDirective,
    DialogDirective,
    MenuDirective,
    FileUploadDirective,
    SplitButtonDirective,
    FullCalendarDirective,
    AutoCompleteDirective,

    RemovewhitespacesPipe,
    SafeHtmlPipe,
    MaskTextByAsteriksPipe,
    UserTypePipe,
    GenderTypePipe,
    PhoneNumberPipe,
    DateFormatPipe,
    DateTimeFormatPipe,
    DateHourFormatPipe,
    DateFormatPipe,
    SmsDialogComponent,
    HeaderComponent,
    ProcessCardComponent,
    AppDropdownComponent,
  ],
  exports: [
    FormsModule,
    SmsDialogComponent,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TreeTableModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    ChipsModule,
    SharedModule,
    DropdownModule,
    TagModule,
    PickListModule,
    FileUploadModule,
    InputMaskModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule,
    PanelModule,
    RadioButtonModule,
    TableModule,
    ToastModule,
    KeyFilterModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    DialogModule,
    ToggleButtonModule,
    OverlayPanelModule,
    ToolbarModule,
    MenuModule,
    AccordionModule,
    SpinnerModule,
    BreadcrumbModule,
    ListboxModule,
    FieldsetModule,
    SelectButtonModule,
    StepsModule,
    ScrollPanelModule,
    TooltipModule,
    SplitButtonModule,
    LightboxModule,
    AutoCompleteModule,
    DynamicDialogModule,
    CardModule,
    ChartModule,
    InputSwitchModule,
    BadgeModule,
    SliderModule,
    EditorModule,
    TabMenuModule,
    TabViewModule,
    NgxDropzoneModule,
    SidebarModule,
    
    BaseComponent,
    GridComponent,
    UlkeComponent,
    IlComponent,
    IlceComponent,
    KurumComponent,
    KurumTuruComponent,
    YilComponent,
    ReportComponent,
    SayfaBasligiComponent,
    FileUploadComponent,
    AutoCompleteComponent,
    PromptComponent,
    BaseFormComponent,
    TimerComponent,
    HeaderComponent,
    ProcessCardComponent,
    AppDropdownComponent,

    CalendarDirective,
    CellTemplateDirective,
    NumberDirective,
    TextOrNumberDirective,
    TextDirective,
    DropdownDirective,
    MultiSelectDirective,
    DialogDirective,
    MenuDirective,
    FileUploadDirective,
    SplitButtonDirective,
    FullCalendarDirective,
    AutoCompleteDirective,

    RemovewhitespacesPipe,
    SafeHtmlPipe,
    MaskTextByAsteriksPipe,
    UserTypePipe,
    GenderTypePipe,
    DividerModule,
    PhoneNumberPipe,
    DateFormatPipe,
    DateTimeFormatPipe,
    DateHourFormatPipe,
    DateFormatPipe,
  ],
  entryComponents: [PromptComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'tr-TR' },
    MessageService,
    GlobalVariables,
    Constants,
    IlComponent,
    IlceComponent,
    KurumComponent,
    DialogService,
    ConfirmationService,
    DatePipe,
    JwtHelperService 
  ]
})
export class ShareddModule { }