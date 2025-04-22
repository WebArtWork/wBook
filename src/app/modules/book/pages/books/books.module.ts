import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BooksComponent } from './books.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BooksComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BooksComponent],
	providers: []
})
export class BooksModule {}
