import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BookComponent } from './book.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':book',
		component: BookComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BookComponent]
})
export class BookModule {}
