import * as admin from "firebase-admin";
import {DatabaseService} from "./import/database-service";
import {ImportService} from "./import/import-service";
import { readFileSync } from 'fs';

export namespace ImportDataScript {
    export async function run() {
        if(process.argv.length == 4) {
            const databaseService = new DatabaseService()
            const importService = new ImportService(databaseService)

            const credentialsPath = process.argv[2]
            const dataPath = process.argv[3]

            const credentialsFile = readFileSync(credentialsPath, 'utf8')
            const dataFile = readFileSync(dataPath, 'utf8')

            const credentials = JSON.parse(credentialsFile)
            const data = JSON.parse(dataFile)

            admin.initializeApp({
                credential: admin.credential.cert(credentials),
            })
            console.log("Start data import...")
            await importService.importData(data)
            console.log("Data successfully imported!")
        } else {
            console.log("Incorrect amount of arguments.")
        }
    }
}
