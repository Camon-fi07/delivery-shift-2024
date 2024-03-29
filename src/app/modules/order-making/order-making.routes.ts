import { Routes } from '@angular/router';
import { OptionsComponent } from './components/options/options.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { PaidComponent } from './components/paid/paid.component';
import { ViewComponent } from './components/view/view.component';

export const orderMakingRoutes: Routes = [
  { path: 'option', component: OptionsComponent },
  { path: 'user/:isSender', component: UserInfoComponent },
  { path: 'address/:isSender', component: AddressFormComponent },
  { path: 'paid', component: PaidComponent },
  { path: 'view', component: ViewComponent },
];
