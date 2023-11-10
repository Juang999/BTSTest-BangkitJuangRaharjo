var express = require('express');
var router = express.Router();
var ChecklistController = require('../app/Controllers/ChecklistController')
const authenticate = require('../app/Middleware/authenticate')

/* GET checklist listing. */
router.get('/', authenticate, ChecklistController.index);
router.post('/', authenticate, ChecklistController.store);
router.delete('/:checklistId', authenticate, ChecklistController.delete);

// GET detail checklist
router.get('/:checklistId/item', authenticate, ChecklistController.show);
router.post('/:checklistId/item', authenticate, ChecklistController.newItemChecklist);
router.get('/:checklistId/item/:checklistItemId', authenticate, ChecklistController.showDetailItem);
router.put('/:checklistId/item/:checklistItemId', authenticate, ChecklistController.updateItem);
router.delete('/:checklistId/item/:checklistItemId', authenticate, ChecklistController.deleteItem);
router.put('/:checklistId/item/rename/:checklistItemId', authenticate, ChecklistController.renameItem);

module.exports = router;
