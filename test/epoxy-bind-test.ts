import { By } from "@angular/platform-browser";
import { Component, WrappedValue, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

import { makeListenable } from 'epoxyjs';
import { EpoxyBind } from '../src/epoxy-bind';


@Component({
    template: `
        <div *epoxyBind>
            <h2>{{store.title}}</h2>
            <h4>{{subhead}}</h4>
        </div>
    `,
})
class ObjectPropertyTestComponent {
    public store = makeListenable({title: 'My title'});
    public subhead: string = 'Subhead';
}

@Component({
    template: `
        <div *epoxyBind="{detach: true}">
            <h2>{{store.title}}</h2>
            <h4>{{subhead}}</h4>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class DetachedObjectPropertyTestComponent {
    public store = makeListenable({title: 'My title'});
    public subhead: string = 'Subhead';
}


describe('*epoxyBind', () => {
    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    });

    it('binds to properties of listenable objects', () => {
        const component = TestBed
            .configureTestingModule({
                declarations: [EpoxyBind, ObjectPropertyTestComponent]
            })
            .createComponent(ObjectPropertyTestComponent);
        component.detectChanges();

        const titleEl = component.debugElement.query(By.css('h2'));
        expect(titleEl.nativeElement.innerHTML).toEqual('My title');
    });

    it('updates the DOM when listenable properties change', () => {
        const component = TestBed
            .configureTestingModule({
                declarations: [EpoxyBind, ObjectPropertyTestComponent]
            })
            .createComponent(ObjectPropertyTestComponent);
        component.detectChanges();

        const titleEl = component.debugElement.query(By.css('h2'));
        component.componentInstance.store.title = 'Another title!'
        expect(titleEl.nativeElement.innerHTML).toEqual('Another title!');
    });

    it('still updates as usual if not detached', () => {
        const component = TestBed
            .configureTestingModule({
                declarations: [EpoxyBind, ObjectPropertyTestComponent]
            })
            .createComponent(ObjectPropertyTestComponent);
        component.detectChanges();

        const subtitleEl = component.debugElement.query(By.css('h4'));
        expect(subtitleEl.nativeElement.innerHTML).toEqual('Subhead');
        component.componentInstance.subhead = 'Byline';
        component.changeDetectorRef.detectChanges();
        expect(subtitleEl.nativeElement.innerHTML).toEqual('Byline');
    });

    it('ignored change detection if detached', () => {
        const component = TestBed
            .configureTestingModule({
                declarations: [EpoxyBind, DetachedObjectPropertyTestComponent]
            })
            .createComponent(DetachedObjectPropertyTestComponent);
        component.detectChanges();

        const subtitleEl = component.debugElement.query(By.css('h4'));
        expect(subtitleEl.nativeElement.innerHTML).toEqual('Subhead');
        component.componentInstance.subhead = 'Byline';
        component.changeDetectorRef.detectChanges();
        expect(subtitleEl.nativeElement.innerHTML).toEqual('Subhead');
    });
});
