import {DatabaseService} from "./database-service";
import {ExportService} from "./export-service";
import * as admin from "firebase-admin";
import {readFile, writeFile} from "../utils/function-utils";

export namespace ExportDataScript {
    export async function run(collection: string) {
        if(process.argv.length == 4) {
            const databaseService = new DatabaseService()
            const importService = new ExportService(databaseService)

            const credentialsPath = process.argv[2]
            const dataPath = process.argv[3]

            admin.initializeApp({
                credential: admin.credential.cert(readFile(credentialsPath)),
            })

            console.log("Start data exporting...")
            const result = await importService.export(collection)
            writeFile(dataPath, result);
            console.log("Data successfully exported!")
        } else {
            console.log("Incorrect amount of arguments.")
        }
    }
}
