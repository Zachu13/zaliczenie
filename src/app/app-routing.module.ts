import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { AuthComponent } from './components/auth/auth.component';
import { NewCourseComponent } from './components/courses/new-course/new-course.component';

const routes: Routes = [
  { path: '', component: AuthComponent, pathMatch: 'full' },
  {
    path: 'courses',
    component: CoursesComponent,
    children: [{ path: 'new', component: NewCourseComponent }],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
