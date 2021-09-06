import {DatabaseService} from "./database-service";
import {buildInsertPath, getPathOrElse, isCollection} from "../utils/function-utils";

export class ImportService {
    readonly databaseService: DatabaseService;

    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService
    }

    async importData(json: any, fieldPath: string = ""): Promise<void> {
        for (const fieldName in json) {
            if (isCollection(fieldName)) {
                await this.parseCollection(fieldName, fieldPath, json)
            } else {
                await this.parseDocument(fieldName, fieldPath, json)
            }
        }
    }

    async parseCollection(fieldName: string, fieldPath: string, json: any): Promise<void> {
        const collection = json[fieldName];
        const path = getPathOrElse(fieldPath, fieldName)

        this.databaseService.createCollection(path, fieldName)

        for (const field in collection) {
            await this.parseDocument(field, buildInsertPath(path, fieldName), collection)
        }
    }

    async parseDocument(fieldName: string, fieldPath: string, json: any): Promise<void> {
        const document = json[fieldName];
        const path = getPathOrElse(fieldPath, fieldName)

        this.databaseService.createDocument(fieldPath, fieldName)

        for (const field in document) {
            if(isCollection(field)) {
                await this.parseCollection(field, buildInsertPath(path, fieldName), document)
            } else {
                await this.databaseService.setupDocument(buildInsertPath(path, fieldName), {[field]: document[field]})
            }
        }
    }
}
