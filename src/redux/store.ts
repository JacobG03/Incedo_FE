import { configureStore } from '@reduxjs/toolkit'

import meReducer from './slices/meSlice'
import themeReducer from './slices/themeSlice'
import alertsReducer from './slices/alertsSlice'
import notesReducer from './slices/notesSlice'
import sectionsReducer from './slices/sectionsSlice'

export default configureStore({
	reducer: {
		me: meReducer,
		theme: themeReducer,
		alerts: alertsReducer,
		notes: notesReducer,
		sections: sectionsReducer
	}
})
