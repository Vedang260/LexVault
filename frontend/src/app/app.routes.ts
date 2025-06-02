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
            canActivate: [RoleGuard([Role.CLIENT])],
            children: [{
                path: 'addCase',
                loadComponent: () => import('./features/client/add-case/add-case.component').then(m => m.AddCaseComponent)
            },{
                path: 'cases-dashboard',
                loadComponent: () => import('./features/client/cases/cases-dashboard.component').then(m => m.CasesDashboardComponent)
            }]
        },{
            path: 'lawyer',
            canActivate: [RoleGuard([Role.LAWYER])],
            children: [{
                path: 'cases-dashboard',
                loadComponent: () => import('./features/lawyer/cases-dashboard/cases-dashboard.component').then(m => m.CasesDashboardComponent)
            }]
        }, {
            path: 'cases',
            canActivate: [RoleGuard([Role.ADMIN, Role.LAWYER, Role.CLIENT])],
            children: [{
                path: `case-details/:caseId`,
                loadComponent: () => import('./features/cases/case-details/case-details.component').then(m => m.CaseDetailsComponent) 
            }]
        }],
        
    }
];
