import * as admin from 'firebase-admin'
import 'source-map-support/register'

export * as functions from 'firebase-functions'

admin.initializeApp()

export const app = admin.app()
export const firestore = admin.firestore()
export const messaging = admin.messaging()
