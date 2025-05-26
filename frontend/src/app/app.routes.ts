import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { Role } from './core/constants/role.enum';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
    { path: '', component: MainLayoutComponent, canActivate: [AuthGuard], 
        children:[{
            path: 'client',
            canActivate: [RoleGuard],
            data: { roles: [Role.CLIENT]},
            children: [{
                path: 'addCase',
                loadComponent: () => import('./features/client/addCase/addCase.component').then(m => m.AddCaseComponent)
            }]
        // }, {
        //     path: 'admin',
        //     canActivate: [RoleGuard],
        //     data: { roles: [Role.ADMIN]},
        //     children: [{
        //         path: 'dashboard',
        //     }]
        // }, {
        //     path: 'lawyer',
        //     canActivate: [RoleGuard],
        //     data: { roles: [Role.LAWYER]},
        //     children: [{
        //         path: 'dashboard',
        //     }]
        }]
    }
];
