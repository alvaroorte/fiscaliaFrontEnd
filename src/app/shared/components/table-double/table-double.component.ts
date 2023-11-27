import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { DataCommon } from '@core/dto/tableDouble.interface';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { CategoriesService } from '@category/services/categories.service';

@Component({
  selector: 'app-table-double',
  standalone: true,
  imports: [CommonModule, PrimeComponentsModule ],
  templateUrl: './table-double.component.html',
  styles: [
  ]
})
export class TableDoubleComponent {
  @Output() add = new EventEmitter<any>();
  @Output() allAdd = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() allRemove = new EventEmitter<any>();

  @Input() sourceProducts = signal<DataCommon[]>([]);
  @Input() targetProducts = signal<DataCommon[]>([]);
  @Input() serviceGeneric: CategoriesService | any;

  private cdr = inject(ChangeDetectorRef);

  selectedSubcategory = signal<DataCommon>(new DataCommon);

  ngOnInit() {
    this.serviceGeneric.eventTableDobleComponent.emit(this);
    this.cdr.markForCheck();
  }

  addItem(ev:any){
    this.add.emit(ev.items);
    this.changeSelectedSubcategory(new DataCommon);
  }

  allAddItems(ev:any){
    this.allAdd.emit(ev.items);
    this.changeSelectedSubcategory(new DataCommon);
  }
  
  removeItem(ev:any){
    this.remove.emit(ev.items);
    this.changeSelectedSubcategory(new DataCommon);
  }
  
  allRemoveItems(ev:any){
    this.allRemove.emit(ev.items);
    this.changeSelectedSubcategory(new DataCommon);
  }

  changeSelectedSubcategory( ev: any ) {
    this.selectedSubcategory.set({...ev.items}[0]);
  }

}
