import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CreatePneumologistComponent } from './create-pneumologist/create-pneumologist.component';
import { EditPneumologistComponent } from './edit-pneumologist/edit-pneumologist.component';
import { IndexPneumologistComponent } from './index-pneumologist/index-pneumologist.component';
import { DeletePneumologistComponent } from './delete-pneumologist/delete-pneumologist.component';
import { PneumologistsComponent } from './pneumologists.component';
import { PneumologistService } from '../../services/pneumologist.service';
import { PneumologistsRoutingModule } from './pneumologists-routing';
import { AuthGuard } from '../../guards/auth.guard';
import { FilterPneumoPipe } from '../../pipes/pneumoFilter';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PneumologistsRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: 
    [ 
        CreatePneumologistComponent,
        EditPneumologistComponent,
        IndexPneumologistComponent,
        DeletePneumologistComponent,
        PneumologistsComponent,
        FilterPneumoPipe
    ],
  providers:[PneumologistService, AuthGuard]
})
export class PneumologistsModule { }
