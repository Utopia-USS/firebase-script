import * as admin from 'firebase-admin'
import DocumentReference = admin.firestore.DocumentReference
import CollectionReference = admin.firestore.CollectionReference;

export enum ReferenceType {
    collection, document
}

export type Reference = {
    type: ReferenceType
    path: string
    documentRef: DocumentReference | null
    collectionRef: CollectionReference | null
}

export class DatabaseService {
    private references: Reference[] = []

    async setupDocument(path: string, documentObject: any) {
        const reference = this.findReference(path)

        if(reference.type == ReferenceType.collection) {
            throw new Error("Cannot add scalar value to collection. Document should be created.")
        }
        await reference.documentRef!.set(documentObject, { merge: true })
    }

    createDocument(path: string, document: string) {
        if(path === document) {
            this.insertReference(path, ReferenceType.document)
            return
        }

        const reference = this.findReference(path)

        const documentReference = <Reference> {
            type: ReferenceType.document,
            path: reference.path + "." + document,
            documentRef: reference.collectionRef!.doc(document)
        }
        this.references.push(documentReference)
    }

    createCollection(path: string, collection: string) {
        if(path === collection) {
            this.insertReference(path, ReferenceType.collection)
            return
        }

        const reference = this.findReference(path)

        const collectionReference = <Reference> {
            type: ReferenceType.collection,
            path: reference.path + "." + collection,
            collectionRef: reference.documentRef!.collection(collection)
        }
        this.references.push(collectionReference)
    }

    private findReference(path: string): Reference {
        const reference = this.references.find((it => it.path === path))

        if(reference) return reference
        else throw new Error(`Not found reference for path = ${path}`)
    }

    private insertReference(path: string, type: ReferenceType): Reference {
        const reference = <Reference> {
            type: type,
            path: path,
            documentRef: type == ReferenceType.document ? admin.firestore().doc(path) : null,
            collectionRef: type == ReferenceType.collection ? admin.firestore().collection(path) : null
        }
        this.references.push(reference)
        return reference
    }
}
