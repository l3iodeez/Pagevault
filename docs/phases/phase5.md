# Phase 5: Shares and Garbage Collection

## Rails
### Models
* Shares

### Controllers
* Api::SharesController (create, destroy, index, show, update)

### Views
* Shares/index.json.jbuilder

## Flux
### Views (React Components)
* SharesIndex
  - ShareIndexItem
* ShareForm

### Stores
* Shares

### Actions
* ApiActions.receiveAllShares
* ApiActions.deleteShare

### NotesAPIUtil
* NotesAPIUtil.fetchAllShares
* NotesAPIUtil.createShare
* NotesAPIUtil.updateShare
* NotesAPIUtil.destroyShare

## Gems/Libraries
