import {DatabaseService} from "./database-service";
import {isCollection, objectToMap} from "../utils/json-utils";

export class ImportService {
    readonly databaseService: DatabaseService;

    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService
    }

    async parseJson(json: any, fieldPath: string): Promise<void> {
        for (const fieldName in json) {
            if(isCollection(fieldName)) {
                await this.parseCollection(fieldName, fieldPath, json)
            } else {
                await this.parseDocument(fieldName, fieldPath, json)
            }
        }
    }

    async parseCollection(fieldName: string, fieldPath: string, json: any): Promise<void> {
        const collection = json[fieldName];
        const path = ImportService.getPathOrElse(fieldPath, fieldName)

        this.databaseService.createCollection(path, fieldName)

        for (const field in collection) {
            await this.parseDocument(field, ImportService.buildInsertPath(path, fieldName), collection)
        }
    }

    async parseDocument(fieldName: string, fieldPath: string, json: any): Promise<void> {
        const document = json[fieldName];
        const path = ImportService.getPathOrElse(fieldPath, fieldName)

        this.databaseService.createDocument(fieldPath, fieldName)

        for (const field in document) {
            if(isCollection(field)) {
                await this.parseCollection(field, ImportService.buildInsertPath(path, fieldName), document)
            } else {
                await this.databaseService.setupDocument(ImportService.buildInsertPath(path, fieldName), {[field]: document[field]})
            }
        }
    }

    private static getPathOrElse(path: string, elseValue: string): string {
        return path.length == 0 ? elseValue : path
    }

    private static buildInsertPath(path: string, fieldName: string): string {
        return path == fieldName ? path : path + "." + fieldName
    }
}
