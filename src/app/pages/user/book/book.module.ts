import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BookComponent } from './book.component';
import { Routes, RouterModule } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';

const routes: Routes = [
	{
		path: ':book',
		component: BookComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), QRCodeComponent, CoreModule],
	declarations: [BookComponent]
})
export class BookModule {}
