import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyBidsComponent } from './my-bids/my-bids.component';

const routes: Routes = [
  { path: '', redirectTo: 'my-bids', pathMatch: 'full' },
  { path: 'my-bids', component: MyBidsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
