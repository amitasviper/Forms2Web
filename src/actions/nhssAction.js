export const nhssAction = (value) => ({
  type: 'SIMPLE_ACTION',
  payload: value
 })

export const nhssChangeValue = (item_index, new_value) => ({
	type: 'CHANGE_VALUE',
	payload: {item_index: item_index, value: new_value}
})
