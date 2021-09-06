import * as admin from "firebase-admin";
import {DatabaseService} from "./import/database-service";
import {ImportService} from "./import/import-service";
import {readFile} from "./utils/function-utils";

export namespace ImportDataScript {
    export async function run() {
        if(process.argv.length == 4) {
            const databaseService = new DatabaseService()
            const importService = new ImportService(databaseService)

            const credentialsPath = process.argv[2]
            const dataPath = process.argv[3]

            admin.initializeApp({
                credential: admin.credential.cert(readFile(credentialsPath)),
            })

            console.log("Start data import...")
            await importService.importData(readFile(dataPath))
            console.log("Data successfully imported!")
        } else {
            console.log("Incorrect amount of arguments.")
        }
    }
}
