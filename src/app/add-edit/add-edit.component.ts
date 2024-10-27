import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit {

  drinksForm: FormGroup;

  constructor(private _fb: FormBuilder, 
  private _drinkService: ServiceService, 
  private _dialogRef: MatDialogRef<AddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private _coreService: CoreService
){
    this.drinksForm = this._fb.group({
      id: '',
      name: '',
      description:''
    });
  }

  ngOnInit():void{
    this.drinksForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.drinksForm.valid){
      if(this.data){
        this._drinkService.updateDrinks(this.data.id, this.drinksForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Drink Updated successfully', 'done')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }else{
        this._drinkService.addDrinks(this.drinksForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Drink added successfully', 'done')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
