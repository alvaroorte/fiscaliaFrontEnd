import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { MenubarModule } from 'primeng/menubar';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { FieldsetModule } from 'primeng/fieldset';
import { SidebarModule } from 'primeng/sidebar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { PickListModule } from 'primeng/picklist';
import { FileUploadModule } from 'primeng/fileupload';
import { SliderModule } from 'primeng/slider';
import { EditorModule } from 'primeng/editor';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ListboxModule } from 'primeng/listbox';
import { TieredMenuModule } from 'primeng/tieredmenu';


@NgModule({
  imports: [],
  exports: [
    ToastModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    SkeletonModule,
    CheckboxModule,
    SplitButtonModule,
    MenubarModule,
    FieldsetModule,
    InputTextareaModule,
    TableModule,
    ChipModule,
    ToolbarModule,
    DialogModule,
    BadgeModule,
    SidebarModule,
    ColorPickerModule,
    PickListModule,
    FileUploadModule,
    SliderModule,
    EditorModule,
    StepsModule,
    CardModule,
    PasswordModule,
    ListboxModule,
    TieredMenuModule
    
  ],
  providers: [
    MessageService
  ]
})
export class PrimeComponentsModule { }
