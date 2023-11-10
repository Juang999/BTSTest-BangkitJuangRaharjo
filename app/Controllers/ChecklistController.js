require('dotenv').config()
const jwt = require('jsonwebtoken')
const {Checklist, DetailChecklist} = require('../../models')

class ChecklistController {
	index = (req, res) => {
		Checklist.findAll()
			.then(result => {
				res.status(200)
					.json({
						status: 'success',
						data: result,
						error: null
					})
			})
			.catch(err => {
				res.status(400)
					.json({
						status: 'failed',
						data: null,
						error: err.message
					})
			})
	}

	store = (req, res) => {
		Checklist.create({
			name: req.body.name
		})
		.then(result => {
			res.status(200)
				.json({
					status: 'success',
					data: result,
					error: null
				})
		})
		.catch(err => {
			res.status(400)
				.json({
					status: 'failed',
					data: null,
					error: err.message
				})
		})
	}

	delete = (req, res) => {
		Checklist.destroy({
			where: {
				id: req.params.checklistId
			}
		})
		.then(result => {
			res.status(200)
				.json({
					status: 'success',
					data: result,
					error: null
				})
		})
		.catch(err => {
			res.status(400)
				.json({
					status: 'failed',
					data: null,
					error: err.message
				})
		})
	}

	show = (req, res) => {
		DetailChecklist.findAll({
			where: {
				checklist_id: req.params.checklistId
			}
		})
		.then(result => {
			res.status(200)
				.json({
					status: 'success',
					data: result,
					error: null
				})
		})
		.catch(err => {
			res.status(400)
				.json({
					status: 'failed',
					data: null,
					error: err.message
				})
		})
	}
	newItemChecklist = (req, res) => {
		DetailChecklist.create({
			checklist_id: req.params.checklistId,
			item_name: req.body.item_name,
			status: false
		})
		.then(result => {
			res.status(200)
				.json({
					status: 'success',
					data: result,
					error: null
				})
		})
		.catch(err => {
			res.status(400)
				.json({
					status: 'failed',
					data: null,
					error: err.message
				})
		})
	}
	showDetailItem = (req, res) => {
		DetailChecklist.findAll({
			where: {
				id: req.params.checklistItemId,
				checklist_id: req.params.checklistId,
			}
		})
		.then(result => {
			res.status(200)
				.json({
					status: 'success',
					data: result,
					error: null
				})
		})
		.catch(err => {
			res.status(400)
				.json({
					status: 'failed',
					data: null,
					error: err.message
				})
		})
	}
	updateItem = (req, res) => {
		let theStatus = (req.body.status == 1) ? true : false

		DetailChecklist.update({
			status: theStatus
		}, {
			where: {
				id: req.params.checklistItemId,
				checklist_id: req.params.checklistId
			}
		})
		.then(result => {
			res.status(200)
				.json({
					status: 'success',
					data: result,
					error: null
				})
		})
		.catch(err => {
			res.status(400)
				.json({
					status: 'failed',
					data: null,
					error: err.message
				})
		})
	}
	deleteItem = (req, res) => {
		DetailChecklist.destroy({
			where: {
				id: req.params.checklistItemId,
				checklist_id: req.params.checklistId
			}
		})
		.then(result => {
			res.status(200)
				.json({
					status: 'success',
					data: result,
					error: null
				})
		})
		.catch(err => {
			res.status(400)
				.json({
					status: 'failed',
					data: null,
					error: err.message
				})
		})
	}
	renameItem = (req, res) => {
		DetailChecklist.update({
			item_name: req.body.name
		}, {
			where: {
				id: req.params.checklistItemId,
				checklist_id: req.params.checklistId
			}
		})
		.then(result => {
			res.status(200)
				.json({
					status: 'success',
					data: result,
					error: null
				})
		})
		.catch(err => {
			res.status(400)
				.json({
					status: 'failed',
					data: null,
					error: err.message
				})
		})
	}
}

module.exports = new ChecklistController()