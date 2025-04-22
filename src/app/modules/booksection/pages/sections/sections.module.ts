import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SectionsComponent } from './sections.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':book',
		component: SectionsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SectionsComponent],
	providers: []
})
export class SectionsModule {}
