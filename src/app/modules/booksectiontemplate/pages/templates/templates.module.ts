import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TemplatesComponent } from './templates.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TemplatesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TemplatesComponent],
	providers: []
})
export class TemplatesModule {}
