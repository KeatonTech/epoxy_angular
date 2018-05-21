# Epoxy for Angular
### Angular Hooks for Epoxy.js listenable collections.

Simply add the *epoxyBind structural directive to the top of any of your templates that use
at least one Epoxy collection (in this case, 'store'). Angular's change detector will automatically
be notified whenever any of the dependent Epoxy values change.

```html
<div *epoxyBind>
    <h2>{{store.title}}</h2>
</div>
```

If every data binding in a component references an Epoxy collection this can be optimized further
by telling epoxyBind to detach the normal change detector, relying exclusively on Epoxy itself.

```html
<div *epoxyBind="{detach: true}">
    <h2>{{store.title}}</h2>
</div>
```