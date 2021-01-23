import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AuthComponent } from './components/auth/auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './components/auth/auth-form/auth-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoursesComponent } from './components/courses/courses.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { NewCourseComponent } from './components/courses/new-course/new-course.component';
import { NewExamComponent } from './components/courses/new-exam/new-exam.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthFormComponent,
    CoursesComponent,
    NewCourseComponent,
    NewExamComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
