import {DatabaseService} from "../export/database-service";
import * as admin from 'firebase-admin'
import DocumentReference = admin.firestore.DocumentReference;
import CollectionReference = admin.firestore.CollectionReference;

interface JsonObject {
    [key: string]: any
}

export class ExportService {
    readonly databaseService: DatabaseService;

    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService
    }

    async export(collectionName: string): Promise<JsonObject> {
        const collection = await this.databaseService.fetchCollection(collectionName)
        const documents = await this.databaseService.fetchCollectionDocuments(collection)

        let object: JsonObject = {};
        for (let document of documents) {
            object[collectionName + "/"] = await this.processDocument(document)
        }
        return object
    }

    private async processDocument(documentReference: DocumentReference): Promise<JsonObject> {
        const collections = await this.databaseService.fetchDocumentCollections(documentReference)
        const fields = await this.databaseService.fetchDocumentFields(documentReference)

        let object: JsonObject = {};
        object[documentReference.id] = fields

        for(let collection of collections) {
            console.log("Process collection: " + collection.id)
            object[documentReference.id][collection.id + "/"] = await this.processCollection(collection)
        }

        return object
    }

    private async processCollection(collectionReference: CollectionReference): Promise<JsonObject> {
        const documents = await this.databaseService.fetchCollectionDocuments(collectionReference)

        let object: JsonObject = {};
        for(let document of documents) {
            object[document.id] = await this.databaseService.fetchDocumentFields(document)
        }

        return object
    }
}
