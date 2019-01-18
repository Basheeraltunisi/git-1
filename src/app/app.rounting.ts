import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


const routes: Routes = [
//   { path: "products", component: ProductListComponent },
//   { path: "product/:id", component: ProductDetailComponent },
//   {
//     path: "",
//     component: SidebarComponent,
//     outlet: "sidebar"
//   },
//   {
//     path: "products",
//     component: ProductListSidebarComponent,
//     outlet: "sidebar"
//   }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
