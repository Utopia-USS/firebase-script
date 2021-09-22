import * as admin from 'firebase-admin'
import DocumentReference = admin.firestore.DocumentReference;
import CollectionReference = admin.firestore.CollectionReference;

export class DatabaseService {
    async fetchCollection(path: string): Promise<CollectionReference> {
        return admin.firestore().collection(path);
    }

    async fetchCollectionDocuments(collectionReference: CollectionReference): Promise<DocumentReference[]> {
        return collectionReference.listDocuments()
    }

    async fetchDocumentCollections(documentReference: DocumentReference): Promise<CollectionReference[]> {
        return documentReference.listCollections()
    }

    async fetchDocumentFields(documentReference: DocumentReference): Promise<any> {
        const data = await documentReference.get()

        return data.data()
    }
}
