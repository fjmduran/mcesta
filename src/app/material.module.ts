import { NgModule } from "@angular/core";

import {
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatGridListModule,
    MatCheckboxModule
} from "@angular/material";

@NgModule({
    imports: [
        MatIconModule,
        MatSidenavModule,
        MatBadgeModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatInputModule,
        MatProgressBarModule,
        MatDialogModule,
        MatGridListModule,
        MatCheckboxModule
    ],
    exports: [
        MatIconModule,
        MatSidenavModule,
        MatBadgeModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatInputModule,
        MatProgressBarModule,
        MatDialogModule,
        MatGridListModule,
        MatCheckboxModule
    ],
    providers: [],
    declarations: []
})

export class MaterialModules {
    constructor() {
    }
}