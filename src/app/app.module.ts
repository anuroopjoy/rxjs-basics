import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { SubComponent } from './sub/sub.component';
import { InMemoryDataService } from './inmemory.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent, SubComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }),
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
