
import { Directive, ViewContainerRef, TemplateRef, OnInit, OnDestroy, Input, EmbeddedViewRef, Renderer } from '@angular/core';
import { autorun } from 'epoxyjs';

@Directive({ selector: '[epoxyBind]' })
export class EpoxyBind implements OnInit, OnDestroy {

    @Input() epoxyBind: {detach: boolean};

    private embeddedView: EmbeddedViewRef<any>;
    private onDestroy: () => void;

    constructor(
        private templateRef: TemplateRef<any>,
        private view: ViewContainerRef,
        protected renderer: Renderer
    ) {}

    static parameters = [TemplateRef, ViewContainerRef, Renderer];

    ngOnInit() {
        this.embeddedView = this.view.createEmbeddedView(this.templateRef);
        if (this.epoxyBind && this.epoxyBind.detach) {
            this.embeddedView.detach();
        }
        this.onDestroy = autorun(() => this.embeddedView.detectChanges());
    }

    ngOnDestroy() {
        this.onDestroy();
    }
}