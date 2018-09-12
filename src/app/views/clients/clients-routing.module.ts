import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { AuthGuard } from "../../guards/auth.guard";
import { CreateClientsComponent } from './create/create_clients.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from "./edit/edit.component";
// Crqsas components
import { CreateCrqsasComponent } from "./crqsas/create-crqsas/create-crqsas.component";
import { ShowCrqsasComponent } from "./crqsas/show-crqsas/show-crqsas.component";
import { EditCrqsasComponent } from "./crqsas/edit-crqsas/edit-crqsas.component";

// Feedback components
import { CreateFeedbackComponent } from './feedback/create-feedback/create-feedback.component';
import { ShowFeedbackComponent } from './feedback/show-feedback/show-feedback.component';
import { EditFeedbackComponent } from './feedback/edit-feedback/edit-feedback.component';

// Cat components
import { EditCatComponent } from './cat/edit-cat/edit-cat.component';
import { ShowCatComponent } from './cat/show-cat/show-cat.component';
import { CreateCatComponent } from './cat/create-cat/create-cat.component';

//Gehtest components
import { CreateGehtestComponent } from './gehtest/create-gehtest/create-gehtest.component';
import { ShowGehtestComponent } from './gehtest/show-gehtest/show-gehtest.component';
import { EditGehtestComponent } from './gehtest/edit-gehtest/edit-gehtest.component';

//Entries component
import { IndexEntryComponent } from "./entry/index-entry/index-entry.component";
import { EditEntryComponent } from './entry/edit-entry/edit-entry.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Clients'
    }
  },
  {
    path: 'create',
    component: CreateClientsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Create Client'
    }
  },
  {
    path: 'show/:id',
    component: ShowComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show Client'
    }
  },
  {
    path: 'show/:id/entries',
    component: IndexEntryComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Index Entries'
    }
  },
  {
    path: 'show/:id/entries/:entry_id/edit',
    component: EditEntryComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit Entry'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [AuthGuard],
    data:{
      title: 'Edit Client'
    }
  },
  {
    path: 'show/:id/feedback/create',
    component: CreateFeedbackComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Create Feedback'
    }
  },
  {
    path: 'show/:id/feedback/show/:feedback_id',
    component: ShowFeedbackComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show Feedback'
    }
  },
  {
    path: 'show/:id/feedback/edit/:feedback_id',
    component: EditFeedbackComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit Feedback'
    }
  },
  {
    path: 'show/:id/crqsas/create/:time',
    component: CreateCrqsasComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Create Crqsas'
    }
  },
  {
    path: 'show/:id/crqsas/show/:crqsas_id',
    component: ShowCrqsasComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show Crqsas'
    }
  },
  {
    path: 'show/:id/crqsas/edit/:crqsas_id',
    component: EditCrqsasComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit Crqsas'
    }
  },
  {
    path: 'show/:id/cat/create/:time',
    component: CreateCatComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Create Cat'
    }
  },
  {
    path: 'show/:id/cat/show/:cat_id',
    component: ShowCatComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show Cat'
    }
  },
  {
    path: 'show/:id/cat/edit/:cat_id',
    component: EditCatComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit Cat'
    }
  }
  ,
  {
    path: 'show/:id/gehtest/create/:time',
    component: CreateGehtestComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Create Gehtest'
    }
  },
  {
    path: 'show/:id/gehtest/show/:gehtest_id',
    component: ShowGehtestComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show Gehtest'
    }
  },
  {
    path: 'show/:id/gehtest/edit/:gehtest_id',
    component: EditGehtestComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit Gehtest'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
